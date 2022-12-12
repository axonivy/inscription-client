package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.Objects;

import com.google.gson.Gson;

public class CallData {
	private String dialog;
	private String start;
	private MappingData mappingData;

	public CallData() {
		super();
	}

	public CallData(CallData data) {
		this(data.getDialog(), data.getStart(), data.getMappingData());
	}

	public CallData(String dialog, String start, MappingData mappingData) {
		super();
		this.dialog = dialog;
		this.start = start;
		this.mappingData = mappingData;
	}

	public String getDialog() {
		return dialog;
	}

	public void setDialog(String dialog) {
		this.dialog = dialog;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public MappingData getMappingData() {
		return mappingData;
	}

	public void setMappingData(MappingData mappingData) {
		this.mappingData = mappingData;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dialog, mappingData, start);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof CallData)) {
			return false;
		}
		CallData other = (CallData) obj;
		return Objects.equals(dialog, other.dialog) && Objects.equals(mappingData, other.mappingData)
				&& Objects.equals(start, other.start);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}
