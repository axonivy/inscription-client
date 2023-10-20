import './Combobox.css';

import { Browser, BrowserType, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';
import Combobox, { ComboboxItem, ComboboxProps } from './Combobox';

export type ComboboxWithBrowserProps<T extends ComboboxItem> = ComboboxProps<T> & {
  browsers: BrowserType[];
};

const ComboboxWithBrowser = <T extends ComboboxItem>({ items, value, onChange, browsers, ...inputProps }: ComboboxWithBrowserProps<T>) => {
  const browser = useBrowser();
  const path = usePath();

  return (
    <div className='combobox-with-browser'>
      <Combobox items={items} value={value} onChange={onChange} {...inputProps} />
      <Browser {...browser} types={browsers} accept={onChange} location={path} />
    </div>
  );
};

export default ComboboxWithBrowser;
