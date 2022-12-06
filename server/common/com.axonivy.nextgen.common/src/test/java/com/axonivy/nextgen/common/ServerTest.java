package com.axonivy.nextgen.common;

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.jsonrpc.services.ServiceEndpoints;
import org.junit.After;
import org.junit.Before;

public class ServerTest<CLIENT, SERVER, SERVER_INSTANCE extends SERVER> {
	protected Class<CLIENT> clientClass;
	
	protected SERVER_INSTANCE server;
	protected Class<SERVER> serverClass;
	protected Launcher<CLIENT> serverLauncher;
	protected Future<Void> serverListening;

	protected CLIENT client;
	protected SERVER serverProxy;
	protected AssertingEndpoint clientEndpoint;
	protected Launcher<SERVER> clientLauncher;
	protected Future<Void> clientListening;

	public ServerTest(Class<CLIENT> clientClass, Class<SERVER> serverClass, SERVER_INSTANCE server) {
		this.clientClass = clientClass;
		this.serverClass = serverClass;
		this.server = server;		
	}
	
	@Before
	public void setup() throws IOException {
		PipedInputStream inClient = new PipedInputStream();
		PipedOutputStream outClient = new PipedOutputStream();
		PipedInputStream inServer = new PipedInputStream();
		PipedOutputStream outServer = new PipedOutputStream();

		inClient.connect(outServer);
		outClient.connect(inServer);

		serverLauncher = new Launcher.Builder<CLIENT>()
				.setLocalService(server)
				.setRemoteInterface(clientClass)
				.setInput(inServer)
				.setOutput(outServer)
				.create();
		serverListening = serverLauncher.startListening();

		clientEndpoint = new AssertingEndpoint();
		client = ServiceEndpoints.toServiceObject(clientEndpoint, clientClass);
		clientLauncher = new Launcher.Builder<SERVER>()
				.setLocalService(client)
				.setRemoteInterface(serverClass)
				.setInput(inClient)
				.setOutput(outClient)
				.validateMessages(false)
				.create();
		serverProxy = clientLauncher.getRemoteProxy();
		clientListening = clientLauncher.startListening();
	}
	
	@After
	public void teardown() throws InterruptedException, ExecutionException {
		clientListening.cancel(true);
		serverListening.cancel(true);
	}
}
