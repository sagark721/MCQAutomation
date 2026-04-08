import {test} from '@fixtures'


test.describe("Validates the profile updation flow of Individual User",()=>{

    test("Validates if the user can update his name successfully", async ({individualUser})=>{

        const newFirstName="Fnn";
        const newLastName="Lnn";
        const fullName=`${newFirstName} ${newLastName}`;

        await individualUser.homePage.goto();
        await individualUser.homePage.header.clickOnProfileButton();
        await individualUser.homePage.profileDropdownComponent.clickMyProfile();

        await individualUser.profilePage.enterFirstName(newFirstName);
        await individualUser.profilePage.enterLastName(newLastName);
        await individualUser.profilePage.clickSaveButton();
        await individualUser.profilePage.verifyProfileUpdateSuccess();
        await individualUser.homePage.header.verifyProfileButtonNameIs(fullName);







        
    })



})