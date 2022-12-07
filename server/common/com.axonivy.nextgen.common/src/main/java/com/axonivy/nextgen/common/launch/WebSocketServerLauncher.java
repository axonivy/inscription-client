package com.axonivy.nextgen.common.launch;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.function.Function;
import java.util.function.Supplier;

import javax.servlet.ServletException;
import javax.websocket.CloseReason;
import javax.websocket.DeploymentException;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpointConfig;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.websocket.jsr356.server.ServerContainer;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import org.eclipse.lsp4j.jsonrpc.Launcher.Builder;
import org.eclipse.lsp4j.websocket.WebSocketEndpoint;

import com.axonivy.nextgen.common.DisposableCollection;
import com.axonivy.nextgen.common.IDisposable;
import com.axonivy.nextgen.common.log.Log4j2Logger;

public class WebSocketServerLauncher<SERVER_TYPE, CLIENT_TYPE> extends DisposableCollection implements ServerLauncher {
	private static Logger LOGGER = LogManager.getLogger(WebSocketServerLauncher.class);

	private static final String DEFAULT_ENDPOINT_PATH = "/";

	private String name;
	private Supplier<? extends SERVER_TYPE> serverFactory;
	private Class<CLIENT_TYPE> clientClass;
	private String endpointPath;

	public WebSocketServerLauncher(String name, Supplier<? extends SERVER_TYPE> serverFactory,
			Class<CLIENT_TYPE> clientClass) {
		this(name, serverFactory, clientClass, DEFAULT_ENDPOINT_PATH);
	}

	public WebSocketServerLauncher(String name, Supplier<? extends SERVER_TYPE> serverFactory,
			Class<CLIENT_TYPE> clientClass, String endpointPath) {
		this.name = name;
		this.serverFactory = serverFactory;
		this.clientClass = clientClass;
		this.endpointPath = endpointPath;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void start(String hostname, int port) {
		Log.setLog(new Log4j2Logger(getClass().getSimpleName()));
		try {
			Server server = createServer(hostname, port);
			addToDispose(() -> stopServer(server));
			startServer(server);
		} catch (ServletException | DeploymentException exception) {
			LOGGER.error(exception);
		}
	}

	protected Server createServer(String hostname, int port) throws ServletException, DeploymentException {
		final Server server = new Server(new InetSocketAddress(hostname, port));
		final ServletContextHandler handler = new ServletContextHandler(ServletContextHandler.SESSIONS);
		handler.setContextPath("/");
		server.setHandler(handler);

		ServerContainer container = WebSocketServerContainerInitializer.initialize(handler);
		addEndpoints(container);
		return server;
	}

	protected void addEndpoints(ServerContainer container) throws DeploymentException {
		ServerEndpointConfig serverEndpointConfig = ServerEndpointConfig.Builder
				.create(ServerWebSocketEndpoint.class, endpointPath)
				.configurator(new ServerWebSockendEndpointConfigurator()).build();
		container.addEndpoint(serverEndpointConfig);
	}

	protected void connect(SERVER_TYPE server, CLIENT_TYPE client) {
		// do nothing by default
	}

	protected void startServer(Server server) {
		// Start the server
		try {
			server.start();

			LOGGER.info(getName() + " Running and listening on Endpoint : " + server.getURI() + endpointPath);
			LOGGER.info(getName() + " Press enter to stop the server...");
			new Thread(() -> {
				try {
					int key = System.in.read();
					this.dispose();
					if (key == -1) {
						LOGGER.warn(getName() + " The standard input stream is empty");
					}
				} catch (IOException exception) {
					LOGGER.warn(exception);
				}
			}).start();
			server.join();
		} catch (Exception exception) {
			LOGGER.warn("Shutting down due to exception", exception);
			System.exit(1);
		}
	}

	protected void stopServer(Server server) {
		if (server.isRunning()) {
			try {
				server.stop();
			} catch (Exception exception) {
				LOGGER.error("Failed to stop " + getName() + ": " + exception.getMessage(), exception);
			}
		}
	}

	protected class ServerWebSockendEndpointConfigurator extends ServerEndpointConfig.Configurator {
		@Override
		public <T> T getEndpointInstance(Class<T> endpointClass) throws InstantiationException {
			return endpointClass.cast(new ServerWebSocketEndpoint(serverFactory.get(), clientClass));
		}
	}

	protected class ServerWebSocketEndpoint extends WebSocketEndpoint<CLIENT_TYPE> {
		public static final int MAX_TEXT_MESSAGE_BUFFER_SIZE = 8 * 1024 * 1024; // 8 MB
		public static final int NO_IDLE_TIMEOUT = 0;

		private SERVER_TYPE server;
		private Class<CLIENT_TYPE> clientClass;

		public ServerWebSocketEndpoint(SERVER_TYPE server, Class<CLIENT_TYPE> clientClass) {
			this.server = server;
			this.clientClass = clientClass;
		}

		@Override
		public void onOpen(Session session, EndpointConfig config) {
			session.setMaxTextMessageBufferSize(MAX_TEXT_MESSAGE_BUFFER_SIZE);
			session.setMaxIdleTimeout(NO_IDLE_TIMEOUT);
			super.onOpen(session, config);
			LOGGER.info(getName() + " [Client-" + session.getId() + "] Connected.");
		}

		@Override
		protected void configure(Builder<CLIENT_TYPE> builder) {
			builder.setLocalService(server).setRemoteInterface(clientClass).wrapMessages(Function.identity());
		}

		@Override
		protected void connect(Collection<Object> localServices, CLIENT_TYPE remoteProxy) {
			WebSocketServerLauncher.this.connect(server, remoteProxy);
			super.connect(localServices, remoteProxy);
		}

		@Override
		public void onClose(Session session, CloseReason closeReason) {
			IDisposable.disposeIfExists(server);
			super.onClose(session, closeReason);
			LOGGER.info(getName() + " [Client-" + session.getId() + "] Disconnected.");
		}

		@Override
		public void onError(Session session, Throwable thr) {
			LOGGER.error(thr);
			super.onError(session, thr);
		}

	}
}
