/*
 * @Author: William Dong
 * @Date: 2023-09-20 18:42:51
 * @LastEditTime: 2023-09-21 09:57:19
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
                        id: 'measure-recipe-page-cpe',
                        name: 'generateCpePage.btn.cpe',
                        // icon: '',
                        type: 'button',
                    },
                    {
                        id: 'measure-recipe-page-1st',
                        name: 'generateCpePage.btn.correction',
                        type: 'button',
                        // icon: '',
                    },
                    {
                        id: 'measure-recipe-page-wlc',
                        name: 'generateCpePage.btn.subrecipe',
                        type: 'button',
                        // icon: '',
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
                field: 'technology',
                title: 'Technology',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },
            {
                field: 'productId',
                title: 'Product ID',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },

            {
                field: 'layer',
                title: 'Layer',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
                filterRender: {},
            },
            {
                field: 'measureRecipeName',
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
                field: 'eqpId',
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
                field: 'lotId',
                title: ' Measure LOT ID',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'pointCount',
                title: ' Measure Point Count',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },

            {
                field: 'pjId',
                title: 'Measure PJ ID',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'waferList',
                title: 'Measure Wafer List',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'time',
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
