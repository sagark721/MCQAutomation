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
        logger.info(this.pageName, `Successfully navigated to ${this.path}`);
        
    }


    async allowCookies():Promise<void>{
        logger.info(this.pageName,"Allowing the Cookies")
        await this.allowCookiesButton.click();
        await WaitHelpers.waitForPageReady(this.page)

    }


    async verifyOnCorrectPage():Promise<void>{
        logger.info(this.pageName, "Validating if we are on the correct page");
        await expect(this.page).toHaveURL(new RegExp(this.path))
        logger.info(this.pageName, "Successfully validated that we are on the correct page");

    }




}