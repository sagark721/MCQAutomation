import{Page} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage';


export class PageSuite{

    readonly page:Page;
    readonly loginPage:LoginPage;

    constructor(page: Page){

        this.page=page;
        this.loginPage= new LoginPage(page);

    }
}