# Webpify

Converts images to WebP format and replaces non-WebP image references in HTML and CSS files.

## Description

Webpify is a command-line tool that allows you to convert images to the WebP format. It provides two main functionalities:

1. **Image Conversion**: Converts images (JPEG, PNG, and GIF) to WebP format, reducing file size while maintaining image quality.
2. **Image Reference Replacement**: Replaces non-WebP image references in HTML and CSS files with their WebP equivalents, ensuring optimal performance on the web.

## Features

- Converts images (JPEG, PNG, and GIF) to WebP format.
- Replaces non-WebP image references in HTML and CSS files with WebP equivalents.
- Provides command-line interface for easy execution and integration into build processes.
- Preserves image quality while significantly reducing file size.
- Supports bulk image conversion and reference replacement.
- Works with both local and remote file paths.

## Installation

To use Webpify, you need to have Node.js installed on your machine. Once Node.js is installed, you can install the package globally using npm:

```bash
npm install -g webpify
```

## Usage

The package provides a command-line interface (CLI) to perform image conversion and reference replacement.

### Image Conversion

To convert images to WebP format, use the following command:

```bash
webpify --src <source_directory> --dest <destination_directory>
```

- `<source_directory>`: The directory containing the images to be converted.
- `<destination_directory>`: The directory where the converted WebP images will be saved.

This command converts all images (JPEG, PNG, and GIF) in the source directory to WebP format and saves them in the destination directory.

### Image Reference Replacement

To replace non-WebP image references in HTML and CSS files with their WebP equivalents, use the following command:

```bash
webpify --src <source_directory> --dest <destination_directory> --replace
```

- `<source_directory>`: The directory containing the HTML and CSS files with image references.
- `<destination_directory>`: The directory where the converted WebP images are stored.
- `--replace`: Optional flag to indicate that image references should be replaced.

This command scans all HTML and CSS files in the source directory, finds non-WebP image references, and replaces them with their WebP equivalents. The modified files are saved in the same location.

**Note**: The `--replace` flag is optional. If not provided, the image references will not be replaced.

## Examples

### Image Conversion Example

Convert all images in the `images` directory to WebP format and save them in the `converted` directory:

```bash
webpify --src images --dest converted
```

### Image Reference Replacement Example

Convert images in the `images` directory to WebP format and replace image references in HTML and CSS files in the `src` directory:

```bash
webpify --src src --dest images --replace
```

## Dependencies

Webpify relies on the following dependencies:

- glob: ^7.1.7
- sharp: ^0.28.3
- webp-converter: ^2.3.0
- yargs: ^17.0.1

These dependencies will be automatically installed when you install the package.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on GitHub.

## Credits

Webpify was created by [Angelos Barmpoutis](https://github.com/Angelos-Barmpoutis).
