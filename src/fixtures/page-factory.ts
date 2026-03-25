import {mergeTests} from '@playwright/test';

import {test as roleTest} from './auth/roles.fixture';

export const test=mergeTests(roleTest)


export {expect} from '@playwright/test'
