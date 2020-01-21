const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, './application.pcss');
    const rawCss = await fs.readFileSync(rawFilepath);

    return {
      permalink: 'assets/application.css',
      rawFilepath,
      rawCss
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require('precss'),
      require('postcss-import'),
      require('tailwindcss')('./tailwind.config.js'),
      require('cssnano')
    ])
      .process(rawCss, { from: rawFilepath })
      .then(result => result);
  }
};
