const glob = require("glob");
const path = require("path");
const fs = require("fs");
const { createWebp } = require("./utils");

const globPromise = (pattern, options) => {
  return new Promise((resolve, reject) => {
    const cwd = process.cwd();
    glob(pattern, { ...options, cwd }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

async function convertImagesToWebp(src, dest, quality) {
  try {
    const imageFiles = await globPromise(`${src}/*.{jpg,png,jpeg,webp}`);
    const webpFiles = [];
    for (const file of imageFiles) {
      const { ext, name } = path.parse(file);
      const srcPath = `${src}${name}${ext}`;
      const destPath = `${dest}${name}.webp`;
      if (ext === ".webp") {
        const destFilepath = path.join(dest, `${name}.webp`);
        await fs.promises.copyFile(file, destFilepath);
        webpFiles.push(destFilepath);
      } else {
        const webpBuffer = await createWebp(srcPath, destPath, quality);
        const webpFilepath = path.join(dest, `${name}.webp`);

        // Create the destination directory if it doesn't exist
        await fs.promises.mkdir(dest, { recursive: true });
        webpFiles.push(webpFilepath);
      }
    }
    console.log(
      `Successfully converted ${imageFiles.length} ${
        imageFiles.length === 1 ? "image" : "images"
      } to WebP.`
    );
  } catch (error) {
    console.error(error);
  }
}

async function replaceImagesWithWebp(src, dest) {
  try {
    const replaceFiles = await globPromise("**/*.{html,scss,css}", {
      ignore: ["node_modules/**/*"],
    });
    let replaceCount = 0;
    let foundMatches = false; // Flag to track if any matches were found
    for (const file of replaceFiles) {
      let fileContent = await fs.promises.readFile(file, "utf-8");
      const matches = fileContent.match(
        new RegExp(`(["']?)${src}([^"'>]+)`, "g")
      );
      if (matches && matches.length > 0) {
        for (const match of matches) {
          const imagePath = match.replace(/['"]+/g, ""); // Remove quotes around the image reference
          const imageExtension = path.extname(imagePath);
          const imageName = path.basename(imagePath, imageExtension);
          const webpPath = path
            .join(dest, `${imageName}.webp`)
            .replace(/\\/g, "/");
          if (imageExtension !== ".webp") {
            const replacedMatch = match.replace(imagePath, webpPath);
            const replacedContent = fileContent.replace(match, replacedMatch); // Replace the match
            if (replacedContent !== fileContent) {
              fileContent = replacedContent;
              replaceCount++;
              foundMatches = true;
            }
          }
        }
      }
      await fs.promises.writeFile(file, fileContent);
    }
    if (foundMatches) {
      console.log(
        `Successfully found and replaced ${replaceCount} non-WebP image references in ${
          replaceFiles.length
        } ${replaceFiles.length === 1 ? "file" : "files"}.`
      );
    } else {
      console.log("No matching non-WebP image references found.");
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  convertImagesToWebp,
  replaceImagesWithWebp,
};
