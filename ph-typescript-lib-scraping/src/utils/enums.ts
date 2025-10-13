export enum EScraperUseForRequests {
  AXIOS = 'axios',
  FETCH = 'fetch',
}

export enum ELinkExtractorTypes {
  TEXT = 'text',
  HTML = 'html',
  JSON = 'json',
}

export enum EContentExtractorTypes {
  TEXT = 'text',
  HTML = 'html',
}

export enum EContentExtractorTakes {
  FIRST = 'first',
  LAST = 'last',
  NORMAL = 'normal',
}

export enum EContentTransformerTypes {
  TRIM = 'trim',
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  SUBSTRING = 'substring',
  SLICE = 'slice',
  REPLACE = 'replace',
  SPLIT = 'split',
  PAD_END = 'padEnd',
  PAD_START = 'padStart',
}

export enum EContentTransformerReplaceOccurences {
  FIRST = 'first',
  LAST = 'last',
  ALL = 'all',
}

export enum EContentSubmitterTypes {
  FILE = 'file',
  REQUEST = 'request',
  CONSOLE = 'console',
}

export enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}
