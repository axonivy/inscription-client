import { DeepPartial, render, renderHook, screen } from 'test-utils';
import { ConfigurationData, ElementData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { PartStateFlag } from '../../../editors';
import { useConfigurationPart } from './ConfigurationPart';

const Part = () => {
  const part = useConfigurationPart();
  return <>{part.content}</>;
};

describe('ConfigurationPart', () => {
  function renderPart(data?: DeepPartial<ConfigurationData>) {
    render(<Part />, {
      wrapperProps: {
        data: data && { config: data },
        meta: {
          widgets: [
            { text: 'Path of directory to scan', multiline: false },
            { multiline: false },
            { text: 'Multiline-Text', multiline: true }
          ]
        }
      }
    });
  }

  test('empty data', async () => {
    render(<Part />);
    expect(screen.getByTitle('No configuration needed')).toBeInTheDocument();
  });

  test('full data', async () => {
    renderPart({
      userConfig: '123'
    });
    await screen.findByText('Path of directory to scan');
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<ConfigurationData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useConfigurationPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', {
      userConfig: 'test123'
    });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        userConfig: 'test'
      }
    };
    const view = renderHook(() => useConfigurationPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.userConfig).toEqual('');
  });
});
