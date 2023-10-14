import { type TranslateOptions, type Replacements } from 'i18n';

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      userPayload?: Record<string, string>;

      translate: (phraseOrOptions: string | TranslateOptions, ...replace: string[]) => string;

      translate: (phraseOrOptions: string | TranslateOptions, replacements: Replacements) => string;
    }

    interface Response {
      translate: (phraseOrOptions: string | TranslateOptions, ...replace: string[]) => string;

      translate: (phraseOrOptions: string | TranslateOptions, replacements: Replacements) => string;
    }
  }
}
