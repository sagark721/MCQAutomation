import {Page, expect,Locator} from '@playwright/test';
import { WaitHelpers} from '../utils/WaitHelpers';
import {logger} from '../utils/Loggers'
import { HeaderComponent } from 'src/components/HeaderComponent';
import { ProfileDropdownComponent } from 'src/components/ProfileDropdownComponent';

export abstract class BasePage{

    protected abstract readonly path: string;
    protected abstract readonly pageName: string;
    private readonly allowCookiesButton:Locator; 
    public readonly header:HeaderComponent;
    public readonly profileDropdownComponent:ProfileDropdownComponent;

    constructor(protected readonly page:Page){

        this.allowCookiesButton=this.page.getByRole('button',{name:'Allow'})
        this.header = new HeaderComponent(page);
        this.profileDropdownComponent = new ProfileDropdownComponent(page);

    }

    async goto(): Promise<void>{
        logger.info(this.pageName, `Navigating to ${this.path}`);
        await this.page.goto(this.path);
        await WaitHelpers.waitForPageReady(this.page)
        // await expect(this.allowCookiesButton).toBeVisible({timeout:15000})
       

        // const isCookiesBannerVisible= await this.allowCookiesButton.isVisible({timeout:15000});

        // if(isCookiesBannerVisible){

        //     logger.info(this.pageName, "Cookies banner is visible. Attempting to allow cookies.");
        //     await this.allowCookies();
        // }

         logger.info(this.pageName, `Successfully navigated to ${this.path}`);
        
    }

    async acceptCookiesIfVisible():Promise<void>{
        try{
            logger.info(this.pageName, "Checking if cookies banner is visible");
            await this.allowCookiesButton.waitFor({state:'visible', timeout:5000});
            logger.info(this.pageName, "Cookies banner is visible. Attempting to allow cookies.");
            await this.allowCookies();
        }
        catch(error){
            logger.info(this.pageName, `Cookies banner is not visible. No need to allow cookies. Error details: ${error}`);
        }

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