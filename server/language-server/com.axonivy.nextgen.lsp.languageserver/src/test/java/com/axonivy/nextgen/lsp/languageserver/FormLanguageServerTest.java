package com.axonivy.nextgen.lsp.languageserver;

import java.io.IOException;
import java.util.ArrayList;

import org.eclipse.lsp4j.Diagnostic;
import org.eclipse.lsp4j.DiagnosticSeverity;
import org.eclipse.lsp4j.DidOpenTextDocumentParams;
import org.eclipse.lsp4j.InitializeParams;
import org.eclipse.lsp4j.InitializedParams;
import org.eclipse.lsp4j.Position;
import org.eclipse.lsp4j.PublishDiagnosticsParams;
import org.eclipse.lsp4j.Range;
import org.eclipse.lsp4j.TextDocumentItem;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageServer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.axonivy.nextgen.common.LSPMethod;
import com.axonivy.nextgen.common.ServerTest;

public class FormLanguageServerTest extends ServerTest<LanguageClient, LanguageServer, FormLanguageServer> {

	public FormLanguageServerTest() {
		super(LanguageClient.class, LanguageServer.class, new FormLanguageServer());
	}

	@Override
	@Before
	public void setup() throws IOException {
		super.setup();
		server.connect(client);
	}

	@Test
	public void testOpen() throws Exception {
		serverProxy.initialize(new InitializeParams());
		serverProxy.initialized(new InitializedParams());

		DidOpenTextDocumentParams openParams = new DidOpenTextDocumentParams(
				new TextDocumentItem("openTest", "test", 0, "This is a test.\naHello\nAmazing!"));

		PublishDiagnosticsParams publishDiagnosticsParams = new PublishDiagnosticsParams();
		publishDiagnosticsParams.setUri(openParams.getTextDocument().getUri());
		ArrayList<Diagnostic> diagnostics = new ArrayList<>();
		diagnostics.add(new Diagnostic(new Range(new Position(1, 1), new Position(1, 6)), "Please use 'Good Day!'",
				DiagnosticSeverity.Error, server.getName()));
		publishDiagnosticsParams.setDiagnostics(diagnostics);

		clientEndpoint.expectNotification(LSPMethod.PUBLISH_DIAGNOSTICS, publishDiagnosticsParams);
		serverProxy.getTextDocumentService().didOpen(openParams);

		clientEndpoint.assertExpectations();
		Assert.assertNotNull(server.openDocuments.get("openTest"));
	}
}
