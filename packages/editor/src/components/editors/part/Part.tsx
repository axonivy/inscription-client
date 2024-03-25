import './Part.css';
import { useState } from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionControlProps,
  AccordionState,
  Button,
  type MessageData
} from '@axonivy/ui-components';
import { ErrorBoundary } from 'react-error-boundary';
import type { PartProps } from './usePart';
import { ErrorFallback } from '../../widgets';

const UndoControl = ({ name, reset, ...props }: Pick<PartProps, 'name' | 'reset'> & AccordionControlProps) => {
  if (reset.dirty) {
    return <Button {...props} icon={IvyIcons.Undo} onClick={reset.action} title={`Reset ${name}`} />;
  }
  return null;
};

const State = ({ state }: Pick<PartProps, 'state'>) => {
  const messages = state.validations.map<MessageData>(({ message, severity }) => ({ message, variant: severity.toLocaleLowerCase() }));
  return <AccordionState messages={messages} state={state.state} />;
};

const Part = ({ parts }: { parts: PartProps[] }) => {
  const [value, setValue] = useState('');

  return (
    <Accordion type='single' collapsible value={value} onValueChange={setValue}>
      {parts.map(part => {
        return (
          <AccordionItem value={part.name} key={part.name}>
            <AccordionTrigger
              control={props => <UndoControl {...props} name={part.name} reset={part.reset} />}
              state={<State state={part.state} />}
            >
              {part.name}
            </AccordionTrigger>
            <AccordionContent>
              <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[part]}>
                {part.content}
              </ErrorBoundary>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Part;
