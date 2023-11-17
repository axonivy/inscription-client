import type {
  InscriptionClient,
  InscriptionData,
  InscriptionSaveData,
  InscriptionType,
  InscriptionValidation,
  ElementType,
  ElementData,
  InscriptionActionArgs,
  InscriptionElementContext,
  InscriptionMetaRequestTypes,
  ScriptingDataArgs,
  Variable
} from '@axonivy/inscription-protocol';
import { DEFAULT_DATA } from '@axonivy/inscription-protocol';
import { Emitter } from 'vscode-jsonrpc';
import { deepmerge } from 'deepmerge-ts';
import { DataMock } from './data-mock';
import { ValidationMock } from './validation-mock';
import { MetaMock } from './meta-mock';
import { deepEqual } from '../../../../packages/editor/src/utils/equals';

export class InscriptionClientMock implements InscriptionClient {
  private elementData = {} as ElementData;
  constructor(readonly readonly = false, readonly type: ElementType = 'UserTask') {}

  protected onValidationEmitter = new Emitter<InscriptionValidation[]>();
  onValidation = this.onValidationEmitter.event;
  protected onDataChangedEmitter = new Emitter<InscriptionData>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  data(context: InscriptionElementContext): Promise<InscriptionData> {
    const inscriptionType: InscriptionType = {
      id: this.type,
      label: this.type,
      shortLabel: this.type,
      description: this.type,
      iconId: this.type
    };
    this.elementData = DataMock.mockForType(this.type) as ElementData;
    this.onValidationEmitter.fire(ValidationMock.validateData(this.type, { data: this.elementData, context }));
    return Promise.resolve({
      context,
      type: inscriptionType,
      readonly: this.readonly,
      data: deepmerge(DEFAULT_DATA, this.elementData),
      defaults: DEFAULT_DATA.config
    });
  }

  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]> {
    this.elementData = saveData.data;
    return Promise.resolve(ValidationMock.validateData(this.type, saveData));
  }

  validate(context: InscriptionElementContext): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData(this.type, { context, data: this.elementData }));
  }

  meta<TMeta extends keyof InscriptionMetaRequestTypes>(
    path: TMeta,
    args: InscriptionMetaRequestTypes[TMeta][0]
  ): Promise<InscriptionMetaRequestTypes[TMeta][1]> {
    switch (path) {
      case 'meta/start/dialogs':
      case 'meta/start/triggers':
      case 'meta/start/calls':
        return Promise.resolve(MetaMock.CALLABLE_STARTS);
      case 'meta/workflow/roleTree':
        return Promise.resolve(MetaMock.ROLES);
      case 'meta/workflow/errorStarts':
        return Promise.resolve(MetaMock.EXPIRY_ERRORS);
      case 'meta/workflow/errorCodes':
      case 'meta/workflow/signalCodes':
        return Promise.resolve([]);
      case 'meta/scripting/out':
        if ((args as ScriptingDataArgs).location === 'result') {
          let resultInfo = MetaMock.RESULT_VAR_INFO;
          if (this.elementData.config?.result?.params.length > 0) {
            const types = this.elementData.config.result.params.map<Variable>(param => {
              return { attribute: param.name, type: param.type, simpleType: param.type, description: param.desc };
            });
            if (!deepEqual(resultInfo.types, types)) {
              resultInfo = JSON.parse(JSON.stringify(resultInfo));
              resultInfo.types['<>'] = types;
            }
          }
          return Promise.resolve(resultInfo);
        }
        return Promise.resolve(MetaMock.OUT_VAR_INFO);
      case 'meta/scripting/in':
        return Promise.resolve(JSON.parse(JSON.stringify(MetaMock.IN_VAR_INFO)));
      case 'meta/connector/out':
        return Promise.resolve(MetaMock.CONNECTORS_OUT);
      case 'meta/cms/tree':
        return Promise.resolve(MetaMock.CMS_TYPE);
      case 'meta/scripting/dataClasses':
        return Promise.resolve(MetaMock.DATACLASS);
      case 'meta/scripting/allTypes':
        return Promise.resolve(MetaMock.DATATYPE);
      default:
        throw Error('mock meta path not programmed');
    }
  }

  action(action: InscriptionActionArgs): void {
    alert(`action: [actionId: ${action.actionId}, context: ${action.context}, payload: ${action.payload}]`);
  }
}
