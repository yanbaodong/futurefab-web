/*
 * @Author: William Dong
 * @Date: 2023-09-12 13:32:32
 * @LastEditTime: 2023-09-18 11:05:48
 */

import { ref, reactive, watchEffect } from 'vue';
import { defaultYnMap, basicForm } from '../config/globalSetting';
import { getModelDetails } from '@/api/seed';
import { showWarning, successInfo } from '@futurefab/components/dist/utils';
import { useI18n } from 'vue-i18n';
export default function useModelingRecipe() {
    // 引入多语言
    const { t } = useI18n();
    // 新增和编辑
    const sidebar = reactive({
        title: 'modelRecipePage.field.add',
        show: false,
        readonly: false, // 标记是否是只读
        tabCardType: 'card', // model 卡片是否支持新增删除 card 不支持 'editable-card' 支持
        // buttonList: [
        //     { name: 'save', code: 'save', status: 'primary' },
        //     { name: 'cancel', code: 'cancel' },
        // ],
    });
    const modelingForm = reactive({
        recipeName: '',
        defaultYn: false,
        // 默认值
        GlobalSetting: {
            EvaluationRegion: '',
            HealthFilter_XYPairingRange: '1',
            HealthFilter_UsedOverlayComponent: 'X and Y',
            HealthFilter_InvalidateXYAsPair: 'true',
            OverruleMetrologyValidityChecked: 'false',
            ValidDataFraction_MinPercentage: '',
        },
        ModelList: [
            // 默认值
            {
                ...basicForm,
            },
        ],
    });
    const overruleMetrologyValidityDisabled = ref(true);
    const handleClick = (code: string) => {
        if (code == 'closeCancel' || code == 'cancel') {
            // 清空panes
            panes.value = [
                {
                    title: t('modelRecipePage.field.globalSetting'),
                    key: '0',
                    content: {},
                    closable: false,
                },
            ];
            // 初始化actives
            activeKey.value = panes.value[0].key;
            sidebar.show = false;
        }
        console.log(code);
    };
    const handleShow = () => {
        sidebar.show = true;
    };
    const saveData = () => {
        //  保存数据
        // debugger;
        console.log(modelingForm, 'modelingForm');
        const params = {
            recipeName: modelingForm.recipeName,
            defaultYn: modelingForm.defaultYn,
            GlobalSetting: {
                EvaluationRegion: modelingForm.GlobalSetting.EvaluationRegion,
                HealthFilter_InvalidateXYAsPair:
                    modelingForm.GlobalSetting.HealthFilter_InvalidateXYAsPair,
                HealthFilter_UsedOverlayComponent:
                    modelingForm.GlobalSetting.HealthFilter_UsedOverlayComponent,
                HealthFilter_XYPairingRange: modelingForm.GlobalSetting.HealthFilter_XYPairingRange,
                OverruleMetrologyValidityChecked:
                    modelingForm.GlobalSetting.OverruleMetrologyValidityChecked,
                ValidDataFraction_MinPercentage:
                    modelingForm.GlobalSetting.ValidDataFraction_MinPercentage,
            },
        };
        console.log(params, 'params');
    };

    // 新增方法
    const handleAdd = () => {
        console.log('handleAdd');
        // 新增逻辑
        sidebar.readonly = false;
        sidebar.title = t('modelRecipePage.field.add');
        sidebar.show = true;
        // model 卡片支持编辑
        sidebar.tabCardType = 'editable-card';
        // 默认填充一个model
        let paneItem = {
            title: 'Model 1',
            key: '1',
            content: {
                ...basicForm,
            },
        };
        panes.value.push(paneItem);
    };
    const asyncValue = (modelValue: Array<any>, keyID: string) => {
        console.log(modelValue[0], 'GlobalModel');
        console.log(modelValue[1], 'RefinementModel');
        console.log(modelValue[2], 'CommonSetting');
        console.log(modelValue[3], 'RefinementSetting');
        console.log(keyID, 'keyID');
        // 保存值
    };
    const handleView = (checkboxRecords: any[]) => {
        console.log('handleView:', checkboxRecords);
        // 选中唯一一行数据，以只读方式打开Modeling Recipe配置页面
        sidebar.readonly = true;
        // model 卡片不支持编辑
        sidebar.tabCardType = 'card';
        sidebar.show = true;
        sidebar.title = t('modelRecipePage.field.view');
        // 赋值
        modelingForm.recipeName = checkboxRecords[0].recipeName;
        modelingForm.defaultYn = defaultYnMap[checkboxRecords[0].defaultYn];
        getDetailSetting();
    };
    const handleModify = (checkboxRecords: any[]) => {
        console.log('handleModify');
        // 选中唯一一行数据，以修改方式打开Modeling Recipe配置页面
        sidebar.readonly = false;
        sidebar.title = t('modelRecipePage.field.modify');
        // model 卡片支持编辑
        sidebar.tabCardType = 'editable-card';
        sidebar.show = true;
        // 赋值
        modelingForm.recipeName = checkboxRecords[0].recipeName;
        modelingForm.defaultYn = defaultYnMap[checkboxRecords[0].defaultYn];
        getDetailSetting();
    };
    const handleDelete = (checkboxRecords: any[]) => {
        console.log('handleDelete:', checkboxRecords);
        // 至少选中一行数据，删除选中的Modeling Recipe。
        //如果选中了Default 为Y的Modeling recipe，则弹窗警告，不能删除。
        //删除Modeling Recipe时，需要检查是否被引用，不能删除正在被引用的recipe，需弹窗警告。
        let result = checkboxRecords.some(item => {
            return item.defaultYn === 'Y';
        });
        if (result) {
            // 则弹窗警告，不能删除。
            showWarning('Default YN 为Y的数据不可删除');
            return;
        }
        // 删除逻辑 需要检查是否被引用
        successInfo('删除成功');
    };
    // model 区域
    const panes = ref<{ title: string; key: string; content: any; closable?: boolean }[]>([
        { title: 'Global Setting', key: '0', content: {}, closable: false },
    ]);

    const activeKey = ref(panes.value[0].key);

    const newTabIndex = ref(1);

    const add = () => {
        // 新增 model
        // 获取当前newTabIndex
        activeKey.value = `${++newTabIndex.value}`;
        const tabName = `Model ${newTabIndex.value}`;
        panes.value.push({ title: tabName, key: activeKey.value, content: { ...basicForm } });
        // model 卡片支持编辑
        sidebar.tabCardType = 'editable-card';
        sidebar.show = true;
    };

    const remove = (targetKey: string) => {
        let lastIndex = 0;
        panes.value.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        panes.value = panes.value.filter(pane => pane.key !== targetKey);
        if (panes.value.length && activeKey.value === targetKey) {
            if (lastIndex >= 0) {
                activeKey.value = panes.value[lastIndex].key;
            } else {
                activeKey.value = panes.value[0].key;
            }
        }
    };

    const onEdit = (targetKey: string | MouseEvent, action: string) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey as string);
        }
    };
    // tab 切换时候触发
    const changeTab = (activeKey: string) => {
        console.log(activeKey, 'activeKey)');
        // console.log(keyID, 'keyID)'); // 确定是哪一个model 要改
    };
    // 查询setting 函数
    const getDetailSetting = () => {
        let controller: AbortController | undefined = undefined;
        controller = new AbortController();
        const param = {
            signal: controller.signal,
            bodyParams: {},
        };
        getModelDetails(param).then((res: any) => {
            console.log('res', res);
            if (res.status == 'SUCCESS') {
                modelingForm.GlobalSetting = res.data?.GlobalSetting;

                // 先清空
                modelingForm.ModelList = [];
                modelingForm.ModelList = res.data?.ModelList;
                handelModelList();
            }
        });
    };
    const handelModelList = () => {
        if (modelingForm.ModelList && modelingForm.ModelList.length === 0) {
            // 没有数据
            return false;
        }
        let length = modelingForm.ModelList.length;

        //设置初始化的 tab
        for (var i = 0; i < length; i++) {
            const paneItem = {
                title: `Model ${i + 1}`,
                key: String(i + 1),
                content: modelingForm.ModelList[i],
            };
            panes.value.push(paneItem);
        }
        let panesSum = panes.value.length;
        newTabIndex.value = panesSum - 1;
    };
    watchEffect(() => {
        //  OverruleMetrologyValidity 开关默认不开启。
        //只有不选中Is default modeling recipe的情况下，才能开启OverruleMetrologyValidity开关，
        //只有开启开关，EvaluationRegion和MinPercentage才变为可编辑状态，且必须输入值。
        //只有开启开关，EvaluationRegion和MinPercentage的值才有效。
        // 如果关闭开关，则清空EvaluationRegion和MinPercentage的值
        if (modelingForm.defaultYn) {
            // console.log('开启了');
            overruleMetrologyValidityDisabled.value = false;
        } else {
            // console.log('关闭了');
            overruleMetrologyValidityDisabled.value = true;
        }
    });
    return {
        sidebar,
        modelingForm,
        panes,
        activeKey,
        overruleMetrologyValidityDisabled,
        changeTab,
        asyncValue,
        onEdit,
        saveData,
        handleClick,
        handleShow,
        handleAdd,
        handleView,
        handleModify,
        handleDelete,
        getDetailSetting,
    };
}
