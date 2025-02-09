import { test, chromium, expect, Locator } from '@playwright/test';
import HomePage from '../../page-objects/pages/HomePage';
import SignInForm from '../../page-objects/pages/SignInForm';
import GaragePage from '../../page-objects/pages/GaragePage';

test.describe(("Setup user"), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeAll(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
    });

    test('Log in and save main user state', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();

        const page = await context.newPage();
        // await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        // await page.click('button.header_signin');
        // await page.fill('//input[@id="signinEmail"]', 'kateryna.naimark+2@gmail.com');
        // await page.fill('//input[@id="signinPassword"]', 'pvGvlLZ1QtQuXdm');
        // await page.click('//div[@class="modal-content"]//button[@class="btn btn-primary"]');


        await homePage.openPage();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials('kateryna.naimark+2@gmail.com', 'pvGvlLZ1QtQuXdm');
        await garagePage.verifyPageIsOpen();

        await context.storageState({ path: './test-data/states/mainUserState.json' });
    });

});
