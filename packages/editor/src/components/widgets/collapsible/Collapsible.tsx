import { Collapsible as CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import type { ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import './Collapsible.js';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon.js';
import type { MessageTextProps } from '../message/Message.js';
import { MessageText } from '../message/Message.js';

export type CollapsibleProps = MessageTextProps & { label: string; defaultOpen?: boolean; autoClosable?: boolean; children: ReactNode };

const Collapsible = ({ label, defaultOpen, message, children, autoClosable }: CollapsibleProps) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  useEffect(() => {
    if (autoClosable) {
      setOpen(!!defaultOpen);
    } else {
      if (defaultOpen) {
        setOpen(defaultOpen);
      }
    }
  }, [autoClosable, defaultOpen]);
  return (
    <CollapsibleRoot className='collapsible-root' open={open} onOpenChange={setOpen}>
      <div className='collapsible-header'>
        <CollapsibleTrigger asChild className='collapsible-trigger button'>
          <button>
            <IvyIcon icon={IvyIcons.Toggle} />
            {label}
          </button>
        </CollapsibleTrigger>
        {!open && <MessageText message={message} />}
      </div>

      <CollapsibleContent className='collapsible-content'>
        <div className='collapsible-content-data'>{children}</div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default memo(Collapsible);
