declare global {
  // namespace NodeJS {
  //   let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  // }

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

      sendOK: ({ message, data, extra }: ISuccessResponse = {}) => this;
      sendCREATED: ({ message, data, extra }: ISuccessResponse = {}) => this;
    }
  }
}

export default global;
