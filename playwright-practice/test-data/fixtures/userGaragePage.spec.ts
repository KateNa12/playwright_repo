
import { test as base } from '@playwright/test';
import GaragePage from '../../page-objects/pages/GaragePage';

let garagePage: GaragePage;


export const test = base.extend<{ garagePageAsLoggedMainUser: GaragePage }>({

    garagePageAsLoggedMainUser: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './test-data/states/mainUserState.json' });
        const page = await context.newPage();

        garagePage = new GaragePage(page);
       
        await garagePage.openPage();

        await use(garagePage);

        await garagePage.removeAllCars();
        await page.close();
    }
});


