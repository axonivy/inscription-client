package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.Objects;

import com.google.gson.Gson;

public class Document {
	private String description;
	private String url;

	public Document() {
		super();
	}

	public Document(String description, String url) {
		super();
		this.description = description;
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, url);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Document)) {
			return false;
		}
		Document other = (Document) obj;
		return Objects.equals(description, other.description) && Objects.equals(url, other.url);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
