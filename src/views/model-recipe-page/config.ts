/*
 * @Author: William Dong
 * @Date: 2023-09-12 11:18:33
 * @LastEditTime: 2023-09-14 13:22:41
 */
import { VXETable } from '@futurefab/vxe-table';

export const getGridOption = () => {
    return VXETable.tableFun.tableDefaultConfig({
        toolbarConfig: {
            tableName: 'Modeling Recipe List',
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
                title: 'Modeling Recipe Name',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },
            {
                field: 'defaultYn',
                title: 'Default YN',
                sortable: true,
                sortType: 'string',
                minWidth: 142,
                filters: [{}],
            },

            {
                field: 'createBy',
                title: 'Create By',
                sortable: true,
                sortType: 'string',
                minWidth: 142,

                filters: [{}],
                filterRender: {},
            },
            {
                field: 'createDtts',
                title: 'Create Time',
                sortable: true,
                sortType: 'string',
                minWidth: 169,
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
                title: 'Last Update By',
                sortable: true,
                sortType: 'string',
                minWidth: 166,
                filters: [{}],
                filterRender: {
                    // name: '$input',
                },
            },
            {
                field: 'LastUpdateTime',
                title: ' Last Update Time',
                sortable: true,
                minWidth: 148,
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
