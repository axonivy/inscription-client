package com.axonivy.nextgen.inscription.server.protocol;

import java.util.concurrent.CompletableFuture;

import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import com.axonivy.nextgen.inscription.server.protocol.model.UserDialogData;

public interface InscriptionServer {
	void connect(InscriptionClient client);

	@JsonRequest
	CompletableFuture<Boolean> initialize();

	@JsonRequest
	CompletableFuture<UserDialogData> userDialog(UserDialogParams params);
}
