import { faker } from "@faker-js/faker"

export default class {
    public get getRandomFirstName(): string {
        return faker.name.firstName();
    }

    public get getRandomeLastName(): string {
        return faker.name.lastName();
    }

    public get getRandomEmail(): string {
        return faker.internet.email();
    }

    public get getRandomWords(): string {
        return faker.random.words();
    }
}
