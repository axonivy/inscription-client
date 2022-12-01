package com.axonivy.nextgen.lsp.languageserver;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.CompletionItem;
import org.eclipse.lsp4j.CompletionList;
import org.eclipse.lsp4j.CompletionOptions;
import org.eclipse.lsp4j.CompletionParams;
import org.eclipse.lsp4j.Diagnostic;
import org.eclipse.lsp4j.DiagnosticRegistrationOptions;
import org.eclipse.lsp4j.DiagnosticSeverity;
import org.eclipse.lsp4j.Position;
import org.eclipse.lsp4j.Range;
import org.eclipse.lsp4j.ServerCapabilities;
import org.eclipse.lsp4j.jsonrpc.messages.Either;

public class FormLanguageServer extends BaseLanguageServer {
	public FormLanguageServer() {
		super("FormLanguageServer", "0.0.1");
	}

	@Override
	protected void initServerCapabilities(ServerCapabilities serverCapabilities) {
		super.initServerCapabilities(serverCapabilities);
		serverCapabilities.setCompletionProvider(new CompletionOptions(false, List.of(".")));
		serverCapabilities.setDiagnosticProvider(new DiagnosticRegistrationOptions(true, false));
	}

	@Override
	protected void documentChanged(Document document) {
		// line and column numbers are 0-based
		validate(document);
	}

	//
	// Diagnostic
	//

	protected void validate(Document document) {
		List<Diagnostic> diagnostics = new ArrayList<>();
		for (int lineNumber = 0; lineNumber < document.getLineCount(); lineNumber++) {
			String lineContent = document.getLineContent(lineNumber);
			int helloIndex = lineContent.indexOf("Hello");
			if (helloIndex >= 0) {
				Position issueStart = new Position(lineNumber, helloIndex);
				Position issueEnd = new Position(lineNumber, helloIndex + "Hello".length());
				Range issueRange = new Range(issueStart, issueEnd);
				diagnostics.add(new Diagnostic(issueRange, "Please use 'Good Day!'", DiagnosticSeverity.Error,
						getName()));
			}
		}
		publishDiagnostics(document.getUri(), diagnostics);
	}

	//
	// Completion
	//

	@Override
	public CompletableFuture<Either<List<CompletionItem>, CompletionList>> completion(CompletionParams params) {
		CompletionList result = new CompletionList();
		Document document = openDocuments.get(params.getTextDocument().getUri());
		if (document != null) {
			result.setIsIncomplete(true);
			// create completion items
			result.getItems().add(new CompletionItem("Hello"));
			result.getItems().add(new CompletionItem("Replace"));
		}
		return CompletableFuture.completedFuture(Either.forRight(result));
	}
}
