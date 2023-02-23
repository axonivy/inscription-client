import { Data, DEFAULT_DATA, DialogStart, ExpiryError, InscriptionValidation, MappingInfo, Role } from '@axonivy/inscription-protocol';
import { queries, Queries, render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { deepmerge } from 'deepmerge-ts';
import { ReactElement, ReactNode } from 'react';
import {
  ClientContext,
  ClientContextInstance,
  DataContext,
  DataContextInstance,
  DEFAULT_EDITOR_CONTEXT,
  EditorContextInstance
} from '../context';

type ContextHelperProps = {
  data?: Data;
  validation?: InscriptionValidation[];
  meta?: { roles?: Role[]; expiryErrors?: ExpiryError[]; dialogStarts?: DialogStart[]; outMapping?: MappingInfo };
  editor?: { title?: string; readonly?: boolean };
};

const ContextHelper = (
  props: ContextHelperProps & {
    children: ReactNode;
  }
) => {
  const data: DataContext = {
    data: props.data ? deepmerge(DEFAULT_DATA, props.data) : DEFAULT_DATA,
    setData: () => {},
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
      outMapping() {
        return Promise.resolve(props.meta?.outMapping ?? { types: {}, variables: [] });
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