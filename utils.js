const { promisify } = require("util");
const { exec } = require("child_process");

const execPromise = promisify(exec);

async function createWebp(image) {
  try {
    const { width, height } = await image.metadata();
    const webpOptions = `-q 85 -resize ${width} ${height}`;
    const { stdout } = await execPromise(
      `echo "${await image.toBuffer()}" | cwebp ${webpOptions} -quiet -mt -o -`
    );
    return Buffer.from(stdout, "binary");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createWebp,
};
