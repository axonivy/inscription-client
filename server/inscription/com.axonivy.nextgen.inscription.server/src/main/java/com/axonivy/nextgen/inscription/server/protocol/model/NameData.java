package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.google.gson.Gson;

public class NameData {
	private String displayName;
	private String description;
	private List<Document> documents;
	private List<String> tags;

	public NameData() {
		super();
	}

	public NameData(NameData data) {
		this(data.getDisplayName(), data.getDescription(), data.getDocuments(), data.getTags());
	}

	public NameData(String displayName, String description, List<Document> documents, List<String> tags) {
		super();
		this.displayName = displayName;
		this.description = description;
		this.documents = new ArrayList<>(documents);
		this.tags = new ArrayList<>(tags);
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, displayName, documents, tags);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof NameData)) {
			return false;
		}
		NameData other = (NameData) obj;
		return Objects.equals(description, other.description) && Objects.equals(displayName, other.displayName)
				&& Objects.equals(documents, other.documents) && Objects.equals(tags, other.tags);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}
