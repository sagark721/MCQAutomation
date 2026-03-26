import {BasePage} from "./BasePage";
import {Page, Locator, expect} from '@playwright/test';
import {logger} from "@logger"
import { WaitHelpers } from "src/utils/WaitHelpers";

export class SuccessPage extends BasePage{

    protected readonly path:string='/invest/start/investment';
    protected readonly pageName: string='Success Page';

    // --- Locators --- //

    private readonly backToInvestmentsButton = this.page.getByText('Back to My Investments');
    



    constructor(page:Page ){
        super(page)
    }

    async clickBackToInvestments(): Promise<void> {
        logger.info(this.pageName, "Clicking on 'Back to My Investments' button");
        await this.backToInvestmentsButton.click();
        logger.info(this.pageName, "'Back to My Investments' button clicked");
        await WaitHelpers.waitForPageReady(this.page);
    }

   

   


    

}