/*
 * @Author: William Dong
 * @Date: 2023-09-20 18:42:51
 * @LastEditTime: 2023-09-20 19:06:17
 */
import { VXETable } from '@futurefab/vxe-table';

export const getGridOption = () => {
    return VXETable.tableFun.tableDefaultConfig({
        toolbarConfig: {
            tableName: 'Measure Recipe List',
            import: false, // 隐藏导入
            export: false, //隐藏导出
            tools: [
                ...VXETable.tableFun.getToolsButton([
                    {
                        id: ' measure-recipe-page-cpe',
                        name: 'Generate CPE',
                        icon: '',
                        type: 'button',
                    },
                    {
                        id: 'measure-recipe-page-1st',
                        name: 'Generate 1st Lot Correction',
                        type: 'button',
                        icon: '',
                    },
                    {
                        id: 'measure-recipe-page-wlc',
                        name: 'Generate WLC subrecipe',
                        type: 'button',
                        icon: '',
                    },
                ]),
            ],
        },
        checkboxConfig: {
            showHeader: false,
        },
        columns: [
            { field: 'rawId', type: 'checkbox', width: 40, title: 'SEL', headerClassName: 'sel' },
            {
                field: 'recipeName',
                title: 'Technology',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },
            {
                field: 'defaultYn',
                title: 'Product ID',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },

            {
                field: 'createBy',
                title: 'Layer',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
                filterRender: {},
            },
            {
                field: 'createDtts',
                title: 'Measure Recipe Name',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                // editRender: {// 绿色 的点
                //     name: '$input',
                //     props: {
                //         maxlength: 50,
                //     },
                // },
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'lastUpdateBy',
                title: ' Measure EQP ID',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
                filterRender: {
                    // name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: ' Measure LOT ID',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: ' Measure Point',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: 'Count',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: 'Measure PJ ID',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: 'Measure Wafer List',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: 'Measure Time',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
        ],
    });
};
