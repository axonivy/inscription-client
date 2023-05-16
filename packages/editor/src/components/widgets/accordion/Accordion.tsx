import './Accordion.css';
import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { PartProps } from '../../props';
import IvyIcon from '../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../error/ErrorFallback';
import { useState } from 'react';

export const Accordion = ({ part }: { part: PartProps }) => {
  const summaryItem = `${part.name}Summary`;
  const [value, setValue] = useState(summaryItem);

  return (
    <Root
      type='single'
      className='accordion-root'
      collapsible={true}
      value={value}
      onValueChange={newValue => setValue(newValue === '' ? summaryItem : newValue)}
    >
      <Item value={part.name} className='accordion-item'>
        <Header className='accordion-header'>
          <Trigger className='accordion-trigger'>
            <span className='accordion-state' data-state={part.state} data-dirty={part.reset?.dirty ?? 'false'} />
            {part.name}
          </Trigger>
          <div className='accordion-header-group'>
            {part.reset?.dirty && <Button icon={IvyIcons.Undo} onClick={part.reset.action} aria-label={`Reset ${part.name}`} />}
            <IvyIcon icon={IvyIcons.AngleDown} />
          </div>
        </Header>
        <Content className='accordion-content'>
          <div className='accordion-content-data'>
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[part]}>
              {part.content}
            </ErrorBoundary>
          </div>
        </Content>
      </Item>
      {part.summary && (
        <Item value={summaryItem} className='accordion-item' onClick={() => setValue(part.name)}>
          <Content className='accordion-content'>
            <div className='accordion-content-data accordion-summary-data'>{part.summary}</div>
          </Content>
        </Item>
      )}
    </Root>
  );
};
