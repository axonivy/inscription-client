package com.axonivy.nextgen.inscription.server.protocol;

public class UserDialogParams {
	private int dialogId;

	public UserDialogParams() {
	}

	public UserDialogParams(int dialogId) {
		super();
		this.dialogId = dialogId;
	}

	public int getDialogId() {
		return dialogId;
	}

	public void setDialogId(int dialogId) {
		this.dialogId = dialogId;
	}
}
