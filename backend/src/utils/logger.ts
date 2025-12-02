const COLORS = {
    RESET: "\x1b[0m",
    BRIGHT: "\x1b[1m",
    DIM: "\x1b[2m",
    UNDERSCORE: "\x1b[4m",
    BLINK: "\x1b[5m",
    REVERSE: "\x1b[7m",
    HIDDEN: "\x1b[8m",

    FG_BLACK: "\x1b[30m",
    FG_RED: "\x1b[31m",
    FG_GREEN: "\x1b[32m",
    FG_YELLOW: "\x1b[33m",
    FG_BLUE: "\x1b[34m",
    FG_MAGENTA: "\x1b[35m",
    FG_CYAN: "\x1b[36m",
    FG_WHITE: "\x1b[37m",
};

export enum LOG_LEVEL {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

function getColor(level: LOG_LEVEL) {
    switch (level) {
        case LOG_LEVEL.INFO:
            return COLORS.FG_BLUE;
        case LOG_LEVEL.WARN:
            return COLORS.FG_YELLOW;
        case LOG_LEVEL.ERROR:
            return COLORS.FG_RED;
        case LOG_LEVEL.DEBUG:
            return COLORS.FG_CYAN;
        default:
            return COLORS.RESET;
    }
}

function format(level: LOG_LEVEL, message: string, context?: string): string {
    const date = new Date();
    const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const color  = getColor(level);
    const ctx = context ? `${context.toUpperCase()}` : "";
    return `[${formattedDate}] [${COLORS.BRIGHT}${color}${level}${COLORS.RESET}] [${COLORS.BRIGHT}${color}${ctx}${COLORS.RESET}]: ${message}`;
}

export const logger = {
    info: (msg: string, ctx?: string) => console.log(format(LOG_LEVEL.INFO, msg, ctx)),
    warn: (msg: string, ctx?: string) => console.warn(format(LOG_LEVEL.WARN, msg, ctx)),
    error: (msg: string, ctx?: string) => console.error(format(LOG_LEVEL.ERROR, msg, ctx)),
    debug: (msg: string, ctx?: string) => {
        if (process.env.NODE_ENV !== "production") {
            console.log(format(LOG_LEVEL.DEBUG, msg, ctx))
        }
    }
}