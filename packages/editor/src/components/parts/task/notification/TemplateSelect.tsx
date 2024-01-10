import { useMemo } from 'react';
import type { SelectItem } from '../../../widgets';
import { Select, useFieldset } from '../../../widgets';
import { PathFieldset } from '../../common';
import { useTemplates, DEFAULT_TEMPLATE } from './useTemplates';
import type { WfNotification } from '@axonivy/inscription-protocol';

const DEFAULT_TEMPLATE_ITEM: SelectItem = { label: DEFAULT_TEMPLATE, value: DEFAULT_TEMPLATE } as const;

const TemplateSelect = ({ notification, onChange }: { notification: WfNotification, onChange: (value: SelectItem) => void }) => {
  const templates = useTemplates();
  const selectedTemplate = useMemo<SelectItem>(
    () => templates.find(e => e.value === notification.template) ?? DEFAULT_TEMPLATE_ITEM,
    [notification.template, templates]
  );
  const selectFieldset = useFieldset();

  return (
    <PathFieldset label='Template' {...selectFieldset.labelProps} path='template'>
      <div className='template-select'>
        <Select
          value={selectedTemplate}          
          items={templates}
          onChange={onChange}
          disabled={notification.suppress}
          inputProps={selectFieldset.inputProps}
        />
      </div>
    </PathFieldset>
  );
};

export default TemplateSelect;
