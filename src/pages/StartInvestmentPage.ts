import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"
import { WaitHelpers } from "src/utils/WaitHelpers";

export class StartInvestmentPage extends BasePage{

    protected readonly path:string='/invest/start/investment';
    protected readonly pageName: string='Start Investment Page';

    // --- Locators --- //

    private readonly amountBox:Locator=this.page.getByRole('spinbutton', { name: 'Investment', exact: true })
    private readonly agreementSlider = this.page.locator('#sec_circular_agreed');
    private readonly cardPaymentMethod = this.page.getByRole('button', { name: 'Card' });
    private readonly confirmOrderBtn = this.page.getByRole('button', { name: 'Confirm Order' });



    constructor(page:Page ){
        super(page)
    }

    async enterInvestmentAmount(amount: string): Promise<void> {
        logger.info(this.pageName, `Entering investment amount: ${amount}`);
        await this.amountBox.fill(amount);
        logger.info(this.pageName, `Investment amount entered: ${amount}`);
    }

    async agreeToTerms(): Promise<void> {
        logger.info(this.pageName, "Agreeing to circular agreement terms");
        await this.agreementSlider.click();
        logger.info(this.pageName, "Agreed to circular agreement terms");
    }

    async selectCardPaymentMethod(): Promise<void> {
        logger.info(this.pageName, "Selecting 'Card' as payment method");
        await this.cardPaymentMethod.click();
        logger.info(this.pageName, "'Card' payment method selected");
    }

    async clickConfirmOrder(): Promise<void> {
        logger.info(this.pageName, "Clicking on 'Confirm Order' button");
        await this.confirmOrderBtn.click();
        logger.info(this.pageName, "'Confirm Order' button clicked");
        await WaitHelpers.waitForPageReady(this.page);
    }


    

}