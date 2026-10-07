import{test} from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
const testData =require('../../fixtures/loginFixtures.json');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})
test.describe('Valid login tests', () => {
    
    test('Login using valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.validUser.userName,testData.validUser.password);
        await loginPage.verifyLogins();
    });

    
});
test.describe('Invalid login tests', () => {
  test('Login using invalid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('invalid@gmail.com', 'Invalid@123');
        await loginPage.verifyInvalidLogins();
    });

    test('Login using invalid username', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('invalid@gmail.com', 'Sweta@123');
        await loginPage.verifyInvalidLogins();
    });
    test('Login using invalid password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('sweta.ranjit2005@gmail.com', 'Invalid@123');
        await loginPage.verifyInvalidLogins();
    });
    test('Login using empty credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(' ', ' ');
        await loginPage.verifyInvalidLogins();
    });
    test('Login using empty password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('sweta.ranjit2005@gmail.com', ' ');
        await loginPage.verifyInvalidLogins();
    });
    test('Login using empty username', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(' ', 'Sweta@123');
        await loginPage.verifyInvalidLogins();
    });
    
});

test.afterEach(async ({ page }) => {
    await page.close('/');
})