import { Page, expect} from '@playwright/test';
import { WaitHelpers  } from "../utils/WaitHelpers";
import { BasePage } from "./BasePage";
import{logger} from '../utils/Loggers'
import {UserCredentials} from '../types/models'



export class LoginPage extends BasePage{
    protected readonly path='/sign-in'
    protected readonly pageName='LoginPage';

    private readonly emailInput= this.page.getByPlaceholder('your email');
    private readonly passwordInput= this.page.locator('#password');
    private readonly loginButton= this.page.getByRole('button',{name:"Log In"})


    constructor (page:Page){
        super(page)
    }


    

    async loginWith(credentials: UserCredentials):Promise<void>{
        await this.emailInput.fill(credentials.email);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
        await WaitHelpers.waitForNetworkIdle(this.page)

        logger.info(this.pageName,`Sucessfully Logged in as ${credentials.role}`)
    
    }


    async verifyLoginSuccessful():Promise<void>{
        logger.info(this.pageName, 'Verifying successful login');
        await expect(this.page).not.toHaveURL(new RegExp(this.path),{timeout: 15 * 1000});
        logger.info(this.pageName, 'Login successful, URL has changed from login page');
    }

}