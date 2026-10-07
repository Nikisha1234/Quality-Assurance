import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
import { ContactPage } from '../pageObjects/contact.po';

const testData =require('../fixtures/contactFixtures.json');
const {authenticateUser,createEntity,deleteEntity,getEntity,validateEntity} = require("../utils/helper.spec.js");
let accessToken

test.beforeEach(async ({ page }) => {
    const login=new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName,testData.validUser.password)
})

test.describe('Contact testCases', () => {
    
    test('Contact Add Test', async ({page, request}) => {
        const contact = new ContactPage(page);
        await contact.ContactAdd(testData.contact.firstName,testData.contact.lastName,testData.contact.dob,testData.contact.email,testData.contact.phone,testData.contact.address,testData.contact.city,testData.contact.state,testData.contact.postal,testData.contact.country);
        await contact.viewContact();
        await contact.validateContactCreated(testData.contact.firstName,testData.contact.lastName,testData.contact.dob,testData.contact.email,testData.contact.phone,testData.contact.address,testData.contact.city,testData.contact.state,testData.contact.postal,testData.contact.country);
    });

    test('Contact Edit Test', async ({page,request}) => {
       const Data={
            "firstName": "Binish",
            "lastName": "Maharjan",
            "birthdate": "1995-08-28",
            "email": "binish@gmail.com",
            "phone": "9828361113",
            "street1": "Nayabazar",
            "city": "Kathmandu",
            "stateProvince": "Bagmati",
            "postalCode": "44600",
            "country": "Nepal"
}
        
    
    const contact = new ContactPage(page);
    accessToken= await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
    await createEntity(Data,accessToken,'/contacts',{request});
    await page.reload();
    await contact.viewContact();
    await contact.editContactDetails(testData.contactEdit.firstName);
    await contact.validateEditedContact(testData.contactEdit.firstName);
    await page.waitForTimeout(2000);
    const id=await getEntity(accessToken,'/contacts','200',{request});
    await deleteEntity(accessToken,`/contacts/${id}`,{request}); 
    await validateEntity(accessToken,`/contacts/${id}`,'404',{request});
}) 

        test.only('Contact Delete test',async({page,request})=>{
            const Data={
                "firstName": "Binish",
                "lastName": "Maharjan",
                "dob": "1995-08-28",
                "email": "binish@gmail.com",
                "phone": "9828361113",
                "address": "Nayabazar",
                "city": "Kathmandu",
                "state": "Bagmati",
                "postal": "44600",
                "country": "Nepal"
            }
            const contact = new ContactPage(page);
            accessToken= await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
            await createEntity(Data,accessToken,'/contacts',{request});
            page.reload();
            await contact.viewContact();
            const id=await getEntity(accessToken,'/contacts','200',{request});
            await contact.contactDelete();
            await validateEntity(accessToken,`/contacts/${id}`,'404',{request}); 
    })
})