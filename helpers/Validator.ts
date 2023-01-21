import { expect } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export default class Validator extends BasePage {

    public async validatePageTitle(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);

    }

    public async validatCurrentUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}