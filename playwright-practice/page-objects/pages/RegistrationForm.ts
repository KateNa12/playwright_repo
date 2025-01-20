import { Locator, Page } from '@playwright/test';

export default class RegistrationForm{
    readonly page: Page;
    readonly nameField : Locator;
    readonly lastNameField : Locator;
    readonly emailField : Locator;
    readonly passwordField : Locator;
    readonly reEnterPasswordField : Locator;
    readonly registerButton : Locator;

    
    constructor(page: Page){
        this.page = page;
        this.nameField = page.locator('[id="signupName"]');
        this.lastNameField = page.locator('[id="signupLastName"]');
        this.emailField = page.locator('[id="signupEmail"]');
        this.passwordField = page.locator('[id="signupPassword"]');
        this.reEnterPasswordField = page.locator('[id="signupRepeatPassword"]'); 
        this.registerButton = page.locator('[class="btn btn-primary"]');
    }
 
    async enterName(name: string){
        await this.nameField.fill(name);
        await this.nameField.blur();
    }

    async enterLastName(lastName: string){
        await this.lastNameField.fill(lastName);
        await this.lastNameField.blur();
    }

    async enterEmail(email: string){
        await this.emailField.fill(email);
        await this.emailField.blur();
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password);
        await this.passwordField.blur();
    }

    async reenterPassword(password: string){
        await this.reEnterPasswordField.fill(password);
        await this.reEnterPasswordField.blur();
    }

    async clickRegisterButton(){
        await this.registerButton.click();
    }
}