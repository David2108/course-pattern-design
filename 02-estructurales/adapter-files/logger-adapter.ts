import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter
interface ILoggerAdapter {

    file: string;

    /*
     * Existen dos formas de definir la firma de un método en TypeScript:
     * writeLog: (param: type) => returnType
     * writeLog(param: type): returnType
     */
    writeLog: (msg: string) => void;
    writeWarning: (msg: string) => void;
    writeError: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {

    public file: Logger;
    private logger = new Logger();

    constructor(file: string) {
        this.file = file;
    }

    writeLog(msg: string){
        this.logger.info(`[${this.file} Log] ${msg}`);
    }

    writeWarning(msg: string){
        this.logger.warn(`[${this.file} Warning] ${msg}`);
    }
    
    writeError(msg: string){
        this.logger.error(`[${this.file} Error] ${msg}`);
    }
}