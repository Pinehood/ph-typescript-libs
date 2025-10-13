import { AxiosHeaders } from 'axios';
import {
  EContentExtractorTakes,
  EContentExtractorTypes,
  EContentSubmitterTypes,
  EContentTransformerReplaceOccurences,
  EContentTransformerTypes,
  EHttpMethods,
  ELinkExtractorTypes,
  EScraperUseForRequests,
} from './enums';

export type BaseLinkExtractor = {
  fetching: FetchDetails;
};

export type RegexLinkExtractor = {
  type: ELinkExtractorTypes.TEXT;
  selector: RegExp;
};

export type NormalLinkExtractor = {
  type: ELinkExtractorTypes.HTML | ELinkExtractorTypes.JSON;
  selector: string;
};

export type ContentExtractor = {
  property: string;
  selector: string;
  transfomers?: ContentTransfomer[];
  remove?: string[];
  type?: Lowercase<keyof typeof EContentExtractorTypes>;
  take?: Lowercase<keyof typeof EContentExtractorTakes>;
};

export type SimpleContentTransfomer = {
  type:
    | EContentTransformerTypes.TRIM
    | EContentTransformerTypes.UPPERCASE
    | EContentTransformerTypes.LOWERCASE;
};

export type NumericContentTransformer = {
  type: EContentTransformerTypes.SUBSTRING | EContentTransformerTypes.SLICE;
  from: number;
  to: number;
};

export type StringContentTransfomer = {
  type: EContentTransformerTypes.REPLACE;
  occurence: Lowercase<keyof typeof EContentTransformerReplaceOccurences>;
  what: string;
  with: string;
};

export type CombinedContentTransfomer = {
  type:
    | EContentTransformerTypes.SPLIT
    | EContentTransformerTypes.PAD_END
    | EContentTransformerTypes.PAD_START;
  index: number;
  value: string;
};

export type FileContentSubmitter = {
  type: EContentSubmitterTypes.FILE;
  destination: string;
};

export type RequestContentSubmitter = {
  type: EContentSubmitterTypes.REQUEST;
  url: string;
  method: EHttpMethods.POST | EHttpMethods.PUT;
  headers?: AxiosHeaders | RequestInit['headers'];
};

export type ConsoleLogContentSubmitter = {
  type: EContentSubmitterTypes.CONSOLE;
};

export type FetchDetails = {
  method: keyof typeof EHttpMethods;
  headers?: AxiosHeaders | RequestInit['headers'];
  body?: unknown;
};

export type LinkExtractor = BaseLinkExtractor &
  (RegexLinkExtractor | NormalLinkExtractor);

export type ContentTransfomer =
  | SimpleContentTransfomer
  | NumericContentTransformer
  | StringContentTransfomer
  | CombinedContentTransfomer;

export type ContentSubmitter =
  | FileContentSubmitter
  | RequestContentSubmitter
  | ConsoleLogContentSubmitter;

export type ScraperConfig = {
  use: TScraperUseForRequests;
  name: string;
  base: string;
  favicon: string;
  roots: string[];
  links: LinkExtractor;
  remove: string[];
  scrape: ContentExtractor[];
  submit: ContentSubmitter;
};

export type ScrapedContent = {
  error?: unknown;
  scraper: {
    name: string;
    base: string;
    favicon: string;
  };
  stats: {
    amount: number;
    start: number;
    end: number;
  };
  entries: ScrapedContentEntry[];
  submitted: boolean;
};

export type ScrapedContentEntry = {
  from: string;
  values: ScrapedContentEntryValue[];
};

export type ScrapedContentEntryValue = {
  property: string;
  value: string;
};

export type TScraperUseForRequests = Lowercase<
  keyof typeof EScraperUseForRequests
>;
