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
  Flex
} from '@axonivy/ui-components';
import { ErrorBoundary } from 'react-error-boundary';
import type { PartProps } from './usePart';
import { ErrorFallback } from '../../widgets';
import type { Severity } from '@axonivy/inscription-protocol';

const UndoControl = ({ name, reset, ...props }: Pick<PartProps, 'name' | 'reset'> & AccordionControlProps) => {
  if (reset.dirty) {
    return <Button {...props} icon={IvyIcons.Undo} onClick={reset.action} title={`Reset ${name}`} aria-label={`Reset ${name}`} />;
  }
  return null;
};

const State = ({ state }: Pick<PartProps, 'state'>) => {
  return (
    <AccordionState
      messages={state.validations.map(({ message, severity }) => ({
        message,
        variant: severity.toLocaleLowerCase() as Lowercase<Severity>
      }))}
      state={state.state}
    />
  );
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
                <Flex direction='column' gap={3}>
                  {part.content}
                </Flex>
              </ErrorBoundary>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Part;
