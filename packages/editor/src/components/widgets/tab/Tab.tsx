import './Tab.js';
import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import type { ReactNode} from 'react';
import { useMemo } from 'react';
import type { Message } from '../message/Message.js';

export type Tab = {
  id: string;
  name: string;
  messages?: Message[];
  content: ReactNode;
};

export type TabsProps = {
  tabs: Tab[];
  value?: string;
  onChange?: (change: string) => void;
};

export const Tabs = (props: TabsProps) => (
  <TabRoot {...props}>
    <TabList {...props} />
    <TabContent {...props} />
  </TabRoot>
);

export const TabRoot = ({ tabs, value, onChange, children }: TabsProps & { children: ReactNode }) => {
  const defaultTab = tabs.length > 0 ? tabs[0].id : '';
  return (
    <TabsRoot className='tabs-root' defaultValue={defaultTab} value={value} onValueChange={onChange}>
      {children}
    </TabsRoot>
  );
};

export const TabList = ({ tabs }: TabsProps) => (
  <TabsList className='tabs-list'>
    {tabs.map((tab, index) => (
      <TabTrigger key={`${index}-${tab.name}`} tab={tab} />
    ))}
  </TabsList>
);

export const TabContent = ({ tabs }: TabsProps) => (
  <>
    {tabs.map((tab, index) => (
      <TabsContent key={`${index}-${tab}`} className='tabs-content' value={tab.id}>
        {tab.content}
      </TabsContent>
    ))}
  </>
);

export const TabTrigger = ({ tab }: { tab: Tab }) => {
  const state = useMemo(() => {
    if (tab.messages?.find(message => message.severity === 'ERROR')) {
      return 'error';
    }
    if (tab.messages?.find(message => message.severity === 'WARNING')) {
      return 'warning';
    }
    return undefined;
  }, [tab.messages]);
  return (
    <TabsTrigger className='tabs-trigger' data-message={state} value={tab.id}>
      {tab.name}
    </TabsTrigger>
  );
};
