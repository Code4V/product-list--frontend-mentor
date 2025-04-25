const path = require("node:path");
const Image = require("@11ty/eleventy-img");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");


module.exports = function (eleventyConfig) {
 
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg", "jpg"],

		// output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
	});


  eleventyConfig.addCollection("products", function (collectionsApi) {
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