module.exports = function(config) {
  config.setTemplateFormats(['css', 'html', 'js', 'njk']);
  config.addPassthroughCopy({ 'source/images': 'assets' });

  return {
    dir: {
      input: 'source',
      output: 'dist',
      layouts: '_layouts',
      data: '_data'
    }
  };
};
