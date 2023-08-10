import './Checkbox.css';
import { Checkbox as CheckboxRoot, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { useReadonly } from '../../../context';
import { useFieldset } from '../fieldset';

type CheckboxProps = { label: string; value: boolean; onChange: (change: boolean) => void; disabled?: boolean };

const Checkbox = ({ label, value, onChange, disabled }: CheckboxProps) => {
  const readonly = useReadonly();
  const fieldset = useFieldset();
  return (
    <div className='checkbox'>
      <CheckboxRoot
        className='checkbox-root'
        {...fieldset.inputProps}
        checked={value}
        onCheckedChange={change => onChange(change ? true : false)}
        disabled={readonly || disabled}
      >
        <CheckboxIndicator className='checkbox-indicator'>
          <svg width={24} height={24} aria-hidden='true'>
            <path
              transform='translate(7 9)'
              d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
                    1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
                    6A.999.999 0 0 1 3.788 9z`}
            />
          </svg>
        </CheckboxIndicator>
      </CheckboxRoot>
      <label className='checkbox-label' {...fieldset.labelProps}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
