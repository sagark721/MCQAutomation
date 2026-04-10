import { test } from "@fixtures";

test.describe("Ferrari Purchase Flow", () => {
  const amountToInvest = "100";

  // eslint-disable-next-line playwright/expect-expect
  test("Validates the purchase flow of 2012 Lexus LFA Whitest White by Individual User @smoke @e2e", async ({
    individualUser,
  }) => {
    await individualUser.homePage.goto();
    await individualUser.homePage.header.clickInvest();
    await individualUser.investPage.verifyOurCollectionLozengeIsVisible();
    await individualUser.investPage.clickLexusCard();

    await individualUser.assetDetailsPage.clickInvestNowButton();
    await individualUser.startInvestmentPage.verifyOnCorrectPage();

    await individualUser.startInvestmentPage.enterInvestmentAmount(
      amountToInvest,
    );
    await individualUser.startInvestmentPage.agreeToTerms();
    await individualUser.startInvestmentPage.selectCardPaymentMethod();
    await individualUser.startInvestmentPage.clickConfirmOrder();

    await individualUser.investmentSummaryPage.enterCardNumber(
      "4111 1111 1111 1111",
    );
    await individualUser.investmentSummaryPage.enterExpiryDate("12/28");
    await individualUser.investmentSummaryPage.enterSecurityCode("123");
    await individualUser.investmentSummaryPage.clickContinueWithPayment();

    await individualUser.subscriptionAgreementPage.verifyOnSubscriptionAgreementPage();
    await individualUser.subscriptionAgreementPage.enterSignature("Sagar");
    await individualUser.subscriptionAgreementPage.agreeToTerms();
    await individualUser.subscriptionAgreementPage.clickSignAgreement();

    await individualUser.successPage.clickBackToInvestments();

    await individualUser.myInvestPage.clickOnFerrariCard();
    await individualUser.myInvestPage.expectFirstInvestmentCardToHaveAmount(
      `$${amountToInvest}.00`,
    );
  });
});
