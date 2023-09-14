import { VXETable } from '@futurefab/vxe-table';

export const getGridOption = () => {
    return VXETable.tableFun.tableDefaultConfig({
        toolbarConfig: {
            tableName: 'common.title.customEvent',
            import: false,
            tools: [
                ...VXETable.tableFun.getToolsButton([
                    {
                        id: 'list-page-Add',
                        name: 'common.btn.add',
                        icon: 'icon-ic_btn_Add',
                        visible: true,
                    },
                    {
                        id: 'list-page-save',
                        name: 'common.btn.save',
                        icon: 'icon-ic_btn_Save',
                        visible: true,
                    },
                    {
                        id: 'list-page-delete',
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
        exportConfig: {
            filename: 'SeedPage.xlsx', // 前端导出需要加fileName配置
        },
        columns: [
            { field: 'rawId', type: 'checkbox', width: 40, title: 'SEL', headerClassName: 'sel' },
            {
                field: 'eqpAlias',
                title: 'seedPage.field.eqpAlias',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filters: [{}],
            },
            {
                field: 'moduleAlias',
                title: 'seedPage.field.moduleAlias',
                sortable: true,
                sortType: 'string',
                minWidth: 142,
                filters: [{}],
            },
            {
                field: 'defaultYn',
                title: 'seedPage.field.defaultYn',
                minWidth: 123,
                type: 'columnCheckbox-default',
                sortable: true,
                sortType: 'string',
                filters: [],
                filterRender: {},
            },
            {
                field: 'eventName',
                title: 'seedPage.field.eventName',
                sortable: true,
                sortType: 'string',
                minWidth: 142,
                editRender: {
                    name: '$input',
                    props: {
                        maxlength: 50,
                    },
                    events: {
                        input: (argus: any) => {
                            const { row, column, $table } = argus;
                            row.aliasEdit = true;
                        },
                    },
                },
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'eventComment',
                title: 'seedPage.field.eventComment',
                sortable: true,
                sortType: 'string',
                minWidth: 169,
                editRender: {
                    name: '$input',
                    props: {
                        maxlength: 50,
                    },
                },
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'eventFileName',
                title: 'seedPage.field.eventFileName',
                sortable: true,
                sortType: 'string',
                minWidth: 166,
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'eventDtts',
                title: 'seedPage.field.eventDtts',
                sortable: true,
                minWidth: 148,
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },

            {
                field: 'createBy',
                title: 'common.field.createdBy',
                sortable: true,
                sortType: 'string',
                minWidth: 128,
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'createDtts',
                title: 'common.field.createdTime',
                sortable: true,
                minWidth: 148,
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'lastUpdateBy',
                title: 'common.field.updatedBy',
                sortable: true,
                sortType: 'string',
                minWidth: 138,
                filters: [{}],
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'lastUpdateDtts',
                title: 'common.field.updatedTime',
                sortable: true,
                minWidth: 153,
                filters: [{}],
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
