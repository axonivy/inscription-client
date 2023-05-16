import { memo } from 'react';
import './Tags.css';

const SummaryTags = ({ tags }: { tags: string[] }) => (
  <>
    {tags.length > 0 && (
      <div className='tags'>
        {tags.map((tag, index) => (
          <div key={`${tag}-${index}`} className='tag' role='gridcell'>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    )}
  </>
);

export default memo(SummaryTags);
