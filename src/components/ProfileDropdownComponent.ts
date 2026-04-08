import {Page, Locator, expect} from '@playwright/test';
import { logger } from '@logger';
import {WaitHelpers} from '@waitHelpers';

export class ProfileDropdownComponent{
    private readonly componentName:string='Profile Dropdown Component';

    // --- Locators --- //
    private readonly profileMenuList:Locator;
    private readonly myProfileOption:Locator;
    private readonly myInvestmentsOption:Locator;
    private readonly myWalletOption:Locator;
    private readonly logOutOption:Locator;

    constructor(private readonly page:Page){
        this.page=page;
        this.profileMenuList=this.page.locator('ul[role="menu"]');
        this.myProfileOption=this.profileMenuList.getByRole('menuitem', { name: 'My Profile' });
        this.myInvestmentsOption=this.profileMenuList.getByRole('menuitem', { name: 'My Investments' });
        this.myWalletOption=this.profileMenuList.getByRole('menuitem', { name: 'My Wallet' });
        this.logOutOption=this.profileMenuList.getByRole('menuitem', { name: 'Log Out' });
    }


    async clickMyProfile():Promise<void>{
        logger.info(this.componentName, "Clicking on 'My Profile' option in the profile dropdown");
        await this.myProfileOption.click();
        await WaitHelpers.waitForPageReady(this.page);
        await expect(this.page).toHaveURL(/\/profile/);
        
    }

}