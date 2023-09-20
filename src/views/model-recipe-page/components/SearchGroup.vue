<template>
    <div class="search-group-container">
        <div class="serach-item">
            <p class="search-label">{{ $t("modelRecipePage.field.modelingRecipe") }}</p>
            <a-select :max-tag-count="maxTagCount" v-model:value="recipeName" mode="multiple" style="width: 100%"
                :placeholder="$t('common.tip.selectTip')" :options="modelingList"></a-select>
        </div>

        <div class="serach-item">
            <p class="search-label">{{ $t("modelRecipePage.field.createBy") }}</p>
            <a-select :max-tag-count="maxTagCount" v-model:value="createBy" mode="multiple" style="width: 100%"
                :placeholder="$t('common.tip.selectTip')" :options="createByList"></a-select>
        </div>
        <div class=" serach-item time-select">
            <!-- <p class="search-label">
                Create Time
            </p> -->
            <ff-basic-custom-time ref="refTime" :showShiftMonth="false" @time-pop="timePop"
                :timeArea="searchParams.timeAreaBind"></ff-basic-custom-time>
        </div>
        <div class="serach-item search-box">
            <div class="search-left">
                <ff-basic-button-tip :disabled="searchDisabled" :text="$t('common.btn.search')" type="button"
                    @onClick="search" />
            </div>

            <div class="reset">
                <ff-basic-button-tip :disabled="resetDisabled" :text="$t('common.btn.reset')" type="button"
                    @onClick="reset" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
// mock 数据
import { modelingList, createByList } from "../config/globalSetting";
import { reactive, onMounted, ref, nextTick } from 'vue';

let searchParams = reactive({
    startDate: '',
    endDate: '',
    timeAreaBind: [dayjs().startOf('day'), dayjs()],
});

const recipeName = ref([]);
const createBy = ref([]);
const maxTagCount = ref(1);//超出多少个只显示数字
const searchDisabled = ref(false);
const resetDisabled = ref(false);
const emit = defineEmits(["onSearch"]);
const refTime = ref();

const timePop = (params: any) => {
    const start = dayjs(params[0]).format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs(params[1]).format('YYYY-MM-DD HH:mm:ss');
    searchParams.startDate = start;
    searchParams.endDate = end;
};

onMounted(() => {
    setTimeout(() => {
        searchParams.timeAreaBind = [dayjs().subtract(7, 'hour'), dayjs()];
    }, 1000);
});

const search = () => {
    console.log('recipeName:', recipeName.value);
    console.log('createBy:', createBy.value);
    console.log('timeAreaResult:', searchParams);
    // 开始查询
    nextTick(() => {
        console.log('searchParam', searchParams);
        // getCustomEvent();
        emit('onSearch', searchParams)
    });
};
const reset = () => {
    recipeName.value = [];
    createBy.value = [];
    setTimeout(() => {
        searchParams.timeAreaBind = [dayjs().subtract(7, 'hour'), dayjs()];
    }, 100);
};
</script>

<style  lang="less">
@import url('@/assets/style/variable.less');

.search-group-container {
    display: flex;
    align-items: center;

    // justify-content: ;
    .serach-item {
        width: 210px;
        margin-right: 10px;
        color: @input-font-color;

        .search-label {
            font-size: 12px;
            font-weight: 600;
        }

        &.time-select {
            width: 295px;
        }

        &.search-box {
            margin-top: 18px;
            display: flex;
            // justify-content: space-around;
            align-items: center;

            .search-left {
                margin-right: 10px;


            }

            .btn-button {
                border-color: @btn-default-br-color ;
                background: @btn-default-bg-color;
                color: @btn-default-ft-color;
            }
        }
    }
}
</style>
