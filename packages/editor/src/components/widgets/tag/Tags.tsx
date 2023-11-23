import './Tags.css';
import '../popover/Popover.css';
import * as Popover from '@radix-ui/react-popover';
import { memo, useState } from 'react';
import { useKeyboard } from 'react-aria';
import { useEditorContext } from '../../../context';
import IvyIcon from '../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../fieldset';
import { Input } from '../input';

const Tags = (props: { tags: string[]; onChange: (tags: string[]) => void }) => {
  const [newTag, setNewTag] = useState('');
  const [isOpen, setOpen] = useState(false);

  const handleRemoveTag = (removeTag: string) => {
    const newTags = props.tags.filter(tag => tag !== removeTag);
    props.onChange(newTags);
  };
  const handleAddPopoverChange = (open: boolean) => {
    setOpen(open);
    if (!open && newTag.length > 0) {
      const newTags = [...props.tags, newTag];
      props.onChange(newTags);
    }
    setNewTag('');
  };
  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      if (e.key === 'Delete' && e.target instanceof HTMLButtonElement) {
        e.target.click();
      }
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
        handleAddPopoverChange(false);
      }
    }
  });

  const editorContext = useEditorContext();
  const tagFieldset = useFieldset();

  return (
    <div className='tags'>
      {props.tags.map((tag, index) => (
        <div key={`${tag}-${index}`} className='tag' role='gridcell'>
          <button
            className='tag-remove'
            onClick={() => handleRemoveTag(tag)}
            aria-label={`Remove Tag ${tag}`}
            {...keyboardProps}
            disabled={editorContext.readonly}
          >
            <IvyIcon icon={IvyIcons.Close} />
          </button>
          <span>{tag}</span>
        </div>
      ))}
      <Popover.Root open={isOpen} onOpenChange={handleAddPopoverChange}>
        <Popover.Trigger asChild>
          <button className='tag tag-add' aria-label='Add new tag' disabled={editorContext.readonly}>
            <IvyIcon icon={IvyIcons.Plus} />
            <span>Add</span>
          </button>
        </Popover.Trigger>
        <Popover.Portal container={editorContext.editorRef.current}>
          <Popover.Content className='popover-content' sideOffset={5}>
            <Fieldset label='New Tag' {...tagFieldset.labelProps}>
              <Input value={newTag} {...keyboardProps} onChange={change => setNewTag(change)} {...tagFieldset.inputProps} />
            </Fieldset>
            <Popover.Close className='popover-close' aria-label='Close'>
              <IvyIcon icon={IvyIcons.Close} />
            </Popover.Close>
            <Popover.Arrow className='popover-arrow' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default memo(Tags);
