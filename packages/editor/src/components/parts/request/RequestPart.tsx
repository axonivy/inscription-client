import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, Fieldset, Input } from '../../widgets';
import { useRequestPartData } from './useRequestPartData';

export function useRequestPart(): PartProps {
  const { data, defaultData, initData, resetData } = useRequestPartData();
  const currentData = [data, data];
  const state = usePartState([defaultData], currentData, []);
  const dirty = usePartDirty([initData], currentData);
  return {
    name: 'Request',
    state,
    reset: { dirty, action: () => resetData() },
    content: <StartRequestPart />
  };
}

const StartRequestPart = () => {
  const { data, updateLink, updateHttpRequestable, updateShowInStartlist, updateName, updateDesc, updateCategory } = useRequestPartData();

  return (
    <>
      <Checkbox label='Is HTTP requestable' value={data.request.isHttpRequestable} onChange={change => updateHttpRequestable(change)} />
      <Fieldset label='Link' htmlFor='linkName'>
        <Input id='linkName' value={data.request.linkName} onChange={change => updateLink(change)} />{' '}
      </Fieldset>
      <Checkbox label='Show on startList?' value={data.request.isVisibleOnStartList} onChange={change => updateShowInStartlist(change)} />
      <Fieldset label='Name' htmlFor='requestName'>
        <Input id='requestName' value={data.request.name} onChange={change => updateName(change)} />{' '}
      </Fieldset>
      <Fieldset label='Description' htmlFor='requestDesc'>
        <Input id='requestDesc' value={data.request.description} onChange={change => updateDesc(change)} />{' '}
      </Fieldset>
      <Fieldset label='Category' htmlFor='requestCategory'>
        <Input id='requestCategory' value={data.request.category} onChange={change => updateCategory(change)} />
      </Fieldset>
    </>
  );
};
