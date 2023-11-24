import './Input.js';
import type { BrowserType} from '../../../components/browser/index.js';
import { Browser, useBrowser } from '../../../components/browser/index.js';
import { usePath } from '../../../context/index.js';
import type { ComponentProps } from 'react';
import Input from './Input.js';
import type { CmsTypeFilter } from '../../../components/browser/CmsBrowser.js';

type InputWithBrowserProps = Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'ref'> & {
  value?: string;
  onChange: (change: string) => void;
  browsers: BrowserType[];
  typeFilter: CmsTypeFilter;
};

const InputWithBrowser = ({ value, onChange, disabled, browsers, typeFilter, ...props }: InputWithBrowserProps) => {
  const browser = useBrowser();
  const path = usePath();

  return (
    <div className='input-with-browser'>
      <Input value={value as string} onChange={onChange} disabled={disabled} {...props} />
      <Browser {...browser} types={browsers} cmsOptions={{ noApiCall: true, typeFilter: typeFilter }} accept={onChange} location={path} />
    </div>
  );
};

export default InputWithBrowser;
