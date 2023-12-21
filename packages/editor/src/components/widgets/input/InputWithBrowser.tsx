import './Input.css';
import type { BrowserType } from '../../../components/browser';
import { Browser, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';
import type { ComponentProps } from 'react';
import Input from './Input';
import type { BrowserValue } from '../../browser/Browser';
import type { CmsTypeFilter } from '../../browser/cms/CmsBrowser';

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
      <Browser
        {...browser}
        types={browsers}
        cmsOptions={{ noApiCall: true, typeFilter: typeFilter }}
        accept={(change: BrowserValue) => onChange(change.cursorValue)}
        location={path}
      />
    </div>
  );
};

export default InputWithBrowser;
