<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { getGridOption } from './config';
import { deleteCustomEvent, getCustomEventList, getTableConfig, saveCustomEvent } from '@/api/seed';
import dayjs from 'dayjs';
import { t, VxeGridDefines, VXETable, VxeTableDefines } from '@futurefab/vxe-table';
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
    checkboxRecord: [] as Array<any>,
    loading: false,
    customEventList: [] as Array<any>,
    tableRules: {} as VxeTableDefines.ValidatorRule,
});
let date = reactive({
    startDate: '',
    endDate: '',
});
let searchParam = reactive({
    locationRawId: '',
    areaRawId: '',
    modelRawId: '',
    eqpRawIds: [],

    startDate: '',
    endDate: '',
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
            serviceName: 'ViewCustomEventListService',
        },
    });
    data.tableRules = VXETable.tableFun.setRules({
        responents,
        columns: gridOptions.columns as Array<VxeTableDefines.ColumnInfo>,
    });
});

const search = (params: any, val: any) => {
    console.log('search===============', params, val);
    nextTick(() => {
        const { locationID, areaID, modelID, eqpRawId } = val;
        searchParam = {
            locationRawId: locationID,
            areaRawId: areaID,
            modelRawId: modelID,
            eqpRawIds: eqpRawId,

            startDate: searchParam.startDate,
            endDate: searchParam.endDate,
        };
        console.log('searchParam', searchParam);
        getCustomEvent();
    });
};
const timePop = (params: any, val: any) => {
    const start = dayjs(params[0]).format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs(params[1]).format('YYYY-MM-DD HH:mm:ss');
    searchParam.startDate = start;
    searchParam.endDate = end;
    date.startDate = start;
    date.endDate = end;
};
const getCustomEvent = () => {
    if (!searchParam.locationRawId) {
        return;
    }
    data.loading = true;
    controller = new AbortController();
    const param = {
        signal: controller.signal,
        bodyParams: searchParam,
    };
    getCustomEventList(param).then(async (res: any) => {
        console.log('res', res);
        data.loading = false;
        if (res.status == 'SUCCESS') {
            data.customEventList = res.data;
            setHeaderSelectFilter({
                xGrid: xGrid,
                tableData: res.data,
                columnFieldList: ['eqpAlias', 'moduleAlias', 'defaultYn'],
            });
        }
    });
};
const hanldeAdd = async () => {
    console.log('hanldeAdd', searchParam);
    if (!searchParam.locationRawId) {
        showWarning('common.tip.searchFirst');
        return;
    }
    const $table = xGrid.value;
    const { row: newRow } = await $table.insert({ defaultYn: false, isAdd: true });
    $table.setActiveRow(newRow);
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
                    eqpRawIds: searchParam.eqpRawIds,
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
const handleDelete = async () => {
    const $table: any = xGrid.value;
    const checkboxRecords = $table.getCheckboxRecords();
    if (checkboxRecords && checkboxRecords.length === 0) {
        showWarning('common.tip.selectData');
        return;
    }
    const type = await VXETable.modal.confirm(t('common.tip.deleteTip'));
    console.log('type', type);
    if (type == 'cancel') {
        return;
    }

    const deleteRecords = checkboxRecords.filter((ff: any) => !ff.isAdd);
    if (deleteRecords && deleteRecords.length === 0) {
        checkboxRecords.forEach((ff: any) => {
            $table.remove(ff);
        });
        VXETable.modal.message({
            content: t('common.tip.delSuccess'),
            status: 'success',
        });
        return;
    }
    const param = {
        bodyParams: deleteRecords,
    };
    deleteCustomEvent(param).then((res: any) => {
        if (res.status == 'SUCCESS') {
            VXETable.modal.message({
                content: t('common.tip.delSuccess'),
                status: 'success',
            });
            checkboxRecords.forEach((ff: any) => {
                $table.remove(ff);
            });
        }
    });
};
const loadingCancel = () => {
    console.log('loadingcancel');
    data.loading = false;
    // 中断请求
    if (controller) {
        controller.abort();
    }
};
const events = {
    toolbarToolClick: ({ code }: VxeGridDefines.ToolbarToolClickEventParams) => {
        const checkboxRecords = xGrid.value && xGrid.value.getCheckboxRecords();
        switch (code) {
            case 'add':
                hanldeAdd();
                break;
            case 'save':
                handleSave();
                console.log('save');
                break;
            case 'delete':
                handleDelete();
                break;
            case 'refresh':
                getCustomEvent();
                break;
        }
    },
};
</script>
<template>
    <div class="list-page-container">
        <div class="list-page-search-container">
            <ff-basic-multi-tree-search-condition
                :showRecentType="false"
                :treeCheckable="false"
                :showAddition="false"
                timeType="2"
                ref="searchCondition"
                pageId="fwm-list-page"
                style="flex-wrap: wrap"
                @eventBtn="search"
                @timePop="timePop"
                @saveEvent="saveEvent"
                :is-set-condition="false"
            />
        </div>
        <div
            class="list-page-grid-container"
            v-isLoading="{
                isShow: data.loading,
                title: $t('common.loading.text'),
                hasButton: true,
                buttonEvent: loadingCancel,
            }"
        >
            <vxe-grid
                ref="xGrid"
                v-bind="gridOptions"
                :data="data.customEventList"
                v-on="events"
                :edit-rules="data.tableRules"
            >
            </vxe-grid>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import url('../../assets/style/variable.less');
.list-page-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    .list-page-search-container {
        flex-shrink: 0;
    }
    .list-page-grid-container {
        position: relative;
        flex-grow: 1;
        overflow: auto;
        border-radius: @border-circle;
        padding: @module-padding;
        background: @bg-color;
    }
}
</style>
