/*
 * @Author: William Dong
 * @Date: 2023-09-12 16:37:38
 * @LastEditTime: 2023-09-18 11:17:37
 */
export const OverlayComponentList = [
    {
        value: 'X',
        label: 'X',
    },
    {
        value: 'Y',
        label: 'Y',
    },
    {
        value: 'X and Y',
        label: 'X and Y',
    },
];
export const InvalidateXYAsPairList = [
    {
        value: 'true',
        label: 'true',
    },
    {
        value: 'false',
        label: 'false',
    },
];
export const DecorrectionCPEViaSubrecipeList = [
    {
        value: 'true',
        label: 'true',
    },
    {
        value: 'false',
        label: 'false',
    },
];
export const DecorrectionProcessCorrections = [
    {
        value: 'true',
        label: 'true',
    },
    {
        value: 'false',
        label: 'false',
    },
];
export const defaultYnMap: any = {
    Y: true,
    N: false,
};
export const modelingList = [
    {
        label: 'AAA_RCP',
        value: 'AAA_RCP',
    },
    {
        label: 'AAB_RCP',
        value: 'AAB_RCP',
    },
    {
        label: 'AAC_RCP',
        value: 'AAC_RCP',
    },
    {
        label: 'AAD_RCP',
        value: 'AAD_RCP',
    },
    {
        label: 'AAE_RCP',
        value: 'AAE_RCP',
    },
    {
        label: 'AAF_RCP',
        value: 'AAF_RCP',
    },
];
export const createByList = [
    {
        label: 'Tom',
        value: 'Tom',
    },
    {
        label: 'Tim',
        value: 'Tim',
    },
    {
        label: 'Jack',
        value: 'Jack',
    },
    {
        label: 'Bill',
        value: 'Bill',
    },
    {
        label: 'Nike',
        value: 'Nike',
    },
    {
        label: 'Fary',
        value: 'Fary',
    },
];
export const globalModelList = [
    {
        label: '10par',
        value: '10par',
    },
    {
        label: '20par',
        value: '20par',
    },
    {
        label: '30par',
        value: '30par',
    },
    {
        label: '40par',
        value: '40par',
    },
    {
        label: '50par',
        value: '50par',
    },
    {
        label: '60par',
        value: '60par',
    },
];
export const basicForm = {
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
};
