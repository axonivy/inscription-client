package com.axonivy.nextgen.common.launch;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.channels.Channels;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;
import java.util.function.Supplier;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.lsp4j.jsonrpc.Launcher;

import com.axonivy.nextgen.common.DisposableCollection;
import com.axonivy.nextgen.common.IDisposable;

public class SocketServerLauncher<SERVER_TYPE, CLIENT_TYPE> extends DisposableCollection implements ServerLauncher {
	private static Logger LOGGER = LogManager.getLogger(SocketServerLauncher.class);

	private ExecutorService threadPool;

	private String name;

	private Supplier<? extends SERVER_TYPE> serverFactory;
	private Class<CLIENT_TYPE> clientClass;

	public SocketServerLauncher(String name, Supplier<? extends SERVER_TYPE> serverFactory,
			Class<CLIENT_TYPE> clientClass) {
		this.name = name;
		this.serverFactory = serverFactory;
		this.clientClass = clientClass;
	}

	@Override
	public String getName() {
		return this.name;
	}

	@Override
	public void start(final String hostname, final int port) {
		threadPool = Executors.newCachedThreadPool();
		this.addToDispose(() -> threadPool.shutdown());

		try (AsynchronousServerSocketChannel serverSocket = AsynchronousServerSocketChannel.open()
				.bind(new InetSocketAddress(hostname, port))) {
			while (!isDisposed()) {
				LOGGER.info(getName() + " is ready to accept new client requests on port " + port);
				final AsynchronousSocketChannel clientChannel = serverSocket.accept().get();
				final InputStream input = Channels.newInputStream(clientChannel);
				final OutputStream output = Channels.newOutputStream(clientChannel);

				LOGGER.info(getName() + " connecting client " + clientChannel.getRemoteAddress());
				final SERVER_TYPE server = this.serverFactory.get();
				final Launcher<CLIENT_TYPE> launcher = createLauncher(server, input, output);

				CompletableFuture.supplyAsync(() -> startClientConnection(launcher, server))
						.thenRun(() -> this.clientConnectionClosed(server, clientChannel));
				LOGGER.info(getName() + " connected client " + clientChannel.getRemoteAddress());
			}
		} catch (IOException | InterruptedException | ExecutionException exception) {
			LOGGER.error(getName() + " encountered an error at accepting new client", exception);
		}
	}

	protected Launcher<CLIENT_TYPE> createLauncher(final SERVER_TYPE server, final InputStream input,
			final OutputStream output) {
		final Launcher.Builder<CLIENT_TYPE> builder = new Launcher.Builder<CLIENT_TYPE>().setLocalService(server)
				.setRemoteInterface(clientClass).setInput(input).setOutput(output).setExecutorService(threadPool)
				.wrapMessages(Function.identity());
		return builder.create();
	}

	protected void connect(SERVER_TYPE server, CLIENT_TYPE client) {
		// do nothing by default
	}

	protected Void startClientConnection(final Launcher<CLIENT_TYPE> launcher, SERVER_TYPE server) {
		try {
			connect(server, launcher.getRemoteProxy());
			return launcher.startListening().get();
		} catch (InterruptedException | ExecutionException exception) {
			LOGGER.error(getName() + " encountered an error at accepting new client", exception);
		}
		return null;
	}

	protected void clientConnectionClosed(final SERVER_TYPE server, final AsynchronousSocketChannel socketChannel) {
		IDisposable.disposeIfExists(server);
		try {
			if (socketChannel != null && socketChannel.isOpen()) {
				socketChannel.close();
			}
		} catch (final IOException exception) {
			LOGGER.error(getName() + " encountered an error trying to dispose the client connection", exception);
		}
	}
}
