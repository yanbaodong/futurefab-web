import { BasicLocales, EchartLocales, FlowChartLocales } from '@futurefab/components/dist/locales';
import table_en from '@futurefab/vxe-table/lib/locale/lang/en-US';
const en: any = {
    common: {
        btn: {
            add: 'Add',
            save: 'Save',
            delete: 'Delete',
            modify: 'modify',
            view: 'view',
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
        },
        tip: {
            searchFirst: 'Please search first and then add',
            selectData: 'Please select a data',
            delSuccess: 'Delete successfully.',
            saveSuccess: 'Save successfully.',
            deleteTip: 'UnSaved data will be lost! Are you sure delete?',
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

    ...table_en,
    ...BasicLocales.enUS,
    ...EchartLocales.enUS,
    ...FlowChartLocales.enUS,
};
export default en;
(window as any).lang_en = en;
