import * as vscode from 'vscode';
import { getNonce, getUri } from './util';

/**
 * Provider for Yaml table editors.
 */
export class YamlEditorProvider implements vscode.CustomTextEditorProvider {
    private static newFileId = 1;
    private static readonly viewType = 'yaml-table-editor';

    constructor(private readonly context: vscode.ExtensionContext) {}

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        vscode.commands.registerCommand('yaml-table-editor.new', () => {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage(
                    'Creating new YAML files currently requires opening a workspace'
                );
                return;
            }

            const uri = vscode.Uri.joinPath(
                workspaceFolders[0].uri,
                `variables-${YamlEditorProvider.newFileId++}.yaml`
            ).with({ scheme: 'untitled' });

            vscode.commands.executeCommand('vscode.openWith', uri, YamlEditorProvider.viewType);
        });

        const provider = new YamlEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(
            YamlEditorProvider.viewType,
            provider
        );
        return providerRegistration;
    }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
            // Restrict the webview to only load resources from the `out` and `webview-react-ui/build` directories
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'out'),
                vscode.Uri.joinPath(this.context.extensionUri, 'webview-react-ui/build')
            ]
        };
        webviewPanel.webview.html = this.getWebviewContent(
            webviewPanel.webview,
            this.context.extensionUri
        );

        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText()
            });
        }

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });

        // Make sure we dispose the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((e) => {
            switch (e.type) {
                case 'updateDocument':
                    this.updateYamlDocument(document, e.text);
                    webviewPanel.webview.postMessage({
                        type: 'update',
                        text: e.text
                    });
                    break;
            }
        });

        updateWebview();
    }

    /**
     * Write the updated Yaml content to the given text document.
     */
    protected updateYamlDocument(document: vscode.TextDocument, yaml: any) {
        const edit = new vscode.WorkspaceEdit();

        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), yaml);

        return vscode.workspace.applyEdit(edit);
    }

    /**
     * Defines and returns the HTML that should be rendered within the webview panel.
     *
     * @remarks This is also the place where references to the React webview build files
     * are created and inserted into the webview HTML.
     *
     * @param webview A reference to the extension webview
     * @param extensionUri The URI of the directory containing the extension
     * @returns A template string literal containing the HTML that should be
     * rendered within the webview panel
     */
    private getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
        // The CSS file from the React build output
        const stylesUri = getUri(webview, extensionUri, [
            'webview-react-ui',
            'build',
            'assets',
            'index.css'
        ]);
        // Codicon font file from the React build output
        const codiconFontUri = getUri(webview, extensionUri, [
            'webview-react-ui',
            'build',
            'assets',
            'codicon.ttf'
        ]);
        // The JS file from the React build output
        const scriptUri = getUri(webview, extensionUri, [
            'webview-react-ui',
            'build',
            'assets',
            'index.js'
        ]);

        const nonce = getNonce();

        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>YAML Table Variables Editor</title>
          <style nonce="${nonce}">
            @font-face {
              font-family: "codicon";
              font-display: block;
              src: url("${codiconFontUri}") format("truetype");
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
}
