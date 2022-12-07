package com.axonivy.nextgen.lsp.languageserver;

import static org.eclipse.lsp4j.DiagnosticSeverity.Error;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.CodeAction;
import org.eclipse.lsp4j.CodeActionKind;
import org.eclipse.lsp4j.CodeActionOptions;
import org.eclipse.lsp4j.CodeActionParams;
import org.eclipse.lsp4j.Command;
import org.eclipse.lsp4j.CompletionItem;
import org.eclipse.lsp4j.CompletionList;
import org.eclipse.lsp4j.CompletionOptions;
import org.eclipse.lsp4j.CompletionParams;
import org.eclipse.lsp4j.Diagnostic;
import org.eclipse.lsp4j.DiagnosticRegistrationOptions;
import org.eclipse.lsp4j.DocumentDiagnosticParams;
import org.eclipse.lsp4j.DocumentDiagnosticReport;
import org.eclipse.lsp4j.Position;
import org.eclipse.lsp4j.Range;
import org.eclipse.lsp4j.RelatedFullDocumentDiagnosticReport;
import org.eclipse.lsp4j.RelatedUnchangedDocumentDiagnosticReport;
import org.eclipse.lsp4j.ServerCapabilities;
import org.eclipse.lsp4j.TextEdit;
import org.eclipse.lsp4j.WorkspaceEdit;
import org.eclipse.lsp4j.jsonrpc.messages.Either;

import com.google.gson.JsonPrimitive;

public class FormLanguageServer extends BaseLanguageServer {
	private static final String DIAGNOSTIC_ID = "HelloProblem";
	private static final String INVALID_TEXT = "Hello";
	private static final String REPLACE_TEXT = "Good Day";

	public FormLanguageServer() {
		super("FormLanguageServer", "0.0.1");
	}

	@Override
	protected void initServerCapabilities(ServerCapabilities serverCapabilities) {
		super.initServerCapabilities(serverCapabilities);
		serverCapabilities.setDiagnosticProvider(new DiagnosticRegistrationOptions(true, false));
		serverCapabilities.setCodeActionProvider(new CodeActionOptions(List.of(CodeActionKind.QuickFix)));
		serverCapabilities.setCompletionProvider(new CompletionOptions(false, List.of(".")));
	}

	//
	// Diagnostic
	//

	@Override
	public CompletableFuture<DocumentDiagnosticReport> diagnostic(DocumentDiagnosticParams params) {
		String uri = params.getTextDocument().getUri();
		Document document = openDocuments.get(uri);
		DocumentDiagnosticReport report = document == null
				? new DocumentDiagnosticReport(new RelatedUnchangedDocumentDiagnosticReport())
				: new DocumentDiagnosticReport(new RelatedFullDocumentDiagnosticReport(validate(document)));
		return CompletableFuture.completedFuture(report);
	}

	protected List<Diagnostic> validate(Document document) {
		List<Diagnostic> diagnostics = new ArrayList<>();
		for (int lineNumber = 0; lineNumber < document.getLineCount(); lineNumber++) {
			String lineContent = document.getLineContent(lineNumber);
			int invalidTextIdx = lineContent.indexOf(INVALID_TEXT);
			if (invalidTextIdx >= 0) {
				Position issueStart = new Position(lineNumber, invalidTextIdx);
				Position issueEnd = new Position(lineNumber, invalidTextIdx + INVALID_TEXT.length());
				Range range = new Range(issueStart, issueEnd);
				Diagnostic diagnostic = new Diagnostic(range, "Use '" + REPLACE_TEXT + "'", Error, getName());
				diagnostic.setData(DIAGNOSTIC_ID);
				diagnostics.add(diagnostic);
			}
		}
		return diagnostics;
	}

	//
	// Code Actions
	//

	@Override
	public CompletableFuture<List<Either<Command, CodeAction>>> codeAction(CodeActionParams params) {
		if (!params.getContext().getDiagnostics().isEmpty()) {
			Diagnostic diagnostic = params.getContext().getDiagnostics().get(0);
			if (Objects.equals(((JsonPrimitive) diagnostic.getData()).getAsString(), DIAGNOSTIC_ID)) {
				Range range = diagnostic.getRange();
				TextEdit textEdit = new TextEdit(range, REPLACE_TEXT);
				WorkspaceEdit edit = new WorkspaceEdit(Map.of(params.getTextDocument().getUri(), List.of(textEdit)));
				CodeAction codeAction = new CodeAction("Replace with '" + REPLACE_TEXT + "'");
				codeAction.setEdit(edit);
				codeAction.setKind(CodeActionKind.QuickFix);
				return CompletableFuture.completedFuture(List.of(Either.forRight(codeAction)));
			}
		}
		return CompletableFuture.completedFuture(Collections.emptyList());
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
			result.getItems().add(new CompletionItem("Axon"));
			result.getItems().add(new CompletionItem("Ivy"));
		}
		return CompletableFuture.completedFuture(Either.forRight(result));
	}
}
