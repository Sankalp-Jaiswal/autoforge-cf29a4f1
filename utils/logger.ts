// A simple logger utility for client-side and API routes.
// In a larger application, consider a more robust solution like pino or winston for backend logging.

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

const log = (level: LogLevel, message: string, ...args: any[]) => {
  // Only log in development or if explicitly configured
  if (process.env.NODE_ENV === 'development' || typeof window === 'undefined') { // Always log backend errors
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'info':
        console.info(logMessage, ...args);
        break;
      case 'warn':
        console.warn(logMessage, ...args);
        break;
      case 'error':
        console.error(logMessage, ...args);
        break;
      case 'debug':
        if (process.env.NEXT_PUBLIC_DEBUG_LOGGING === 'true') {
          console.log(logMessage, ...args);
        }
        break;
      default:
        console.log(logMessage, ...args);
    }
  }
};

export const logger: Logger = {
  info: (message, ...args) => log('info', message, ...args),
  warn: (message, ...args) => log('warn', message, ...args),
  error: (message, ...args) => log('error', message, ...args),
  debug: (message, ...args) => log('debug', message, ...args),
};
