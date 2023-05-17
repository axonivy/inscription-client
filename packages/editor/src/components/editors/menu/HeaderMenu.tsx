import './HeaderMenu.css';
import { Root, Trigger, Portal, Content, Item, Arrow } from '@radix-ui/react-dropdown-menu';
import IvyIcon from '../../widgets/IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import { useDataContext, useEditorContext, useTheme } from '../../../context';
import { deepEqual } from '../../../utils/equals';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/widgets';

const DropdownMenu = () => {
  const { data, initData, setData } = useDataContext();
  const { mode, setMode } = useTheme();
  const { editorRef } = useEditorContext();
  const [editor, setEditor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEditor(editorRef.current);
  }, [editorRef]);

  return (
    <Root modal={false}>
      <Trigger asChild>
        <Button icon={IvyIcons.AllElements} aria-label='Menu' />
      </Trigger>

      <Portal container={editor}>
        <Content className='dropdown-menu-content' sideOffset={15}>
          <Item className='dropdown-menu-item' onSelect={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            <IvyIcon icon={IvyIcons.Darkmode} />
            {mode.charAt(0).toUpperCase() + mode.slice(1)} mode
          </Item>
          <Item className='dropdown-menu-item' disabled>
            <IvyIcon icon={IvyIcons.JumpOut} />
            Collapse All
          </Item>
          <Item className='dropdown-menu-item' onSelect={() => setData(() => initData)} disabled={deepEqual(data, initData)}>
            <IvyIcon icon={IvyIcons.Undo} />
            Undo All
          </Item>
          <Item className='dropdown-menu-item' disabled>
            <IvyIcon icon={IvyIcons.Information} />
            Help
          </Item>
          <Arrow className='dropdown-menu-arrow' />
        </Content>
      </Portal>
    </Root>
  );
};

export default DropdownMenu;
