package com.axonivy.nextgen.inscription.server;

import org.apache.logging.log4j.Level;

import com.axonivy.nextgen.common.launch.SocketServerLauncher;
import com.axonivy.nextgen.common.log.LogUtil;
import com.axonivy.nextgen.inscription.server.protocol.DefaultInscriptionServer;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionClient;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionServer;

public class InscriptionServerSocketLauncher extends SocketServerLauncher<InscriptionServer, InscriptionClient> {
	public InscriptionServerSocketLauncher() {
		super(InscriptionServerLaunch.NAME, DefaultInscriptionServer::new, InscriptionClient.class);
	}

	public static void main(String[] args) {
		LogUtil.configure(true, Level.DEBUG);
		new InscriptionServerSocketLauncher().start(InscriptionServerLaunch.HOST, InscriptionServerLaunch.PORT);
	}
}
