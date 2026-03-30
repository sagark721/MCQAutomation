import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"
import { WaitHelpers } from "src/utils/WaitHelpers";

export class InvestPage extends BasePage{

    protected readonly path:string='/invest';
    protected readonly pageName: string='Invest Page';

    // --- Locators --- //

    private readonly ourCollectionLozenge:Locator=this.page.getByText('Our Collection')
    private readonly ferrariCard = this.page.locator('[class*=MuiCard-root]', { hasText: '2012 Lexus LFA Whitest White' });
    private readonly ferrariBuyBtn = this.ferrariCard.getByRole('button', { name: 'Buy Shares' });
    private readonly confirmOrderBtn = this.page.getByRole('button', { name: 'Confirm Order' });


    constructor(page:Page ){
        super(page)
    }

    async verifyOurCollectionLozengeIsVisible():Promise<void>{
        logger.info(this.pageName, "Verifying that 'Our Collection' lozenge is visible on the page");
        await expect(this.ourCollectionLozenge).toBeVisible()
        logger.info(this.pageName, "'Our Collection' lozenge is visible on the page");
    }

    async clickFerrariBuyButton(): Promise<void> {
        logger.info(this.pageName, "Clicking on 'Buy Shares' button for 2012 Lexus LFA Whitest White");
        await this.ferrariBuyBtn.click();
        logger.info(this.pageName, "'Buy Shares' button for 2012 Lexus LFA Whitest White clicked");
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.confirmOrderBtn).toBeVisible();
        logger.info(this.pageName, "Start Investment page is loaded..");
    }

}