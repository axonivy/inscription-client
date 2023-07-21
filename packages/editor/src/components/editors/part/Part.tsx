import './Part.css';
import { useState } from 'react';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, ErrorFallback } from '../../../components/widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { ErrorBoundary } from 'react-error-boundary';
import { PartProps } from './usePart';

const Part = ({ part }: { part: PartProps }) => {
  const summaryItem = `${part.name}Summary`;
  const [value, setValue] = useState(summaryItem);

  return (
    <AccordionRoot value={value} onChange={newValue => setValue(newValue === '' ? summaryItem : newValue)}>
      <AccordionItem value={part.name}>
        <AccordionHeader
          control={part.reset.dirty ? { icon: IvyIcons.Undo, label: `Reset ${part.name}`, action: part.reset.action } : undefined}
          title={part.state.validations.map(val => val.message).join('\n')}
        >
          <span className='accordion-state' data-state={part.state.state} data-dirty={part.reset.dirty} />
          {part.name}
        </AccordionHeader>
        <AccordionContent>
          <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[part]}>
            {part.content}
          </ErrorBoundary>
        </AccordionContent>
      </AccordionItem>
      {part.summary && (
        <AccordionItem value={summaryItem}>
          <AccordionContent className='accordion-summary-data' onClick={() => setValue(part.name)}>
            {part.summary}
          </AccordionContent>
        </AccordionItem>
      )}
    </AccordionRoot>
  );
};

export default Part;
