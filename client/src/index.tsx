import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormLanguage } from "./client/form-client";
import { InscriptionClient } from "./client/inscription-client";
import { MonacoUtil } from "./client/monaco-util";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { ClientContextInstance } from "./useClient";

export async function start(): Promise<void> {
  MonacoUtil.initStandalone();
  MonacoUtil.registerThemes();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  try {
    await FormLanguage.startWebSocketClient('ws://localhost:5013');

    const inscriptionClient = await InscriptionClient.startWebSocketClient('ws://localhost:5015');
    console.log(await inscriptionClient.initialize());

    root.render(
      <React.StrictMode>
        <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
          <App />
        </ClientContextInstance.Provider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<div>{error as string}</div>)
  }



  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

start();
