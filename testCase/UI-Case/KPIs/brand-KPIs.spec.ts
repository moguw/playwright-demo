/** Brand KPIs permissions handle
 * KPIs page
 * Create KPI
 * ...
*/

import { BrandKPIs } from '../../../Page/KPIs/brand_KPIs.page';
import { test,expect } from '../../../utils/Fixture-setup'

test.describe('test - brand KPIs',() => {
    let orgOwnerRole,groupOwnerRole,brandOwnerRole,operatorRole : BrandKPIs
  
    test.beforeEach(async ({ orgOwner,groupOwner,brandOwner,operator }) => {
        orgOwnerRole = new BrandKPIs(orgOwner.page)
        groupOwnerRole = new BrandKPIs(groupOwner.page)
        brandOwnerRole = new BrandKPIs(brandOwner.page)
        operatorRole = new BrandKPIs(operator.page)
    })

    test.describe('test - KPIs page',() => {
        test('org owner', async ({}) => {
            await orgOwnerRole.goToBrandKPIsPages()
            await orgOwnerRole.assertHasPermissionToBrandKPIs()
        });
    
        test('group owner', async ({}) => {
            await groupOwnerRole.goToBrandKPIsPages()
            await groupOwnerRole.assertHasPermissionToBrandKPIs()
        });
    
        test('brand owner', async ({}) => {
            await brandOwnerRole.goToBrandKPIsPages()
            await brandOwnerRole.assertHasPermissionToBrandKPIs()
        });
    
        test('operator', async ({}) => {
            await operatorRole.goToBrandKPIsPages()
            await operatorRole.assertHasPermissionToBrandKPIs()
        });
    });

    // test.describe('test - KPIs page',() => {
    //     test('org owner', async ({}) => {
    //         await orgOwnerRole.goToBrandKPIsPages()
    //         await orgOwnerRole.assertHasPermissionToBrandKPIs()
    //     });
    
    //     test('group owner', async ({}) => {
    //         await groupOwnerRole.goToBrandKPIsPages()
    //         await groupOwnerRole.assertHasPermissionToBrandKPIs()
    //     });
    
    //     test('brand owner', async ({}) => {
    //         await brandOwnerRole.goToBrandKPIsPages()
    //         await brandOwnerRole.assertHasPermissionToBrandKPIs()
    //     });
    
    //     test('operator', async ({}) => {
    //         await operatorRole.goToBrandKPIsPages()
    //         await operatorRole.assertHasPermissionToBrandKPIs()
    //     });
    // });



})