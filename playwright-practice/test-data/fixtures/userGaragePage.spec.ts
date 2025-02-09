
import { test as base } from '@playwright/test';
import GaragePage from '../../page-objects/pages/GaragePage';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/pages/SignInForm';

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;


export const test = base.extend<{garagePageAsLoggedMainUser: GaragePage }>({
              
    garagePageAsLoggedMainUser: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './test-data/states/mainUserState.json' });
        const page = await context.newPage();

       
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials('kateryna.naimark+2@gmail.com', 'pvGvlLZ1QtQuXdm');
        await garagePage.verifyPageIsOpen();          
        
        await use(garagePage);

        await garagePage.removeAllCars();
        await page.close();
    }
});
