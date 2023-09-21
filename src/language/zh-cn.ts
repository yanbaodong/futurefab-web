import table_cn from '@futurefab/vxe-table/lib/locale/lang/zh-CN.js';
import { BasicLocales, EchartLocales, FlowChartLocales } from '@futurefab/components/dist/locales';
const cn: any = {
    common: {
        btn: {
            add: '新增',
            save: '保存',
            modify: '修改',
            view: '查看',
            delete: '删除',
            search: '搜索',
            reset: '重置',
        },
        field: {
            createdBy: 'CREATED BY',
            createdTime: 'CREATED TIME',
            updatedBy: 'UPDATED BY',
            updatedTime: 'UPDATED TIME',
        },
        loading: {
            text: '加载中...',
        },
        title: {
            seedPage: 'Seed Page',
            customEvent: 'Custom Event',
            modelingRecipeList: 'Modeling Recipe',
        },
        tip: {
            searchFirst: '请先搜索再新增',
            selectData: '请选择一条数据',
            delSuccess: '删除成功',
            saveSuccess: '保存成功',
            deleteTip: '未保存的数据将会丢失! 确定要删除吗?',
            selectTip: 'Please select',
        },
    },
    seedPage: {
        field: {
            eqpAlias: 'EQP ALIAS',
            moduleAlias: 'MODULE ALIAS',
            defaultYn: 'DEFAULT YN',
            eventName: 'EVENT NAME',
            eventFileName: 'EVENT FILENAME',
            eventComment: 'EVENT COMMENT',
            eventDtts: 'EVENT TIME',
        },
    },
    modelRecipePage: {
        field: {
            modelingRecipe: 'Modeling Recipe Name',
            createBy: 'Create By',
            search: 'Search',
            reset: 'Reset',

            modelingRecipeName: 'MODELING RECIPE NAME',
            defaultYn: 'DEFAULT YN',
            createTime: 'CREATE TIME',
            lastUpdateBy: 'LAST UPDATE BY',
            lastUpdateTime: 'LAST UPDATE TIME',
            add: 'ADD',
            modify: 'MODIFY',
            view: 'VIEW',
            save: 'Save',
            globalSetting: 'Global Setting',
            model: 'Model',
            healthFilter: 'HealthFilter',
            xYPairingRange: 'XYPairingRange',
            usedOverlayComponent: 'UsedOverlayComponent',
            invalidateXYAsPair: 'InvalidateXYAsPair',
            overruleMetrologyValidity: 'OverruleMetrologyValidity(Optional)',
            evaluationRegion: 'EvaluationRegion',
            validDataFractionMinPercentage: 'ValidDataFraction-MinPercentage',
            isDefaultModelingRecipe: 'Is default modeling recipe',
            globalModel: 'Global Model',
            refinementModel: 'Refinement Model',
            commonSetting: 'Common Setting',
            refinementSetting: 'Refinement Setting',
            healthFilterMax: 'HealthFilter-Max',
            healthFilterNSigma: 'HealthFilter-NSigma',
            healthFilterXMax: 'HealthFilter-X-Max',
            healthFilterXNSigma: 'HealthFilter-X-NSigma',
            healthFilterYMax: 'HealthFilter-Y-Max',
            healthFilterYNSigma: 'HealthFilter-Y-NSigma',
            healthFilterEdgeClearance: 'HealthFilter-EdgeClearance',
            residualOutlierRemovalNSigma: 'ResidualOutlierRemoval-NSigma',
            granularity: 'Granularity',
            decorrectionCPEViaSecs: 'Decorrection-CPE-ViaSecs',
            decorrectionCPEViaSubrecipe: 'Decorrection-CPE-ViaSubrecipe',
            decorrectionProcessCorrections: 'Decorrection-ProcessCorrections',
            targetLabel: 'TargetLabel',
            sampleSchemeName: 'SampleSchemeName',
            modelParameterReduction: 'ModelParameterReduction',
            mubpr: 'MUBPR',
            mubprXMax: 'MUBPR-X-Max',
            mubprYMax: 'MUBPR-Y-Max',
            actuatorRangesSetName: 'ActuatorRanges-SetName',
        },
    },
    generateCpePage: {
        btn: {
            cpe: 'Generate CPE',
            correction: 'Generate 1st Lot Correction',
            subrecipe: 'Generate WLC subrecipe',
        },
    },

    ...table_cn,
    ...BasicLocales.zhCN,
    ...EchartLocales.zhCN,
    ...FlowChartLocales.zhCN,
};
export default cn;
(window as any).lang_cn = cn;
