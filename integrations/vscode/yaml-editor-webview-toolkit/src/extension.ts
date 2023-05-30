import * as vscode from 'vscode';
import { YamlEditorProvider } from './editor-provider';

export function activate(context: vscode.ExtensionContext) {
    // Register our custom Yaml table editor provider
    context.subscriptions.push(YamlEditorProvider.register(context));
}
