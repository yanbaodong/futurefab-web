<!--
 * @Author: William Dong
 * @Date: 2023-09-11 15:56:47
 * @LastEditTime: 2023-09-15 14:48:52
-->
<template>
    <div class="model-recipe-page">
        <header class="header-search">
            <search-group></search-group>
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
                                        <model-setting :settingValue="pane.content"
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
import { deleteCustomEvent, getModelRecipeList, getTableConfig, saveCustomEvent } from '@/api/seed';

import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';

import useModelingRecipe from './composition/modelingRecipePage';
const {
    sidebar,
    handleClick,
    modelingForm,
    panes,
    activeKey,
    overruleMetrologyValidityDisabled,
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
    successInfo,
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
    getModelRecipe();
});

const getModelRecipe = () => {
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
const hanldeAdd = async () => {
    // console.log('hanldeAdd', searchParam);
    // if (!searchParam.locationRawId) {
    //     showWarning('common.tip.searchFirst');
    //     return;
    // }
    // const $table = xGrid.value;
    // const { row: newRow } = await $table.insert({ defaultYn: false, isAdd: true });
    // $table.setActiveRow(newRow);
};
const handleSave = () => {
    const $table = xGrid.value;
    const insertRecords = $table.getInsertRecords();
    const { updateRecords } = $table.getRecordset();
    const saveData = [...insertRecords, ...updateRecords];
    VXETable.tableFun.useValid({
        data: saveData,
        xGird: xGrid,
        callback: () => {
            const params = {
                bodyParams: {
                    createList: insertRecords,
                    updateList: updateRecords,
                    eqpRawIds: '',
                },
            };

            if (insertRecords.length === 0 && updateRecords.length === 0) {
                showWarning('common.tip.selectData');
                return;
            }
            saveCustomEvent(params).then((res: any) => {
                if (res.status == 'SUCCESS') {
                    successInfo('common.tip.saveSuccess');
                }
            });
        },
    });
};
// const handleDelete = async () => {
//     const $table: any = xGrid.value;
//     const radioRecords = $table.getradioRecords();
//     if (radioRecords && radioRecords.length === 0) {
//         showWarning('common.tip.selectData');
//         return;
//     }
//     const type = await VXETable.modal.confirm(t('common.tip.deleteTip'));
//     console.log('type', type);
//     if (type == 'cancel') {
//         return;
//     }

//     const deleteRecords = radioRecords.filter((ff: any) => !ff.isAdd);
//     if (deleteRecords && deleteRecords.length === 0) {
//         radioRecords.forEach((ff: any) => {
//             $table.remove(ff);
//         });
//         VXETable.modal.message({
//             content: t('common.tip.delSuccess'),
//             status: 'success',
//         });
//         return;
//     }
//     const param = {
//         bodyParams: deleteRecords,
//     };
//     deleteCustomEvent(param).then((res: any) => {
//         if (res.status == 'SUCCESS') {
//             VXETable.modal.message({
//                 content: t('common.tip.delSuccess'),
//                 status: 'success',
//             });
//             radioRecords.forEach((ff: any) => {
//                 $table.remove(ff);
//             });
//         }
//     });
// }
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
                getModelRecipe();
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
                        }
                    }

                    .border-line {
                        height: 0;
                        border-bottom: 1px solid @model-br-color;
                    }

                    .model-setting {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>
