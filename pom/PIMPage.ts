import { Locator, Page, expect } from "@playwright/test";

export class PIMPage {
    page: Page;

    // Locators
    pimLink: Locator;
    addEmployeeBtn: Locator;
    firstName: Locator;
    middleName: Locator;
    lastName: Locator;
    empId: Locator;
    saveBtn: Locator;
    toast: Locator;
    searchByEmpId: Locator;
    searchBtn: Locator;
    cellData: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pimLink = page.locator('[href="/web/index.php/pim/viewPimModule"]');
        this.addEmployeeBtn = page.locator('[class="orangehrm-header-container"] > button');
        this.firstName = page.locator('[name="firstName"]');
        this.middleName = page.locator('[name="middleName"]');
        this.lastName = page.locator('[name="lastName"]');
        this.empId = page.locator("input[class*='oxd-input']").nth(4);
        this.saveBtn = page.locator('[type="submit"]');
        this.toast = page.locator('[class="oxd-toast-start"]');
        this.searchByEmpId = page.locator("input[class*='oxd-input']").nth(1);
        this.searchBtn = page.locator('[type="submit"]');
        this.cellData = page.locator('[role="cell"]');
    }

    // Methods

    async launchPIMPage() {
        await this.pimLink.click();
    }

    async addEmployee(data: { [key: string]: string }) {
        await this.launchPIMPage();
        await this.addEmployeeBtn.waitFor({ state: "visible", timeout: 6000 });
        await this.addEmployeeBtn.click();
        await this.page.waitForSelector('[name="firstName"]');
        await this.firstName.fill(data["firstName"]);
        await this.middleName.fill(data["middleName"]);
        await this.lastName.fill(data["lastName"]);
        await this.empId.fill(data["empId"]);
        await this.saveBtn.click();
        await this.toast.waitFor({ state: "visible", timeout: 6000 })
    }

    async searchAndVerifyEmployee(data: { [key: string]: string }) {
        await this.launchPIMPage();
        await this.searchByEmpId.waitFor({ state: "visible", timeout: 5000 });
        await this.searchByEmpId.fill(data["empId"]);
        await this.searchBtn.click({ force: true, delay: 100 });
        await expect(this.cellData.nth(1)).toHaveText(data["empId"]);
        await expect(this.cellData.nth(2)).toHaveText(`${data["firstName"]} ${data["middleName"]}`);
        await expect(this.cellData.nth(3)).toHaveText(data["lastName"]);
    }
}