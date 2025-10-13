import * as cheerio from 'cheerio';
import jsonpath from 'jsonpath';
import { AnyNode } from 'domhandler';
import { TransformService } from './transform';
import { EMPTY, HREF } from '../utils/consts';
import {
  EContentExtractorTakes,
  EContentExtractorTypes,
  ELinkExtractorTypes,
} from '../utils/enums';
import { ContentExtractor, ScraperConfig } from '../utils/types';

export class ExtractService {
  static links(data: string, config: ScraperConfig): string[] {
    const links: string[] = [];
    switch (config.links.type) {
      case ELinkExtractorTypes.TEXT:
        links.push(
          ...(data.match(config.links.selector) ?? []).map((link) =>
            TransformService.link(link, config)
          )
        );
        break;

      case ELinkExtractorTypes.HTML: {
        const $ = cheerio.load(data);
        $(config.links.selector).each((_, el) => {
          const link = TransformService.link($(el).attr(HREF)!, config);
          if (links.findIndex((el) => el == link) == -1) {
            links.push(link);
          }
        });
        break;
      }

      case ELinkExtractorTypes.JSON: {
        const selector = config.links.selector;
        const json = JSON.parse(data) as object;
        links.push(...jsonpath.query(json, selector));
        break;
      }

      default:
        break;
    }
    return links;
  }

  static content(
    $: cheerio.CheerioAPI,
    extractor: ContentExtractor
  ): string | null {
    let node: cheerio.Cheerio<AnyNode> | null = null;
    switch (extractor.take) {
      case EContentExtractorTakes.FIRST:
        node = $(extractor.selector).first();
        break;

      case EContentExtractorTakes.LAST:
        node = $(extractor.selector).last();
        break;

      default:
      case EContentExtractorTakes.NORMAL:
        node = $(extractor.selector);
        break;
    }

    if (!node) {
      return EMPTY;
    }

    let value: string | null = EMPTY;
    switch (extractor.type) {
      case EContentExtractorTypes.HTML:
        value = node.html();
        break;

      case EContentExtractorTypes.TEXT:
      default:
        value = node.text();
        break;
    }
    return value;
  }
}
