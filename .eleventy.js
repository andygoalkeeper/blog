const htmlmin = require('html-minifier');
const cleanCSS = require('clean-css');
const markdownIt = require('markdown-it');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (eleventyConfig) => {
  const md = new markdownIt({ html: true });

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy('favicon*');
  eleventyConfig.addPassthroughCopy('robots.txt');

  eleventyConfig.addFilter('cssmin', (code) => {
    return new cleanCSS().minify(code).styles;
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  });

  eleventyConfig.addPairedShortcode('markdown', (content) => {
    return md.render(content);
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addCollection('articles', (collectionApi) => {
    return collectionApi.getFilteredByTag('article').sort((a, b) => a.data.title.localeCompare(b.data.title));
  });

  eleventyConfig.addCollection('snippets', (collectionApi) => {
    return collectionApi.getFilteredByTag('snippet').sort((a, b) => a.data.title.localeCompare(b.data.title));
  });

  return {
    dir: {
      input: './',
      output: './_site',
      layouts: './_layouts',
    },
    templateFormats: [
      'html',
      'md',
      'njk',
    ],
  };
};
