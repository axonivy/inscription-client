import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { EditorProps } from '../data/editor';
import editorIcon from '../icons/user-dialog.svg';
import './Header.css';

const Header = (props: EditorProps) => (
  <>
    <div className='header'>
      <div className='header-title'>
        <div className='header-editor'>{props.title}</div>
      </div>
      <TabsList className='tabs-list'>
        {props.tabs.map((tab, index) => (
          <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.name}>
            <span className='dirty-state' data-state={tab.state} />
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <img src={editorIcon} className='header-icon' alt='icon' />
    </div>
    {props.headerState.map((state, index) => (
      <div key={`${index}-${state.field}`} className={`header-status message-${state.severity}`}>
        {state.message}
      </div>
    ))}
  </>
);

export default Header;
