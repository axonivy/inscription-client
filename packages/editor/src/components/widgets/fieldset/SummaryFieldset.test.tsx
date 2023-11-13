import { render, screen } from 'test-utils';
import SummaryFieldset from './SummaryFieldset';
import { describe, test, expect } from 'vitest';

describe('SummaryFieldset', () => {
  function renderFieldset(data: string, weight?: 'normal' | 'bold') {
    render(
      <div data-testid='empty'>
        <SummaryFieldset data={data} weight={weight} />
      </div>
    );
  }

  test('fieldset will render', () => {
    renderFieldset('data');
    expect(screen.getByLabelText('data')).toBeInTheDocument();
  });

  test('fieldset with weight', () => {
    renderFieldset('data', 'bold');
    expect(screen.getByLabelText('data')).toHaveStyle('fontWeight: bold');
  });

  test('fieldset will not render empty data', () => {
    renderFieldset('');
    expect(screen.getByTestId('empty')).toBeEmptyDOMElement();
  });
});
