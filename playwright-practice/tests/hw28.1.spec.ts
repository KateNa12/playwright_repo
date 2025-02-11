import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import GaragePage from '../page-objects/pages/GaragePage';
import ProfilePage from '../page-objects/pages/ProfilePage';

test.describe(("Moked user profile test cases"), () => {
  test.use({storageState: './test-data/states/mainUserState.json'});
  let homePage: HomePage;
  let garagePage: GaragePage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    profilePage = new ProfilePage(page);

    await garagePage.openPage();
  });

  test('Check intercept user name in Profile', async ({ page }) => {
    const responseProfile = {
      "status": "ok",
      data: {
      "name": "Polar Bear",
      "lastName": "Polar Bear",
      "photoFilename": "user-1738524078597.png",
      "userId": 169464
      }
    }

    await page.route('**/api/users/profile', route => route.fulfill({
      status: 200,
      body: JSON.stringify(responseProfile),
    }));

    await garagePage.openPage();
    await garagePage.verifyPageIsOpen();

    await profilePage.clickProfileButton();
   
    await profilePage.checkUserName('Polar Bear Polar Bear');
  });
});