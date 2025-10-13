## Introduction

Shared library for "ph-portals" and "ph-configurable-web-scraper" projects.

## Installations

- [Node.js](https://nodejs.org/en/download/) (version >= 18.10.0)
- [Visual Studio Code](https://code.visualstudio.com/download) (and "Prettier - Code formatter" extension)

## Setup

1. Prerequisites:

- must have installed tools from the "Installations" section
- must have checked out / cloned source code from this repository

2. Open up the cloned repository/project/folder and run following commands in the given order, one by one:

   ```
   npm install
   npm run build
   ```

3. Both of the above commands should have completed successfully, and should have not caused any "package.json" or "package-lock.json" changes.

## Explanation

```typescript
type ScraperConfig = {
  // Choose what to use for req/res
  use: 'axios' | 'fetch';

  // Name of the scraper
  name: string;

  // Base URL of the website you want to scrape
  base: string;

  // Favicon URL of the website
  favicon: string;

  // Base/root links that other content links will be extracted from
  roots: string[];

  // Configuration object that is used for the content link extraction from the root links
  // "fetching" - method (GET, POST, PUT), headers and body to perform an HTTP request to retrieve root links contents
  // "type" - either "text", "html" or "json"
  // "selector" - either a HTML/JSON path selector string (for "html" or "json") or Regular Expression (for "text")
  links: LinkExtractor;

  // Array of HTML elements to remove from the content itself, before any actual scraping starts
  remove: string[];

  // Array of configuration objects used for actual content extraction from the previously extracted content links
  // "property" - name of property that the extracted value will be assigned to in final result object
  // "selector" - HTML path selector string
  // "transfomers" - array of "ContentTransformer" configuration object, that is able to transform extracted data by performing various functions upon it
  // -> available "transformers": trim, uppercase, lowercase, substring, slice, replace, padEnd, padStart
  // "remove" - additional array of HTML elements to remove from the content itself
  // "type" - should Cheerio take "text" or "html" value from the element
  // "take" - should Cheerio take "first", "last" or "normal" order element
  scrape: ContentExtractor[];

  // Configuration object that is used for either file saving of scraped content or sending an HTTP requests towards arbitrary 3rd party website endpoint
  // "type" - either "file" or "request", to save the content to FS or upload it to 3rd party web service
  // "destination" - if type=file, path to the file where the content will be saved
  // "url" - if type=request, URL of the website where the content will be uploaded
  // "method" - if type=request, HTTP method to be used, either POST or PUT
  // "headers" - if type=request, headers object, for HTTP request header addition and usage
  submit: ContentSubmitter;
};
```

## Example

A simple, working JSON configuration object that can be used to scrape articles from Dnevno.hr news portal into a local JSON file.

```json
{
  "use": "axios",
  "name": "Dnevno.hr News Portal",
  "base": "https://www.dnevno.hr",
  "favicon": "https://dnevno.hr/favicon.ico",
  "roots": [
    "https://www.dnevno.hr/category/vijesti",
    "https://www.dnevno.hr/category/sport",
    "https://www.dnevno.hr/category/magazin",
    "https://www.dnevno.hr/category/gospodarstvo-i-turizam",
    "https://www.dnevno.hr/category/planet-x",
    "https://www.dnevno.hr/category/zdravlje",
    "https://www.dnevno.hr/category/domovina",
    "https://www.dnevno.hr/category/vjera"
  ],
  "links": {
    "fetching": {
      "method": "GET"
    },
    "selector": "article.post a",
    "type": "html"
  },
  "remove": [
    "img",
    "iframe",
    "div.wpipa-container",
    "div.lwdgt-container",
    "p.lwdgt-logo",
    "center",
    "blockquote",
    "figure",
    "figcaption"
  ],
  "scrape": [
    { "property": "title", "selector": "h1" },
    { "property": "lead", "selector": "a.title" },
    {
      "property": "time",
      "selector": "time.date",
      "take": "first",
      "type": "text",
      "transfomers": [
        {
          "type": "split",
          "value": ",",
          "index": 1
        },
        {
          "type": "trim"
        }
      ]
    },
    {
      "property": "author",
      "selector": "span.author",
      "take": "first",
      "transformers": [
        {
          "type": "split",
          "value": "Autor:",
          "index": 1
        },
        {
          "type": "trim"
        }
      ]
    },
    {
      "remove": [
        "div.img-holder",
        "div.heading",
        "h1",
        "style",
        "div.info",
        "div.info-holder"
      ],
      "property": "content",
      "selector": "section.description",
      "type": "html"
    }
  ],
  "submit": {
    "type": "file",
    "destination": "./dnevno.json"
  }
}
```
