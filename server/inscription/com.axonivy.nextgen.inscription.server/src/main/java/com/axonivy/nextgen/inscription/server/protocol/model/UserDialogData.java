package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.Objects;

import com.google.gson.Gson;

public class UserDialogData {
	private NameData nameData;
	private CallData callData;

	public UserDialogData() {
		super();
	}

	public UserDialogData(UserDialogData data) {
		this(new NameData(data.getNameData()), new CallData(data.getCallData()));
	}

	public UserDialogData(NameData nameData, CallData callData) {
		super();
		this.nameData = nameData;
		this.callData = callData;
	}

	public NameData getNameData() {
		return nameData;
	}

	public void setNameData(NameData nameData) {
		this.nameData = nameData;
	}

	public CallData getCallData() {
		return callData;
	}

	public void setCallData(CallData callData) {
		this.callData = callData;
	}

	@Override
	public int hashCode() {
		return Objects.hash(callData, nameData);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof UserDialogData)) {
			return false;
		}
		UserDialogData other = (UserDialogData) obj;
		return Objects.equals(callData, other.callData) && Objects.equals(nameData, other.nameData);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}
