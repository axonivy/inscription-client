import { RestMultiValuedMap, RestParameter, ScriptMappings } from '@axonivy/inscription-protocol';

export type RestParam = {
  name: string;
  expression: string;
  known: boolean;
  doc?: string;
  type?: string;
};

export function restParamBuilder() {
  let params: RestParam[] = [];
  const builder = {
    openApiParams(parameters: RestParameter[]) {
      params = parameters.map<RestParam>(param => {
        return {
          name: param.name,
          expression: '',
          known: true,
          doc: `${param.required ? '* required\n' : ''}${param.doc}`,
          type: param.type.fullQualifiedName
        };
      });
      return builder;
    },
    foundParams(foundParams: string[]) {
      for (const found of foundParams) {
        if (params.find(p => p.name === found) === undefined) {
          params.push({ name: found, expression: '', known: true });
        }
      }
      return builder;
    },
    mappings(mappings: ScriptMappings) {
      Object.entries(mappings).forEach(([key, value]) => {
        for (const p of params) {
          if (p.name === key) {
            p.expression = value;
            return;
          }
        }
        params.push({ name: key, expression: value, known: false });
      });
      return builder;
    },
    restMap(map: RestMultiValuedMap) {
      Object.entries(map).forEach(([key, value]) => {
        for (const p of params) {
          if (p.name === key) {
            p.expression = value[0] ?? '';
            return;
          }
        }
        params.push({ name: key, expression: value[0] ?? '', known: false });
      });
      return builder;
    },
    build() {
      return params;
    }
  };
  return builder;
}

export function updateRestParams(params: RestParam[], rowIndex: number, columnId: string, value: string): RestParam[] {
  return params.map((row, index) => {
    if (index === rowIndex) {
      return {
        ...row,
        [columnId]: value
      };
    }
    return row;
  });
}

export function toMappings(props: RestParam[]): Record<string, string> {
  const mappings: Record<string, string> = {};
  props.forEach(p => (mappings[p.name] = p.expression));
  return mappings;
}

export function toRestMap(props: RestParam[]): RestMultiValuedMap {
  const mappings: RestMultiValuedMap = {};
  props.forEach(p => (mappings[p.name] = [p.expression]));
  return mappings;
}
