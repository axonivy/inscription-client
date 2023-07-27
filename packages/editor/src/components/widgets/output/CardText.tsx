import './CardText.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import { splitMacroExpressions, splitNewLine } from '../../../utils/utils';
import { FieldsetInputProps } from '../fieldset';
import { ElementRef, forwardRef } from 'react';

export type CardTextProps = Partial<FieldsetInputProps> & {
  value?: string;
};

const Card = ({ part }: { part: string }) => {
  const text = part.substring(3, part.length - 2).trim();
  return (
    <span className='card'>
      <span className='card-icon'>
        <IvyIcon icon={IvyIcons.Program} />
      </span>
      {text}
    </span>
  );
};

const CardOrText = ({ part }: { part: string }) => {
  if (part.startsWith('<%=')) {
    return <Card part={part} />;
  }
  return <span className='text'>{part}</span>;
};

const CardLine = ({ parts }: { parts: string[] }) => (
  <>
    {parts.map((part, index) => (
      <CardOrText key={index} part={part} />
    ))}
  </>
);

export const CardText = ({ value, ...props }: CardTextProps) => {
  const parts = splitMacroExpressions(value ?? '');
  return (
    <output className='card-text' {...props}>
      <CardLine parts={parts} />
    </output>
  );
};

export const CardArea = forwardRef<ElementRef<'output'>, CardTextProps>(({ value, ...props }, forwardRef) => {
  const lines = splitNewLine(value ?? '').map(line => splitMacroExpressions(line));
  return (
    <output className='card-text' {...props} ref={forwardRef}>
      {lines.map((line, index) => (
        <div key={index} className='card-text-line' role='row'>
          <CardLine parts={line} />
        </div>
      ))}
    </output>
  );
});
