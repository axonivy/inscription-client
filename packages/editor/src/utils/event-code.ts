import type { EventCodeMeta } from '@axonivy/inscription-protocol';

export const eventCodeInfo = (code: EventCodeMeta) => {
  if (code.usage > 0) {
    if (code.process && code.process !== '<INVALID>') {
      return `${code.project} > ${code.process} (${code.usage})`;
    }
    return `${code.project} (${code.usage})`;
  }
  return undefined;
};
