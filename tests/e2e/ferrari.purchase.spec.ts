import{test,expect} from '@fixtures';

test.describe("Ferrari Purchase Flow",()=>{

    const amountToInvest = '100';

    test("Validates the purchase flow of Ferrari 1984 512 BBi by Individual User", async ({individualUser})=>{
        await individualUser.investPage.goto();
        await individualUser.investPage.verifyOurCollectionLozengeIsVisible();
        await individualUser.investPage.clickFerrariBuyButton();
        await individualUser.startInvestmentPage.enterInvestmentAmount(amountToInvest);
        await individualUser.startInvestmentPage.agreeToTerms();
        await individualUser.startInvestmentPage.selectCardPaymentMethod();
        await individualUser.startInvestmentPage.clickConfirmOrder();

        await individualUser.investmentSummaryPage.enterCardNumber('4111 1111 1111 1111');
        await individualUser.investmentSummaryPage.enterExpiryDate('12/28');
        await individualUser.investmentSummaryPage.enterSecurityCode('123');
        await individualUser.investmentSummaryPage.clickContinueWithPayment();


        await individualUser.subscriptionAgreementPage.enterSignature("Sagar");
        await individualUser.subscriptionAgreementPage.agreeToTerms();
        await individualUser.subscriptionAgreementPage.clickSignAgreement();



        await individualUser.successPage.clickBackToInvestments();

        await individualUser.myInvestPage.clickOnFerrariCard();
        await individualUser.myInvestPage.expectFirstInvestmentCardToHaveAmount(`$${amountToInvest}.00`);

    })

})