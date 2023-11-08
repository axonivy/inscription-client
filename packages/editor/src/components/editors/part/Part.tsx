import './Part.css';
import { useState } from 'react';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, ErrorFallback } from '../../../components/widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { ErrorBoundary } from 'react-error-boundary';
import { PartProps } from './usePart';

const Part = ({ parts }: { parts: PartProps[] }) => {
  const [value, setValue] = useState('k');

  return (
    <AccordionRoot value={value} onChange={newValue => setValue(newValue)}>
      {parts.map((part, index) => (
        <AccordionItem value={part.name} key={`${index}-${part.name}`}>
          <AccordionHeader
            control={part.reset.dirty ? { icon: IvyIcons.Undo, label: `Reset ${part.name}`, action: part.reset.action } : undefined}
            title={part.state.validations.map(val => val.message).join('\n')}
            isOpen={part.name === value}
          >
            <div className='part-header-left'>{part.name}</div>
            <div className='part-header-right'>
              <span className='accordion-state' data-state={part.state.state} data-dirty={part.reset.dirty} />
            </div>
          </AccordionHeader>
          <AccordionContent>
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[part]}>
              {part.content}
            </ErrorBoundary>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default Part;
