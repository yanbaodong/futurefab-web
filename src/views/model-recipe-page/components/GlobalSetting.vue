<!--
 * @Author: William Dong
 * @Date: 2023-09-12 16:19:22
 * @LastEditTime: 2023-09-18 13:09:07
-->
<template>
    <div class="global-setting-container">
        <div class="health-filter">
            <p class="text-label">{{ $t('modelRecipePage.field.healthFilter') }}</p>
            <div class="health-form">
                <div class="top-box">
                    <div class="input-box">
                        <span class="label">{{ $t('modelRecipePage.field.modelingRecipe') }}</span>
                        <!-- 数字,可以小数 -->
                        <a-input class="no-number" type="number" :disabled="readonly"
                            v-model:value="settingValue.HealthFilter_XYPairingRange" placeholder="" />
                    </div>
                </div>
                <div class="bottom-box">
                    <div class="select-global-box">
                        <span class="label">{{ $t('modelRecipePage.field.usedOverlayComponent') }}</span>
                        <a-select :disabled="readonly" v-model:value="settingValue.HealthFilter_UsedOverlayComponent"
                            placeholder="Please select" :options="OverlayComponentList"></a-select>
                    </div>
                    <div class="select-global-box">
                        <span class="label">{{ $t('modelRecipePage.field.invalidateXYAsPair') }}</span>
                        <a-select :disabled="invalidateXYAsPairDisabled"
                            v-model:value="settingValue.HealthFilter_InvalidateXYAsPair" placeholder="Please select"
                            :options="InvalidateXYAsPairList"></a-select>
                    </div>
                </div>
            </div>
        </div>
        <div class="overrule-metrology-validity">
            <p class="text-label overrule-optional">{{ $t('modelRecipePage.field.overruleMetrologyValidity') }}</p>
            <div class="Overrule-form">
                <div class="top-toggle">
                    <a-switch :disabled="readonly || overruleMetrologyValidityDisabled"
                        v-model:checked="settingValue.OverruleMetrologyValidityChecked" />
                </div>
                <div class="bottom-input-box">
                    <div class="input-box">
                        <span class="label">{{ $t('modelRecipePage.field.evaluationRegion') }}(mm)</span>
                        <!-- 数字,可以小数 -->
                        <a-input class="no-number" type="number" :disabled="disabled"
                            v-model:value="settingValue.EvaluationRegion" placeholder="" />
                    </div>
                    <div class="input-box">
                        <span class="label">{{ $t('modelRecipePage.field.validDataFractionMinPercentage') }}(%)</span>
                        <!-- 数字,可以小数 -->
                        <!-- defaultYn 勾选= true 并且 overruleMetrologyValidityDisabled = true 并且 readonly = false-->
                        <!-- readonly = true  时 都不可填  -->
                        <!--readonly = true  时 overruleMetrologyValidityDisabled 等于true 可以填  -->
                        <!--readonly = true  时 overruleMetrologyValidityDisabled false  不可以填  -->
                        <a-input class="no-number" type="number" :disabled="disabled"
                            v-model:value="settingValue.ValidDataFraction_MinPercentage" placeholder="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect, computed } from 'vue';
import { OverlayComponentList, InvalidateXYAsPairList } from '../config/globalSetting';
// const settingValue = reactive({
//     "HealthFilter_XYPairingRange": "1",
//     "HealthFilter_UsedOverlayComponent": "X and Y",
//     "HealthFilter_InvalidateXYAsPair": "true",
//     "EvaluationRegion": "135",
//     "ValidDataFraction_MinPercentage": "60",
//     OverruleMetrologyValidityChecked: false,
// })
const props = defineProps({
    settingValue: {
        type: Object,
        default() {
            return {
                // "HealthFilter_XYPairingRange": "1",
                // "HealthFilter_UsedOverlayComponent": "X and Y",
                // "HealthFilter_InvalidateXYAsPair": 'true',
                // "EvaluationRegion": "135",
                // "ValidDataFraction_MinPercentage": "60",

            };
        },
    },
    defaultYn: {
        type: Boolean,
        default: false
    },
    // 是否只读
    readonly: {
        type: Boolean,
        default: false,
    },
    overruleMetrologyValidityDisabled: {
        type: Boolean,
        default: true,
    },
});

const disabled = computed(() => {
    // 计算处理总价并return出去
    if (props.readonly) {
        return true
    }
    let overruleMetrologyValidityChecked = props.settingValue.OverruleMetrologyValidityChecked || false
    if (!props.overruleMetrologyValidityDisabled && overruleMetrologyValidityChecked) {
        return false
    }

    return true
})
const invalidateXYAsPairDisabled = computed(() => {
    // 计算处理总价并return出去
    if (props.readonly) {
        return true
    }
    let UsedOverlayComponent = props.settingValue.HealthFilter_UsedOverlayComponent
    if (['X', 'Y'].includes(UsedOverlayComponent)) {
        props.settingValue.HealthFilter_InvalidateXYAsPair = 'false'
        return true
    }

    return false
})

watchEffect(() => {

    // 设置为false
    if (props.overruleMetrologyValidityDisabled) {
        // 如果关闭开关，则清空EvaluationRegion和MinPercentage的值
        props.settingValue.OverruleMetrologyValidityChecked = false
        props.settingValue.EvaluationRegion = ''
        props.settingValue.ValidDataFraction_MinPercentage = ''
    }
    // settingValue.HealthFilter_UsedOverlayComponent

    //1. UsedOverlayComponent下拉选择X或Y或X and Y
    //2. InvalidateXYAsPair下拉选择true或false。如果UsedOverlayComponent是X或Y，
    // 则InvalidateXYAsPair必须是false
    // let UsedOverlayComponent = props.settingValue.HealthFilter_UsedOverlayComponent
    // if (['X', 'Y'].includes(UsedOverlayComponent)) {
    //     props.settingValue.HealthFilter_InvalidateXYAsPair = 'false'
    // }
    if (props.defaultYn) {

    }
});
</script>

<style scoped lang="less">
@import url('@/assets/style/variable.less');

.global-setting-container {
    color: @input-font-color;

    .health-filter {
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

        .health-form {
            .top-box {
                .input-box {
                    display: flex;
                    align-items: center;

                    .label {
                        margin-right: 10px;
                        width: 150px;
                    }

                    .ant-input {
                        width: 210px;
                    }
                }
            }

            .bottom-box {
                display: flex;
                margin-top: 20px;
                align-items: center;

                .select-global-box {
                    display: flex;
                    align-items: center;
                    flex: 1;

                    .label {
                        margin-right: 10px;
                        width: 150px;
                    }

                    .ant-select {
                        width: 210px;
                    }
                }
            }
        }
    }

    .overrule-metrology-validity {
        margin-top: 20px;
        padding: 20px 10px;
        border: 1px solid @model-br-color;
        position: relative;

        .text-label {
            position: absolute;
            color: @input-font-color;
            // width: 90px;
            text-align: center;
            top: 0;
            transform: translateY(-50%);
            z-index: 3;
            background-color: @bg-color;

            &.overrule-optional {
                // width: 200px;
                padding: 0 10px;
            }
        }

        .Overrule-form {
            .top-toggle {}

            .bottom-input-box {
                display: flex;
                margin-top: 20px;
                align-items: center;

                .input-box {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    .label {
                        margin-right: 10px;
                        width: 150px;
                    }

                    .ant-input {
                        width: 210px;
                    }
                }
            }
        }
    }
}
</style>
