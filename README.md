# Next Gen Inscription Editor (Prototype)

This repo contains the prototype of the web-based next gen inscription editors.

## Docs

- [UI Mockups](doc/ui-mockup/README.md)
- [Process Schema](doc/process-schema/README.md)
- Sample Process involving a UserDialog call: see [QuickStartTutorial](https://github.com/axonivy-market/demo-projects/blob/master/quick-start-tutorial/quick-start-tutorial/processes/MyProcess.p.json)

## Client

This prototype is build with React and Headless Components.

### Available Scripts

`yarn`: Install all packages:

`yarn icons`: Build the icon font

`yarn standalone start`: Start the editor

> Runs the standalone app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
> If you don't have an active LSP backend, you can test the frontend with a mocked backend. Open [http://localhost:3000/mock.html](http://localhost:3000/mock.html) to view mocked data.
> The page will reload if you make edits.

`yarn test`: Launches the test runner in the interactive watch mode

`yarn standalone build`: Builds the app for production to the `build` folder.

> It correctly bundles React in production mode and optimizes the build for the best performance.
> The build is minified and the filenames include the hashes.

### VsCode dev environment

#### Debug

Simply start the `Chrome` launch config to get debug and breakpoint support.

#### Run tests

To run tests you can ether start a script above or start Playwright or Jest with the recommended workspace extensions.
