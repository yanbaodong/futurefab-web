import { BasicLocales, EchartLocales, FlowChartLocales } from '@futurefab/components/dist/locales';
import table_en from '@futurefab/vxe-table/lib/locale/lang/en-US';
const en: any = {
    common: {
        btn: {
            add: 'Add',
            save: 'Save',
            delete: 'Delete',
            modify: 'Modify',
            view: 'View',
            search: 'Search',
            reset: 'Reset',
        },
        field: {
            createdBy: 'CREATED BY',
            createdTime: 'CREATED TIME',
            updatedBy: 'UPDATED BY',
            updatedTime: 'UPDATED TIME',
        },
        loading: {
            text: 'Loading...',
        },
        title: {
            seedPage: 'Seed Page',
            customEvent: 'Custom Event',
            modelingRecipeList: 'Modeling Recipe',
        },
        tip: {
            searchFirst: 'Please search first and then add',
            selectData: 'Please select a data',
            delSuccess: 'Delete successfully.',
            saveSuccess: 'Save successfully.',
            deleteTip: 'UnSaved data will be lost! Are you sure delete?',
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
    ...table_en,
    ...BasicLocales.enUS,
    ...EchartLocales.enUS,
    ...FlowChartLocales.enUS,
};
export default en;
(window as any).lang_en = en;
