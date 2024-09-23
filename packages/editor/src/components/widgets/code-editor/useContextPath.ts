import { useEditorContext, usePath } from '../../../context';

export const useContextPath = (type?: string) => {
  const { elementContext } = useEditorContext();
  const path = usePath();
  return `${elementContext.app}/${elementContext.pmv}/${elementContext.pid}/${path}/${type ? type : ''}`;
};
