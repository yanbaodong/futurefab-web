<!--
 * @Author: William Dong
 * @Date: 2023-09-12 16:20:14
 * @LastEditTime: 2023-09-18 10:33:18
-->
<template>
    <div class="model-setting-container">
        <header class="header-model-wrap">
            <!-- global model  -->
            <div class="left-model-box">
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.GlobalModel">{{
                            $t('modelRecipePage.field.globalModel') }}</a-checkbox>
                    </p>

                    <!-- <a-input v-model:value="settingValue.GlobalModel" placeholder="" /> -->
                    <a-select :disabled="globalModelDisabled" v-model:value="globalModel"
                        :placeholder="$t('common.tip.selectTip')" :options="globalModelList"></a-select>
                </div>
            </div>
            <div class="right-model-box">
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly || !overruleMetrologyValidityDisabled"
                            v-model:checked="checkForm.RefinementModel">{{
                                $t('modelRecipePage.field.refinementModel') }}</a-checkbox>
                    </p>

                    <!-- <a-input v-model:value="settingValue.RefinementModel" placeholder="" /> -->
                    <a-select :disabled="refinementModelDisabled" v-model:value="refinementModel"
                        :placeholder="$t('common.tip.selectTip')" :options="globalModelList"></a-select>
                </div>
            </div>
        </header>
        <section class="common-setting">
            <!--Common Setting -->
            <p class="title-1">{{ $t('modelRecipePage.field.commonSetting') }}</p>
            <div class="setting-box">
                <!-- HealthFilter-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterMax') }}(nm)</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_Max" placeholder="" />
                </div>
                <!-- HealthFilter-NSigma -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterNSigma') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-X-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterXMax') }}(nm)</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_X_Max" placeholder="" />
                </div>
                <!-- HealthFilter-X-NSigma -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterXNSigma') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_X_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-Y-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterYMax') }}(nm)</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_Y_Max" placeholder="" />
                </div>
                <!-- HealthFilter-Y-NSigma -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterYNSigma') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_Y_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-EdgeClearance(mm) -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.healthFilterEdgeClearance') }}(mm)</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.HealthFilter_EdgeClearance" placeholder="" />
                </div>
                <!-- ResidualOutlierRemoval-NSigma -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.residualOutlierRemovalNSigma') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="CommonSetting.ResidualOutlierRemoval_NSigma" placeholder="" />
                </div>
                <!-- Granularity -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.granularity') }}</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.Granularity" placeholder="" />
                </div>
                <!-- Decorrection-CPE-ViaSecs -->
                <div class="select-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.decorrectionCPEViaSecs') }}</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_CPE_ViaSecs"
                        :placeholder="$t('common.tip.selectTip')" :options="DecorrectionCPEViaSubrecipeList"></a-select>
                </div>
                <!-- Decorrection-CPE-ViaSubrecipe -->
                <div class="select-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.decorrectionCPEViaSubrecipe') }}</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_CPE_ViaSubrecipe"
                        :placeholder="$t('common.tip.selectTip')" :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!-- Decorrection-ProcessCorrections -->
                <div class="select-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.decorrectionProcessCorrections') }}</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_ProcessCorrections"
                        :placeholder="$t('common.tip.selectTip')" :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!-- TargetLabel -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.TargetLabel">{{
                            $t('modelRecipePage.field.targetLabel') }}</a-checkbox>
                    </p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.TargetLabel" placeholder="" />
                </div>
                <!-- SampleSchemeName -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.SampleSchemeName">{{
                            $t('modelRecipePage.field.sampleSchemeName') }}</a-checkbox>
                    </p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.SampleSchemeName" placeholder="" />
                </div>
            </div>
        </section>
        <section class="refinement-setting" v-show="checkForm.RefinementModel">
            <!-- Refinement Setting -->
            <p class="title-1">{{ $t('modelRecipePage.field.refinementSetting') }}</p>

            <div class="setting-box">
                <!-- ModelParameterReduction -->
                <div class="select-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.modelParameterReduction') }}</p>

                    <a-select :disabled="readonly" v-model:value="RefinementSetting.ModelParameterReduction"
                        :placeholder="$t('common.tip.selectTip')" :options="DecorrectionProcessCorrections"></a-select>
                </div>

                <!-- MUBPR -->
                <div class="select-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.mubpr') }}</p>

                    <a-select :disabled="readonly" v-model:value="RefinementSetting.MUBPR"
                        :placeholder="$t('common.tip.selectTip')" :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!--MUBPR-X-Max  -->
                <div class="input-box">
                    <p class="label-name">M{{ $t('modelRecipePage.field.mubprXMax') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="RefinementSetting.MUBPR_X_Max" placeholder="" />
                </div>
                <!--MUBPR-Y-Max -->
                <div class="input-box">
                    <p class="label-name">{{ $t('modelRecipePage.field.mubprYMax') }}</p>

                    <a-input class="no-number" type="number" :disabled="readonly"
                        v-model:value="RefinementSetting.MUBPR_Y_Max" placeholder="" />
                </div>
                <!-- ActuatorRanges-SetName -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.ActuatorRanges_SetName">{{
                            $t('modelRecipePage.field.actuatorRangesSetName') }}</a-checkbox>
                    </p>

                    <!-- <a-input :disabled="readonly" v-model:value="RefinementSetting.ActuatorRanges_SetName" placeholder="" /> -->
                    <a-select :disabled="!checkForm.ActuatorRanges_SetName || readonly"
                        v-model:value="RefinementSetting.ActuatorRanges_SetName" :placeholder="$t('common.tip.selectTip')"
                        :options="globalModelList"></a-select>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect, computed, watch } from 'vue';
import {
    DecorrectionCPEViaSubrecipeList,
    DecorrectionProcessCorrections,
    globalModelList,
} from '../config/globalSetting';
const emit = defineEmits(["asyncValue"]);

const CommonSetting = reactive({
    HealthFilter_Max: 100,
    HealthFilter_NSigma: 4,
    HealthFilter_X_Max: 100,
    HealthFilter_X_NSigma: 4,
    HealthFilter_Y_Max: 100,
    HealthFilter_Y_NSigma: 4,
    HealthFilter_EdgeClearance: 3,
    ResidualOutlierRemoval_NSigma: 10,
    Granularity: 'Per wafer',
    Decorrection_CPE_ViaSecs: false,
    Decorrection_CPE_ViaSubrecipe: false,
    Decorrection_ProcessCorrections: false,
    TargetLabel: '',
    SampleSchemeName: '',
})
const RefinementSetting = reactive({
    ModelParameterReduction: true,
    MUBPR: true,
    MUBPR_X_Max: 2,
    MUBPR_Y_Max: 2,
    ActuatorRanges_SetName: '',
})
const checkForm = reactive({
    GlobalModel: false,
    RefinementModel: false,
    TargetLabel: false,
    SampleSchemeName: false,
    ActuatorRanges_SetName: false,
});

const globalModel = ref('')
const refinementModel = ref('')
const props = defineProps({
    settingValue: {
        type: Object,
        default() {
            return {

            };
        },
    },
    // 是否只读
    readonly: {
        type: Boolean,
        default: false,
    },
    overruleMetrologyValidityDisabled: {
        type: Boolean,
        default: false,
    },
    keyID: {
        type: String,
        default: '',
    },
});

watchEffect(() => {
    // console.log(props.settingValue, 'watchEffect配置的回调执行了')
    if (props.settingValue.GlobalModel) {
        globalModel.value = props.settingValue.GlobalModel
    }
    if (props.settingValue.RefinementModel) {
        globalModel.value = props.settingValue.RefinementModel
    }
    // 填充默认值
    // Common Setting中，除了TargetLabel和SampleSchemeName，其他item都需要填充默认值。
    if (props.settingValue.CommonSetting) {
        CommonSetting.HealthFilter_Max = props.settingValue.CommonSetting.HealthFilter_Max
        CommonSetting.HealthFilter_NSigma = props.settingValue.CommonSetting.HealthFilter_NSigma
        CommonSetting.HealthFilter_X_Max = props.settingValue.CommonSetting.HealthFilter_X_Max
        CommonSetting.HealthFilter_X_NSigma = props.settingValue.CommonSetting.HealthFilter_X_NSigma
        CommonSetting.HealthFilter_Y_Max = props.settingValue.CommonSetting.HealthFilter_Y_Max
        CommonSetting.HealthFilter_Y_NSigma = props.settingValue.CommonSetting.HealthFilter_Y_NSigma
        CommonSetting.HealthFilter_EdgeClearance = props.settingValue.CommonSetting.HealthFilter_EdgeClearance
        CommonSetting.ResidualOutlierRemoval_NSigma = props.settingValue.CommonSetting.ResidualOutlierRemoval_NSigma
        CommonSetting.Granularity = props.settingValue.CommonSetting.Granularity
        CommonSetting.Decorrection_CPE_ViaSecs = props.settingValue.CommonSetting.Decorrection_CPE_ViaSecs
        CommonSetting.Decorrection_CPE_ViaSubrecipe = props.settingValue.CommonSetting.Decorrection_CPE_ViaSubrecipe
        CommonSetting.Decorrection_ProcessCorrections = props.settingValue.CommonSetting.Decorrection_ProcessCorrections
        CommonSetting.TargetLabel = props.settingValue.CommonSetting.TargetLabel
        CommonSetting.SampleSchemeName = props.settingValue.CommonSetting.SampleSchemeName

    }
    // RefinementSetting
    if (props.settingValue.RefinementSetting) {
        RefinementSetting.ModelParameterReduction = props.settingValue.RefinementSetting.ModelParameterReduction
        RefinementSetting.MUBPR = props.settingValue.RefinementSetting.MUBPR
        RefinementSetting.MUBPR_X_Max = props.settingValue.RefinementSetting.MUBPR_X_Max
        RefinementSetting.MUBPR_Y_Max = props.settingValue.RefinementSetting.MUBPR_Y_Max
        RefinementSetting.ActuatorRanges_SetName = props.settingValue.RefinementSetting.ActuatorRanges_SetName
    }
    // Global Model：勾选后，对应下拉框变成enable。如果取消勾选，则清空对应下拉列表框的值
    // Refinement Model：勾选后，对应下拉框变成enable。如果取消勾选，则清空对应下拉列表框的值。如果已选中Is default modeling recipe，则不能勾选Refinement Model【Default recipe中不允许维护refinement model】
    // 下拉列表的值来源于LIS文件库。以HOC或LIS前缀查询LIS文件库中的Global Model名称，以CPE前缀查询LIS文件库中的Refinement Model名称
    if (!props.overruleMetrologyValidityDisabled) {
        // 不允许修改  Refinement Model
        checkForm.RefinementModel = false
        globalModel.value = ''
    }


})
watch(() => [globalModel, refinementModel, CommonSetting, RefinementSetting], (newVal, oldVal) => {
    console.log('改变了', newVal)
    // 这里可以收到改动之后的值, 要把这些值传回去,绑定到content上
    emit('asyncValue', newVal, props.keyID)
}, {
    deep: true // 深度监听的参数
})
const globalModelDisabled = computed(() => {

    if (props.readonly) {
        return true
    }
    if (!checkForm.GlobalModel) {
        // 清空值
        globalModel.value = ''
        return true
    }
    return false
})
const refinementModelDisabled = computed(() => {
    if (props.readonly) {
        return true
    }
    if (!checkForm.RefinementModel) {
        // 清空值
        refinementModel.value = ''
        return true
    }
    return false
})
</script>

<style scoped lang="less">
@import url('@/assets/style/variable.less');

.model-setting-container {
    .header-model-wrap {
        display: flex;
        margin-bottom: 20px;
        padding: 0 10px;

        .left-model-box {
            flex: 1;
        }

        .right-model-box {
            flex: 1;
        }

        .check-select-box {
            display: flex;
            align-items: center;

            .label-name {
                margin-right: 20px;
                color: @input-font-color;
            }

            .ant-select {
                width: 210px;
            }
        }
    }

    .common-setting {
        padding: 20px 10px;
        border: 1px solid @model-br-color;
        position: relative;

        .title-1 {
            position: absolute;
            color: @input-font-color;
            padding: 0 10px;
            text-align: center;
            top: 0;
            transform: translateY(-50%);
            z-index: 3;
            background-color: @bg-color;
        }

        .setting-box {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .ant-input {
                width: 210px;
            }

            .ant-select {
                width: 210px;
            }

            .input-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }

            .select-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }

            .check-select-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }
        }
    }

    .refinement-setting {
        padding: 20px 10px;
        border: 1px solid @model-br-color;
        position: relative;
        margin-top: 20px;

        .title-1 {
            position: absolute;
            color: @input-font-color;
            padding: 0 10px;
            text-align: center;
            top: 0;
            transform: translateY(-50%);
            z-index: 3;
            background-color: @bg-color;
        }

        .setting-box {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .ant-input {
                width: 210px;
            }

            .ant-select {
                width: 210px;
            }

            .input-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }

            .select-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }

            .check-select-box {
                width: 40%;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 10%;

                .label-name {
                    // flex: 1
                    color: @input-font-color;
                }
            }
        }
    }
}
</style>
