// Tiny console logger. Scope-tagged so app logs are easy to filter, and
// `debug` stays silent in production builds.

const PREFIX = "studiospace";

export type Logger = {
  /** Logged only in development. */
  debug: (message: string, context?: unknown) => void;
  info: (message: string, context?: unknown) => void;
  warn: (message: string, context?: unknown) => void;
  error: (message: string, context?: unknown) => void;
};

function emit(
  level: "log" | "info" | "warn" | "error",
  scope: string,
  message: string,
  context?: unknown
) {
  const tag = `[${PREFIX}:${scope}]`;

  if (context === undefined) {
    console[level](tag, message);
  } else {
    console[level](tag, message, context);
  }
}

export function createLogger(scope: string): Logger {
  return {
    debug: (message, context) => {
      if (process.env.NODE_ENV !== "production") {
        emit("log", scope, message, context);
      }
    },
    info: (message, context) => emit("info", scope, message, context),
    warn: (message, context) => emit("warn", scope, message, context),
    error: (message, context) => emit("error", scope, message, context),
  };
}
