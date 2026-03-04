type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  [key: string]: unknown
}

function formatEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  }
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>) {
    console.info(JSON.stringify(formatEntry('info', message, meta)))
  },

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(JSON.stringify(formatEntry('warn', message, meta)))
  },

  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    const errorMeta: Record<string, unknown> = { ...meta }

    if (error instanceof Error) {
      errorMeta.errorName = error.name
      errorMeta.errorMessage = error.message
      errorMeta.stack = error.stack
    } else if (error !== undefined) {
      errorMeta.errorValue = String(error)
    }

    console.error(JSON.stringify(formatEntry('error', message, errorMeta)))
  },
}
