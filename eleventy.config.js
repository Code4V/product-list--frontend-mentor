const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const path = require("node:path");
const sass = require("sass");

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

	// eleventyConfig.addPassthroughCopy("src/assets");

	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		useLayouts: false,
		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			
			if (parsed.name.startsWith("_")) { return; }
			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".", 
					this.config.dir.includes,
				]
			});

			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			}
		}

	})

	eleventyConfig.addFilter("preserveDecimal", function (number) {
		return number.toFixed(2).toString();
	})

	return {
		dir: {
			input: "src",
			output: "public"
		}
	}
}