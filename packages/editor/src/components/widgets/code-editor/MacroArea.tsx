import './ScriptArea.js';
import { Browser, useBrowser } from '../../../components/browser/index.js';
import type { CodeEditorAreaProps } from './ResizableCodeEditor.js';
import ResizableCodeEditor from './ResizableCodeEditor.js';
import { monacoAutoFocus, useModifyEditor } from './useCodeEditor.js';
import { usePath } from '../../../context/index.js';
import { CardArea } from '../output/CardText.js';
import type { ElementRef} from 'react';
import { useRef } from 'react';
import { useOnFocus } from '../../../components/browser/useOnFocus.js';

const MacroArea = ({ value, onChange, browsers, ...props }: CodeEditorAreaProps) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor({ modifyAction: value => `<%=${value}%>` });
  const path = usePath();
  const areaRef = useRef<ElementRef<'output'>>(null);

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-area' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <ResizableCodeEditor
            {...focusValue}
            {...props}
            location={path}
            onMountFuncs={[setEditor, monacoAutoFocus]}
            macro={true}
            initHeight={areaRef.current?.offsetHeight}
          />
          <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
        </>
      ) : (
        <CardArea value={value} {...props} ref={areaRef} />
      )}
    </div>
  );
};

export default MacroArea;
