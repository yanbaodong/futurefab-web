<!--
 * @Author: William Dong
 * @Date: 2023-09-21 15:54:16
 * @LastEditTime: 2023-09-22 10:26:56
-->
<template>
    <div class="find-mapping-process-info-container">
        <main class="main-grid">
            <div class="list-page-grid-container" v-isLoading="{
                isShow: data.loading,
                title: $t('common.loading.text'),
                hasButton: true,
                buttonEvent: loadingCancel,
            }">
                <vxe-grid ref="xGrid" v-bind="gridOptions" :data="data.tableList" v-on="events">
                </vxe-grid>
            </div>
        </main>
        <span class="arrow-down">
        </span>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from "vue";
import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';
import {
    getPermissionButton,
    setHeaderSelectFilter,
    showWarning,
} from '@futurefab/components/dist/utils';
const data = reactive({
    checkboxRecords: [] as Array<any>,
    loading: false,
    tableList: [] as Array<any>,

});
const xGrid = ref();
let controller: AbortController | undefined = undefined;
const loadingCancel = () => {
    console.log('loadingcancel');
    data.loading = false;
    // 中断请求
    if (controller) {
        controller.abort();
    }
};
const getGridOption = () => {
    return VXETable.tableFun.tableDefaultConfig({
        toolbarConfig: {
            tableName: 'Step 1: Find Mapping Process Info',
            import: false, // 隐藏导入
            export: false, //隐藏导出
            tools: [
                ...VXETable.tableFun.getToolsButton([
                    {
                        id: 'measure-recipe-page-mapping',
                        name: 'generateCpePage.btn.mapping',
                        type: 'button',
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
                title: 'Measure PJ ID',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                // filters: [{}],
            },
            {
                field: 'productId',
                title: 'Measure Wafer List',
                sortable: true,
                sortType: 'string',
                minWidth: 143,
                // filters: [{}],
            },

            {
                field: 'layer',
                title: 'Layer',
                sortable: true,
                sortType: 'string',
                minWidth: 100,
                // filters: [{}],
                filterRender: {},
            },
            {
                field: 'measureRecipeName',
                title: 'Measure Recipe Name',
                sortable: true,
                sortType: 'string',
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'result',
                title: 'Result',
                sortable: true,
                sortType: 'string',
                minWidth: 80,
                // filters: [{}],
            },
            {
                field: 'lotId',
                title: 'Error Message',
                sortable: true,
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'pointCount',
                title: 'Process PJ ID',
                sortable: true,
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },

            {
                field: 'pjId',
                title: 'Process EQP ID',
                sortable: true,
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'waferList',
                title: 'Exposure Time',
                sortable: true,
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },
            {
                field: 'time',
                title: 'Measure Time',
                sortable: true,
                minWidth: 123,
                filterRender: {
                    name: '$input',
                },
            },
        ],
    });
}
const events = {

    toolbarToolClick: ({ code }: VxeGridDefines.ToolbarToolClickEventParams) => {
        // 获取当前选中的唯一一列数据
        const checkboxRecords = xGrid.value && xGrid.value.getCheckboxRecords();
        switch (code) {
            case 'mapping':
                console.log('mapping');
                break;
            case 'refresh':
                break;
        }
    },
    checkboxChange: (records: any) => {
        // debugger;//多选框事件
        console.log(records, 'records');
    },
};
data.tableList = [
    {
        result: 'Y'
    },
    {
        result: 'Y'
    },
    {
        result: 'Y'
    },
    {
        result: 'Y'
    },
]
const gridOptions = getGridOption();

</script>

<style scoped lang="less">
@import url('@/assets/style/variable.less');

.find-mapping-process-info-container {
    height: 180px;

    .main-grid {
        height: 180px;
    }

    .list-page-grid-container {
        position: relative;
        flex-grow: 1;
        overflow: auto;
        border-radius: @border-circle;
        padding: @module-padding;
        background: @bg-color;
        height: 180px;
    }

    /deep/.vxe-grid {
        .vxe-grid--toolbar-wrapper {
            .vxe-toolbar {
                .vxe-tools--wrapper {
                    .vxe-button--icon {
                        display: none;


                    }

                    .vxe-button {
                        &.type--button {
                            background-color: @btn-default-bg-color;
                            border-color: @btn-default-br-color;
                            color: @btn-default-ft-color;

                        }

                        &:hover {
                            background-color: @btn-default-hover-bg-color;
                            border-color: @btn-default-hover-br-color;
                            color: @btn-default-hover-font-color;
                        }
                    }
                }
            }
        }
    }

    .arrow-down {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-right: 1px solid @input-font-color;
        border-bottom: 1px solid @input-font-color;
        transform: rotate(45deg);
        margin: 0 auto;
    }
}
</style>
