import { test, chromium, expect, Locator } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/pages/SignInForm';
import GaragePage from '../../page-objects/pages/GaragePage';

test.describe(("Setup user"), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
    });

    test('Log in and save main user state', async ({ page }) => {

        await homePage.openPage();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials('kateryna.naimark+2@gmail.com', 'pvGvlLZ1QtQuXdm');
        await garagePage.verifyPageIsOpen();

        await page.context().storageState({ path: './test-data/states/mainUserState.json' });
    });
});

