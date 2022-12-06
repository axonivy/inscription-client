package com.axonivy.nextgen.common;

public interface IDisposable {
	static IDisposable EMPTY = () -> {
	};

	void dispose();

	static void disposeIfExists(final Object obj) {
		if (obj instanceof IDisposable disposable) {
			disposable.dispose();
		}
	}
}
