import CollapsiblePart from './CollapsiblePart';
import Combobox, { ComboboxItem } from './Combobox';
import { Message, MessageUtil } from '../../data/message';
import { CallTabData } from '../../data/call-tab';
import './SelectDialog.css';

const SelectDialog = (props: { data: CallTabData; onChange: (change: CallTabData) => void; messages: Message[] }) => {
  const callables: Callable[] = [
    { value: 'workflow.humantask.AcceptRequest', process: 'AcceptRequest', project: 'workflow.humantask [workflow-demos]' },
    { value: 'workflow.credit.ApproveLevel1', process: 'ApproveLevel1', project: 'workflow.credit [workflow-demos]' },
    { value: 'workflow.credit.ApproveLevel2', process: 'ApproveLevel2', project: 'workflow.credit [workflow-demos]' },
    { value: 'demo.test1', process: 'test1', project: 'demo [demo]' },
    { value: 'demo.test2', process: 'test2', project: 'demo [demo]' },
    { value: 'demo.test3', process: 'test3', project: 'demo [demo]' },
    { value: 'demo.test4', process: 'test4', project: 'demo [demo]' },
    { value: 'demo.test5', process: 'test5', project: 'demo [demo]' },
    { value: 'demo.test6', process: 'test6', project: 'demo [demo]' },
    { value: 'demo.test7', process: 'test7', project: 'demo [demo]' },
    { value: 'demo.test8', process: 'test8', project: 'demo [demo]' },
    { value: 'demo.test9', process: 'test9', project: 'demo [demo]' }
  ];
  const starts: Start[] = [{ value: 'start():ProcurementRequest,LogEntry' }, { value: 'start2()' }, { value: 'test(String):boolean' }];

  const handleDialogChange = (change: string) => props.onChange({ ...props.data, dialog: change });
  const handleStartChange = (change: string) => props.onChange({ ...props.data, start: change });

  return (
    <CollapsiblePart collapsibleLabel='User Dialog Start' defaultOpen={true}>
      <CallableCombobox
        callables={callables}
        value={props.data.dialog}
        onChange={handleDialogChange}
        message={MessageUtil.findMessage(props.messages, 'dialog')}
      />
      <StartCombobox starts={starts} value={props.data.start} onChange={handleStartChange} />
    </CollapsiblePart>
  );
};

interface Callable extends ComboboxItem {
  process: string;
  project: string;
}

function isCallable(item: ComboboxItem): item is Callable {
  return (item as Callable).process !== undefined;
}

interface Start extends ComboboxItem {}

const StartCombobox = (props: { starts: Start[]; value: string; onChange: (change: any) => void }) => {
  const children = (item: Start) => <span>➡️ {item.value}</span>;

  return <Combobox label='Start' items={props.starts} children={children} value={props.value} onChange={props.onChange} />;
};

const CallableCombobox = (props: { callables: Callable[]; value: string; onChange: (change: any) => void; message?: Message }) => {
  const itemFilter = (item: ComboboxItem, input?: string) => {
    if (!input) {
      return true;
    }
    if (!isCallable(item)) {
      return false;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter) ||
      item.process.toLowerCase().includes(filter) ||
      item.project.toLowerCase().includes(filter)
    );
  };

  const children = (item: ComboboxItem) => {
    if (!isCallable(item)) {
      return <></>;
    }
    return (
      <>
        <span>🖥️ {item.process}</span>
        <span className='comboboy-menu-entry-additional'> - {item.project}</span>
      </>
    );
  };

  return (
    <Combobox
      label='Dialog'
      items={props.callables}
      children={children}
      itemFilter={itemFilter}
      value={props.value}
      onChange={props.onChange}
      message={props.message}
    />
  );
};

export default SelectDialog;
