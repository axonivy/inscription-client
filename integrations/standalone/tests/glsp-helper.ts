import Client, { RequestManager, WebSocketTransport } from '@open-rpc/client-js';
import { v4 as uuid } from 'uuid';

const SELECT_KIND = 'elementSelected';
const SET_KIND = 'setModel';
const UPDATE_KIND = 'updateModel';

type Action<T = unknown> = {
  action: T;
};
type SelectAction = Action<{ selectedElementsIDs: string[] }>;
type SetModelAction = Action<{ newRoot: { id: string } }>;

export class GlspHelper {
  private readonly client: Client;
  private readonly glspProtocolVersion = '1.0.0';
  private readonly glspDiagramType = 'ivy-glsp-process';
  private readonly appId: string;
  private readonly processUri: string;
  private readonly sessionId: string;

  constructor() {
    const transport = new WebSocketTransport(`ws://${this.serverUrl()}/ivy-glsp-process`);
    this.client = new Client(new RequestManager([transport]));
    this.client.onError(error => console.error(error));
    this.appId = uuid();
    this.processUri = `/processes/${uuid()}`;
    this.sessionId = `${this.appId}_${this.processUri}`;
  }

  async initProcess() {
    let processId = '';
    this.client.onNotification(data => {
      if (this.isSetModelAction(data.params)) {
        processId = data.params.action.newRoot.id;
      }
    });
    await this.client.request({ method: 'initialize', params: { applicationId: this.appId, protocolVersion: this.glspProtocolVersion } });
    await this.client.request({
      method: 'initializeClientSession',
      params: {
        clientSessionId: this.sessionId,
        diagramType: this.glspDiagramType
      }
    });
    await this.client.notify({
      method: 'process',
      params: {
        clientId: this.sessionId,
        action: {
          kind: 'requestModel',
          requestId: '',
          options: {
            needsClientLayout: true,
            needsServerLayout: false,
            sourceUri: this.processUri,
            app: process.env.TEST_APP ?? 'designer',
            pmv: 'inscription-integration',
            pid: '',
            readonly: false,
            diagramType: this.glspDiagramType
          }
        }
      }
    });
    await this.untilTrue(() => processId.length > 0);
    return processId;
  }

  async createElement(processId: string, type: string, location = { x: 200, y: 64 }) {
    let elementId = '';
    this.client.onNotification(data => {
      if (this.isSelectAction(data.params)) {
        elementId = data.params.action.selectedElementsIDs[0];
      }
    });
    this.client.notify({
      method: 'process',
      params: {
        clientId: this.sessionId,
        action: { kind: 'createNode', isOperation: true, elementTypeId: type, location, containerId: processId }
      }
    });
    await this.untilTrue(() => elementId.length > 0);
    return elementId;
  }

  async attachBoundary(targetElementId: string, eventKind: 'error' | 'signal') {
    let elementId = '';
    this.client.onNotification(data => {
      if (this.isSelectAction(data.params)) {
        elementId = data.params.action.selectedElementsIDs[0];
      }
    });
    this.client.notify({
      method: 'process',
      params: {
        clientId: this.sessionId,
        action: { kind: 'attachBoundary', isOperation: true, elementId: targetElementId, eventKind }
      }
    });
    await this.untilTrue(() => elementId.length > 0);
    return elementId;
  }

  async connect(sourceElementId: string, targetElementId: string) {
    let connected = false;
    this.client.onNotification(data => {
      if (this.isUpdateModelAction(data.params)) {
        connected = true;
      }
    });
    this.client.notify({
      method: 'process',
      params: {
        clientId: this.sessionId,
        action: {
          kind: 'createEdge',
          isOperation: true,
          elementTypeId: 'edge',
          sourceElementId,
          targetElementId
        }
      }
    });
    await this.untilTrue(() => connected);
    return connected;
  }

  private async untilTrue(condition: () => boolean) {
    while (!condition()) {
      await new Promise(resolve => setTimeout(resolve, 10)); // Wait for 1 second
    }
    return Promise.resolve();
  }

  private isSelectAction(object: any): object is SelectAction {
    return 'action' in object && 'kind' in object.action && object.action.kind === SELECT_KIND;
  }

  private isSetModelAction(object: any): object is SetModelAction {
    return 'action' in object && 'kind' in object.action && object.action.kind === SET_KIND;
  }

  private isUpdateModelAction(object: any): object is Action {
    return 'action' in object && 'kind' in object.action && object.action.kind === UPDATE_KIND;
  }

  private serverUrl(): string {
    const app = process.env.TEST_APP ?? '';
    const server = process.env.BASE_URL ? process.env.BASE_URL + app : 'localhost:8081/designer';
    return server.replace(/^https?:\/\//, '');
  }
}
