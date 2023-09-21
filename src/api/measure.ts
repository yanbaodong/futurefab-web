/*
 * @Author: William Dong
 * @Date: 2023-09-20 19:22:53
 * @LastEditTime: 2023-09-21 13:23:19
 */
import { Data, getData } from './config';
export const getMeasureRecipeList = (data: Data) => {
    // getData('ViewTableConfigService', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = {
                data: [
                    {
                        technology: 'T1',
                        productId: 'PROD',
                        layer: '161',
                        eqpId: 'OVL01',
                        lotId: 'Lot001.01',
                        pointCount: '400',
                        pjId: 'Lot001.01_0293',
                        waferList: 'Lot001.01#1;Lot001.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAA_RCP',
                    },
                    {
                        technology: 'T2',
                        productId: 'PROD',
                        layer: '162',
                        eqpId: 'OVL02',
                        lotId: 'Lot002.01',
                        pointCount: '401',
                        pjId: 'Lot002.01_0293',
                        waferList: 'Lot001.01#1;Lot001.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAB_RCP',
                    },
                    {
                        technology: 'T3',
                        productId: 'PROD',
                        layer: '163',
                        eqpId: 'OVL03',
                        lotId: 'Lot003.01',
                        pointCount: '400',
                        pjId: 'Lot003.01_0293',
                        waferList: 'Lot003.01#1;Lot003.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAc_RCP',
                    },
                    {
                        technology: 'T1',
                        productId: 'PROD',
                        layer: '161',
                        eqpId: 'OVL01',
                        lotId: 'Lot001.01',
                        pointCount: '400',
                        pjId: 'Lot001.01_0293',
                        waferList: 'Lot001.01#1;Lot001.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAA_RCP',
                    },
                    {
                        technology: 'T2',
                        productId: 'PROD',
                        layer: '162',
                        eqpId: 'OVL02',
                        lotId: 'Lot002.01',
                        pointCount: '401',
                        pjId: 'Lot002.01_0293',
                        waferList: 'Lot001.01#1;Lot001.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAB_RCP',
                    },
                    {
                        technology: 'T3',
                        productId: 'PROD',
                        layer: '163',
                        eqpId: 'OVL03',
                        lotId: 'Lot003.01',
                        pointCount: '400',
                        pjId: 'Lot003.01_0293',
                        waferList: 'Lot003.01#1;Lot003.01#23',
                        time: '2023-09-06 10:00:00',
                        measureRecipeName: 'AAc_RCP',
                    },
                ],
                status: 'SUCCESS',
            };
            resolve(res);
        }, 1000);
    });
};
