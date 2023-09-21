/*
 * @Author: William Dong
 * @Date: 2023-09-21 10:31:54
 * @LastEditTime: 2023-09-21 13:56:26
 */
import { ref, reactive, watchEffect } from 'vue';
// import { defaultYnMap, basicForm } from '../config/globalSetting';
import { getModelDetails } from '@/api/seed';
import { showWarning, successInfo } from '@futurefab/components/dist/utils';
import { useI18n } from 'vue-i18n';
export default function useMeasureRecipe() {
    const sidebar = reactive({
        show: false,
        title: '',
    });
    const handleClick = (code: string) => {
        if (code == 'closeCancel' || code == 'cancel') {
            sidebar.show = false;
        }
        console.log(code);
    };
    const form = reactive({
        technology: '',
        productId: '',
        layer: '',
    });
    const handelGenerateCpe = (records: any) => {
        // 选择一行或多行量测结果，用于手动生成CPE
        // 选中一行或多行数据，点击Generate CPE按钮，先判断所有选中数据的Technology/Product ID/Layer是否一致。
        //如果不一致，弹框警告；如果一致，则弹出以下弹窗，以选中的数据填充Technology
        /// Product ID / Layer输入框
        let { technology, productId, layer } = records[0];
        form.technology = technology;
        form.productId = productId;
        form.layer = layer;
        if (records.length === 1) {
            // 只有一项不需要比较
            sidebar.show = true;
            return;
        }
        // 多项的话
        var res = records.every((item: any) => {
            return (
                item.technology === technology &&
                item.productId === productId &&
                item.layer === layer
            );
        });
        // console.log(res, 'check result');
        if (!res) {
            showWarning('选中数据的Technology/Product ID/Layer不一致,请重新选择再继续!');
            return;
        }
        sidebar.show = true;
        return;
    };
    const handelGenerate1stLotCorrection = () => {};
    const handelGenerate1stWlcSubrecipe = () => {};
    return {
        sidebar,
        form,
        handleClick,
        handelGenerateCpe,
        handelGenerate1stLotCorrection,
        handelGenerate1stWlcSubrecipe,
    };
}
