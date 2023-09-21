<!--
 * @Author: William Dong
 * @Date: 2023-09-20 15:18:36
 * @LastEditTime: 2023-09-21 16:47:08
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
                    <header class="measure-header-wrap">

                        <div class="input-box">
                            <!--Technology  不可修改-->
                            <p class="label">Technology</p>

                            <a-input v-model:value="form.technology" placeholder="" disabled />
                        </div>
                        <div class="input-box">
                            <!-- Product ID  不可修改-->
                            <p class="label">Product ID</p>

                            <a-input v-model:value="form.productId" placeholder="" disabled />
                        </div>
                        <div class="input-box">
                            <!-- Layer  不可修改-->
                            <p class="label">Layer</p>

                            <a-input v-model:value="form.layer" placeholder="" disabled />
                        </div>
                    </header>
                    <div class="border-line"></div>
                    <section class="lis-recipe-setting-wrap">
                        <lis-recipe-setting :form="lisRecipeSettingForm"></lis-recipe-setting>
                    </section>
                    <section class="step-1-wrap">
                        <find-mapping-process-info></find-mapping-process-info>
                    </section>
                    <section class="step-2-wrap">
                        <generate-fingerprint></generate-fingerprint>
                    </section>
                    <section class="step-3-wrap">
                        <generate-sub-recipe></generate-sub-recipe>
                    </section>
                    <footer class="input-wrap">

                    </footer>
                </template>
            </ff-basic-sidebar>

        </main>
    </div>
</template>

<script lang='ts' setup>
import SearchGroup from './components/SearchGroup.vue';
import LisRecipeSetting from './components/LisRecipeSetting.vue';
import generateSubRecipe from './components/generateSubRecipe.vue';
import generateFingerprint from './components/generateFingerprint.vue';
import findMappingProcessInfo from './components/findMappingProcessInfo.vue';
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
    form,
    lisRecipeSettingForm,
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
                handelGenerateCpe(checkboxRecords)
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
@import url('@/assets/style/variable.less');

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

    .basic_sidebar_wrapper {
        .vxe-modal--box {
            .vxe-modal--body {
                .vxe-modal--content {
                    .basic_sidebar_content {
                        .measure-header-wrap {
                            display: flex;
                            align-items: center;

                            .input-box {
                                padding: 10px 20px 20px;

                                .label {
                                    color: @input-font-color;
                                    margin-bottom: 10px;
                                }

                                .ant-input {
                                    width: 210px;
                                }
                            }
                        }

                        .step-1-wrap {}

                        .step-2-wrap {}

                        .step-3-wrap {}
                    }
                }
            }
        }
    }

}
</style>
