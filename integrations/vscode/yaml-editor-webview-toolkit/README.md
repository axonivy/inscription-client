# Custom YAML Editor Sample Extension

This sample extension showcases a custom editor using the [Webview API](https://code.visualstudio.com/api/extension-guides/webview).

## Build the sample extension

```bash
# Install dependencies for both the extension and webview UI source code
yarn install:all

# Build webview UI source code
yarn build
```

Remark: The webview React UI is built with `vite`.

## Run the sample extension

Run the extension by doing the following:

1. Press `F5` to open a new Extension Development Host window (this complies the code before starting)
2. Open an existing yaml file (e.g. from the provided `yaml-workspace`) or create a new empty one via the explorer toolbar (via the `+` icon).
3. Edit variable keys and values, delete lines via the tail icon (🗑️) and add new lines via the tail icon (➕). The value fields try to guess the value type (i.e. string, float, integer or boolean).

## Package the sample extension

```bash
yarn package
```

The output is a bundled `*.vsix` extension, which can be directly installed in VS Code or Theia:

### Install bundled `*.vsix` extension in VS Code

- Open the context menu via right click on the `*.vsix` file and select `Install Extension VSIX`.
    <br/>or
- Open the `Extensions` view via the `View` menu and choose `Install from VSIX...` in the view's toolbar menu (`...`).

### Install bundled `*.vsix` extension in Theia

- Open the `Extensions` view via the `View` menu and choose `Install from VSIX...` in the view's toolbar menu (`...`).

## Remarks and possible extensions

- General
  - In general, webviews are only recommended to use if no other option fits one's needs, see also <https://code.visualstudio.com/api/extension-guides/webview#should-i-use-a-webview>.
- Webview Toolkit (see also [interactive library](https://microsoft.github.io/vscode-webview-ui-toolkit/?path=/docs/library-data-grid--with-sticky-header))
  - [+] Only very minor custom CSS styling needed. In our case only for table cell spacing and overall positioning of the table element.
  - [+] Perfectly aligns with color themes without any customizations.
  - Customizing the table cell elements gives a variety of possibilities to display variable data, however visualizing multiple level nesting of YAML variables should be sketched beforehand to retrieve the requirements, e.g. how to offer the user the possibility to add a nested level, which elements are suitable for nesting and so on.
- Table editor
  - Introduce adding new lines also in between existing ones.
  - Add variable editing via the VS Code quick input box (e.g. as used by the keyboard shortcuts editor)
    - This could be triggered via the API `await vscode.window.showInputBox({ prompt: '...', value: undefined });`
  - Please note that there is a table editor within VS Code (e.g., for the Settings) but it is not exposed as a separate package or the API.
- Usage in Theia
  - Some adaptations will be needed, e.g. support of explorer toolbar icon does not work out of the box.
  - WIP: The style sheets seem to not be accepted by the CSP
