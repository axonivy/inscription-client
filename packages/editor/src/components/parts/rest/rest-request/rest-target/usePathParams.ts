import { useEffect, useMemo, useState } from 'react';
import { useMeta, useEditorContext } from '../../../../../context/index.js';
import { useRestRequestData } from '../../useRestRequestData.js';

export const useTargetPathSplit = (path: string) => {
  return path.split(/(\{[^}]*\})/gm);
};

export const useFindPathParams = () => {
  const { config } = useRestRequestData();
  const [path, setPath] = useState(config.target.path);
  const { context } = useEditorContext();
  const clientUri = useMeta('meta/rest/clientUri', { context, clientId: config.target.clientId }, '').data;
  useEffect(() => {
    setPath(`${clientUri}${config.target.path}`);
  }, [clientUri, config.target.path]);
  return useMemo(() => [...path.matchAll(/\{([^}]*)\}/gm)].map(match => match[1]), [path]);
};
