<!--
 * @Author: William Dong
 * @Date: 2023-09-12 16:20:14
 * @LastEditTime: 2023-09-14 13:21:22
-->
<template>
    <div class="model-setting-container">
        <header class="header-model-wrap">
            <!-- global model  -->
            <div class="left-model-box">
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.GlobalModel">Global Model</a-checkbox>
                    </p>

                    <!-- <a-input v-model:value="settingValue.GlobalModel" placeholder="" /> -->
                    <a-select v-model:value="settingValue.GlobalModel" placeholder="Please select"
                        :options="DecorrectionProcessCorrections"></a-select>
                </div>
            </div>
            <div class="right-model-box">
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.RefinementModel">Refinement
                            Model</a-checkbox>
                    </p>

                    <!-- <a-input v-model:value="settingValue.RefinementModel" placeholder="" /> -->
                    <a-select :disabled="readonly" v-model:value="settingValue.RefinementModel" placeholder="Please select"
                        :options="DecorrectionProcessCorrections"></a-select>
                </div>
            </div>
        </header>
        <section class="common-setting">
            <!--Common Setting -->
            <p class="title-1">Common Setting</p>
            <div class="setting-box">
                <!-- HealthFilter-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-Max(nm)</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_Max" placeholder="" />
                </div>
                <!-- HealthFilter-NSigma -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-NSigma</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-X-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-X-Max(nm)</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_X_Max" placeholder="" />
                </div>
                <!-- HealthFilter-X-NSigma -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-X-NSigma</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_X_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-Y-Max(nm) -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-Y-Max(nm)</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_Y_Max" placeholder="" />
                </div>
                <!-- HealthFilter-Y-NSigma -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-Y-NSigma</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_Y_NSigma" placeholder="" />
                </div>
                <!-- HealthFilter-EdgeClearance(mm) -->
                <div class="input-box">
                    <p class="label-name">HealthFilter-EdgeClearance(mm)</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.HealthFilter_EdgeClearance" placeholder="" />
                </div>
                <!-- ResidualOutlierRemoval-NSigma -->
                <div class="input-box">
                    <p class="label-name">ResidualOutlierRemoval-NSigma</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.ResidualOutlierRemoval_NSigma"
                        placeholder="" />
                </div>
                <!-- Granularity -->
                <div class="input-box">
                    <p class="label-name">Granularity</p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.Granularity" placeholder="" />
                </div>
                <!-- Decorrection-CPE-ViaSecs -->
                <div class="select-box">
                    <p class="label-name">Decorrection-CPE-ViaSecs</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_CPE_ViaSecs"
                        placeholder="Please select" :options="DecorrectionCPEViaSubrecipeList"></a-select>
                </div>
                <!-- Decorrection-CPE-ViaSubrecipe -->
                <div class="select-box">
                    <p class="label-name">Decorrection-CPE-ViaSubrecipe</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_CPE_ViaSubrecipe"
                        placeholder="Please select" :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!-- Decorrection-ProcessCorrections -->
                <div class="select-box">
                    <p class="label-name">Decorrection-ProcessCorrections</p>

                    <a-select :disabled="readonly" v-model:value="CommonSetting.Decorrection_ProcessCorrections"
                        placeholder="Please select" :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!-- TargetLabel -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly" v-model:checked="checkForm.TargetLabel">TargetLabel</a-checkbox>
                    </p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.TargetLabel" placeholder="" />
                </div>
                <!-- SampleSchemeName -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly"
                            v-model:checked="checkForm.SampleSchemeName">SampleSchemeName</a-checkbox>
                    </p>

                    <a-input :disabled="readonly" v-model:value="CommonSetting.SampleSchemeName" placeholder="" />
                </div>
            </div>
        </section>
        <section class="refinement-setting">
            <!-- Refinement Setting -->
            <p class="title-1">Refinement Setting</p>

            <div class="setting-box">
                <!-- ModelParameterReduction -->
                <div class="select-box">
                    <p class="label-name">ModelParameterReduction</p>

                    <a-select :disabled="readonly" v-model:value="RefinementSetting.ModelParameterReduction"
                        placeholder="Please select" :options="DecorrectionProcessCorrections"></a-select>
                </div>

                <!-- MUBPR -->
                <div class="select-box">
                    <p class="label-name">MUBPR</p>

                    <a-select :disabled="readonly" v-model:value="RefinementSetting.MUBPR" placeholder="Please select"
                        :options="DecorrectionProcessCorrections"></a-select>
                </div>
                <!--MUBPR-X-Max  -->
                <div class="input-box">
                    <p class="label-name">MUBPR-X-Max</p>

                    <a-input :disabled="readonly" v-model:value="RefinementSetting.MUBPR_X_Max" placeholder="" />
                </div>
                <!--MUBPR-Y-Max -->
                <div class="input-box">
                    <p class="label-name">MUBPR-Y-Max</p>

                    <a-input :disabled="readonly" v-model:value="RefinementSetting.MUBPR_Y_Max" placeholder="" />
                </div>
                <!-- ActuatorRanges-SetName -->
                <div class="check-select-box">
                    <p class="label-name">
                        <a-checkbox :disabled="readonly"
                            v-model:checked="checkForm.ActuatorRanges_SetName">ActuatorRanges-SetName</a-checkbox>
                    </p>

                    <a-input :disabled="readonly" v-model:value="RefinementSetting.ActuatorRanges_SetName" placeholder="" />
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue';
import {
    DecorrectionCPEViaSubrecipeList,
    DecorrectionProcessCorrections,
} from '../config/globalSetting';
// const settingValue = reactive({
//     Seq: '1',
//     GlobalModel: '10par',
//     RefinementModel: 'CPE6',
//     CommonSetting: {
//         HealthFilter_Max: '100',
//         HealthFilter_NSigma: '4',
//         HealthFilter_X_Max: '100',
//         HealthFilter_X_NSigma: '4',
//         HealthFilter_Y_Max: '100',
//         HealthFilter_Y_NSigma: '4',
//         HealthFilter_EdgeClearance: '3',
//         ResidualOutlierRemoval_NSigma: '10',
//         Granularity: 'Per wafer',
//         Decorrection_CPE_ViaSecs: 'false',
//         Decorrection_CPE_ViaSubrecipe: 'false',
//         Decorrection_ProcessCorrections: 'false',
//         TargetLabel: 'T1',
//         SampleSchemeName: 'Sample1',
//     },
//     RefinementSetting: {
//         ModelParameterReduction: 'true',
//         MUBPR: 'true',
//         MUBPR_X_Max: '2',
//         MUBPR_Y_Max: '2',
//         ActuatorRanges_SetName: 'OVO2_enlarge',
//     },
// });
const CommonSetting = reactive({
    HealthFilter_Max: '',
    HealthFilter_NSigma: '',
    HealthFilter_X_Max: '',
    HealthFilter_X_NSigma: '',
    HealthFilter_Y_Max: '',
    HealthFilter_Y_NSigma: '',
    HealthFilter_EdgeClearance: '',
    ResidualOutlierRemoval_NSigma: '',
    Granularity: '',
    Decorrection_CPE_ViaSecs: '',
    Decorrection_CPE_ViaSubrecipe: '',
    Decorrection_ProcessCorrections: '',
    TargetLabel: '',
    SampleSchemeName: '',
})
const RefinementSetting = reactive({
    ModelParameterReduction: '',
    MUBPR: '',
    MUBPR_X_Max: '',
    MUBPR_Y_Max: '',
    ActuatorRanges_SetName: '',
})
const checkForm = reactive({
    GlobalModel: false,
    RefinementModel: false,
    TargetLabel: false,
    SampleSchemeName: false,
    ActuatorRanges_SetName: false,
});
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
});
watchEffect(() => {
    // console.log(props.settingValue, 'watchEffect配置的回调执行了')
    if (Object.keys(props.settingValue).length > 0) {
        // 存在
        console.log(props.settingValue, 'props.settingValue 存在');
        CommonSetting.HealthFilter_Max = props.settingValue.CommonSetting.HealthFilter_Max;
        CommonSetting.HealthFilter_NSigma = props.settingValue.CommonSetting.HealthFilter_NSigma;
        CommonSetting.HealthFilter_X_Max = props.settingValue.CommonSetting.HealthFilter_X_Max;
        CommonSetting.HealthFilter_X_NSigma = props.settingValue.CommonSetting.HealthFilter_X_NSigma;
        CommonSetting.HealthFilter_Y_Max = props.settingValue.CommonSetting.HealthFilter_Y_Max;
        CommonSetting.HealthFilter_Y_NSigma = props.settingValue.CommonSetting.HealthFilter_Y_NSigma;
        CommonSetting.HealthFilter_EdgeClearance = props.settingValue.CommonSetting.HealthFilter_EdgeClearance;
        CommonSetting.ResidualOutlierRemoval_NSigma = props.settingValue.CommonSetting.ResidualOutlierRemoval_NSigma;
        CommonSetting.Granularity = props.settingValue.CommonSetting.Granularity;
        CommonSetting.Decorrection_CPE_ViaSecs = props.settingValue.CommonSetting.Decorrection_CPE_ViaSecs;
        CommonSetting.Decorrection_CPE_ViaSubrecipe = props.settingValue.CommonSetting.Decorrection_CPE_ViaSubrecipe;
        CommonSetting.Decorrection_ProcessCorrections = props.settingValue.CommonSetting.Decorrection_ProcessCorrections;
        CommonSetting.TargetLabel = props.settingValue.CommonSetting.TargetLabel;
        CommonSetting.SampleSchemeName = props.settingValue.CommonSetting.SampleSchemeName;
        // RefinementSetting
        RefinementSetting.ModelParameterReduction = props.settingValue.RefinementSetting.ModelParameterReduction;
        RefinementSetting.MUBPR = props.settingValue.RefinementSetting.MUBPR;
        RefinementSetting.MUBPR_X_Max = props.settingValue.RefinementSetting.MUBPR_X_Max;
        RefinementSetting.MUBPR_Y_Max = props.settingValue.RefinementSetting.MUBPR_Y_Max;
        RefinementSetting.ActuatorRanges_SetName = props.settingValue.RefinementSetting.ActuatorRanges_SetName;
    }

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
