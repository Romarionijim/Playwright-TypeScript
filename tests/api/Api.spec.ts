import { expect, request, test } from '@playwright/test';

test.describe('this is an API test', async () => {
    const URI = 'https://gorest.co.in/public/v2/'



    test('api get test', async ({ request }) => {
        let response = await request.get(`${URI}/users`);
        let jsonRes = await response.json();
        console.log(jsonRes);
    })

    test('send data', async ({ request }) => {
        let response = await request.post(`${URI}/users`, {
            data: {
                id: "8232",
                name: "helloWorld",
                email: "fakerFake",
                gender: "mail",
                status: "idk"
            }
        })

        // expect(response.status).toBe(201);
    })


    test.only('fetch data that was just created', async({request}) => {
        let response = await request.get(`${URI}/users`);
        let jsonO = await response.json();
        console.log(jsonO);
        // expect(response.status).toBe(200);
    })

})