import React, { useState } from 'react';
import { useKeyboard } from 'react-aria';
import * as Popover from '@radix-ui/react-popover';
import LabelInput from './LabelInput';
import './Tags.css';

const Tags = (props: { tags: string[]; onChange: (tags: string[]) => void }) => {
  const handleRemoveTag = (removeTag: string) => {
    props.onChange(props.tags.filter(tag => tag !== removeTag));
  };
  const [newTag, setNewTag] = useState('');
  const [isOpen, setOpen] = useState(false);
  const handleAddPopoverChange = (open: boolean) => {
    setOpen(open);
    if (!open && newTag.length > 0) {
      props.tags.push(newTag);
      props.onChange(props.tags);
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

  return (
    <div className='tags'>
      {props.tags.map((tag, index) => (
        <div key={`${tag}-${index}`} className='tag'>
          <button className='tag-remove' onClick={() => handleRemoveTag(tag)} aria-label={`Remove Tag ${tag}`} {...keyboardProps}>
            X
          </button>
          <span>{tag}</span>
        </div>
      ))}
      <Popover.Root open={isOpen} onOpenChange={handleAddPopoverChange}>
        <Popover.Trigger asChild>
          <button className='tag-add' aria-label='Add mew tag'>
            <span className='tag-add-plus'>+</span>
            <span>Add</span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className='popover-content' sideOffset={5}>
            <LabelInput label='New Tag' htmlFor='tag-input'>
              <input className='input' id='tag-input' value={newTag} onChange={e => setNewTag(e.target.value)} {...keyboardProps} />
            </LabelInput>
            <Popover.Close className='popover-close' aria-label='Close'>
              X
            </Popover.Close>
            <Popover.Arrow className='popover-arrow' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default Tags;
