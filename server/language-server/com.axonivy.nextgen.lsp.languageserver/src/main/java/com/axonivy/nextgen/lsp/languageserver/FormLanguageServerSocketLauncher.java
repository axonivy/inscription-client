package com.axonivy.nextgen.lsp.languageserver;

import org.apache.logging.log4j.Level;
import org.eclipse.lsp4j.services.LanguageClient;

import com.axonivy.nextgen.common.launch.SocketServerLauncher;
import com.axonivy.nextgen.common.log.LogUtil;

public class FormLanguageServerSocketLauncher extends SocketServerLauncher<FormLanguageServer, LanguageClient> {
	public FormLanguageServerSocketLauncher() {
		super(FormLanguageServerLaunch.NAME, FormLanguageServer::new, LanguageClient.class);
	}

	@Override
	protected void connect(FormLanguageServer server, LanguageClient client) {
		server.connect(client);
		super.connect(server, client);
	}

	public static void main(String[] args) {
		LogUtil.configure(true, Level.DEBUG);
		new FormLanguageServerSocketLauncher().start(FormLanguageServerLaunch.HOST, FormLanguageServerLaunch.PORT);
	}
}
