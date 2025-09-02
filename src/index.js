import githubMarkdownCSS from 'github-markdown-css/github-markdown.css';
import markdownit from 'markdown-it';

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

if (document.contentType === 'text/markdown') {
  const markdownText = document.documentElement.innerText;
  const renderedHtml = md.render(markdownText);

  const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8" />
  <style><![CDATA[${githubMarkdownCSS}]]></style>
  <link rel="stylesheet" type="text/css" href="${browser.runtime.getURL('layout.css')}" />
  <title>-</title>
</head>
<body class="markdown-body">${renderedHtml}</body>
</html>`;

  const parser = new DOMParser();
  const xhtmlDoc = parser.parseFromString(
    xhtmlContent,
    'application/xhtml+xml'
  );
  document.replaceChild(xhtmlDoc.documentElement, document.documentElement);
}
