import './Accordion.css';
import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { TabProps } from '../../props';
import IvyIcon from '../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../error/ErrorFallback';

export const TabAccordion = (props: { tabs: TabProps[] }) => {
  return (
    <Root type='multiple' className='accordion-root'>
      {props.tabs.map((tab, index) => (
        <Item key={`${index}-${tab.name}`} value={tab.name} className='accordion-item'>
          <Header className='accordion-header'>
            <Trigger className='accordion-trigger'>
              <span className='tab-state' data-state={tab.state} aria-label={tab.state} />
              {tab.name}
            </Trigger>
            <div className='accordion-header-group'>
              {tab.state === 'configured' && <Button icon={IvyIcons.Undo} />}
              <IvyIcon icon={IvyIcons.AngleDown} />
            </div>
          </Header>

          <Content className='accordion-content'>
            <div className='accordion-content-data'>
              <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[tab]}>
                {tab.content}
              </ErrorBoundary>
            </div>
          </Content>
        </Item>
      ))}
    </Root>
  );
};
