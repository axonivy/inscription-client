import './Accordion.css';
import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import IvyIcon from '../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import type { ComponentProps, ReactNode } from 'react';

type AccordionRootProps = {
  value: string;
  onChange: (change: string) => void;
  children: ReactNode;
};

export const AccordionRoot = ({ value, onChange, children }: AccordionRootProps) => (
  <Root type='single' className='accordion-root' collapsible={true} value={value} onValueChange={onChange}>
    {children}
  </Root>
);

type AccordionItemProps = {
  value: string;
  children: ReactNode;
};

export const AccordionItem = ({ value, children }: AccordionItemProps) => (
  <Item value={value} className='accordion-item'>
    {children}
  </Item>
);

type AccordionHeaderProps = {
  title?: string;
  control?: { label: string; icon: IvyIcons; action: () => void };
  children: ReactNode;
  isOpen: boolean;
};

export const AccordionHeader = ({ title, control, children, isOpen }: AccordionHeaderProps) => (
  <Header className='accordion-header' title={title}>
    <Trigger className='accordion-trigger'>
      <IvyIcon icon={IvyIcons.Chevron} />
      {children}
    </Trigger>
    {isOpen && control && <Button icon={control.icon} onClick={control.action} aria-label={control.label} />}
  </Header>
);

export const AccordionContent = ({ children, className, ...props }: { children: ReactNode } & ComponentProps<'div'>) => (
  <Content className='accordion-content'>
    <div {...props} className={`accordion-content-data ${className ?? ''}`}>
      {children}
    </div>
  </Content>
);
