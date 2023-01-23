import { Collapsible as CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { memo, ReactNode, useState } from 'react';
import './CollapsiblePart.css';

const CollapsiblePart = (props: { collapsibleLabel: string; defaultOpen?: boolean; children: ReactNode }) => {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  return (
    <CollapsibleRoot className='collapsible-root' open={open} onOpenChange={setOpen}>
      <div>
        <CollapsibleTrigger asChild className='collapsible-trigger'>
          <button>
            {open ? '▼' : '►'} {props.collapsibleLabel}
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className='collapsible-content'>{props.children}</CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default memo(CollapsiblePart);
