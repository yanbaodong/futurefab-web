/*
 * @Author: William Dong
 * @Date: 2023-09-12 11:18:33
 * @LastEditTime: 2023-09-21 09:57:24
 */
import { VXETable } from '@futurefab/vxe-table';

export const getGridOption = () => {
    return VXETable.tableFun.tableDefaultConfig({
        toolbarConfig: {
            tableName: 'common.title.modelingRecipeList',
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
                title: 'modelRecipePage.field.modelingRecipeName',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },
            {
                field: 'defaultYn',
                title: 'modelRecipePage.field.defaultYn',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },

            {
                field: 'createBy',
                title: 'common.field.createdBy',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
                filterRender: {},
            },
            {
                field: 'createDtts',
                title: 'common.field.createdTime',
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
                title: 'modelRecipePage.field.lastUpdateBy',
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
                title: 'modelRecipePage.field.lastUpdateTime',
                sortable: true,
                minWidth: 123,
                // filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },

            // {
            //     field: 'goodEqp',
            //     sortable: true,
            //     title: 'eqpStatusRep.field.goodEqp',
            //     minWidth: 120,
            //     headerAlign: 'center',
            //     align: 'right',
            //     titlePrefix: {       // 表头的toolTip
            //         content: 'eqpStatusRep.tip.goodEqpTip',
            //     },
            //     filters: [{ data: { type: 'equal', name: '' } }],    // 数字类型的Filter
            //     filterRender: { name: 'FilterCompare' },
            // },
        ],
    });
};
