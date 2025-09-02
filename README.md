# Markdown Firefox Plugin

A Firefox extension that renders `text/markdown` content as HTML using markdown-it, with validated XHTML output.

## Features

- Automatically renders markdown files in Firefox
- Uses GitHub-flavored CSS styling
- Generates XHTML 1.0 Strict compliant output
- Built-in HTML validation

## Development

### Setup

```bash
bun install
```

### Build

```bash
bun run build
```

### Validation

The project includes automated HTML validation to ensure the generated XHTML is W3C compliant:

```bash
bun run validate
```

### Git Pre-commit Hook Setup

To automatically run tests and validation before each commit, set up a pre-commit hook.

Create the hook file:

```bash
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Add this content to `.git/hooks/pre-commit`:

```bash
#!/bin/sh

echo "Running pre-commit validation ..."

if ! bun run validate; then
    echo " Validation failed. Commit aborted."
    exit 1
fi

if ! bun run lint; then
    echo " Linting failed. Commit aborted."
    exit 1
fi

if ! bun run check; then
    echo " Checking failed. Commit aborted."
    exit 1
fi

echo "Pre-commit checks passed!"
```

## Scripts

- `bun run build` - Build the webpack bundle
- `bun run validate` - Validate HTML output from markdown processing
- `bun run lint` - Run biome linting
- `bun run format` - Format code with biome
- `bun run check` - Run biome checks
- `bun run check:fix` - Run biome checks and fix issues

## Installation

Load the extension in Firefox:

1. Build the project: `bun run build`
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

## How it works

The extension detects when Firefox loads a `text/markdown` file and:

1. Extracts the markdown content
2. Processes it using markdown-it
3. Generates XHTML 1.0 Strict compliant output
4. Applies GitHub-flavored CSS styling
5. Replaces the page content with the rendered HTML
