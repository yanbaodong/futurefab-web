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
        },
        tip: {
            searchFirst: '请先搜索再新增',
            selectData: '请选择一条数据',
            delSuccess: '删除成功',
            saveSuccess: '保存成功',
            deleteTip: '未保存的数据将会丢失! 确定要删除吗?',
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

    ...table_cn,
    ...BasicLocales.zhCN,
    ...EchartLocales.zhCN,
    ...FlowChartLocales.zhCN,
};
export default cn;
(window as any).lang_cn = cn;
