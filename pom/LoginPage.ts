import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    page: Page;

    // Locators
    username: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[name="username"]');
        this.password = page.locator('[name="password"]');
        this.loginBtn = page.locator('[type="submit"]');
    }

    // Methods

    async loginToApp() {
        await this.username.fill(process.env.USERNAME as string);
        await this.password.fill(process.env.PASSWORD as string);
        await this.loginBtn.click();
        await expect(this.page.locator('[href="/web/index.php/pim/viewPimModule"]')).toHaveText('PIM');
    }
}