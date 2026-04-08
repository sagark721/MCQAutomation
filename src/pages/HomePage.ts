import { BasePage } from "./BasePage";
import { Page} from '@playwright/test';

export class HomePage extends BasePage{
    protected readonly path: string='';
    protected readonly pageName: string='Home Page';

    constructor(page:Page){
        super(page)
    }

}