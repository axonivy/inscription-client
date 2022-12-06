package com.axonivy.nextgen.inscription.server.protocol;

import java.util.concurrent.CompletableFuture;

import com.axonivy.nextgen.inscription.server.protocol.model.UserDialog;

public class DefaultInscriptionServer implements InscriptionServer {

	@Override
	public CompletableFuture<Boolean> initialize() {
		return CompletableFuture.completedFuture(true);
	}

	@Override
	public CompletableFuture<UserDialog> userDialog(UserDialogParams params) {
		return CompletableFuture.supplyAsync(() -> supplyUserDialog(params));
	}

	protected UserDialog supplyUserDialog(UserDialogParams params) {
		return params.getDialogId() % 2 == 0 ? new UserDialog("Even", "Even Dialog", "workflow.task.evenRequest",
				"start(StartRequest):Boolean,LogEntry", null) : new UserDialog();
	}
}
