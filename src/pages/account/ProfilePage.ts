import { BasePage } from "../BasePage";
import { Page, Locator, expect } from '@playwright/test';
import {logger} from '@logger';
import { AccountSidebarComponent } from "src/components/AccountSidebarComponent";

export class ProfilePage extends BasePage{
    protected readonly path: string='user/account/profile';
    protected readonly pageName: string='Profile Page';

    // --- Locators --- //

    private readonly sidebar:AccountSidebarComponent;

    private readonly firstNameTextbox: Locator;
    private readonly lastNameTextbox: Locator;
    private readonly saveButton: Locator;
    private readonly successBanner: Locator;

    constructor(page:Page){
        super(page)
        this.sidebar = new AccountSidebarComponent(page);
        
        this.firstNameTextbox = this.page.getByPlaceholder('your first name');
        this.lastNameTextbox = this.page.getByPlaceholder('your family name');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.successBanner = this.page.getByText('Profile updated successfully!');
    }

    async enterFirstName(firstName: string): Promise<void> {
        logger.info(this.pageName, `Entering first name: ${firstName}`);
        await this.firstNameTextbox.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        logger.info(this.pageName, `Entering last name: ${lastName}`);
        await this.lastNameTextbox.fill(lastName);
    }

    async clickSaveButton(): Promise<void> {
        logger.info(this.pageName, "Clicking on Save button");
        await this.saveButton.click();
    }

    async verifyProfileUpdateSuccess(): Promise<void> {
        logger.info(this.pageName, "Verifying profile update success banner is visible");
        await expect(this.successBanner).toBeVisible();
        logger.info(this.pageName, "Profile update success banner is visible");

    }



}