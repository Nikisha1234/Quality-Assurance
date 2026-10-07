const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#email";
    this.passwordInput = "#password";
    this.loginButton = '//button[text()="Submit"]';
    this.logOut = '//button[text()="Logout"]';
    this.loginValidation ='//p[contains(text(),"Click on any contact to view the Contact Details")]';
    this.alretMessage = '//span[@id="error"]';
  }
  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyLogins() {
    const LoginValidation = await this.page.locator(this.loginValidation);

    await this.page.waitForTimeout(3000);

    await expect(this.page.locator(this.logOut)).toBeVisible();

    await expect(LoginValidation).toHaveText(
      "Click on any contact to view the Contact Details",
    );
  }

  async verifyInvalidLogins() {
    const InvalidLogin = await this.page.locator(this.alretMessage);

    await expect(InvalidLogin).toHaveText("Incorrect username or password");
  }
};
