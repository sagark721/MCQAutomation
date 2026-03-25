import {test as setup} from '@playwright/test';

import {LoginPage} from '../../src/pages/LoginPage';
import { logger } from '../../src/utils/Loggers';


const AUTH_FILES={
    CAN_individual:'.auth/CAN_individual.json',
    IND_trust:'.auth/IND_trust.json',
    US_company:'.auth/US_company.json'
} as const;

setup.describe('Authentication Setup',()=>{


    setup("Authenticate as Canadian Individual i.e CAN_individual user ",async ({page})=>{

        if(!process.env.CAN_INDIVIDUAL_EMAIL || !process.env.CAN_INDIVIDUAL_PASSWORD){
            throw new Error('Missing credentials for CAN_individual user. Please set CAN_INDIVIDUAL_EMAIL and CAN_INDIVIDUAL_PASSWORD in your environment variables.');
        }

        const loginPage= new LoginPage(page);

        await loginPage.goto();
        await loginPage.loginWith({
            email: process.env.CAN_INDIVIDUAL_EMAIL,
            password: process.env.CAN_INDIVIDUAL_PASSWORD,
            role:'Individual'
        })

    
        await loginPage.verifyLoginSuccessful();

        await page.context().storageState({path: AUTH_FILES.CAN_individual})

        
    })




    setup("Authenticate as Indian Trust i.e IND_Trust user",async ({page})=>{

        if(!process.env.IND_TRUST_EMAIL || !process.env.IND_TRUST_PASSWORD){
            throw new Error('Missing credentials for IND_trust user. Please set IND_TRUST_EMAIL and IND_TRUST_PASSWORD in your environment variables.');
        }

        const loginPage=new LoginPage(page);

        await loginPage.goto();
        
        await loginPage.loginWith({
            email: process.env.IND_TRUST_EMAIL,
            password: process.env.IND_TRUST_PASSWORD,
            role:'Trust'
        })


        await loginPage.verifyLoginSuccessful();

        await page.context().storageState({path:AUTH_FILES.IND_trust})


    })




    setup("Authenticate as US Company i.e US_COMPANY user",async({page})=>{

        if(!process.env.US_COMPANY_EMAIL || !process.env.US_COMPANY_PASSWORD){
            throw new Error("Missing credentials for US_company user. Please set US_COMPANY_EMAIL and US_COMPANY_PASSWORD in your environment variables.")
        }

        const loginPage=new LoginPage(page);

        await loginPage.goto();
        await loginPage.loginWith({
            email:process.env.US_COMPANY_EMAIL,
            password:process.env.US_COMPANY_PASSWORD,
            role:'Company'
        })

        
        await loginPage.verifyLoginSuccessful();

        await page.context().storageState({path:AUTH_FILES.US_company})



    })




})