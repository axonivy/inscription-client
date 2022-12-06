package com.axonivy.nextgen.lsp.languageserver;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.Diagnostic;
import org.eclipse.lsp4j.DidChangeConfigurationParams;
import org.eclipse.lsp4j.DidChangeTextDocumentParams;
import org.eclipse.lsp4j.DidChangeWatchedFilesParams;
import org.eclipse.lsp4j.DidCloseTextDocumentParams;
import org.eclipse.lsp4j.DidOpenTextDocumentParams;
import org.eclipse.lsp4j.DidSaveTextDocumentParams;
import org.eclipse.lsp4j.InitializeParams;
import org.eclipse.lsp4j.InitializeResult;
import org.eclipse.lsp4j.InitializedParams;
import org.eclipse.lsp4j.PublishDiagnosticsParams;
import org.eclipse.lsp4j.ServerCapabilities;
import org.eclipse.lsp4j.ServerInfo;
import org.eclipse.lsp4j.TextDocumentItem;
import org.eclipse.lsp4j.TextDocumentSyncKind;
import org.eclipse.lsp4j.services.LanguageClient;
import org.eclipse.lsp4j.services.LanguageClientAware;
import org.eclipse.lsp4j.services.LanguageServer;
import org.eclipse.lsp4j.services.TextDocumentService;
import org.eclipse.lsp4j.services.WorkspaceService;

import com.axonivy.nextgen.common.IDisposable;

public class BaseLanguageServer
		implements LanguageServer, WorkspaceService, TextDocumentService, LanguageClientAware, IDisposable {

	private String name;
	private String version;

	protected final CompletableFuture<InitializedParams> initialized = new CompletableFuture<>();
	protected final CompletableFuture<Boolean> exited = new CompletableFuture<>();

	protected LanguageClient client;
	protected final Map<String, Document> openDocuments = new HashMap<>();
	protected boolean shutdownRequested;

	public BaseLanguageServer(String name, String version) {
		this.name = name;
		this.version = version;
	}

	public String getName() {
		return name;
	}

	public String getVersion() {
		return version;
	}

	@Override
	public void connect(LanguageClient client) {
		this.client = client;
	}

	//
	// Lifecycle
	//

	@Override
	public CompletableFuture<InitializeResult> initialize(InitializeParams params) {
		InitializeResult result = new InitializeResult();
		ServerCapabilities serverCapabilities = new ServerCapabilities();
		initServerCapabilities(serverCapabilities);
		result.setCapabilities(serverCapabilities);
		result.setServerInfo(new ServerInfo(getName(), getVersion()));
		return CompletableFuture.completedFuture(result);
	}

	protected void initServerCapabilities(ServerCapabilities serverCapabilities) {
		serverCapabilities.setTextDocumentSync(TextDocumentSyncKind.Incremental);
	}

	@Override
	public void initialized(InitializedParams params) {
		initialized.complete(params);
	}

	@Override
	public CompletableFuture<Object> shutdown() {
		shutdownRequested = true;
		return CompletableFuture.completedFuture(new Object());
	}

	@Override
	public void exit() {
		this.exited.complete(shutdownRequested);
	}

	public CompletableFuture<Boolean> onExit() {
		return exited;
	}

	//
	// Document Handling
	//

	@Override
	public TextDocumentService getTextDocumentService() {
		return this;
	}

	@Override
	public void didOpen(DidOpenTextDocumentParams params) {
		TextDocumentItem textDocument = params.getTextDocument();
		Document document = new Document(textDocument.getUri(), textDocument.getVersion(), textDocument.getText());
		openDocuments.put(textDocument.getUri(), document);
		documentChanged(document);
	}

	@Override
	public void didChange(DidChangeTextDocumentParams params) {
		Document document = openDocuments.get(params.getTextDocument().getUri());
		if (document != null) {
			document.applyTextDocumentChanges(params.getContentChanges());
			documentChanged(document);
		}
	}

	@Override
	public void didClose(DidCloseTextDocumentParams params) {
		Document document = openDocuments.remove(params.getTextDocument().getUri());
		if (document != null) {
			documentChanged(document);
		}
	}

	@Override
	public void didSave(DidSaveTextDocumentParams params) {
		// nothing to do
	}

	//
	// Workspace Handling
	//

	@Override
	public WorkspaceService getWorkspaceService() {
		return this;
	}

	@Override
	public void didChangeConfiguration(DidChangeConfigurationParams params) {
		// do nothing
	}

	@Override
	public void didChangeWatchedFiles(DidChangeWatchedFilesParams params) {
		// do nothing
	}

	//
	// Helper
	//

	protected void documentChanged(Document document) {
		// subclasses may provide functionality
	}

	protected void publishDiagnostics(String uri, List<Diagnostic> diagnostics) {
		if (!diagnostics.isEmpty()) {
			initialized.thenAccept((initParams) -> {
				PublishDiagnosticsParams publishDiagnosticsParams = new PublishDiagnosticsParams();
				publishDiagnosticsParams.setUri(uri);
				publishDiagnosticsParams.setDiagnostics(diagnostics);
				client.publishDiagnostics(publishDiagnosticsParams);
			});
		}
	}

	@Override
	public void dispose() {
		shutdown().thenRun(this::exit);
	}
}
