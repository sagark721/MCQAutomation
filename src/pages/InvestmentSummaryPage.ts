import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"
import { WaitHelpers } from "src/utils/WaitHelpers";

export class InvestmentSummaryPage extends BasePage{

    protected readonly path:string='/invest/start/investment';
    protected readonly pageName: string='Investment Summary Page';

    // --- Locators --- //

    private readonly stripeElement = this.page.locator('#payment-element');
    private readonly stripeFrame = this.page.frameLocator('#payment-element iframe');
    private readonly cardNumberField:Locator=this.stripeFrame.getByPlaceholder('1234 1234 1234 1234')
    private readonly expiryDateField = this.stripeFrame.getByPlaceholder('MM / YY');
    private readonly securityCodeField = this.stripeFrame.getByPlaceholder('CVC');
    private readonly continueWithPaymentButton = this.page.getByRole('button', { name: 'Continue with Payment' });



    constructor(page:Page ){
        super(page)
    }

    async enterCardNumber(cardNumber: string): Promise<void> {
        logger.info(this.pageName, `Entering card number: ${cardNumber}`);
        await this.stripeElement.waitFor({ state: 'visible', timeout: 15 * 1000 });
        await this.cardNumberField.fill(cardNumber);
        logger.info(this.pageName, `Card number entered: ${cardNumber}`);
    }

    async enterExpiryDate(expiryDate: string): Promise<void> {
        logger.info(this.pageName, `Entering expiry date: ${expiryDate}`);
        await this.expiryDateField.fill(expiryDate);
        logger.info(this.pageName, `Expiry date entered: ${expiryDate}`);
    }

    async enterSecurityCode(securityCode: string): Promise<void> {
        logger.info(this.pageName, `Entering security code: ${securityCode}`);
        await this.securityCodeField.fill(securityCode);
        logger.info(this.pageName, `Security code entered: ${securityCode}`);
    }

    async clickContinueWithPayment(): Promise<void> {
        logger.info(this.pageName, "Clicking on 'Continue with Payment' button");
        await this.continueWithPaymentButton.click();
        logger.info(this.pageName, "'Continue with Payment' button clicked");
        WaitHelpers.waitForPageReady(this.page);
    }


    

}