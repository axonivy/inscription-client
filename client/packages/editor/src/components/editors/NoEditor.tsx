import { memo } from 'react';
import './NoEditor.css';
import { InscriptionType } from '@axonivy/inscription-core';

const NoEditor = (props: { type?: InscriptionType }) => {
  return props.type ? (
    <div className='no-editor'>No Editor found for type: {props.type}</div>
  ) : (
    <div className='no-editor'>Please select a process element</div>
  );
};

export default memo(NoEditor);
