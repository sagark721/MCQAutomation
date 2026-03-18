import {Page} from '@playwright/test'
import {logger} from './Loggers'

export class WaitHelpers{
    

    static async waitForPageReady(page:Page):Promise<void>{

        logger.debug('WaitHelpers', 'Waiting for page to be Ready');

        await page.waitForLoadState('domcontentloaded');
        await WaitHelpers.waitForNetworkIdle(page);
        logger.debug('WaitHelpers', 'Page is ready now');


    }



    static async waitForNetworkIdle(page: Page): Promise<void>{

        logger.debug('WaitHelpers', 'Waiting for network to be idle');
        await page.waitForLoadState('networkidle');
        logger.debug('WaitHelpers', 'Network is idle now');
    }


    static async waitForURL(page:Page, urlPattern: string | RegExp): Promise<void>{

        logger.debug('WaitHelpers', `Waiting for URL to match pattern: ${urlPattern}`);
        await page.waitForURL(urlPattern,{timeout: 30 * 1000});
        logger.debug('WaitHelpers', `URL matched the pattern: ${urlPattern}`);
    }


    static async waitForElementToBeVisible(page:Page, selector:string):Promise<void>{

        logger.debug('WaitHelpers', `Waiting for element to be visible: ${selector}`);
        await page.locator(selector).waitFor({state:'visible', timeout: 10 * 1000});
        logger.debug('WaitHelpers', `Element is visible now: ${selector}`);
    }
}