import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { EditorProps } from '../data/editor';
import './Editor.css';
import Header from './Header';

const Editor = (props: EditorProps) => {
  const defaultTab = props.tabs.length > 0 ? props.tabs[0].name : '';
  return (
    <div className='editor'>
      <Tabs className='tabs-root' defaultValue={defaultTab}>
        <Header {...props} />
        <Separator className='separator-root' style={{ margin: '15px 0' }} />
        {props.tabs.map((tab, index) => (
          <TabsContent key={`${index}-${tab.name}`} className='tabs-content' value={tab.name}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Editor;
