package com.axonivy.nextgen.inscription.server.protocol.model;

import com.google.gson.Gson;

public class UserDialog {
	private String displayName;
	private String description;

	private String dialog;
	private String start;

	private DataMapping root;

	public UserDialog() {
		super();
	}

	public UserDialog(String displayName, String description, String dialog, String start, DataMapping root) {
		super();
		this.displayName = displayName;
		this.description = description;
		this.dialog = dialog;
		this.start = start;
		this.root = root;
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

	public DataMapping getRoot() {
		return root;
	}

	public void setRoot(DataMapping root) {
		this.root = root;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((dialog == null) ? 0 : dialog.hashCode());
		result = prime * result + ((displayName == null) ? 0 : displayName.hashCode());
		result = prime * result + ((root == null) ? 0 : root.hashCode());
		result = prime * result + ((start == null) ? 0 : start.hashCode());
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
		UserDialog other = (UserDialog) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (dialog == null) {
			if (other.dialog != null)
				return false;
		} else if (!dialog.equals(other.dialog))
			return false;
		if (displayName == null) {
			if (other.displayName != null)
				return false;
		} else if (!displayName.equals(other.displayName))
			return false;
		if (root == null) {
			if (other.root != null)
				return false;
		} else if (!root.equals(other.root))
			return false;
		if (start == null) {
			if (other.start != null)
				return false;
		} else if (!start.equals(other.start))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}
