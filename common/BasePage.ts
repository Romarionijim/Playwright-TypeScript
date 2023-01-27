import { Locator, Page } from "@playwright/test";
import { ApplicationUrl } from "./ApplicationUrl";


export class BasePage {

    constructor(public page: Page) {
        this.page = page;
    }

    public async loadApplication(url: ApplicationUrl) {
        await this.page.goto(url.valueOf());
    }

    public async clickelement(element: (string | Locator | undefined)) {
        const elementLocator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).click({ force: true });
        } else if (element === elementLocator) {
            await element.click({ force: true })
        } else if (element === undefined) {
            return undefined;
        } else {
            throw new Error(`cannot click on element since none of the data paremeters where returned`)
        }
    }

    public async fillText(element: (string | Locator | undefined), text: string) {
        const elementAsLocator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).click();
            await this.page.locator(element).fill(text);
        } else if (element === elementAsLocator) {
            await element.click();
            await element.fill(text);
        } else if (element === undefined) {
            return undefined;
        } else {
            throw new console.error(`cannot fill text on an element since none of the data paremeters where returned`);
        }
    }

    public async getAlertTextAndAccept(alertMessage: string) {
        this.page.on('dialog', async dialog => {
            const message = dialog.message();
            if (message === alertMessage) {
                return message && await dialog.accept();
            } else {
                throw new Error(`the actual alert message does not match the expected message: ${alertMessage}`)
            }
        })
    }

    public async hover(element: (string | Locator | undefined)) {
        const locatorElement = element as Locator;
        if (element === 'string') {
            await this.page.locator(element).hover();
        } else if (element === locatorElement) {
            await element.hover();
        } else if (element === undefined) {
            return undefined
        } else {
            throw new Error(`cannot hover on an element since none of the data parameter types were returned`)
        }
    }

    public async getCurrentFullDate() {
        const date = new Date();
        const getFullDate: string = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
        return getFullDate;
    }

    public async getCurrentHourAndMinutes() {
        const HourAndMinutes = new Date();
        const getHourAndMinutes = `${HourAndMinutes.getHours()}:${HourAndMinutes.getMinutes()}`;
        return getHourAndMinutes;
    }

    public async selectOption(element: (string | Locator), options?: { value: string, label: string }) {
        const elementLocator = element as Locator;
        if (typeof element === 'string' && options?.value !== undefined) {
            await this.page.locator(element).selectOption({ value: options.value });
        } else if (typeof element === 'string' && options?.label !== undefined) {
            await this.page.locator(element).selectOption({ label: options.label });
        } else if (element === elementLocator && options?.value !== undefined) {
            await element.selectOption({ value: options.value });
        } else if (element === elementLocator && options?.label !== undefined) {
            await element.selectOption({ label: options.label });
        } else {
            throw new Error(`The option that you are expecting :${options?.value} or ${options?.label} do not actually exist`)
        }
    }

    public async dragAndDrop(dragElement: (string | Locator), dropElement: (string | Locator)) {
        const dragLocator = dragElement as Locator;
        const dropLocator = dropElement as Locator;
        if (typeof dragElement === 'string' && typeof dropElement === 'string') {
            await this.page.locator(dragElement).dragTo(this.page.locator(dropElement))
        } else if (dragElement === dragLocator && dropElement === dropLocator)
            await dragElement.dragTo(dropElement);
    }

    public async clearText(element: (string | Locator)) {
        const locator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).clear();
        } else if (element === locator) {
            await element.clear();
        }
    }

    public async checkAndChangeCheckBoxState(checkBoxElement: (string | Locator)) {
        const checboxAsLocator = checkBoxElement as Locator;
        if (checkBoxElement === checboxAsLocator) {
            const isChecked = await checkBoxElement.isChecked();
            if (isChecked === false) {
                await checkBoxElement.check();
            } else {
                await checkBoxElement.uncheck();
            }
        } else if (typeof checkBoxElement === 'string') {
            const isChecked = await this.page.locator(checkBoxElement).isChecked();
            if (isChecked === false) {
                await this.page.locator(checkBoxElement).check();
            } else {
                await this.page.locator(checkBoxElement).uncheck();
            }
        } else {
            return undefined;
        }
    }

    public async chooseElementFromListByText(element: string, text: string) {
        const listArray = await this.page.$$(element);
        for (let el of listArray) {
            const elementText = await el.innerText();
            if (elementText.trim() === text) {
                await el.click();
                return;
            }
        }
    }

    public async scrollIntoViewIfNeeded(element: Locator) {
        await element.scrollIntoViewIfNeeded();
    }

    public async waitforTimeout(milliseconds: number) {
        await this.page.waitForTimeout(milliseconds);
    }

    public async waitForVisibilityOfElement(element: (string | Locator)) {
        const locator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).waitFor({ state: 'visible' });
        } else if (element === locator) {
            await element.waitFor({ state: 'visible' });
        }
    }

    public async waitForInvisibilityOfElement(element: (string | Locator)) {
        const locator = element as Locator;
        if (typeof element === 'string') {
            await this.page.locator(element).waitFor({ state: 'hidden' });
        } else if (element === locator) {
            await element.waitFor({ state: 'hidden' });
        }
    }

    public async clickAndChooseFromDropdownByText(dropdownLocator: string, dropdownListLocator: string, text: string) {
        await this.clickelement(dropdownLocator);
        const dropDownList = await this.page.$$(dropdownListLocator);
        for (let element of dropDownList) {
            const elementText = await element.innerText();
            if (elementText.trim() === text) {
                await element.click();
                return;
            }
        }
    }

    public async getTableCellValue(tableLocaor: string, rowText: string, columnName: string) {
        const row = this.page.locator(`${tableLocaor} tbody tr`, { hasText: rowText });
        const columnHeader = await this.getTableColumnIndex(tableLocaor, columnName);
        const cellValue = row.locator('td').nth(columnHeader);
        return await cellValue.innerText();
    }

    public async getTableColumnIndex(columnsLocator: string, columnName: string) {
        const columns = await this.page.$$(`${columnsLocator} thead th`);
        for (let i = 0; i < columns.length; i++) {
            if (await columns[i].innerText() === columnName) {
                return i;
            }
        }
        throw new Error(`The column ${columnName} was not found`)
    }
}

