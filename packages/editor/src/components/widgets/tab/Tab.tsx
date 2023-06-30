import './Tab.css';
import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ReactNode } from 'react';

export type Tab = {
  id: string;
  name: string;
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
      <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.id}>
        {tab.name}
      </TabsTrigger>
    ))}
  </TabsList>
);

export const TabContent = ({ tabs, value, onChange }: TabsProps) => (
  <>
    {tabs.map((tab, index) => (
      <TabsContent key={`${index}-${tab}`} className='tabs-content' value={tab.id}>
        {tab.content}
      </TabsContent>
    ))}
  </>
);
