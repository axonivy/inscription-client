package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.google.gson.Gson;

public class MappingData {
	private List<Mapping> mapping;
	private String code;

	public MappingData() {
		super();
	}

	public MappingData(List<Mapping> mapping, String code) {
		super();
		this.mapping = new ArrayList<>(mapping);
		this.code = code;
	}

	public List<Mapping> getMapping() {
		return mapping;
	}

	public void setMapping(List<Mapping> mapping) {
		this.mapping = mapping;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public int hashCode() {
		return Objects.hash(code, mapping);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof MappingData)) {
			return false;
		}
		MappingData other = (MappingData) obj;
		return Objects.equals(code, other.code) && Objects.equals(mapping, other.mapping);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
