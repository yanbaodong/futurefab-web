<template>
    <div class="lis-recipe-setting">
        <p class="text-label">
            LIS Recipe Setting
        </p>
        <div class="input-container">
            <div class="left-input-box">
                <div class="input-box">
                    <!--Global EST Recipe  可修改-->
                    <p class="label">Global EST Recipe</p>
                    <a-input v-model:value="form.gloEstRecipe" placeholder="" />
                </div>
                <div class="input-box">
                    <!--Refinement EST Recipe#1  可修改-->
                    <p class="label">Refinement EST Recipe#1</p>
                    <a-input v-model:value="form.refEstRecipe1" placeholder="" />
                </div>
                <div class="input-box">
                    <!--Refinement EST Recipe#2  可修改-->
                    <p class="label">Refinement EST Recipe#2</p>
                    <a-input v-model:value="form.refEstRecipe2" placeholder="" />
                </div>
                <div class="input-box">
                    <!--OPT Recipe  可修改-->
                    <p class="label">OPT Recipe</p>
                    <a-input v-model:value="form.oprRecipe" placeholder="" />
                </div>
                <div class="input-box">
                    <!--Calculation Mode  可修改-->
                    <p class="label">Calculation Mode</p>
                    <a-input v-model:value="form.calculationMode" placeholder="" />
                </div>
                <div class="input-box">
                    <!--Sample Reference Metrology ID  可修改-->
                    <p class="label">Sample Reference Metrology ID</p>
                    <a-input v-model:value="form.sampleReferenceMetrologyID" placeholder="" />
                </div>
            </div>
            <div class="right-add-box">

                <a-popover placement="bottom" v-model:open="visible" trigger="click">
                    <template #content>
                        <div class="input-box margin10">
                            <!--Refinement EST Recipe#3 可修改-->
                            <p class="label">Refinement EST Recipe#3</p>
                            <a-input v-model:value="form.refEstRecipe3" placeholder="" />
                        </div>
                        <div class="input-box ">
                            <!--Refinement EST Recipe#4  可修改-->
                            <p class="label">Refinement EST Recipe#4</p>
                            <a-input v-model:value="form.refEstRecipe4" placeholder="" />
                        </div>
                    </template>
                    <span @click="visible = !visible" class="iconfont icon-ic_Table_Add"></span>
                </a-popover>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from "vue";
const props = defineProps({
    form: {
        type: Object,
        default() {
            return {

            };
        },
    },

});
const visible = ref<boolean>(false);

</script>

<style scoped lang="less">
@import url('@/assets/style/variable.less');

.lis-recipe-setting {
    padding: 20px 10px;
    border: 1px solid @model-br-color;
    position: relative;


    .text-label {
        position: absolute;
        color: @input-font-color;
        padding: 0 10px;
        text-align: center;
        top: 0;
        transform: translateY(-50%);
        z-index: 3;
        background-color: @bg-color;
    }

    .input-container {
        display: flex;

    }

    .left-input-box {
        flex: 1.5;
        display: flex;
        flex-wrap: wrap;

        .input-box {
            flex: 33.33%;
            padding: 10px 20px 0px;

            .label {
                color: @input-font-color;
                margin-bottom: 10px;
            }

            .ant-input {
                width: 210px;
            }
        }
    }

    .right-add-box {
        flex: 1;
        padding-top: 34px;

        .iconfont {
            font-size: 24px;
            cursor: pointer;
        }

    }
}

.ant-popover {
    .ant-popover-content {
        .ant-popover-inner {
            .ant-popover-inner-content {
                .input-box {

                    .label {
                        color: @input-font-color;
                        margin-bottom: 10px;
                    }

                    .ant-input {
                        width: 210px;
                    }

                    &.margin10 {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>
