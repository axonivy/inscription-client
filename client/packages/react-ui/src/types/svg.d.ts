// We need this module declaration to support import statements for '.svg' files
// This may sometimes also be provided by a build system, e.g., see type declarations in CRA: https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/lib/react-app.d.ts#L47 
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}
