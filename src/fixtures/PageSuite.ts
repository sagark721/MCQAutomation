import{Page} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';
import { InvestPage } from 'src/pages/InvestPage';
import { StartInvestmentPage } from 'src/pages/StartInvestmentPage';
import { InvestmentSummaryPage } from 'src/pages/InvestmentSummaryPage';
import { SubscriptionAgreementPage } from 'src/pages/SubscriptionAgreementPage';
import { SuccessPage } from 'src/pages/SuccessPage';
import { MyInvestPage } from 'src/pages/MyInvestPage';


export class PageSuite{

    readonly page:Page;
    readonly loginPage:LoginPage;
    readonly investPage:InvestPage;
    readonly startInvestmentPage:StartInvestmentPage;
    readonly investmentSummaryPage:InvestmentSummaryPage;
    readonly subscriptionAgreementPage: SubscriptionAgreementPage;
    readonly successPage: SuccessPage;
    readonly myInvestPage: MyInvestPage;


    constructor(page: Page){

        this.page=page;
        this.loginPage= new LoginPage(page);
        this.investPage= new InvestPage(page);
        this.startInvestmentPage= new StartInvestmentPage(page);
        this.investmentSummaryPage= new InvestmentSummaryPage(page);
        this.subscriptionAgreementPage= new SubscriptionAgreementPage(page);
        this.successPage= new SuccessPage(page);
        this.myInvestPage= new MyInvestPage(page);

    }
}