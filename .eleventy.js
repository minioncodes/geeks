module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy(".https://quicksquad.live/assets/css");
    eleventyConfig.addPassthroughCopy(".https://quicksquad.live/assets/js");
    eleventyConfig.addPassthroughCopy(".https://quicksquad.live/assets/images");
    eleventyConfig.addPassthroughCopy("./robots.txt");
    eleventyConfig.addPassthroughCopy("./sitemap.xml");
  
    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };