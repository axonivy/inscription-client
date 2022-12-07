package com.axonivy.nextgen.inscription.server;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.junit.Test;

import com.axonivy.nextgen.common.ServerTest;
import com.axonivy.nextgen.inscription.server.protocol.DefaultInscriptionServer;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionClient;
import com.axonivy.nextgen.inscription.server.protocol.InscriptionServer;
import com.axonivy.nextgen.inscription.server.protocol.UserDialogParams;
import com.axonivy.nextgen.inscription.server.protocol.model.Document;
import com.axonivy.nextgen.inscription.server.protocol.model.UserDialogData;

public class DefaultInscriptionServerTest
		extends ServerTest<InscriptionClient, InscriptionServer, DefaultInscriptionServer> {

	public DefaultInscriptionServerTest() {
		super(InscriptionClient.class, InscriptionServer.class, new DefaultInscriptionServer());
	}

	@Test
	public void testInitialize() throws Exception {
		Boolean success = serverProxy.initialize().get(1, TimeUnit.MINUTES);
		Assert.assertTrue(success);
	}

	@Test
	public void testUserDialogEven() throws Exception {
		UserDialogParams params = new UserDialogParams(2);
		UserDialogData expectedDialog = new UserDialogData("Even Name", "Description",
				List.of(new Document("Doc 1", "axonivy.com"), new Document("ivyTeam ❤️", "ivyteam.ch")),
				List.of("bla", "zag"));
		UserDialogData returnedDialog = serverProxy.userDialog(params).get(1, TimeUnit.MINUTES);
		Assert.assertEquals(expectedDialog, returnedDialog);
	}

	@Test
	public void testUserDialogOdd() throws Exception {
		UserDialogParams params = new UserDialogParams(1);
		UserDialogData expectedDialog = new UserDialogData("Odd Name", "Description",
				List.of(new Document("Doc 1", "axonivy.com"), new Document("ivyTeam ❤️", "ivyteam.ch")),
				List.of("bla", "zag"));
		UserDialogData returnedDialog = serverProxy.userDialog(params).get(1, TimeUnit.MINUTES);
		Assert.assertEquals(expectedDialog, returnedDialog);
	}
}
