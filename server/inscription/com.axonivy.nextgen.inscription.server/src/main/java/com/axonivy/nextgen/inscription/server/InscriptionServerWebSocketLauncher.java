package com.axonivy.nextgen.inscription.server;

import org.apache.logging.log4j.Level;

import com.axonivy.nextgen.common.launch.WebSocketServerLauncher;
import com.axonivy.nextgen.common.log.LogUtil;
import com.axonivy.nextgen.inscription.server.protocol.DefaultInscriptionServer;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionClient;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionServer;

public class InscriptionServerWebSocketLauncher extends WebSocketServerLauncher<InscriptionServer, InscriptionClient> {
	public InscriptionServerWebSocketLauncher() {
		super(InscriptionServerLaunch.NAME, DefaultInscriptionServer::new, InscriptionClient.class);
	}

	@Override
	protected void connect(InscriptionServer server, InscriptionClient client) {
		server.connect(client);
		super.connect(server, client);
	}

	public static void main(String[] args) {
		LogUtil.configure(true, Level.INFO);
		new InscriptionServerWebSocketLauncher().start(InscriptionServerLaunch.HOST, InscriptionServerLaunch.PORT);
	}
}
