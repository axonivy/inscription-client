import './HeadlineControls.css';
import Button from '../button/Button';
import type { FieldsetControl } from '../fieldset';

type HeadlineControlsProps = {
  controls: FieldsetControl[];
};

const HeadlineControls = ({ controls }: HeadlineControlsProps) => {
  return (
    <div className='headline-controls'>
      {controls.map((control, index) => (
        <div className='controls-array' key={index}>
          {control.withSeperator && <div className='separat-controls'></div>}
          <Button
            icon={control.icon}
            aria-label={control.label}
            title={control.label}
            className='headline-control-button'
            onClick={control.action}
            data-state={control.active ? 'active' : 'inactive'}
          />
        </div>
      ))}
    </div>
  );
};

export default HeadlineControls;
