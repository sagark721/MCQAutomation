declare namespace NodeJS{

    interface ProcessEnv{

        TEST_ENV: 'v3' | 'v4' | 'stage' | 'prod';

        BASE_URL: string;

        CAN_INDIVIDUAL_EMAIL : string;
        CAN_INDIVIDUAL_PASSWORD: string;

        IND_TRUST_EMAIL: string;
        IND_TRUST_PASSWORD: string

        US_COMPANY_EMAIL: string;
        US_COMPANY_PASSWORD: string;


        CI: string | undefined;

    }

}