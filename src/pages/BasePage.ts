import {Page, expect,Locator} from '@playwright/test';
import { WaitHelpers} from '../utils/WaitHelpers';
import {logger} from '../utils/Loggers'

export abstract class BasePage{

    protected abstract readonly path: string;
    protected abstract readonly pageName: string;
    private readonly allowCookiesButton:Locator; 

    constructor(protected readonly page:Page){

        this.allowCookiesButton=this.page.getByRole('button',{name:'Allow'})

    }

    async goto(): Promise<void>{
        logger.info(this.pageName, `Navigating to ${this.path}`);
        await this.page.goto(this.path);
        await WaitHelpers.waitForPageReady(this.page)
       

        const isCookiesBannerVisible= await this.allowCookiesButton.isVisible();

        if(isCookiesBannerVisible){

            await logger.info(this.pageName, "Cookies banner is visible. Attempting to allow cookies.");
            await this.allowCookies();
        }

         logger.info(this.pageName, `Successfully navigated to ${this.path}`);
        
    }


    private async allowCookies():Promise<void>{
        logger.info(this.pageName,"Allowing the Cookies")
        await this.allowCookiesButton.click();
        await WaitHelpers.waitForNetworkIdle(this.page)
        logger.info(this.pageName,"Cookies allowed successfully")

    }


    async verifyOnCorrectPage():Promise<void>{
        logger.info(this.pageName, "Validating if we are on the correct page");
        await expect(this.page).toHaveURL(new RegExp(this.path))
        logger.info(this.pageName, "Successfully validated that we are on the correct page");

    }




}