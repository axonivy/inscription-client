package com.axonivy.nextgen.lsp.languageserver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.eclipse.lsp4j.Diagnostic;
import org.eclipse.lsp4j.DiagnosticSeverity;
import org.eclipse.lsp4j.DidOpenTextDocumentParams;
import org.eclipse.lsp4j.DocumentDiagnosticParams;
import org.eclipse.lsp4j.DocumentDiagnosticReport;
import org.eclipse.lsp4j.InitializeParams;
import org.eclipse.lsp4j.InitializedParams;
import org.eclipse.lsp4j.Position;
import org.eclipse.lsp4j.Range;
import org.eclipse.lsp4j.RelatedFullDocumentDiagnosticReport;
import org.eclipse.lsp4j.TextDocumentIdentifier;
import org.eclipse.lsp4j.TextDocumentItem;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageServer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.axonivy.nextgen.common.ServerTest;
import com.google.gson.JsonPrimitive;

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
	public void testDiagnosticWithOpen() throws Exception {
		serverProxy.initialize(new InitializeParams());
		serverProxy.initialized(new InitializedParams());

		DidOpenTextDocumentParams openParams = new DidOpenTextDocumentParams(
				new TextDocumentItem("openTest", "test", 0, "This is a test.\naHello\nAmazing!"));
		serverProxy.getTextDocumentService().didOpen(openParams);

		Diagnostic diagnostic = new Diagnostic(new Range(new Position(1, 1), new Position(1, 6)), "Use 'Good Day'",
				DiagnosticSeverity.Error, server.getName());
		diagnostic.setData(new JsonPrimitive("HelloProblem"));
		DocumentDiagnosticReport expectedResponse = new DocumentDiagnosticReport(
				new RelatedFullDocumentDiagnosticReport(new ArrayList<>(List.of(diagnostic))));

		DocumentDiagnosticReport response = serverProxy.getTextDocumentService()
				.diagnostic(new DocumentDiagnosticParams(new TextDocumentIdentifier("openTest")))
				.get(1, TimeUnit.MINUTES);

		Assert.assertNotNull(server.openDocuments.get("openTest"));
		Assert.assertEquals(expectedResponse.getLeft(), response.getLeft());
	}
}
