import chalk from 'chalk';
import { LoggerTypes } from '../constants';

const renderTime = () => {
  const now = new Date();

  // return `[${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`;
  return `[${now.toLocaleTimeString('en-GB' /* 24h */)}]`;
};

const renderScope = (scope: string) => {
  return chalk.green.underline(scope);
};

const renderMessage = (color: chalk.Chalk, messages: any[]) => {
  return messages.map((m) => (typeof m === 'string' ? color(m) : m));
};

const renderLog = (method: LoggerTypes, level: string, color: chalk.Chalk, scope?: string) => {
  return (...messages: any) => {
    const logs: any[] = [];
    logs.push(chalk.greenBright(`MegaCine:`));
    logs.push(renderTime());
    logs.push(level);
    if (scope) {
      logs.push(renderScope(scope));
    }

    console[method](...logs, ...renderMessage(color, messages));
  };
};

const createLogger = (scope?: string) => ({
  debug: renderLog(LoggerTypes.Debug, chalk.cyan('[DEBUG]'), chalk.cyanBright, scope),
  info: renderLog(LoggerTypes.Info, chalk.blue('[INFO]'), chalk.greenBright, scope),
  warn: renderLog(LoggerTypes.Warn, chalk.yellow('[WARN]'), chalk.yellowBright, scope),
  error: renderLog(LoggerTypes.Error, chalk.red('[ERROR]'), chalk.redBright, scope)
});

export const logger = {
  ...createLogger(),
  scope: createLogger
};
