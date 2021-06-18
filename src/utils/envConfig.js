const ENVIRONMENT = {
    DEV: 'DEV',
    PROD: 'PROD',
}

const DEV_BASE_URL = "";
const PROD_BASE_URL = "";

const currentEnv = ENVIRONMENT.DEV;

export default class EnvConfig {
    static getBaseURL() {
        switch (currentEnv) {
            case ENVIRONMENT.PROD:
                return PROD_BASE_URL;
            default:
                return DEV_BASE_URL;
        }
    }
}