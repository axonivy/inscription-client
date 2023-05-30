import {
    VSCodeButton,
    VSCodeCheckbox,
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
    VSCodeTextField
} from '@vscode/webview-ui-toolkit/react';
import { useEffect, useState } from 'react';
import { WebviewApi } from 'vscode-webview';
import * as YAML from 'yaml';
import './codicon.css';
import './yaml-table.css';

interface YAMLVariablesTableProps {
    vscodeApi: WebviewApi<unknown>;
}

export default function YAMLVariablesTable(props: YAMLVariablesTableProps) {
    const [yaml, setYaml] = useState({});

    useEffect(() => {
        window.addEventListener('message', (event) => {
            const message = event.data;
            let text = message.text;
            // if the text document was updated we update our yaml content as well
            if (message.type === 'update') {
                let parsedYaml;
                try {
                    if (!text) {
                        text = '{"":""}';
                    }
                    parsedYaml = YAML.parse(text);
                    setYaml(parsedYaml);
                } catch {
                    setYaml({});
                }
            }
        });
    }, []);

    if (Object.keys(yaml).length === 0) {
        return (
            <main id='webview-body'>
                <h2>
                    Error: Could not parse the <code>*.yaml</code> file! Please doublecheck the
                    file.
                </h2>
            </main>
        );
    }

    return (
        <main id='webview-body'>
            <h1>YAML Variables Table Editor</h1>
            <VSCodeDataGrid grid-template-columns='48% 48% 4%' aria-label='Default'>
                <VSCodeDataGridRow row-type='sticky-header'>
                    <VSCodeDataGridCell cell-type='columnheader' grid-column='1'>
                        Key
                    </VSCodeDataGridCell>
                    <VSCodeDataGridCell cell-type='columnheader' grid-column='2'>
                        Value
                    </VSCodeDataGridCell>
                    <VSCodeDataGridCell cell-type='columnheader' grid-column='3' />
                </VSCodeDataGridRow>
                {Object.entries(yaml).map(([key, value], index) => (
                    <VSCodeDataGridRow>
                        <VSCodeTextField
                            grid-column='1'
                            currentValue={key}
                            onChange={(e) => handleVariableKeyChange(e, key)}
                        />
                        {renderVariableValueElement(value, key)}
                        <section grid-column='3' className='edit-button-container'>
                            <VSCodeButton
                                appearance='icon'
                                aria-label='Delete'
                                onClick={(e) => handleDeleteClick(e, key)}>
                                <span className='codicon codicon-trash' />
                            </VSCodeButton>
                            {Object.entries(yaml).length - 1 === index && (
                                <VSCodeButton
                                    appearance='icon'
                                    aria-label='Add'
                                    onClick={(e) => handleAddClick(e)}>
                                    <span className='codicon codicon-add' />
                                </VSCodeButton>
                            )}
                        </section>
                    </VSCodeDataGridRow>
                ))}
            </VSCodeDataGrid>
        </main>
    );

    function renderVariableValueElement(value: any, key: string) {
        const valueType = typeof value;

        if (valueType === 'string') {
            return (
                <VSCodeTextField
                    grid-column='2'
                    currentValue={value}
                    onChange={(e) => handleVariableValueChange(e, key)}
                />
            );
        } else if (valueType === 'number') {
            return (
                <VSCodeTextField
                    grid-column='2'
                    // The webview react toolkit does not support the textfield type 'number', hence we force set it
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    type='number'
                    currentValue={value}
                    onChange={(e) => handleVariableValueChange(e, key)}
                />
            );
        } else if (valueType === 'boolean') {
            return (
                <VSCodeCheckbox
                    grid-column='2'
                    currentChecked={value}
                    onClick={(e) => handleVariableValueClick(e, key)}
                />
            );
        }
    }

    function handleVariableKeyChange(e: Event, variableKey: string) {
        e.preventDefault();
        if (e.target) {
            const tmpYaml = Object.assign({}, yaml);
            // update object key
            delete Object.assign(tmpYaml, { [e.target['value']]: tmpYaml[variableKey] })[
                variableKey
            ];
            props.vscodeApi.postMessage({ type: 'updateDocument', text: YAML.stringify(tmpYaml) });
            setYaml(tmpYaml);
        }
    }

    function handleVariableValueChange(e: Event, variableKey: string) {
        e.preventDefault();
        if (e.target) {
            const tmpYaml = Object.assign({}, yaml);
            // guess type of changed value
            const changedValue = e.target['value'];
            let newValue;
            if (/^(true|false)$/i.test(changedValue)) {
                // check if value is boolean
                newValue = changedValue.toLowerCase() === 'true';
            } else if (
                !isNaN(changedValue) &&
                (parseInt(changedValue) || parseFloat(changedValue))
            ) {
                // check if value is numeric
                newValue = +changedValue;
            } else {
                // otherwise handle as string
                newValue = changedValue;
            }
            console.error('UPDATE VALUE ' + newValue + ' type: ' + typeof newValue);
            tmpYaml[variableKey] = newValue;
            updateYamlDocument(tmpYaml);
        }
    }

    function handleVariableValueClick(
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        variableKey: string
    ) {
        e.preventDefault();
        if (e.target) {
            const tmpYaml = Object.assign({}, yaml);
            tmpYaml[variableKey] = e.target['proxy'].checked;
            updateYamlDocument(tmpYaml);
        }
    }

    function handleAddClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        if (e.target) {
            const tmpYaml = Object.assign({}, yaml);
            tmpYaml[''] = '';
            updateYamlDocument(tmpYaml);
        }
    }

    function handleDeleteClick(e: React.MouseEvent<HTMLElement, MouseEvent>, variableKey: string) {
        e.preventDefault();
        if (e.target) {
            const tmpYaml = Object.assign({}, yaml);
            delete tmpYaml[variableKey];
            updateYamlDocument(tmpYaml);
        }
    }

    function updateYamlDocument(newYamlDocument: object) {
        props.vscodeApi.postMessage({
            type: 'updateDocument',
            text: YAML.stringify(newYamlDocument)
        });
        setYaml(newYamlDocument);
    }
}
