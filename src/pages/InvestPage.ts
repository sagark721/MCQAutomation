import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"

export class InvestPage extends BasePage{

    protected readonly path:string='/invest';
    protected readonly pageName: string='Invest Page';

    // --- Locators --- //

    private readonly ourCollectionLozenge:Locator=this.page.getByText('Our Collection')


    constructor(page:Page ){
        super(page)
    }

    async verifyOurCollectionLozengeIsVisible():Promise<void>{
        logger.info(this.pageName, "Verifying that 'Our Collection' lozenge is visible on the page");
        await expect(this.ourCollectionLozenge).toBeVisible()
        logger.info(this.pageName, "'Our Collection' lozenge is visible on the page");
    }
    
}