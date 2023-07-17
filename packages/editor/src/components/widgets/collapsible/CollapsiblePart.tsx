import { Collapsible as CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { memo, ReactNode, useState } from 'react';
import './CollapsiblePart.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';

export type CollapsiblePartProps = { collapsibleLabel: string; defaultOpen?: boolean; children: ReactNode };

const CollapsiblePart = ({ collapsibleLabel, defaultOpen, children }: CollapsiblePartProps) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <CollapsibleRoot className='collapsible-root' open={open} onOpenChange={setOpen}>
      <div>
        <CollapsibleTrigger asChild className='collapsible-trigger button'>
          <button>
            <IvyIcon icon={IvyIcons.AngleDown} />
            {collapsibleLabel}
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className='collapsible-content'>
        <div className='collapsible-content-data'>{children}</div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default memo(CollapsiblePart);
