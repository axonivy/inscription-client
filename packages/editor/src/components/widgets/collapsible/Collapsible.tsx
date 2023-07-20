import { Collapsible as CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { memo, ReactNode, useState } from 'react';
import './Collapsible.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import { MessageText, MessageTextProps } from '../message/Message';

export type CollapsibleProps = MessageTextProps & { label: string; defaultOpen?: boolean; children: ReactNode };

const Collapsible = ({ label, defaultOpen, message, children }: CollapsibleProps) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <CollapsibleRoot className='collapsible-root' open={open} onOpenChange={setOpen}>
      <div className='collapsible-header'>
        <CollapsibleTrigger asChild className='collapsible-trigger button'>
          <button>
            <IvyIcon icon={IvyIcons.AngleDown} />
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
