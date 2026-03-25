import{Page} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';
import { InvestPage } from 'src/pages/InvestPage';


export class PageSuite{

    readonly page:Page;
    readonly loginPage:LoginPage;
    readonly investPage:InvestPage;


    constructor(page: Page){

        this.page=page;
        this.loginPage= new LoginPage(page);
        this.investPage= new InvestPage(page);


    }
}