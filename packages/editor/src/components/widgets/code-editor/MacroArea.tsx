import './ScriptArea.css';
import { Browser, useBrowser } from '../../../components/browser';
import { useMonacoEditor } from './useCodeEditor';
import { usePath } from '../../../context';
import { CardArea } from '../output/CardText';
import type { ElementRef } from 'react';
import { useRef } from 'react';
import { useOnFocus } from '../../../components/browser/useOnFocus';
import { useField } from '@axonivy/ui-components';
import MaximizedCodeEditorBrowser from '../../browser/MaximizedCodeEditorBrowser';
import { monacoAutoFocus, ResizableCodeEditor } from '@axonivy/monaco';
import { useContextPath } from './useContextPath';
import type { CodeEditorAreaProps } from './code-editor-props';

const MacroArea = ({ value, onChange, browsers, maximizeState, ...props }: CodeEditorAreaProps) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor, getSelectionRange } = useMonacoEditor({ modifyAction: value => `<%=${value}%>` });
  const path = usePath();
  const contextPath = useContextPath();
  const areaRef = useRef<ElementRef<'output'>>(null);
  const { inputProps } = useField();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-area' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open || maximizeState?.isMaximizedCodeEditorOpen ? (
        <>
          {maximizeState && (
            <MaximizedCodeEditorBrowser
              open={maximizeState.isMaximizedCodeEditorOpen}
              onOpenChange={maximizeState.setIsMaximizedCodeEditorOpen}
              browsers={browsers}
              editorValue={value}
              location={path}
              applyEditor={focusValue.onChange}
              selectionRange={getSelectionRange()}
              macro={true}
            />
          )}
          {!maximizeState?.isMaximizedCodeEditorOpen && (
            <>
              <ResizableCodeEditor
                {...focusValue}
                {...inputProps}
                {...props}
                contextPath={contextPath}
                onMountFuncs={[setEditor, monacoAutoFocus]}
                language='ivyMacro'
                initHeight={areaRef.current?.offsetHeight}
              />
              <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
            </>
          )}
        </>
      ) : (
        <CardArea value={value} {...inputProps} {...props} ref={areaRef} />
      )}
    </div>
  );
};

export default MacroArea;
