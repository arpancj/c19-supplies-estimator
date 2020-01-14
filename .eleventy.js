module.exports = function(config) {
  config.setTemplateFormats(['css', 'jpg', 'png', 'html', 'js', 'njk']);
  config.addPassthroughCopy({ 'source/images': 'assets' });

  return {
    dir: {
      input: 'source',
      output: 'dist',
      layouts: '_layouts'
    }
  };
};
