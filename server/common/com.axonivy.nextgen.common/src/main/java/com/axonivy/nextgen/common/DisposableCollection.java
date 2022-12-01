package com.axonivy.nextgen.common;

import java.util.ArrayList;
import java.util.List;

public class DisposableCollection implements IDisposable {
	private boolean disposed;
	private final List<IDisposable> disposables = new ArrayList<>();

	public boolean isDisposed() {
		return disposed;
	}

	@Override
	public void dispose() {
		if (!disposed) {
			doDispose();
			disposed = true;
		}
	}

	public IDisposable addToDispose(final IDisposable disposable) {
		if (!isDisposed()) {
			this.disposables.add(disposable);
			return () -> this.disposables.remove(disposable);
		}
		return IDisposable.EMPTY;
	}

	protected void doDispose() {
		disposables.forEach(IDisposable::dispose);
	}

}
