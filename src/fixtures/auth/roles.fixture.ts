import {test as base} from '@playwright/test';
import {PageSuite} from '../PageSuite';


type RoleFixtures={
    individualUser: PageSuite;
    trustUser: PageSuite;
    companyUser: PageSuite;
}


export const test =base.extend<RoleFixtures>({

    //-- Individual User --//

    individualUser: async({browser},use)=>{

        const context= await browser.newContext({storageState:'.auth/CAN_individual.json'})
        const page= await context.newPage();

        await use(new PageSuite(page));

        await context.close();

    },


    //-- Trust User --//

    trustUser: async({browser}, use)=>{

        const context = await browser.newContext({storageState:'.auth/IND_trust.json'});
        const page= await context.newPage();
        await use(new PageSuite(page));
        await context.close();
    },


    //-- Company User --//

    companyUser: async({browser},use)=>{

        const context= await browser.newContext({storageState:'.auth/US_company.json'});
        const page= await context.newPage();
        await use(new PageSuite(page));

        await context.close();


    }
})