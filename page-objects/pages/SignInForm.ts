import { Locator, Page } from '@playwright/test';

export default class SignInForm {
    readonly page: Page;
    readonly emailField : Locator;
    readonly passwordField : Locator;
    readonly loginButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.emailField = page.locator('//input[@id="signinEmail"]');
        this.passwordField = page.locator('//input[@id="signinPassword"]');
        this.loginButton = page.locator('//div[@class="modal-content"]//button[@class="btn btn-primary"]');
    }

    async enterEmail(email: string){
        await this.emailField.fill(email!);
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
    async loginWithCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}