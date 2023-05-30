import * as React from 'react';
import * as ReactDOM from 'react-dom';
import YAMLVariablesTable from './yaml-table';

const vscodeApi = acquireVsCodeApi();

ReactDOM.render(
    <React.StrictMode>
        <YAMLVariablesTable vscodeApi={vscodeApi} />
    </React.StrictMode>,
    document.getElementById('root')
);
