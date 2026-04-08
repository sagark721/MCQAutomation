import {defineConfig, devices} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


const testEnv= process.env.TEST_ENV || 'v3';

dotenv.config({ path: path.resolve(`data/env/.env.${testEnv}`)})

dotenv.config({path:path.resolve('.env.local'), override: true})

// eslint-disable-next-line no-console
console.log(`Environment: ${testEnv}`);  
// eslint-disable-next-line no-console
console.log(`Base URL: ${process.env.BASE_URL} \n`)


export default defineConfig({

    testDir: './tests',

    fullyParallel: true,

    workers: process.env.CI ? 4 :2,

    retries: process.env.CI? 2:0,

    timeout: 60 * 1000,

    expect:{
        timeout:10 * 1000
    },


    // What to capture on failure

    use:{

        baseURL: process.env.BASE_URL,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',
        
        trace: 'retain-on-failure',

        actionTimeout: 10 * 1000,

        navigationTimeout: 30 * 1000,

        viewport:  { width: 1920, height: 1000 } 
    },


    outputDir: 'test-results',

    // Reports

    reporter: [
        ['html',{outputFolder:'playwright-report', open:'never'}], 
        ['junit',{outputFile:'test-results/junit/results.xml'}] ,
        ['list', ]
    ],


    projects:[

        {
            name: 'setup',
            testMatch:'**tests/setup/auth.setup.ts'
        },


        {
            name:'chromium',
            use:{
                ...devices['Desktop Chrome'],
                viewport:  { width: 1920, height: 1000 }
            },
            
            dependencies: ['setup'],
            testIgnore:['**/setup/**']
        },
        

        {
            name: 'android',
            use:{
                ...devices['Pixel 7']
            },
            dependencies: ['setup'],
            testIgnore:['**/setup/**']
        }


    ]



    
})