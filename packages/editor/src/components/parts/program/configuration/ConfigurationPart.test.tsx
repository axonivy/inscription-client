import type { DeepPartial} from 'test-utils';
import { render, renderHook, screen } from 'test-utils';
import type { ConfigurationData, ElementData, InscriptionValidation } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../../editors';
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
            { configKey: 'directory', multiline: false },
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
      userConfig: { directory: '/tmp/myDir' }
    });
    await screen.findByText('Path of directory to scan');
    expect(screen.getByDisplayValue('/tmp/myDir')).toBeInTheDocument();
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
      userConfig: { directory: '/tmp/myDir' }
    });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        userConfig: { directory: '/tmp/myDir' }
      }
    };
    const view = renderHook(() => useConfigurationPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.userConfig).toEqual({});
  });
});
