import { BasePage } from "./BasePage";
import { Page} from '@playwright/test';
import {logger} from '@logger'
import { WaitHelpers } from "@waitHelpers";

export class AssetDetailsPage extends BasePage {
    protected readonly path: string='/offer';
    protected readonly pageName: string='Asset Details Page';

    // --- Locators --- //
    private readonly attributes=this.page.locator('#attributes');
    private readonly investNowButton=this.attributes.getByRole('link', { name: 'Invest Now' });

    constructor(page:Page){
        super(page)
    }

    async clickInvestNowButton(): Promise<void> {
        logger.info(this.pageName, "Clicking on 'Invest Now' button");
        await this.investNowButton.click();
        logger.info(this.pageName, "'Invest Now' button clicked");
        await WaitHelpers.waitForPageReady(this.page);
    }
    
}