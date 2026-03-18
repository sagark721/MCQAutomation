type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' ;

class Logger{

    private format(level:LogLevel, context:string, message:string): string{

        const timestamp = new Date().toISOString();

        return `[${timestamp}] [${level}] [${context}] : ${message}`;

    }



    info(context:string, message:string):void{
        console.log(this.format('INFO', context, message));
    }


    warn(context:string, message:string):void{
        console.warn(this.format('WARN', context, message));
    }

    error(context:string, message:string):void{
        console.error(this.format('ERROR',context, message));
    }

    debug(context:string, message:string):void{

        if (process.env.DEBUG){
        console.log(this.format('DEBUG', context, message));
        }
    }

}


export const logger = new Logger();
