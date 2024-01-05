import { Collapsible as CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import type { ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import './Collapsible.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import type { MessageTextProps } from '../message/Message';
import { MessageText } from '../message/Message';
import type { FieldsetControl } from '../fieldset';
import HeadlineControls from '../headlineControls/HeadlineControls';

export type CollapsibleProps = MessageTextProps & {
  label: string;
  defaultOpen?: boolean;
  autoClosable?: boolean;
  children: ReactNode;
  controls?: FieldsetControl[];
};

const Collapsible = ({ label, defaultOpen, message, children, autoClosable, controls }: CollapsibleProps) => {
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
        {controls && open && <HeadlineControls controls={controls} />}
      </div>

      <CollapsibleContent className='collapsible-content'>
        <div className='collapsible-content-data'>{children}</div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default memo(Collapsible);
