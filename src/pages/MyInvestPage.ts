import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"
import { WaitHelpers } from "src/utils/WaitHelpers";

export class MyInvestPage extends BasePage{

    protected readonly path:string='/invest';
    protected readonly pageName: string='My Invest Page';

    // --- Locators --- //

    private readonly ferrariCard = this.page.locator("[class*='TransactionDataTableRow_TransactionDataTableRow__DK_wf '] p", { hasText: '1984 Ferrari 512 BBi (Berlinetta Boxer)' });
    private readonly firstInvestmentAmount = this.page.locator('[aria-label="purchases"] tr td:nth-child(4)').first();

    constructor(page:Page ){
        super(page)
    }

   

    async clickOnFerrariCard(): Promise<void> {
        logger.info(this.pageName, "Clicking on Ferrari 1984 512 BBi card in My Investments page");
        await this.ferrariCard.click();
        logger.info(this.pageName, "Clicked on Ferrari 1984 512 BBi card in My Investments page");
        // WaitHelpers.waitForNetworkIdle(this.page);
    }

    async expectFirstInvestmentCardToHaveAmount(expectedText: string): Promise<void> {
        logger.info(this.pageName, `Verifying that the first investment card has amount: ${expectedText}`);
        await expect(this.firstInvestmentAmount).toHaveText(expectedText);
        logger.info(this.pageName, `Verified that the first investment card has amount: ${expectedText}`);
    }

}