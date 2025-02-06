import { expect,Locator, Page } from '@playwright/test';

export default class ProfilePage {
    readonly page: Page;
    readonly ProfileButton : Locator;
    readonly userName : Locator;

    constructor(page: Page){
        this.page = page;
        this.ProfileButton = page.locator('a[routerlink="profile"]');
        this.userName = page.locator('p.profile_name');
    }
    
    async clickProfileButton(){
        await this.ProfileButton.click();
    }
    
    async checkUserName(expectedUserName: string){
        await expect(this.userName).toHaveText(expectedUserName);
    }
  
}