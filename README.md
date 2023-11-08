# Inscription View (Alpha)

This repo contains the prototype of the web-based next gen inscription editors.

## Client

This prototype is build with React and Headless Components.

### Available Scripts

`yarn`: Install all packages:

`yarn icons:generate`: Build the icon font

`yarn protocol generate`: Generate the protocol types from the newest inscription json schema

`yarn standalone start`: Start the editor

> Runs the standalone app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
> If you don't have an active LSP backend, you can test the frontend with a mocked backend. Open [http://localhost:3000/mock.html](http://localhost:3000/mock.html) to view mocked data.
> The page will reload if you make edits.

If you have started a Dev-Axon Ivy Designer (port 8081), you can browse any inscription by addressing it via the `pid` e.g. http://localhost:3000/?pid=01682CA38FC4E775-f3
If your Axon Ivy Designer run on another port you can also specify the host http://localhost:3000/?server=localhost:8080/designer&pid=01682CA38FC4E775-f3

`yarn test`: Launches the test runner in the interactive watch mode

`yarn standalone build`: Builds the app for production to the `build` folder.

> It correctly bundles React in production mode and optimizes the build for the best performance.
> The build is minified and the filenames include the hashes.

### VsCode dev environment

#### Debug

Simply start the `Chrome` launch config to get debug and breakpoint support.

#### Run tests

To run tests you can ether start a script above or start Playwright or Jest with the recommended workspace extensions.

### Protocol changes

If you make protocol changes in the server and this causes to type errors on the build, you need to update the protocol in the client.

- Run `yarn protocol generate` to update the [inscription.ts](packages/protocol/src/data/inscription.ts) to the newest schema
- Run `yarn type` to check for typeing issues
- Fix typing issues
- Create a PR with your changes

## Windows

Windows has some known issues we need to fix:

- fix mock vite start
