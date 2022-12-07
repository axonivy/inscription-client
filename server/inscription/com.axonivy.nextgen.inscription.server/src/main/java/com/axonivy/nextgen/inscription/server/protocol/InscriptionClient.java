package com.axonivy.nextgen.inscription.server.protocol;

import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;

import com.axonivy.nextgen.inscription.server.protocol.model.UserDialogData;

public interface InscriptionClient {
	@JsonNotification
	void userDialogChanged(UserDialogData userDialog);
}
