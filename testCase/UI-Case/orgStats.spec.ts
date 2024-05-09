/** Org stats permissions handle
 * Stats menu 
 * ...
*/

import { OrgStats } from '../../Page/orgStats.page';
import { test,expect } from '../../utils/Fixture-setup';

// test.describe('test - org stats cases',() => {
//     let OrgStats_orgOwner,OrgStats_groupOwner,OrgStats_brandOwner,OrgStats_operator : OrgStats
  
//     test.beforeEach(async ({ orgOwner,groupOwner,brandOwner,operator }) => {
//         OrgStats_orgOwner = new OrgStats(orgOwner.page)
//         OrgStats_groupOwner = new OrgStats(groupOwner.page)
//         OrgStats_brandOwner = new OrgStats(brandOwner.page)
//         OrgStats_operator = new OrgStats(operator.page)
//     })

//     test.describe('test - stats menu',() => {
//         test('org owner', async ({}) => {
//             await OrgStats_orgOwner.goToStatsPage()
//             await OrgStats_orgOwner.assertHasPermissionToStats()
//         });
    
//         test('group owner', async ({}) => {
//             await OrgStats_groupOwner.goToStatsPage()
//             await OrgStats_groupOwner.assertHasPermissionToStats()
//         });
    
//         test('brand owner', async ({}) => {
//             await OrgStats_brandOwner.goToStatsPage()
//             await OrgStats_brandOwner.assertHasPermissionToStats()
//         });
    
//         test('operator', async ({}) => {
//             await OrgStats_operator.goToStatsPage()
//             await OrgStats_operator.assertNoPermissionToStats()
//         });
//     });
// })