import { CHAR, HTTP } from '../utils/consts';
import {
  EContentTransformerReplaceOccurences,
  EContentTransformerTypes,
} from '../utils/enums';
import { ContentTransfomer, ScraperConfig } from '../utils/types';

export class TransformService {
  static link(link: string, config: ScraperConfig): string {
    let finalLink = link;
    if (!finalLink.startsWith(HTTP)) {
      if (!finalLink.startsWith(CHAR)) {
        finalLink = `${config.base}${CHAR}${link}`;
      } else {
        finalLink = `${config.base}${link}`;
      }
    }
    return finalLink;
  }

  static content(value: string, transfomers?: ContentTransfomer[]): string {
    let finalValue = value;
    if (transfomers && transfomers.length > 0) {
      transfomers.forEach((transformer) => {
        switch (transformer.type) {
          case EContentTransformerTypes.REPLACE:
            if (
              transformer.occurence ===
              EContentTransformerReplaceOccurences.FIRST
            ) {
              finalValue = finalValue.replace(
                transformer.what,
                transformer.with
              );
            } else if (
              transformer.occurence ===
              EContentTransformerReplaceOccurences.LAST
            ) {
              const lastIndex = finalValue.lastIndexOf(transformer.what);
              if (lastIndex !== -1) {
                finalValue =
                  finalValue.substring(0, lastIndex) +
                  transformer.with +
                  finalValue.substring(lastIndex + transformer.what.length);
              }
            } else {
              finalValue = finalValue.replace(
                new RegExp(transformer.what, 'g'),
                transformer.with
              );
            }
            break;
          case EContentTransformerTypes.SUBSTRING:
            finalValue = finalValue.substring(transformer.from, transformer.to);
            break;
          case EContentTransformerTypes.SPLIT:
            finalValue = finalValue.split(transformer.value)[transformer.index];
            break;
          case EContentTransformerTypes.TRIM:
            finalValue = finalValue.trim();
            break;
          case EContentTransformerTypes.UPPERCASE:
            finalValue = finalValue.toUpperCase();
            break;
          case EContentTransformerTypes.LOWERCASE:
            finalValue = finalValue.toLowerCase();
            break;
          case EContentTransformerTypes.SLICE:
            finalValue = finalValue.slice(transformer.from, transformer.to);
            break;
          case EContentTransformerTypes.PAD_END:
            finalValue = finalValue.padEnd(
              transformer.index,
              transformer.value
            );
            break;
          case EContentTransformerTypes.PAD_START:
            finalValue = finalValue.padStart(
              transformer.index,
              transformer.value
            );
            break;
          default:
            break;
        }
      });
    }
    return finalValue;
  }
}
