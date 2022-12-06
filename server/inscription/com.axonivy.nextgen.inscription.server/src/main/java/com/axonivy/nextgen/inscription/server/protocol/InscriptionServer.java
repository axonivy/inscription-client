package com.axonivy.nextgen.inscription.server.protocol;

import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import com.axonivy.nextgen.inscription.server.protocol.model.UserDialog;

public interface InscriptionServer {
	@JsonRequest
	CompletableFuture<Boolean> initialize();

	@JsonRequest
	CompletableFuture<UserDialog> userDialog(UserDialogParams params);
}
