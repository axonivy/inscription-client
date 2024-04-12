import './BrowserCell.css';
import { Flex } from '@axonivy/ui-components';

type BrowserCellProps = { value: string; description: string; info: string };

export const BrowserCell = ({ value, description, info }: BrowserCellProps) => (
  <Flex direction='row' gap={2} title={description} className='browser-cell'>
    <span>{value}</span>
    <span className='browser-cell-info'>{info}</span>
  </Flex>
);
