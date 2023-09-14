<template>
    <div class="search-group-container">
        <div class="serach-item">
            <p class="search-label">Modeling Recipe Name</p>
            <a-select
                v-model:value="recipeName"
                mode="multiple"
                style="width: 100%"
                placeholder="Please select"
                :options="
                    [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
                "
            ></a-select>
        </div>

        <div class="serach-item">
            <p class="search-label">Create By</p>
            <a-select
                v-model:value="createBy"
                mode="multiple"
                style="width: 100%"
                placeholder="Please select"
                :options="
                    [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
                "
            ></a-select>
        </div>
        <div class="serach-item time-select">
            <!-- <p class="search-label">
                Create Time
            </p> -->
            <ff-basic-custom-time
                ref="refTime"
                :showShiftMonth="false"
                @time-pop="timePop"
                :timeArea="searchParams.timeAreaBind"
            ></ff-basic-custom-time>
        </div>
        <div class="serach-item search-box">
            <div class="search-left">
                <ff-basic-button-tip
                    :disabled="searchDisabled"
                    text="Search"
                    type="button"
                    @onClick="search"
                />
            </div>

            <div class="reset">
                <ff-basic-button-tip
                    :disabled="resetDisabled"
                    text="Reset"
                    type="button"
                    @onClick="reset"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { reactive, onMounted, ref, nextTick } from 'vue';

let searchParams = reactive({
    startDate: '',
    endDate: '',
    timeAreaBind: [dayjs().startOf('day'), dayjs()],
});

const recipeName = ref([]);
const createBy = ref([]);
const searchDisabled = ref(false);
const resetDisabled = ref(false);
// const emit = defineEmits(["update:searchParams"]);
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

<style scoped lang="less">
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
        }
    }
}
</style>
