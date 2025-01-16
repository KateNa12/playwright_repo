import { test, expect, Locator } from '@playwright/test';


test.describe(("Test the Registration form using Playwright"), () => {
  let signUpButton : Locator;
  let nameField : Locator;
  let lastNameField : Locator;
  let emailField : Locator;
  let passwordField : Locator;
  let reEnterPasswordField : Locator;
  let registerButton : Locator;

  test.beforeEach(async ({page}) => {
    signUpButton = page.locator('.btn-primary');
    nameField = page.locator('[id="signupName"]');
    lastNameField = page.locator('[id="signupLastName"]');
    emailField = page.locator('[id="signupEmail"]');
    passwordField = page.locator('[id="signupPassword"]');
    reEnterPasswordField = page.locator('[id="signupRepeatPassword"]');
    registerButton = page.locator('[class="btn btn-primary"]');
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await signUpButton.click();
  });

  test.describe(('Field "Name" validations'), () => {
    test('Empty field - "Name is requiered"', async ({ page }) => {
        
      await nameField.click();
      await nameField.blur();      
      await expect(page.getByText('Name required')).toBeVisible();
    });

    test('Wrong data - "Name is invalid"', async ({page}) => {
      await nameField.click();
      await nameField.fill('1 ');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Wrong lenght - "Name has to be from 2 to 20 characters long"', async ({page}) => {
        await nameField.click();
        await nameField.fill('1');
        await nameField.blur();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
      });

      test('Border color is red', async ({page}) => {
            await nameField.click();
            await nameField.blur(); 
            await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field "Last Name" validations', () => {
    test('Empty field - "Last name is requiered"', async ({ page }) => {
        
      await lastNameField.click();
      await lastNameField.blur();      
      await expect(page.getByText('Last name required')).toBeVisible();
    });

    test('Wrong data - "Last name is invalid"', async ({page}) => {
      await lastNameField.click();
      await lastNameField.fill('1 ');
      await lastNameField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('Wrong lenght - "Last name has to be from 2 to 20 characters long"', async ({page}) => {
        await lastNameField.click();
        await lastNameField.fill('1');
        await lastNameField.blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
      });

      test('Border color is red', async ({page}) => {
            await lastNameField.click();
            await lastNameField.blur(); 
            await expect(lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Email" validations'), () => {
    test(('Wrong data - "Email is incorrect"'), async ({ page }) => {
      await emailField.fill('a');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test(('For empty field - "Email required"'), async ({ page }) => {
     
      await emailField.focus();
      await emailField.blur();
      await expect(page.getByText('Email required')).toBeVisible();
    });

    test(('Border color is red'), async ({ page }) => {
    
      await emailField.fill('aqqqq');
      await emailField.blur();
      await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe(('Field "Password" validations'), () => {
      test('Wrong data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"', async ({ page }) => {
       
      await passwordField.fill('a');
      await passwordField.blur();
      await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();

    });

    test('For empty field - "Password required"', async ({ page }) => {
      await passwordField.focus();
      await passwordField.blur();
      await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Border color is red', async ({ page }) => {
     
      await passwordField.fill('a');
      await passwordField.blur();
      await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
     
    });
  });

  test.describe(('Field "Re-enter password" validations'), () => {
    test('Wrong data - "Passwords do not match"', async ({page}) => {
      await passwordField.fill('Aa12345678');
      await reEnterPasswordField.fill('Aa123456');
      await reEnterPasswordField.blur();

      await expect(page.getByText('Passwords do not match')).toBeVisible();
      
    });

    test('For empty field - "Re-enter password required"', async ({page}) => {
     
      await reEnterPasswordField.focus();
      await reEnterPasswordField.blur();
      await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Border color is red', async ({page}) => {
    
      await reEnterPasswordField.focus();
      await reEnterPasswordField.blur();
      await expect(reEnterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

    test.describe('Button "Register" validations', () => {
      test('The button is disabled when data is incorrect', async ({page}) => {
      await nameField.click();
      await nameField.fill('test');
      await lastNameField.fill('test1');
      await emailField.fill(`aqa1234@gmail.com`);
      await passwordField.fill('123');
      await reEnterPasswordField.fill('1234');
      await reEnterPasswordField.blur();

     await expect(registerButton).toBeDisabled();
  });

  test('Successful user registration', async ({page}) => {
    
    const randomNumber = Math.floor(Math.random() * 1000); 
    
    await nameField.fill('test');
    await lastNameField.fill('test');
    await emailField.fill(`aqa+${randomNumber}@gmail.com`);
    await passwordField.fill('A1234567a');
    await reEnterPasswordField.fill('A1234567a');
    await reEnterPasswordField.blur();
    await expect(registerButton).toBeEnabled();
    await registerButton.click();
    await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();
  });

});
});
