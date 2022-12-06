package com.axonivy.nextgen.common;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import org.eclipse.lsp4j.jsonrpc.Endpoint;
import org.eclipse.lsp4j.jsonrpc.messages.Tuple;
import org.junit.Assert;

public class AssertingEndpoint implements Endpoint {
	private static long POLL_FREQUENCY = TimeUnit.MILLISECONDS.toMillis(100);
	private static long CONDITIONAL_WAIT = TimeUnit.SECONDS.toMillis(2);

	public Map<String, Tuple.Two<Object, Object>> expectedRequests = new LinkedHashMap<>();
	public Map<String, Object> expectedNotifications = new LinkedHashMap<>();

	public void expectNotification(String method, Object parameter) {
		expectedNotifications.put(method, parameter);
	}
	
	public void expectRequest(String method, Object parameter, Object result) {
		expectedRequests.put(method, Tuple.two(parameter, result));
	}
	
	@Override
	public CompletableFuture<?> request(String method, Object parameter) {
		Assert.assertTrue(expectedRequests.containsKey(method));
		Tuple.Two<Object, Object> result = expectedRequests.remove(method);
		Assert.assertEquals(result.getFirst().toString(), parameter.toString());
		return CompletableFuture.completedFuture(result.getSecond());
	}

	@Override
	public void notify(String method, Object parameter) {
		Assert.assertTrue(expectedNotifications.containsKey(method));
		Object object = expectedNotifications.get(method);
		if (Objects.equals(object.toString(), parameter.toString())) {
			expectedNotifications.remove(method);
		}
	}

	public void assertExpectations() {
		long before = System.currentTimeMillis();
		long end = before + CONDITIONAL_WAIT;
		do {
			if (expectedNotifications.isEmpty() && expectedNotifications.isEmpty()) {
				return;
			}
			try {
				Thread.sleep(POLL_FREQUENCY);
			} catch (InterruptedException exception) {
				exception.printStackTrace();
			}
		} while (System.currentTimeMillis() < end);
		Assert.fail("expectations weren't empty " + toString());
	}

}