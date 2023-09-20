<!--
 * @Author: William Dong
 * @Date: 2023-09-11 15:56:47
 * @LastEditTime: 2023-09-20 17:23:09
-->
<template>
    <div class="model-recipe-page">
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
            <ff-basic-sidebar v-if="sidebar.show" :title="sidebar.title" :hasZoom="false" @clickbutton="handleClick">
                <template #sidebar_content>
                    <!-- 头部 -->
                    <header class="modeling-header">
                        <div class="left-input-box">
                            <span class="label">{{ $t('modelRecipePage.field.modelingRecipe') }}</span>
                            <a-input :disabled="sidebar.readonly" v-model:value="modelingForm.recipeName" placeholder="" />
                        </div>
                        <div class="right-radio-box">
                            <a-checkbox :disabled="sidebar.readonly" v-model:checked="modelingForm.defaultYn">{{
                                $t('modelRecipePage.field.isDefaultModelingRecipe') }}</a-checkbox>
                        </div>
                        <div class="save-btn">
                            <ff-basic-button-tip v-if="!sidebar.readonly" :text="$t('common.btn.save')" type="button"
                                @onClick="saveData" />
                        </div>
                    </header>
                    <p class="border-line"></p>
                    <!-- model 区域 -->
                    <section class="model-setting">
                        <!-- tab -->
                        <div class="tab-box">
                            <a-tabs v-model:activeKey="activeKey" @change="changeTab" :type="sidebar.tabCardType"
                                @edit="onEdit">
                                <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title"
                                    :closable="pane.closable">
                                    <!-- model 和 Global Setting -->
                                    <!-- Global Setting -->
                                    <div class="global-setting-box" v-show="pane.key === '0'">
                                        <global-setting :readonly="sidebar.readonly"
                                            :settingValue="modelingForm.GlobalSetting" :defaultYn='modelingForm.defaultYn'
                                            v-model:overruleMetrologyValidityDisabled="overruleMetrologyValidityDisabled"></global-setting>
                                    </div>
                                    <!-- model setting -->
                                    <!-- {{ pane.content }} -->
                                    <div class="global-setting-box" v-show="pane.key !== '0'">
                                        <model-setting :settingValue="pane.content" @asyncValue="asyncValue"
                                            :keyID="pane.key"
                                            v-model:overruleMetrologyValidityDisabled="overruleMetrologyValidityDisabled"
                                            :readonly="sidebar.readonly"></model-setting>
                                    </div>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                    </section>
                </template>
            </ff-basic-sidebar>
        </main>
    </div>
</template>

<script lang="ts" setup>
import SearchGroup from './components/SearchGroup.vue';
import GlobalSetting from './components/GlobalSetting.vue';
import ModelSetting from './components/ModelSetting.vue';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { getGridOption } from './config';
import { getModelRecipeList, getTableConfig } from '@/api/seed';

import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';

import useModelingRecipe from './composition/modelingRecipePage';
const {
    sidebar,
    handleClick,
    modelingForm,
    panes,
    activeKey,
    overruleMetrologyValidityDisabled,
    asyncValue,
    changeTab,
    onEdit,
    saveData,
    handleAdd,
    handleView,
    handleModify,
    handleDelete,
} = useModelingRecipe();
import {
    getPermissionButton,
    setHeaderSelectFilter,
    showWarning,
} from '@futurefab/components/dist/utils';

const gridOptions = getGridOption();
const xGrid = ref();
const data = reactive({
    egHistoryList: [] as Array<any>,
    checkboxRecords: [] as Array<any>,
    loading: false,
    modelRecipeList: [] as Array<any>,
    tableRules: {} as VxeTableDefines.ValidatorRule,
});

let controller: AbortController | undefined = undefined;
onBeforeMount(async () => {
    getPermissionButton().then((res: any) => {
        console.log('getPermissionButton res', res);
        xGrid.value &&
            xGrid.value.setVisibleTools({
                authorityList: res.buttonList,
                flag: res.allButtonFlag,
            });
    });
});
onMounted(async () => {
    const responents = await getTableConfig({
        bodyParams: {
            serviceName: 'ViewmodelRecipeListService',
        },
    });
    data.tableRules = VXETable.tableFun.setRules({
        responents,
        columns: gridOptions.columns as Array<VxeTableDefines.ColumnInfo>,
    });
    getModelRecipe({});
});

const getModelRecipe = (params: any) => {
    data.loading = true;
    controller = new AbortController();
    const param = {
        signal: controller.signal,
        bodyParams: {},
    };
    getModelRecipeList(param).then(async (res: any) => {
        console.log('res', res);
        // debugger;
        data.loading = false;
        if (res.status == 'SUCCESS') {
            data.modelRecipeList = res.data;
            setHeaderSelectFilter({
                xGrid: xGrid,
                tableData: res.data,
                columnFieldList: ['recipeName', 'defaultYn', 'createBy', 'lastUpdateBy'],
            });
        }
    });
};


const onSearch = (params: object) => {
    getModelRecipe(params)

}
const loadingCancel = () => {
    console.log('loadingcancel');
    data.loading = false;
    // 中断请求
    if (controller) {
        controller.abort();
    }
};
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
                handleAdd();
                break;
            case 'view':
                //选中唯一一行数据
                if (checkboxRecords && checkboxRecords.length !== 1) {
                    showWarning('请选择唯一一行数据进行查看');
                    return;
                }
                handleView(checkboxRecords);

                break;
            case 'modify':
                //选中唯一一行数据
                if (checkboxRecords && checkboxRecords.length !== 1) {
                    showWarning('请选择唯一一行数据进行编辑');
                    return;
                }
                handleModify(checkboxRecords);
                break;
            case 'delete':
                if (checkboxRecords && checkboxRecords.length === 0) {
                    showWarning('请选择至少一条数据进行删除');
                    return;
                }
                handleDelete(checkboxRecords);
                break;
            case 'refresh':
                getModelRecipe({});
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

.model-recipe-page {
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

        .list-page-grid-container {
            position: relative;
            flex-grow: 1;
            overflow: auto;
            border-radius: @border-circle;
            padding: @module-padding;
            background: @bg-color;
            height: 800px;
        }

        .vxe-modal--body {
            .vxe-modal--content {
                .basic_sidebar_content {
                    .modeling-header {
                        display: flex;
                        align-items: center;

                        // justify-content: ;
                        .left-input-box {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            padding: 20px;

                            .label {
                                color: @input-font-color;
                                margin-right: 20px;
                            }

                            .ant-input {
                                width: 210px;
                            }
                        }

                        .right-radio-box {
                            flex: 1;
                        }

                        .save-btn {
                            width: 100px;

                            /deep/.btn-button {
                                border-color: @btn-default-br-color ;
                                background: @btn-default-bg-color;
                                color: @btn-default-ft-color;
                            }
                        }
                    }

                    .border-line {
                        height: 0;
                        border-bottom: 1px solid @model-br-color;
                    }

                    .model-setting {
                        margin-top: 20px;

                        /deep/.tab-box {
                            .ant-tabs {
                                .ant-tabs-nav {
                                    .ant-tabs-nav-wrap {
                                        .ant-tabs-nav-list {
                                            .ant-tabs-tab {
                                                border-color: @br-default-color ;
                                                background: @bg-color;
                                                color: @input-font-color;

                                                &.ant-tabs-tab-active {
                                                    color: @tab-active-font-color;
                                                    background: @tab-active-bg-color;
                                                }
                                            }

                                            .ant-tabs-nav-add {
                                                border-color: @br-default-color ;
                                                background: @bg-color;
                                                color: @input-font-color;
                                            }

                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
    }
}
</style>
