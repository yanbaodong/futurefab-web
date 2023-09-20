/*
 * @Author: William Dong
 * @Date: 2023-09-20 18:42:51
 * @LastEditTime: 2023-09-20 18:59:54
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
                        id: 'modeling-recipe-page-Add',
                        name: 'common.btn.add',

                        icon: 'icon-ic_btn_Add',
                    },
                    {
                        id: 'modeling-recipe-page-view',
                        name: 'common.btn.view',

                        icon: 'icon-ic_btn_View',
                        visible: true,
                    },
                    {
                        id: 'modeling-recipe-page-modify',
                        name: 'common.btn.modify',
                        icon: 'icon-ic_btn_Modify',
                        visible: true,
                    },
                    {
                        id: 'modeling-recipe-page-delete',
                        name: 'common.btn.delete',
                        icon: 'icon-ic_btn_Delete',
                        visible: true,
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
