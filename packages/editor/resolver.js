module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    packageFilter: pkg => {
      return {
        ...pkg,
        // Set the main to module for axonivy packages (use src instead of lib)
        main: pkg.name?.startsWith('@axonivy') ? pkg.source : pkg.main
      };
    }
  });
};
