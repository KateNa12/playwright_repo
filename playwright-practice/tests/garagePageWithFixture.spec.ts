import { expect, Page, Locator } from '@playwright/test';
import { test } from '../test-data/fixtures/userGaragePage.spec.ts'


test.describe(('Garage Page with fixtures'), () => {
    test('Main user can add Fiat Panda', async ({ garagePageAsLoggedMainUser }) => {
        await garagePageAsLoggedMainUser.addCarForm('Fiat', 'Panda', '2000');
        await expect(garagePageAsLoggedMainUser.getLastAddedCarName()).resolves.toBe('Fiat Panda');
        expect(await garagePageAsLoggedMainUser.verifyCarImage('Fiat')).toBeTruthy();
     });

     test('Main user can add Porsche Cayenne', async ({ garagePageAsLoggedMainUser }) => {
        await garagePageAsLoggedMainUser.addCarForm('Porsche', 'Cayenne', '9999');
        await expect(garagePageAsLoggedMainUser.getLastAddedCarName()).resolves.toBe('Porsche Cayenne');
        expect(await garagePageAsLoggedMainUser.verifyCarImage('Porsche')).toBeTruthy();
     });
});