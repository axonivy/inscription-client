import { memo } from 'react';
import { useGeneralPart } from '../parts';
import Part from './part/Part';

const NameEditor = memo(({ hideTags }: { hideTags?: boolean }) => {
  const name = useGeneralPart({ hideTags });
  return <Part parts={[name]} />;
});

export default NameEditor;
