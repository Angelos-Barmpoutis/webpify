#!/usr/bin/env node

const yargs = require("yargs");
const readline = require("readline");
const { convertImagesToWebp, replaceImagesWithWebp } = require("../index");

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 [options]")
  .options({
    s: {
      alias: "src",
      demandOption: true,
      describe: "Source directory of images",
      type: "string",
    },
    d: {
      alias: "dest",
      demandOption: true,
      describe: "Destination directory for converted images",
      type: "string",
    },
    r: {
      alias: "replace",
      describe:
        "Replace images in HTML and CSS files with their WebP equivalents",
      type: "boolean",
    },
  })
  .help("h")
  .alias("h", "help")
  .epilogue("For more information, visit https://yourwebsite.com").argv;

const { src, dest, replace } = argv;

convertImagesToWebp(src, dest)
  .then(() => {
    console.log(`Conversion complete\n`);
    if (replace) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        "Do you want to replace non-WebP image references in HTML and CSS files? (y/n): ",
        (answer) => {
          rl.close();
          if (answer.toLowerCase() === "y") {
            replaceImagesWithWebp(src, dest)
              .then(() => {
                console.log("Replacement complete");
              })
              .catch((err) => {
                console.error("Error during replacement:", err);
              });
          } else {
            console.log("Replacement skipped.");
          }
        }
      );
    }
  })
  .catch((err) => {
    console.error("Error during conversion:", err);
  });
