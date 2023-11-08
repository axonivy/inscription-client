import { Disposable, Message, MessageConnection } from 'vscode-jsonrpc';
import { DisposableCollection } from 'vscode-ws-jsonrpc';

// eslint-disable-next-line no-shadow
export enum ClientState {
  /**
   * The client has been created.
   */
  Initial,
  /**
   * `Start` has been called on the client and the start process is still on-going.
   */
  Starting,
  /**
   * The client failed to complete the start process.
   */
  StartFailed,
  /**
   * The client was successfully started and is now running.
   */
  Running,
  /**
   * `Stop` has been called on the client and the stop process is still on-going.
   */
  Stopping,
  /**
   * The client stopped and disposed the server connection. Thus, action messages can no longer be sent.
   */
  Stopped,
  /**
   * An error was encountered while connecting to the server. No action messages can be sent.
   */
  ServerError
}

export interface RcpClient extends Disposable {
  readonly state: ClientState;
  start(): Promise<void>;
  stop(): Promise<void>;
}

export class BaseRcpClient implements RcpClient {
  protected toDispose = new DisposableCollection();
  protected _state: ClientState = ClientState.Initial;

  constructor(protected connection: MessageConnection) {}

  get state(): ClientState {
    return this._state;
  }

  async start(): Promise<void> {
    try {
      this._state = ClientState.Starting;
      this.setupConnection();
      this.connection.listen();
      this._state = ClientState.Running;
    } catch (error) {
      console.error(error);
      this._state = ClientState.StartFailed;
    }
  }

  async stop(): Promise<void> {
    this._state = ClientState.Stopping;
    try {
      this.connection.dispose();
    } catch (error) {
      console.error(error);
    }
    this._state = ClientState.Stopped;
    this.dispose();
  }

  dispose(): void {
    this.toDispose.dispose();
  }

  protected setupConnection(): void {
    this.connection.onError(data => this.handleConnectionError(data[0], data[1], data[2]));
    this.connection.onClose(() => this.handleConnectionClosed());
  }

  protected handleConnectionError(error: Error, message: Message | undefined, count: number | undefined): void {
    console.error('Connection to server is erroring. Shutting down server.', error, message, count);
    this.stop();
    this._state = ClientState.ServerError;
  }

  protected handleConnectionClosed(): void {
    if (this.state !== ClientState.Stopping && this.state !== ClientState.Stopped) {
      console.error('Connection to server got closed. Server will not be restarted.');
      this._state = ClientState.ServerError;
    }
  }

  protected isConnectionActive(): boolean {
    return this.state === ClientState.Running;
  }
}
