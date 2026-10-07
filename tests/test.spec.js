import { test, expect} from '@playwright/test';
test.beforeEach(async({page})=>{
  await page.goto('/');
})

test('Login using login credentials', async ({ page }) => {
  //await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('mhrznnikki@gmail.com');
  await page.getByPlaceholder('Password').fill('nikisha');
  await page.waitForTimeout(5000);
  await expect(page.getByRole('Submit')).click();
  await expect(page.getByText('Logout')).toBeVisible();

});

test('Invalid email and invalid password', async ({ page }) => {
 // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('rammhrzn@gmail.com');
  await page.getByPlaceholder('Password').fill('wrong123');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).click();
});
/*
test('Valid email and invalid password', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('rammhrzn@gmail.com');
  await page.getByPlaceholder('Password').fill('wrong123');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).toBeVisible();
});

test('Invalid email and valid password', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('wrong@gmail.com');
  await page.getByPlaceholder('Password').fill('ram');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).toBeVisible();
});

test('Empty email and valid password', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('');
  await page.getByPlaceholder('Password').fill('ram');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).toBeVisible();
});

test('Valid email and empty password', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('rammhrzn@gmail.com');
  await page.getByPlaceholder('Password').fill('');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).toBeVisible();
});

test('Empty email and empty password', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.locator("xpath=//input[@id='email']").fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.waitForTimeout(5000);
  await expect(page.getByText('Submit')).toBeVisible();
});
*/