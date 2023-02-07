import { deepEqual } from './equals';

export function removeDefaultValues(obj: any, defaults: any) {
  const data = removeDefaults(obj, defaults);
  data.name = data.name || '';
  data.description = data.description || '';
  return data;
}

export function removeDefaults(obj: any, defaults: any) {
  for (var i in obj) {
    if (typeof obj[i] == 'object' && Object.prototype.toString.call(defaults[i]) !== '[object Array]') {
      obj[i] = removeDefaults(obj[i], defaults[i]);
      // continue;
    }
    if (defaults[i] !== undefined && deepEqual(obj[i], defaults[i]) /* || Object.keys(obj[i]).length === 0)*/) {
      delete obj[i];
    } else if (typeof obj[i] == 'object' && Object.keys(obj[i]).length === 0) {
      delete obj[i];
    }
  }
  return obj;
}
