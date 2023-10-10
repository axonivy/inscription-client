import { DeepPartial, render, renderHook, screen } from 'test-utils';
import { EditorData, ElementData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { PartStateFlag } from '../../../editors';
import { useEditorPart } from './EditorPart';

const Part = () => {
  const part = useEditorPart();
  return <>{part.content}</>;
};

describe('EditorPart', () => {
  function renderPart(data?: DeepPartial<EditorData>) {
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
    expect(screen.getByTitle('There is no editor for this bean')).toBeInTheDocument();
  });

  test('full data', async () => {
    renderPart({
      userConfig: '123'
    });
    await screen.findByText('Path of directory to scan');
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<EditorData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useEditorPart(), {
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
    const view = renderHook(() => useEditorPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.userConfig).toEqual('');
  });
});
