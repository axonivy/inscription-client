import {
  Collapsible as CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
  type CollapsibleControlProps,
  CollapsibleState,
  ButtonGroup,
  Flex
} from '@axonivy/ui-components';
import type { ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import type { MessageTextProps } from '../message/Message';
import type { FieldsetControl } from '../fieldset';
import type { Severity } from '@axonivy/inscription-protocol';

export type CollapsibleProps = MessageTextProps & {
  label: string;
  defaultOpen?: boolean;
  autoClosable?: boolean;
  children: ReactNode;
  controls?: FieldsetControl[];
};

const Controls = ({ controls, ...props }: Pick<CollapsibleProps, 'controls'> & CollapsibleControlProps) => {
  if (controls) {
    return (
      <ButtonGroup
        {...props}
        controls={controls.map(({ action, icon, label, active }) => ({ icon, title: label, onClick: action, toggle: active }))}
      />
    );
  }
  return null;
};

const State = ({ message }: Pick<MessageTextProps, 'message'>) => {
  if (message) {
    return <CollapsibleState messages={[{ message: message.message, variant: message.severity as Lowercase<Severity> }]} />;
  }
  return null;
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
    <CollapsibleRoot open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger control={props => <Controls {...props} controls={controls} />} state={<State message={message} />}>
        {label}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Flex direction='column' gap={3}>
          {children}
        </Flex>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};

export default memo(Collapsible);
