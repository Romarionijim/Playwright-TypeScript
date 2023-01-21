import { BasePage } from "../../common/BasePage";

export class HomePage extends BasePage {
    private shichorHomePageLogo = '.app-header__logo';

    public async clickOnShicorHomePageLogo() {
        await this.clickelement(this.shichorHomePageLogo);
    }

    
}                  