/* eslint-disable import/export */
import {
  ElementData,
  ConfigData,
  DEFAULT_DATA,
  CallableStart,
  ErrorMeta,
  InscriptionValidation,
  VariableInfo,
  RoleMeta,
  ConnectorRef,
  EventCodeMeta,
  InscriptionMetaRequestTypes,
  ScriptingDataArgs,
  DatabaseColumn,
  WebServiceClient,
  WebServiceOperation
} from '@axonivy/inscription-protocol';
import { queries, Queries, render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { deepmerge } from 'deepmerge-ts';
import { ReactElement, ReactNode, useRef } from 'react';
import { DeepPartial } from './type-utils';
import {
  ClientContext,
  ClientContextInstance,
  DataContext,
  DataContextInstance,
  DEFAULT_EDITOR_CONTEXT,
  EditorContextInstance
} from '../context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ContextHelperProps = {
  data?: DeepPartial<ElementData>;
  setData?: (data: ElementData) => void;
  defaultData?: DeepPartial<ConfigData>;
  initData?: DeepPartial<ElementData>;
  validations?: InscriptionValidation[];
  meta?: {
    roles?: RoleMeta[];
    expiryErrors?: ErrorMeta[];
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
          case 'meta/workflow/roles':
            return Promise.resolve(props.meta?.roles ?? []);
          case 'meta/workflow/expiryErrors':
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
                : { types: {}, variables: [] }
            );
          case 'meta/scripting/in':
            return Promise.resolve(props.meta?.inScripting ?? { types: {}, variables: [] });
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
  if (props.editor?.readonly) {
    editorContext.readonly = props.editor.readonly;
  }
  const editorRef = useRef(null);
  editorContext.editorRef = editorRef;
  const queryClient = new QueryClient();
  return (
    <div ref={editorRef}>
      <EditorContextInstance.Provider value={editorContext}>
        <ClientContextInstance.Provider value={client}>
          <QueryClientProvider client={queryClient}>
            <DataContextInstance.Provider value={data}>{props.children}</DataContextInstance.Provider>
          </QueryClientProvider>{' '}
        </ClientContextInstance.Provider>
      </EditorContextInstance.Provider>
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
