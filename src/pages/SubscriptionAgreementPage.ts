import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";
import { logger } from "@logger";
import { WaitHelpers } from "src/utils/WaitHelpers";

export class SubscriptionAgreementPage extends BasePage {
  protected readonly path: string = "/invest/start/investment";
  protected readonly pageName: string = "Subscription Agreement Page";

  // --- Locators --- //

  private readonly signatureField = this.page.getByPlaceholder("John Doe");
  private readonly termsSlider = this.page.locator("#contract_terms_agreed");
  private readonly signAgreementButton = this.page.getByRole("button", {
    name: "Sign Agreement",
  });

  constructor(page: Page) {
    super(page);
  }

  async verifyOnSubscriptionAgreementPage(): Promise<void> {
    logger.info(this.pageName, "Verifying on Subscription Agreement Page");
    await expect(this.signatureField).toBeVisible({ timeout: 15000 });
    logger.info(
      this.pageName,
      "Successfully verified on Subscription Agreement Page",
    );
  }

  async enterSignature(signature: string): Promise<void> {
    logger.info(this.pageName, `Entering signature: ${signature}`);
    // await this.signatureField.waitFor({ state: 'visible', timeout: 15 * 1000 });
    await this.signatureField.fill(signature);
    logger.info(this.pageName, `Signature entered: ${signature}`);
  }

  async agreeToTerms(): Promise<void> {
    logger.info(this.pageName, "Agreeing to contract terms");
    await this.termsSlider.click();
    logger.info(this.pageName, "Agreed to contract terms");
  }

  async clickSignAgreement(): Promise<void> {
    logger.info(this.pageName, "Clicking on 'Sign Agreement' button");
    await this.signAgreementButton.click();
    logger.info(this.pageName, "'Sign Agreement' button clicked");
    await WaitHelpers.waitForPageReady(this.page);
  }
}
