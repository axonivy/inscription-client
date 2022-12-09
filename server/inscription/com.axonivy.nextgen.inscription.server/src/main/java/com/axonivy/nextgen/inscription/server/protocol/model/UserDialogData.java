package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class UserDialogData {
	private String displayName;
	private String description;
	private List<Document> documents;
	private List<String> tags;

	public UserDialogData() {
		super();
	}

	public UserDialogData(UserDialogData data) {
		this(data.getDisplayName(), data.getDescription(), data.getDocuments(), data.getTags());
	}

	public UserDialogData(String displayName, String description, List<Document> documents, List<String> tags) {
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
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((displayName == null) ? 0 : displayName.hashCode());
		result = prime * result + ((documents == null) ? 0 : documents.hashCode());
		result = prime * result + ((tags == null) ? 0 : tags.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDialogData other = (UserDialogData) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (displayName == null) {
			if (other.displayName != null)
				return false;
		} else if (!displayName.equals(other.displayName))
			return false;
		if (documents == null) {
			if (other.documents != null)
				return false;
		} else if (!documents.equals(other.documents))
			return false;
		if (tags == null) {
			if (other.tags != null)
				return false;
		} else if (!tags.equals(other.tags))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}
