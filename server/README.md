# Prototype of RCP-based Inscription Servers

This maven project contains two servers which may serve as a backend to the [web-based Inscription Editor](../client/README.md).

## Inscription Server

The Inscription server serves as the data source for the editor and provides a protocol to request and update data accordingly.

## Form Language Server

The form language server implements the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/) to ease the integration with a [Monaco editor](https://microsoft.github.io/monaco-editor/) on the client side.

## Build and Test

To build both servers and run the tests you can use the following command:

`mvn clean verify`

This command will build all necessary projects and create two full standalone server-jars for the [inscription server](inscription/com.axonivy.nextgen.inscription.server/target/) and the [language server](language-server/com.axonivy.nextgen.lsp.languageserver/target/).
