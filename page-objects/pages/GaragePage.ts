import { expect, Locator, Page } from "@playwright/test";


export default class GaragePage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly addNewCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly submitFormButton: Locator;
    readonly lastAddedCarName: Locator;
    readonly carsList: Locator;
    readonly carImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('//h1[text()="Garage"]');
        this.addNewCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
        this.brandDropdown = page.locator('//select[@id="addCarBrand"]');
        this.modelDropdown = page.locator('//select[@id="addCarModel"]');
        this.mileageField = page.locator('//input[@id="addCarMileage"]');
        this.submitFormButton = page.locator('//div[contains(@class, "modal-footer")]/button[contains(@class, "btn-primary")]');
        this.lastAddedCarName = page.locator('(//li//p[@class="car_name h2"])[1]');
        this.carsList = page.locator('//div[contains(@class, "car ")]');
        this.carImage = page.locator('//img[contains(@class, "car-logo_img")]');
            //div[contains(@class, "car-logo_img"]');
    }

    async openPage() {
        await this.page.goto('/panel/garage');
    }

    async verifyPageIsOpen() {
        await expect(this.pageHeader).toBeVisible();
    }

    async addCarForm(brand: string, model: string, mileage: string) {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.page.waitForTimeout(300);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitFormButton.click();
    }

    async getLastAddedCarName(): Promise<string> {
        await this.page.waitForTimeout(300);
        return await this.lastAddedCarName.innerText();
    }

    async verifyCarImage(brand: string): Promise<boolean> {
        let carImages = new Map<string, string>();
        carImages.set("Ford", "https://qauto.forstudy.space/public/images/brands/ford.png");
        carImages.set("Audi", "https://qauto.forstudy.space/public/images/brands/audi.png");
        carImages.set("Fiat", "https://qauto.forstudy.space/public/images/brands/fiat.png");
        carImages.set("Porsche", "https://qauto.forstudy.space/public/images/brands/porsche.png");
        carImages.set("BMW", "https://qauto.forstudy.space/public/images/brands/bmw.png");

        return await this.carImage.getAttribute("src") == (carImages.get(brand) ?? "")
        //await expect(this.carImage) .toHaveAttribute('src', carImages.get(brand) ?? "");
    }
    
    
    async removeAllCars() {
        const cars = await this.carsList.all();

        for (let i = 0; i < cars.length; i++) {
            await cars[i].locator('//span[contains(@class, "icon-edit")]').click();
            await this.page.locator('//button[contains(@class, "btn-outline-danger")]').click();
            await this.page.locator('//button[contains(@class, "btn-danger")]').click();

        }
    }

   
}