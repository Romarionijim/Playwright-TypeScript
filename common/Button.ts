import { Page } from "@playwright/test";

export class Button {
    protected buttonLocator: string;

    constructor(public page: Page, buttonLocator: string) {
        this.page = page;
        this.buttonLocator = buttonLocator;
    }

    public async clickButton() {
        const button = this.page.locator(this.buttonLocator);
        await button.click();
    }
}