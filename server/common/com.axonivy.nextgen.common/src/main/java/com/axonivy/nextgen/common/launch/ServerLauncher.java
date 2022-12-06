package com.axonivy.nextgen.common.launch;

import com.axonivy.nextgen.common.IDisposable;

public interface ServerLauncher extends IDisposable {
	String getName();

	void start(final String hostname, final int port);
}
