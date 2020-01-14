module.exports = function(config) {
  config.setTemplateFormats(['css', 'jpg', 'png', 'html', 'js', 'njk']);

  return {
    dir: {
      input: 'source',
      output: 'dist',
      layouts: '_layouts'
    }
  };
};
