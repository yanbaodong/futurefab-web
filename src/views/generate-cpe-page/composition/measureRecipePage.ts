/*
 * @Author: William Dong
 * @Date: 2023-09-21 10:31:54
 * @LastEditTime: 2023-09-21 11:11:20
 */
import { ref, reactive, watchEffect } from 'vue';
// import { defaultYnMap, basicForm } from '../config/globalSetting';
import { getModelDetails } from '@/api/seed';
import { showWarning, successInfo } from '@futurefab/components/dist/utils';
import { useI18n } from 'vue-i18n';
export default function useMeasureRecipe() {
    const sidebar = reactive({
        show: true,
        title: '',
    });
    const handleClick = (code: string) => {
        if (code == 'closeCancel' || code == 'cancel') {
            sidebar.show = false;
        }
        console.log(code);
    };
    const handelGenerateCpe = () => {};
    const handelGenerate1stLotCorrection = () => {};
    const handelGenerate1stWlcSubrecipe = () => {};
    return {
        sidebar,
        handleClick,
        handelGenerateCpe,
        handelGenerate1stLotCorrection,
        handelGenerate1stWlcSubrecipe,
    };
}
