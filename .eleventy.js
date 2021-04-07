module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy('favicon.*');

  return {
    dir: {
      input: './',
      output: './_site',
      layouts: './_layouts',
    },
    templateFormats: [
      'html',
      'md',
    ],
  };
};
