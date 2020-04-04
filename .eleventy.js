module.exports = function (config) {
  config.addPassthroughCopy({ 'source/images': 'assets' });
  config.addPassthroughCopy({ 'source/javascripts': 'assets' });

  return {
    dir: {
      input: 'source',
      output: 'dist',
      layouts: '_layouts',
      data: '_data',
    },
  };
};
