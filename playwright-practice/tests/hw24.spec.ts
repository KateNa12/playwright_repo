import { test, expect, Locator } from '@playwright/test';
import HomePage from '../page-objects/pages/HomePage';
import RegistrationForm from '../page-objects/pages/RegistrationForm';

test.describe(("Homework24 test cases"), () => {
    let homePage: HomePage;
    let registrationForm: RegistrationForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registrationForm = new RegistrationForm(page);
        await homePage.openPage();
        await homePage.clickSingUpPutton();
    });

    test.describe(('Field "Name" validations'), () => {
        test('Empty field - "Name is requiered"', async ({ page }) => {
            await registrationForm.enterName('');
            await expect(page.getByText('Name required')).toBeVisible();
        });

        test('Wrong data - "Name is invalid"', async ({ page }) => {
            await registrationForm.enterName('1 ');
            await expect(page.getByText('Name is invalid')).toBeVisible();

        });

        test('Wrong lenght - "Name has to be from 2 to 20 characters long"', async ({ page }) => {
            await registrationForm.enterName('a');
            await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();

        });

        test('Border color is red', async ({ page }) => {
            await registrationForm.enterName('a');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe(('Field "Last Name" validations'), () => {
        test('Empty field - "Last name is requiered"', async ({ page }) => {
            await registrationForm.enterLastName('');
            await expect(page.getByText('Last name required')).toBeVisible();
        });

        test('Wrong data - "Last name is invalid"', async ({ page }) => {

            await registrationForm.enterLastName('1 ');
            await expect(page.getByText('Last name is invalid')).toBeVisible();

        });

        test('Wrong lenght - "Last name has to be from 2 to 20 characters long"', async ({ page }) => {
            await registrationForm.enterLastName('a');
            await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();

        });

        test('Border color is red', async ({ page }) => {
            await registrationForm.enterLastName('a');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe(('Field "Email" validations'), () => {
        test(('Wrong data - "Email is incorrect"'), async ({ page }) => {
            await registrationForm.enterEmail('a');
            await expect(page.getByText('Email is incorrect')).toBeVisible();
        });

        test(('For empty field - "Email required"'), async ({ page }) => {
            await registrationForm.enterEmail('');
            await expect(page.getByText('Email required')).toBeVisible();
        });

        test(('Border color is red'), async ({ page }) => {
            await registrationForm.enterEmail('qqqqq');
            await expect(registrationForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe(('Field "Password" validations'), () => {
        test('Wrong data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"', async ({ page }) => {
            await registrationForm.enterPassword('Aa12');
            await registrationForm.passwordField.blur();
            await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        });

        test('For empty field - "Password required"', async ({ page }) => {
            await registrationForm.enterPassword('');
            await expect(page.getByText('Password required')).toBeVisible();
        });
        test('Border color is red', async ({ page }) => {
            await registrationForm.enterPassword('a');
            await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe(('Field "Re-enter password" validations'), () => {
        test('Wrong data - "Passwords do not match"', async ({ page }) => {
            await registrationForm.enterPassword('Aa12345678');
            await registrationForm.reenterPassword('Aa123456');
            await registrationForm.reEnterPasswordField.blur();

            await expect(page.getByText('Passwords do not match')).toBeVisible();

        });

        test('For empty field - "Re-enter password required"', async ({ page }) => {
            await registrationForm.reenterPassword('');
            await registrationForm.reEnterPasswordField.blur();
            await expect(page.getByText('Re-enter password required')).toBeVisible();
        });

        test('Border color is red', async ({ page }) => {
            await registrationForm.reenterPassword('Aa12aaa');
            await registrationForm.reEnterPasswordField.blur();
            await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Button "Register" validations', () => {
        test('The button is disabled when data is incorrect', async ({ page }) => {
            await registrationForm.nameField.click();
            await registrationForm.enterName('test');
            await registrationForm.enterLastName('test');
            await registrationForm.enterEmail('aqa1234@gmail.com');
            await registrationForm.enterPassword('Aa12345678');
            await registrationForm.reenterPassword('Aa123456');
            await registrationForm.reEnterPasswordField.blur();
            await expect(registrationForm.registerButton).toBeDisabled();
        });

        test('Successful user registration', async ({ page }) => {
            const randomNumber = Math.floor(Math.random() * 1000);
            await registrationForm.nameField.click();
            await registrationForm.enterName('test');
            await registrationForm.enterLastName('test');
            await registrationForm.enterEmail(`aqa+${randomNumber}@gmail.com`);
            await registrationForm.enterPassword('A1234567a');
            await registrationForm.reenterPassword('A1234567a');
            await expect(registrationForm.registerButton).toBeEnabled();
            await registrationForm.clickRegisterButton();
            await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();
        });
    });
});