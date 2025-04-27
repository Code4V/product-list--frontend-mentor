const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "jpeg", "jpg"],
		widths: ["auto"],
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
});

	eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("products", (collectionsApi) => {
    const allProducts = collectionsApi.getAll()[0].data.products;
    return allProducts;
  })

	return {
		dir: {
			input: "src",
			output: "public"
		}
	}
}