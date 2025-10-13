import * as fs from 'fs';
import { RequestService } from './request';
import { OK } from '../utils/consts';
import { EContentSubmitterTypes } from '../utils/enums';
import {
  ContentSubmitter,
  ScrapedContent,
  TScraperUseForRequests,
} from '../utils/types';

export class SubmitService {
  static async send(
    use: TScraperUseForRequests,
    submitter: ContentSubmitter,
    content: ScrapedContent
  ): Promise<boolean> {
    if (content.entries?.length > 0) {
      switch (submitter.type) {
        case EContentSubmitterTypes.REQUEST: {
          const response = await RequestService.send(use, submitter.url, {
            method: submitter.method,
            headers: submitter.headers,
            body: content,
          });
          return response?.status.toString().startsWith(OK) ?? false;
        }

        case EContentSubmitterTypes.FILE:
          fs.writeFileSync(submitter.destination, JSON.stringify(content));
          return true;

        case EContentSubmitterTypes.CONSOLE:
          console.log(JSON.stringify(content));
          return true;

        default:
          return false;
      }
    }
    return false;
  }
}
