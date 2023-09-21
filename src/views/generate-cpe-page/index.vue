<!--
 * @Author: William Dong
 * @Date: 2023-09-20 15:18:36
 * @LastEditTime: 2023-09-21 11:14:47
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
            <!-- 新增和编辑面板 -->

            <ff-basic-sidebar v-if="sidebar.show" :title="sidebar.title" :hasZoom="true" @clickbutton="handleClick">
                <template #sidebar_content>
                    <header class="measure-header-wrap"></header>
                    <section class="lis-recipe-setting-wrap"></section>
                    <section class="step-1-wrap"></section>
                    <section class="step-2-wrap"></section>
                    <section class="step-3-wrap"></section>
                    <footer class="input-wrap"></footer>

                </template>
            </ff-basic-sidebar>

        </main>
    </div>
</template>

<script lang='ts' setup>
import SearchGroup from './components/SearchGroup.vue';
import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';
import { getGridOption } from './config';
import { reactive, ref } from "vue";
import { getMeasureRecipeList, } from '@/api/measure';
import {
    getPermissionButton,
    setHeaderSelectFilter,
    showWarning,
} from '@futurefab/components/dist/utils';
import useMeasureRecipe from './composition/measureRecipePage';
const {
    sidebar,
    handleClick,
    handelGenerateCpe,
    handelGenerate1stLotCorrection,
    handelGenerate1stWlcSubrecipe } = useMeasureRecipe()
const gridOptions = getGridOption();
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
const xGrid = ref();
const getMeasureRecipe = (params: any) => {
    data.loading = true;
    controller = new AbortController();
    const param = {
        signal: controller.signal,
        bodyParams: {},
    };
    getMeasureRecipeList(param).then(async (res: any) => {
        console.log('res', res);
        // debugger;
        data.loading = false;
        if (res.status == 'SUCCESS') {
            data.modelRecipeList = res.data;
            setHeaderSelectFilter({
                xGrid: xGrid,
                tableData: res.data,
                columnFieldList: ['technology', 'productId', 'layer', 'measureRecipeName', 'eqpId', 'lotId', 'pointCount', 'pjId', 'waferList', 'time'],
            });
        }
    });
};
getMeasureRecipe({})
const onSearch = () => {

}
const events = {

    toolbarToolClick: ({ code }: VxeGridDefines.ToolbarToolClickEventParams) => {
        // 获取当前选中的唯一一列数据
        const checkboxRecords = xGrid.value && xGrid.value.getCheckboxRecords();
        switch (code) {
            case 'generateCpe':
                //   Generate CPE
                if (checkboxRecords && checkboxRecords.length === 0) {
                    showWarning('请选择一行或多行数据进行操作');
                    return;
                }
                handelGenerateCpe()
                break;
            case 'generate1stLotCorrection':
                //   Generate 1st Lot Correction
                if (checkboxRecords && checkboxRecords.length === 0) {
                    showWarning('请选择一行或多行数据进行操作');
                    return;
                }
                handelGenerate1stLotCorrection()
                break;
            case 'generateWlcSubrecipe':
                if (checkboxRecords && checkboxRecords.length === 0) {
                    showWarning('请选择一行或多行数据进行操作');
                    return;
                }
                //   Generate WLC subrecipe
                handelGenerate1stWlcSubrecipe()
                break;
            case 'refresh':
                getMeasureRecipe({});
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

    .main-grid {
        min-height: 800px;
    }

    .list-page-grid-container {
        position: relative;
        flex-grow: 1;
        overflow: auto;
        border-radius: @border-circle;
        padding: @module-padding;
        background: @bg-color;
        height: 800px;

        /deep/.vxe-grid {
            .vxe-grid--toolbar-wrapper {
                .vxe-toolbar {
                    .vxe-tools--wrapper {
                        .vxe-button--icon {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
