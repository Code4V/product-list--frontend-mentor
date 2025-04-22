const path = require("node:path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("png,jpeg,jpg", {
		read: false, // Don’t read the input file, argument is now a file path
		parser: async (imagePath) => {
			let stats = await Image(imagePath, {
				widths: ["auto"],
				formats: ["avif", "webp", "jpg"],
				outputDir: path.join(eleventyConfig.dir.output, "img", "built"),
			});

			return {
				image: {
					stats,
				},
			};
		},
	});

  eleventyConfig.addShortcode("dataCascadeImage", (stats, alt, sizes) => {
		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};
		return Image.generateHTML(stats, imageAttributes);
	});


  eleventyConfig.addCollection("products", function (collectionsApi) {
    const allProducts = collectionsApi.getAll()[0].data.products;
    return allProducts;
  })

}