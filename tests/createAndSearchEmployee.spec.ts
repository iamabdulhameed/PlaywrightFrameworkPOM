import { test } from "@playwright/test";
import { LoginPage } from "../pom/LoginPage";
import { PIMPage } from "../pom/PIMPage";
import { getJsonData } from "../resources/utils/commonUtils";
import { faker } from "@faker-js/faker";

test.describe("Suite to add and search employees", () => {

    let jsonData: { [key: string]: string }[];

    test.beforeAll("Initializing data", () => {
        jsonData = getJsonData("employeeData.json");
    })

    test("Validate creation and searching of employees", async ({ page }) => {
        let loginPage = new LoginPage(page);
        let pimPage = new PIMPage(page);

        // Logging to App
        await page.goto("/");
        await loginPage.loginToApp();

        // Adding & Verifying employees
        // Adding 10 datas
        await pimPage.launchPIMPage();

        for (let i = 0; i < 10; i++) {
            try {
                await pimPage.addEmployee(jsonData[i]);
                console.log(`Iteration ${i + 1}: Employee Added Successfully`);

                await pimPage.searchAndVerifyEmployee(jsonData[i]);
                console.log(`Iteration ${i + 1}: Employee Verified Successfully`);
            } catch (error) {
                console.error(`Iteration ${i + 1}: Error Occurred`, error);
            }
        }
    })
})
