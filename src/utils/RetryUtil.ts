import {logger} from './Loggers';

export async function withRetry<T>(
    operation:()=> Promise<T>,
    retries: number = 3,
    delayMS: number = 1000,
    context: string = 'RetryUtil'

):Promise<T>{


    let lastError:unknown;

    for (let attempt =1; attempt <=retries; attempt++){

        try{

            logger.debug(context, `Attempt ${attempt} of ${retries}`);
            const result = await operation();
            logger.debug(context, `Operation succeeded on attempt ${attempt}`);
            return result;
        }
        catch(error:any){ //eslint-disable-line @typescript-eslint/no-explicit-any

            lastError = error;

            logger.warn(context, `Operation failed on attempt ${attempt}: ${error.message}`)

            if(attempt < retries){

                logger.debug(context, `Waiting for ${delayMS}ms before next attempt`);

                await new Promise(resolve => setTimeout(resolve, delayMS));



            }


        }
    }

    logger.error(context, `All ${retries} attempts failed. Last error: ${lastError.message}`);
    throw lastError;

}