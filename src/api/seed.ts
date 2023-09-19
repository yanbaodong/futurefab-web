import { Data, getData } from './config';

export const getCustomEventList = (data: any) => getData('ViewCustomEventListService', data);

export const deleteCustomEvent = (data: Data) => getData('DeleteCustomEventService', data);

export const saveCustomEvent = (data: Data) => getData('SaveCustomEventService', data);

export const getTableConfig = (data: Data) => getData('ViewTableConfigService', data);

export const getModelRecipeList = (data: Data) => {
    // getData('ViewTableConfigService', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = {
                data: [
                    {
                        recipeName: 'AAA_RCP',
                        defaultYn: 'Y',
                        createBy: 'Tom',
                        createDtts: '2023-09-06 10:00:00',
                        lastUpdateBy: 'Tom',
                        LastUpdateTime: '2023-09-06 10:00:00',
                    },
                    {
                        recipeName: 'AAB_RCP',
                        defaultYn: 'N',
                        createBy: 'Jack',
                        createDtts: '2023-09-06 10:00:00',
                        lastUpdateBy: 'Tom',
                        LastUpdateTime: '2023-09-06 10:00:00',
                    },
                    {
                        recipeName: 'AAC_RCP',
                        defaultYn: 'N',
                        createBy: 'bill',
                        createDtts: '2023-09-06 10:00:00',
                        lastUpdateBy: 'Tom',
                        LastUpdateTime: '2023-09-06 10:00:00',
                    },
                    {
                        recipeName: 'AAD_RCP',
                        defaultYn: 'N',
                        createBy: 'Tony',
                        createDtts: '2023-09-06 10:00:00',
                        lastUpdateBy: 'Tom',
                        LastUpdateTime: '2023-09-06 10:00:00',
                    },
                ],
                status: 'SUCCESS',
            };
            resolve(res);
        }, 1000);
    });
};
export const getModelDetails = (data: Data) => {
    return new Promise((resolve, reject) => {
        let result = {
            data: {
                GlobalSetting: {
                    HealthFilter_XYPairingRange: '1',
                    HealthFilter_UsedOverlayComponent: 'X and Y',
                    HealthFilter_InvalidateXYAsPair: 'true',
                    EvaluationRegion: '135',
                    ValidDataFraction_MinPercentage: '60',
                },
                ModelList: [
                    {
                        Seq: '1',
                        GlobalModel: '10par',
                        RefinementModel: 'CPE6',
                        CommonSetting: {
                            HealthFilter_Max: '100',
                            HealthFilter_NSigma: '4',
                            HealthFilter_X_Max: '100',
                            HealthFilter_X_NSigma: '4',
                            HealthFilter_Y_Max: '100',
                            HealthFilter_Y_NSigma: '4',
                            HealthFilter_EdgeClearance: '3',
                            ResidualOutlierRemoval_NSigma: '10',
                            Granularity: 'Per wafer',
                            Decorrection_CPE_ViaSecs: 'false',
                            Decorrection_CPE_ViaSubrecipe: 'false',
                            Decorrection_ProcessCorrections: 'false',
                            TargetLabel: 'T1',
                            SampleSchemeName: 'Sample1',
                        },
                        RefinementSetting: {
                            ModelParameterReduction: 'true',
                            MUBPR: 'true',
                            MUBPR_X_Max: '2',
                            MUBPR_Y_Max: '2',
                            ActuatorRanges_SetName: 'OVO2_enlarge',
                        },
                    },
                    {
                        Seq: '2',
                        GlobalModel: '10par_no_filter',
                        RefinementModel: 'CPE7',
                        CommonSetting: {
                            HealthFilter_Max: '1001',
                            HealthFilter_NSigma: '42',
                            HealthFilter_X_Max: '1003',
                            HealthFilter_X_NSigma: '44',
                            HealthFilter_Y_Max: '1500',
                            HealthFilter_Y_NSigma: '44',
                            HealthFilter_EdgeClearance: '33',
                            ResidualOutlierRemoval_NSigma: '103',
                            Granularity: 'Per wafer',
                            Decorrection_CPE_ViaSecs: 'false',
                            Decorrection_CPE_ViaSubrecipe: 'false',
                            Decorrection_ProcessCorrections: 'false',
                            TargetLabel: '',
                            SampleSchemeName: '',
                        },
                        RefinementSetting: {
                            ModelParameterReduction: '',
                            MUBPR: '',
                            MUBPR_X_Max: '',
                            MUBPR_Y_Max: '',
                            ActuatorRanges_SetName: '',
                        },
                    },
                ],
            },
            status: 'SUCCESS',
        };
        setTimeout(() => {
            resolve(result);
        }, 100);
    });
};
// function getWorkflowData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('000');
//         }, 1000);
//     });
// }
