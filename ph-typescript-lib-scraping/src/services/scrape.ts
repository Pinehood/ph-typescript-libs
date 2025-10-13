import * as cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { ExtractService } from './extract';
import { TransformService } from './transform';
import { RequestService } from './request';
import { SubmitService } from './submit';
import { EScraperUseForRequests } from '../utils/enums';
import {
  ScrapedContent,
  ScrapedContentEntry,
  ScraperConfig,
} from '../utils/types';

export class ScrapeService {
  static async scrape(config: ScraperConfig): Promise<ScrapedContent> {
    try {
      const start = new Date().getTime();
      const content: ScrapedContentEntry[] = [];
      for (let i = 0; i < config.roots.length; i++) {
        const root = config.roots[i];
        const rootResponse = await RequestService.send(
          config.use,
          root,
          config.links.fetching
        );

        let data: string = '';
        if (config.use === EScraperUseForRequests.AXIOS) {
          const res = rootResponse as AxiosResponse<unknown, unknown>;
          if (!res || !res.data) {
            continue;
          }
          data = res.data as string;
        } else if (config.use === EScraperUseForRequests.FETCH) {
          const res = rootResponse as Response;
          if (!res) {
            continue;
          }
          data = await res.text();
        }

        const links = ExtractService.links(data, config);
        if (!links || links.length <= 0) {
          continue;
        }

        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          const entry: ScrapedContentEntry = {
            from: link,
            values: [],
          };

          const linkResponse = await RequestService.send(
            config.use,
            link,
            config.links.fetching
          );

          let page: string = '';
          if (config.use === EScraperUseForRequests.AXIOS) {
            const res = linkResponse as AxiosResponse<unknown, unknown>;
            if (!res || !res.data) {
              continue;
            }
            page = res.data as string;
          } else if (config.use === EScraperUseForRequests.FETCH) {
            const res = linkResponse as Response;
            if (!res) {
              continue;
            }
            page = await res.text();
          }

          const $ = cheerio.load(page);
          config.remove.forEach((removal) => $(removal).remove());
          config.scrape.forEach((extractor) => {
            if (extractor.remove && extractor.remove.length > 0) {
              extractor.remove.forEach((removal) => $(removal).remove());
            }
            entry.values.push({
              property: extractor.property,
              value: TransformService.content(
                ExtractService.content($, extractor)!,
                extractor.transfomers
              ),
            });
          });
          content.push(entry);
        }
      }

      const end = new Date().getTime();
      const scrapedContent: ScrapedContent = {
        scraper: {
          name: config.name,
          base: config.base,
          favicon: config.favicon,
        },
        stats: {
          amount: content.length,
          start,
          end,
        },
        entries: content,
        submitted: false,
      };
      scrapedContent.submitted = await SubmitService.send(
        config.use,
        config.submit,
        scrapedContent
      );
      return scrapedContent;
    } catch (error) {
      return {
        error,
        scraper: {
          name: config.name,
          base: config.base,
          favicon: config.favicon,
        },
        stats: {
          amount: 0,
          start: 0,
          end: 0,
        },
        entries: [],
        submitted: false,
      };
    }
  }
}
