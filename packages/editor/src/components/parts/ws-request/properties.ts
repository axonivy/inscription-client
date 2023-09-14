import { ScriptMappings } from '@axonivy/inscription-protocol';

export type WsProperty = {
  name: string;
  expression: string;
};

export namespace WsProperty {
  export function of(props: ScriptMappings): WsProperty[] {
    return Object.entries(props).map(p => {
      return { name: p[0], expression: p[1] };
    });
  }

  export function update(props: WsProperty[], rowIndex: number, columnId: string, value: string): WsProperty[] {
    return props.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [columnId]: value
        };
      }
      return row;
    });
  }

  export function to(props: WsProperty[]): ScriptMappings {
    const mappings: ScriptMappings = {};
    props.forEach(p => (mappings[p.name] = p.expression));
    return mappings;
  }
}
