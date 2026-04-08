import {Page, Locator, expect} from '@playwright/test';
import { logger } from '@logger';
import {WaitHelpers} from '@waitHelpers';

export class AccountSidebarComponent {
    private readonly componentName:string='Account Sidebar Component';

    // --- Locators --- //
    private readonly profileLink:Locator;
    private readonly resetPasswordLink:Locator;
    private readonly investorProfileLink:Locator;
    private readonly myInvestmentsLink:Locator;
    private readonly myWalletLink:Locator;

    constructor(private readonly page:Page){
        this.page=page;
        this.profileLink=this.page.getByRole('link', { name: 'Profile' });
        this.resetPasswordLink=this.page.getByRole('link', { name: 'Reset Password' });
        this.investorProfileLink=this.page.getByRole('link', { name: 'Investor Profile' });
        this.myInvestmentsLink=this.page.getByRole('link', { name: 'My Investments' });
        this.myWalletLink=this.page.getByRole('link', { name: 'My Wallet' });
    }


    async clickProfileLink():Promise<void>{
        logger.info(this.componentName, "Clicking on 'Profile' link in the account sidebar");
        await this.profileLink.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/profile/);
    }

    async clickResetPasswordLink():Promise<void>{
        logger.info(this.componentName, "Clicking on 'Reset Password' link in the account sidebar");
        await this.resetPasswordLink.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/reset-password/);
    }

    async clickInvestorProfileLink():Promise<void>{
        logger.info(this.componentName, "Clicking on 'Investor Profile' link in the account sidebar");
        await this.investorProfileLink.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/investor-profile/);
    }

    async clickMyInvestmentsLink():Promise<void>{
        logger.info(this.componentName, "Clicking on 'My Investments' link in the account sidebar");
        await this.myInvestmentsLink.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/activity/);
    }

    async clickMyWalletLink():Promise<void>{
        logger.info(this.componentName, "Clicking on 'My Wallet' link in the account sidebar");
        await this.myWalletLink.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/wallet/);
    }


    
}