import { firefox, PlaywrightTestConfig } from '@playwright/test';
import { chromium } from 'playwright';
const config: PlaywrightTestConfig = {

    reporter: [
        ['list'],
        ['json', { outputFile: 'reports/test-results.json' }],
        ['allure-playwright'],
        ['junit', { outputFile: 'reports/test-results.xml' }],
        ['./myReporter'],
        ['html', { open: 'never' }]
    ],

    use: {
        viewport: { width: 1400, height: 900 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'on',
        trace: 'on',
        launchOptions: {
            headless: true,
            slowMo: 500,
        }
    },

    projects: [
        {
            name: 'Chrome Browser',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                viewport: { width: 1400, height: 900 },
            }
        },

        {
            name: 'FireFox Browser',
            use: {
                browserName: 'firefox',
                channel: 'firefox',
                viewport: { width: 1400, height: 900 },
            }
        },

        {
            name: 'Edge Browser',
            use: {
                browserName: 'chromium',
                channel: 'msedge',
                viewport: { width: 1400, height: 900 },
            }
        }
    ]

}

export default config;