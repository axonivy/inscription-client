package com.axonivy.nextgen.inscription.server.protocol.model;

import java.util.List;
import java.util.Objects;

import com.google.gson.Gson;

public class Mapping {
	private String attribute;
	private String type;
	private String expression;

	private List<Mapping> children;

	public Mapping(String attribute, String type, String expression, List<Mapping> children) {
		super();
		this.attribute = attribute;
		this.type = type;
		this.expression = expression;
		this.children = children;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public List<Mapping> getChildren() {
		return children;
	}

	public void setChildren(List<Mapping> children) {
		this.children = children;
	}

	@Override
	public int hashCode() {
		return Objects.hash(attribute, children, expression, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Mapping)) {
			return false;
		}
		Mapping other = (Mapping) obj;
		return Objects.equals(attribute, other.attribute) && Objects.equals(children, other.children)
				&& Objects.equals(expression, other.expression) && Objects.equals(type, other.type);
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
