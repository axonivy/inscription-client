/* eslint-disable import/export */
import type {
  ElementData,
  ConfigData,
  CallableStart,
  ErrorStartMeta,
  InscriptionValidation,
  VariableInfo,
  RoleMeta,
  ConnectorRef,
  EventCodeMeta,
  InscriptionMetaRequestTypes,
  ScriptingDataArgs,
  DatabaseColumn,
  WebServiceClient,
  WebServiceOperation,
  RestClient,
  RestResource,
  RestClientRequest,
  Widget,
  ProgramInterface,
  ContentObject,
  JavaType,
  DataClass
} from '@axonivy/inscription-protocol';
import { DEFAULT_DATA, EMPTY_ROLE, EMPTY_VAR_INFO } from '@axonivy/inscription-protocol';
import { ReadonlyProvider } from '@axonivy/ui-components';
import type { queries, Queries, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { render, renderHook } from '@testing-library/react';
import { deepmerge } from 'deepmerge-ts';
import type { ReactElement, ReactNode } from 'react';
import { useRef } from 'react';
import type { DeepPartial } from './type-utils';
import type { ClientContext, DataContext } from '../context';
import {
  ClientContextProvider,
  DataContextInstance,
  DEFAULT_EDITOR_CONTEXT,
  EditorContextInstance,
  OpenApiContextProvider
} from '../context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ContextHelperProps = {
  data?: DeepPartial<ElementData>;
  setData?: (data: ElementData) => void;
  defaultData?: DeepPartial<ConfigData>;
  initData?: DeepPartial<ElementData>;
  validations?: InscriptionValidation[];
  meta?: {
    roleTree?: RoleMeta;
    taskRoles?: RoleMeta[];
    expiryErrors?: ErrorStartMeta[];
    callableStarts?: CallableStart[];
    eventCodes?: EventCodeMeta[];
    outScripting?: VariableInfo;
    inScripting?: VariableInfo;
    connectors?: DeepPartial<ConnectorRef[]>;
    databases?: string[];
    tables?: string[];
    columns?: DatabaseColumn[];
    wsClients?: WebServiceClient[];
    wsPorts?: string[];
    wsOperations?: WebServiceOperation[];
    wsProperties?: string[];
    restClients?: RestClient[];
    restClientUri?: string;
    restHeaders?: string[];
    restContentTypes?: string[];
    restResource?: DeepPartial<RestResource>;
    restResources?: DeepPartial<RestResource[]>;
    restProperties?: string[];
    restEntityTypes?: string[];
    restEntityInfo?: VariableInfo;
    javaClasses?: ProgramInterface[];
    widgets?: Widget[];
    contentObject?: ContentObject[];
    datatypes?: JavaType[];
    ivyTypes?: JavaType[];
    dataClasses?: DataClass[];
    tags?: string[];
  };
  editor?: { title?: string; readonly?: boolean };
};

const ContextHelper = (
  props: ContextHelperProps & {
    children: ReactNode;
  }
) => {
  const d = props.data ? deepmerge(DEFAULT_DATA, props.data) : DEFAULT_DATA;
  const data: DataContext = {
    // @ts-ignore
    data: props.data ? deepmerge(DEFAULT_DATA, props.data) : DEFAULT_DATA,
    // @ts-ignore
    setData: props.setData ? getData => props.setData(getData(d)) : () => {},
    // @ts-ignore
    defaultData: props.defaultData ? deepmerge(DEFAULT_DATA.config, props.defaultData) : DEFAULT_DATA.config,
    // @ts-ignore
    initData: props.initData ? deepmerge(DEFAULT_DATA, props.initData) : DEFAULT_DATA,
    validations: props.validations ?? []
  };
  const client: ClientContext = {
    // @ts-ignore
    client: {
      meta<TMeta extends keyof InscriptionMetaRequestTypes>(
        path: TMeta,
        args: InscriptionMetaRequestTypes[TMeta][0]
      ): Promise<InscriptionMetaRequestTypes[TMeta][1]> {
        switch (path) {
          case 'meta/start/dialogs':
          case 'meta/start/triggers':
          case 'meta/start/calls':
            return Promise.resolve(props.meta?.callableStarts ?? []);
          case 'meta/workflow/roleTree':
            return Promise.resolve(props.meta?.roleTree ?? EMPTY_ROLE);
          case 'meta/workflow/taskRoles':
            return Promise.resolve(props.meta?.taskRoles ?? []);
          case 'meta/workflow/errorStarts':
            return Promise.resolve(props.meta?.expiryErrors ?? []);
          case 'meta/workflow/errorCodes':
          case 'meta/workflow/signalCodes':
            return Promise.resolve(props.meta?.eventCodes ?? []);
          case 'meta/scripting/out':
            if (props.meta?.outScripting) {
              return Promise.resolve(props.meta.outScripting);
            }
            return Promise.resolve(
              (args as ScriptingDataArgs).location === 'result'
                ? { types: {}, variables: [{ attribute: 'result', description: '', type: '<>', simpleType: '<>' }] }
                : EMPTY_VAR_INFO
            );
          case 'meta/scripting/in':
            return Promise.resolve(props.meta?.inScripting ?? EMPTY_VAR_INFO);
          case 'meta/connector/out':
            return Promise.resolve(props.meta?.connectors ? (props.meta.connectors as ConnectorRef[]) : []);
          case 'meta/database/names':
            return Promise.resolve(props.meta?.databases ?? []);
          case 'meta/database/tables':
            return Promise.resolve(props.meta?.tables ?? []);
          case 'meta/database/columns':
            return Promise.resolve(props.meta?.columns ?? []);
          case 'meta/webservice/clients':
            return Promise.resolve(props.meta?.wsClients ?? []);
          case 'meta/webservice/ports':
            return Promise.resolve(props.meta?.wsPorts ?? []);
          case 'meta/webservice/operations':
            return Promise.resolve(props.meta?.wsOperations ?? []);
          case 'meta/webservice/properties':
            return Promise.resolve(props.meta?.wsProperties ?? []);
          case 'meta/rest/clients':
            return Promise.resolve(props.meta?.restClients ?? []);
          case 'meta/rest/clientUri':
            return Promise.resolve(props.meta?.restClientUri ?? '');
          case 'meta/rest/headers':
            return Promise.resolve(props.meta?.restHeaders ?? []);
          case 'meta/rest/contentTypes':
            return Promise.resolve(props.meta?.restContentTypes ?? []);
          case 'meta/rest/resource':
            return Promise.resolve((props.meta?.restResource ?? {}) as RestResource);
          case 'meta/rest/resources':
            return (args as RestClientRequest).clientId !== ''
              ? Promise.resolve((props.meta?.restResources ?? []) as RestResource[])
              : Promise.resolve([]);
          case 'meta/rest/properties':
            return Promise.resolve(props.meta?.restProperties ?? []);
          case 'meta/rest/entityTypes':
          case 'meta/rest/resultTypes':
            return Promise.resolve(props.meta?.restEntityTypes ?? []);
          case 'meta/rest/entityInfo':
            return Promise.resolve(props.meta?.restEntityInfo ?? EMPTY_VAR_INFO);
          case 'meta/program/types':
            return Promise.resolve(props.meta?.javaClasses ?? []);
          case 'meta/program/editor':
            return Promise.resolve(props.meta?.widgets ?? []);
          case 'meta/cms/tree':
            return Promise.resolve(props.meta?.contentObject ?? []);
          case 'meta/scripting/ivyTypes':
            return Promise.resolve(props.meta?.ivyTypes ?? []);
          case 'meta/scripting/dataClasses':
            return Promise.resolve(props.meta?.dataClasses ?? []);
          case 'meta/workflow/tags':
            return Promise.resolve(props.meta?.tags ?? []);
          default:
            throw Error('mock meta path not programmed');
        }
      }
    }
  };
  const editorContext = DEFAULT_EDITOR_CONTEXT;
  if (props.editor?.title) {
    editorContext.type.shortLabel = props.editor.title;
  }
  const editorRef = useRef(null);
  editorContext.editorRef = editorRef;
  const queryClient = new QueryClient();
  return (
    <div ref={editorRef}>
      <ReadonlyProvider readonly={props.editor?.readonly ?? false}>
        <EditorContextInstance.Provider value={editorContext}>
          <ClientContextProvider client={client.client}>
            <QueryClientProvider client={queryClient}>
              <DataContextInstance.Provider value={data}>
                <OpenApiContextProvider>{props.children}</OpenApiContextProvider>
              </DataContextInstance.Provider>
            </QueryClientProvider>
          </ClientContextProvider>
        </EditorContextInstance.Provider>
      </ReadonlyProvider>
    </div>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & { wrapperProps: ContextHelperProps }) =>
  render(ui, { wrapper: props => <ContextHelper {...props} {...options?.wrapperProps} />, ...options });

const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement> & { wrapperProps: ContextHelperProps }
) => renderHook(render, { wrapper: props => <ContextHelper {...props} {...options?.wrapperProps} />, ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { customRenderHook as renderHook };
export * from './table-utils';
export * from './select-utils';
export * from './combobox-utils';
export * from './collapsible-utils';
export * from './object-utils';
export * from './type-utils';
