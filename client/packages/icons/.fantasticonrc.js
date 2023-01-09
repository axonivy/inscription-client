const package = require('./package.json');

module.exports = {
  name: 'ivy-icons',
  prefix: 'ivy',
  inputDir: './src/icons',
  outputDir: './dist',
  fontTypes: ['ttf'],
  normalize: true,
  assetTypes: ['ts', 'css', 'html'],
  templates: {
    html: './src/templates/preview.hbs',
    css: './src/templates/styles.hbs'
  },
  formatOptions: {
    ttf: {
      url: package.url,
      description: package.description,
      version: package.fontVersion,
      metadata: 'Licence by Streamline Icons (https://streamlinehq.com/), Provided by Axon Ivy AG'
    }
  }
};
