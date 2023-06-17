const { promisify } = require("util");
const { exec } = require("child_process");
const webp = require("webp-converter");

const execPromise = promisify(exec);

async function createWebp(srcPath, destPath, quality = 85) {
  try {
    webp.cwebp(srcPath, destPath, `-q ${quality}`, (logging = "-v"));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createWebp,
};
