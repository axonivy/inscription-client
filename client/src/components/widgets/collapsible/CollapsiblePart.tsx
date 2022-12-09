import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import './CollapsiblePart.css';

const CollapsiblePart = (props: { collapsibleLabel: string; defaultOpen: boolean; children: JSX.Element[] | JSX.Element }) => {
  const [open, setOpen] = useState(props.defaultOpen);
  return (
    <Collapsible className='collapsible-root' open={open} onOpenChange={setOpen}>
      <div>
        <CollapsibleTrigger asChild className='collapsible-trigger'>
          <button>
            {open ? '▼' : '►'} {props.collapsibleLabel}
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className='collapsible-content'>{props.children}</CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsiblePart;
