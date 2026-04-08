import {Page,Locator, expect} from "@playwright/test";
import {logger} from '@logger'
import { WaitHelpers } from "@waitHelpers";


export class HeaderComponent{
    private readonly componentName:string='Header Component';

    // --- Locators --- //
    private readonly header:Locator;
    private readonly howItWorks:Locator;
    private readonly whyCars:Locator;
    private readonly profileButton:Locator;
    private readonly investButton:Locator;
    private readonly profileButtonMenuList:Locator;



    constructor(private readonly page:Page){
        this.page=page;
        this.header=this.page.locator('body>header');
        this.howItWorks=this.header.getByRole('link', { name: 'How it Works' });
        this.whyCars=this.header.getByRole('link', { name: 'Why Cars' });
        this.profileButton=this.header.locator('[class*="HeaderAuthNavMenu_btnArrowCircleUpIcon"]');
        this.profileButtonMenuList=this.page.locator('ul[role="menu"]');
        this.investButton=this.header.getByRole('link', { name: 'Invest' });
    }




    async clickHowItWorks():Promise<void>{
        logger.info(this.componentName, "Clicking on 'How it Works' link in the header");
        await this.howItWorks.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/how-it-works/);

    }


    async clickOnProfileButton():Promise<void>{
        logger.info(this.componentName, "Clicking on Profile button in the header");
        await this.profileButton.click();
        await expect(this.profileButtonMenuList).toBeVisible();
        logger.info(this.componentName, "Profile menu list is visible now");
    }


    async verifyProfileButtonNameIs(expectedName:string):Promise<void>{
        logger.info(this.componentName, `Verifying that profile button name is ${expectedName}`);
        await expect(this.profileButton).toHaveText(expectedName);
        logger.info(this.componentName, `Successfully verified that profile button name is ${expectedName}`);
    }

    async clickInvest():Promise<void>{
        logger.info(this.componentName, "Clicking on 'Invest' link in the header");
        await this.investButton.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/invest/);
        logger.info(this.componentName, "Successfully navigated to 'Invest' page");
    }


    async clickWhyCars():Promise<void>{
        logger.info(this.componentName, "Clicking on 'Why Cars' link in the header");
        await this.whyCars.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/why-cars/);
        logger.info(this.componentName, "Successfully navigated to 'Why Cars' page");
    }


}