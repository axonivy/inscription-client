import './Tab.css';
import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ReactNode } from 'react';

export type Tab = {
  name: string;
  content: ReactNode;
};

export type TabsProps = {
  tabs: Tab[];
  value?: string;
  onChange?: (change: string) => void;
};

export const Tabs = ({ tabs, value, onChange }: TabsProps) => {
  const defaultTab = tabs.length > 0 ? tabs[0].name : '';

  return (
    <TabsRoot className='tabs-root' defaultValue={defaultTab} value={value} onValueChange={onChange}>
      <TabsList className='tabs-list'>
        {tabs.map((tab, index) => (
          <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.name}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={`${index}-${tab}`} className='tabs-content' value={tab.name}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
};
