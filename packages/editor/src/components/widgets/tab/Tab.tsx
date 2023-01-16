import './Tab.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { TabProps } from '../../../components/props';

export const Tab = (props: { tabs: TabProps[] }) => {
  return (
    <TabRoot {...props}>
      <TabList {...props} />
      <TabContent {...props} />
    </TabRoot>
  );
};

export const TabRoot = (props: { tabs: TabProps[]; children: JSX.Element | JSX.Element[] }) => {
  const defaultTab = props.tabs.length > 0 ? props.tabs[0].name : '';
  return (
    <Tabs className='tabs-root' defaultValue={defaultTab}>
      {props.children}
    </Tabs>
  );
};

export const TabList = (props: { tabs: TabProps[] }) => {
  return (
    <TabsList className='tabs-list'>
      {props.tabs.map((tab, index) => (
        <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.name}>
          <span className='tab-state' data-state={tab.state} aria-label={tab.state} />
          {tab.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export const TabContent = (props: { tabs: TabProps[] }) => {
  return (
    <>
      {props.tabs.map((tab, index) => (
        <TabsContent key={`${index}-${tab}`} className='tabs-content' value={tab.name}>
          {tab.content}
        </TabsContent>
      ))}
    </>
  );
};
