import './RestTargetUrl.css';
import { useEditorContext, useMeta } from '../../../../../context';
import { useRestRequestData } from '../../useRestRequestData';
import { Fragment } from 'react';
import { useTargetPathSplit } from './usePathParams';

const RestTargetQueryParams = ({ queryParams }: { queryParams: [string, string][] }) => {
  if (queryParams.length === 0) {
    return <></>;
  }
  const params = queryParams.map(([name, value], index) => {
    if (value !== undefined && value.length > 0) {
      return (
        <Fragment key={`${index}-${name}`}>
          <span className='query-name'>{name}</span>=<span className='query-value'>{value}</span>
        </Fragment>
      );
    }
    return (
      <span key={`${index}-${name}`} className='query-name'>
        {name}
      </span>
    );
  });
  return (
    <>
      ?
      {params.map((p, index) => (
        <Fragment key={index}>
          {p}
          {index < params.length - 1 ? '&' : ''}
        </Fragment>
      ))}
    </>
  );
};

const RestTargetPath = ({ path }: { path: string }) => {
  const parts = useTargetPathSplit(path);
  return (
    <>
      {parts.map((part, index) => {
        if (part.includes('{') && part.includes('}')) {
          return (
            <span key={`${index}-${part}`} className='path-param'>
              {part}
            </span>
          );
        }
        return <Fragment key={`${index}-${part}`}>{part}</Fragment>;
      })}
    </>
  );
};

export const RestTargetUrl = () => {
  const { config } = useRestRequestData();
  const { context } = useEditorContext();
  const clientUri = useMeta('meta/rest/clientUri', { context, clientId: config.target.clientId }, '').data;
  return (
    <>
      {config.target.clientId?.length > 0 && (
        <div className='rest-target'>
          <div className='rest-target-url'>
            <RestTargetPath path={`${clientUri}${config.target.path}`} />
            <RestTargetQueryParams queryParams={Object.entries(config.target.queryParams)} />
          </div>
        </div>
      )}
    </>
  );
};
