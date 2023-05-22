import {
  ElementData,
  ConfigData,
  DEFAULT_DATA,
  CallableStart,
  ErrorMeta,
  InscriptionValidation,
  MappingInfo,
  RoleMeta,
  ConnectorRef
} from '@axonivy/inscription-protocol';
import { queries, Queries, render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { deepmerge } from 'deepmerge-ts';
import { ReactElement, ReactNode } from 'react';
import { DeepPartial } from './type-util';
import {
  ClientContext,
  ClientContextInstance,
  DataContext,
  DataContextInstance,
  DEFAULT_EDITOR_CONTEXT,
  EditorContextInstance
} from '../context';
import { PID } from '../utils/pid';

type ContextHelperProps = {
  data?: DeepPartial<ElementData>;
  defaultData?: DeepPartial<ConfigData>;
  validation?: InscriptionValidation[];
  meta?: {
    roles?: RoleMeta[];
    expiryErrors?: ErrorMeta[];
    dialogStarts?: CallableStart[];
    triggerStarts?: CallableStart[];
    callSubStarts?: CallableStart[];
    outMapping?: MappingInfo;
    connectorOf?: Record<string, DeepPartial<ConnectorRef>>;
  };
  editor?: { title?: string; readonly?: boolean };
};

const ContextHelper = (
  props: ContextHelperProps & {
    children: ReactNode;
  }
) => {
  const data: DataContext = {
    // @ts-ignore
    data: props.data ? deepmerge(DEFAULT_DATA, props.data) : DEFAULT_DATA,
    setData: () => {},
    // @ts-ignore
    defaultData: props.defaultData ? deepmerge(DEFAULT_DATA.config, props.defaultData) : DEFAULT_DATA.config,
    // @ts-ignore
    initData: props.data ? deepmerge(DEFAULT_DATA, props.data) : DEFAULT_DATA,
    validation: props.validation ?? []
  };
  const client: ClientContext = {
    // @ts-ignore
    client: {
      roles() {
        return Promise.resolve(props.meta?.roles ?? []);
      },
      expiryErrors() {
        return Promise.resolve(props.meta?.expiryErrors ?? []);
      },
      dialogStarts() {
        return Promise.resolve(props.meta?.dialogStarts ?? []);
      },
      triggerStarts() {
        return Promise.resolve(props.meta?.triggerStarts ?? []);
      },
      callSubStarts() {
        return Promise.resolve(props.meta?.callSubStarts ?? []);
      },
      outMapping() {
        return Promise.resolve(props.meta?.outMapping ?? { types: {}, variables: [] });
      },
      // @ts-ignore
      connectorOf(pid: string) {
        const connectorPid = PID.fieldId(pid);
        return Promise.resolve(props.meta?.connectorOf ? props.meta.connectorOf[connectorPid] : undefined);
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
  return (
    <EditorContextInstance.Provider value={editorContext}>
      <ClientContextInstance.Provider value={client}>
        <DataContextInstance.Provider value={data}>{props.children}</DataContextInstance.Provider>
      </ClientContextInstance.Provider>
    </EditorContextInstance.Provider>
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
export * from './collapsible-util';
export * from './object-util';
export * from './type-util';
