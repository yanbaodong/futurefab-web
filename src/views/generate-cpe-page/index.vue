<!--
 * @Author: William Dong
 * @Date: 2023-09-20 15:18:36
 * @LastEditTime: 2023-09-20 17:22:56
-->
<template>
    <div class="generate-cpe-page">
        <header class="header-search">
            <search-group @onSearch="onSearch"></search-group>
        </header>
        <div class="border-line"></div>
        <main class="main-grid">
            <div class="list-page-grid-container" v-isLoading="{
                isShow: data.loading,
                title: $t('common.loading.text'),
                hasButton: true,
                buttonEvent: loadingCancel,
            }">
                <vxe-grid ref="xGrid" v-bind="gridOptions" :data="data.modelRecipeList" v-on="events"
                    :edit-rules="data.tableRules">
                </vxe-grid>
            </div>
        </main>
    </div>
</template>

<script lang='ts' setup>
import SearchGroup from './components/SearchGroup.vue';
import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';

import { reactive, ref } from "vue";
import {
    getPermissionButton,
    setHeaderSelectFilter,
    showWarning,
} from '@futurefab/components/dist/utils';
const data = reactive({
    egHistoryList: [] as Array<any>,
    checkboxRecords: [] as Array<any>,
    loading: false,
    modelRecipeList: [] as Array<any>,
    tableRules: {} as VxeTableDefines.ValidatorRule,
});
let controller: AbortController | undefined = undefined;
const loadingCancel = () => {
    console.log('loadingcancel');
    data.loading = false;
    // 中断请求
    if (controller) {
        controller.abort();
    }
};

const onSearch = () => {

}
const events = {
    // 0. Search：点击后查询数据表
    // 1. Add：点击新增一个Modeling Recipe
    // 2. View：选中唯一一行数据，以只读方式打开Modeling Recipe配置页面
    // 3. Modify：选中唯一一行数据，以修改方式打开Modeling Recipe配置页面
    // 4. Delete：至少选中一行数据，删除选中的Modeling Recipe。如果选中了Default为Y的Modeling recipe，则弹窗警告，不能删除。删除Modeling Recipe时，需要检查是否被引用，不能删除正在被引用的recipe，需弹窗警告。
    toolbarToolClick: ({ code }: VxeGridDefines.ToolbarToolClickEventParams) => {
        // 获取当前选中的唯一一列数据
        const checkboxRecords = xGrid.value && xGrid.value.getCheckboxRecords();
        switch (code) {
            case 'add':
                // handleAdd();
                break;
            case 'view':
                //选中唯一一行数据
                if (checkboxRecords && checkboxRecords.length !== 1) {
                    showWarning('请选择唯一一行数据进行查看');
                    return;
                }
                // handleView(checkboxRecords);

                break;
            case 'modify':
                //选中唯一一行数据
                if (checkboxRecords && checkboxRecords.length !== 1) {
                    showWarning('请选择唯一一行数据进行编辑');
                    return;
                }
                // handleModify(checkboxRecords);
                break;
            case 'delete':
                if (checkboxRecords && checkboxRecords.length === 0) {
                    showWarning('请选择至少一条数据进行删除');
                    return;
                }
                // handleDelete(checkboxRecords);
                break;
            case 'refresh':
                // getModelRecipe({});
                break;
        }
    },
    checkboxChange: (records: any) => {
        // debugger;//多选框事件
        console.log(records, 'records');
    },
};
</script>

<style scoped lang="less">
@import url('../../assets/style/variable.less');

.generate-cpe-page {
    position: relative;
    flex-grow: 1;
    overflow: auto;
    border-radius: @border-circle;
    padding: @module-padding;
    background: @bg-color;

    .header-search {
        margin-bottom: 20px;
    }

    .border-line {
        // border: 1px ;
        height: 0;
        border-bottom: 1px solid @model-br-color;
    }

}
</style>
