type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' ;

class Logger{

    private format(level:LogLevel, context:string, message:string): string{

        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const HH = String(now.getHours()).padStart(2, '0');
        const MM = String(now.getMinutes()).padStart(2, '0');
        const SS = String(now.getSeconds()).padStart(2, '0');
        const timestamp = `${dd}-${mm}-${yyyy} : ${HH}:${MM}:${SS}`;

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
