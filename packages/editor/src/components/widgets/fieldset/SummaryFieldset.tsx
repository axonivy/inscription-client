import './SummaryFieldset.js';
import { memo } from 'react';

const SummaryFieldset = ({ data, weight }: { data: string; weight?: 'normal' | 'bold' }) => (
  <>
    {data !== '' && (
      <div className='summary-fieldset'>
        <span className='summary-fieldset-data' style={{ fontWeight: weight }} aria-label={data}>
          {data}
        </span>
      </div>
    )}
  </>
);

export default memo(SummaryFieldset);
