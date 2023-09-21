/*
 * @Author: William Dong
 * @Date: 2023-09-21 10:31:54
 * @LastEditTime: 2023-09-21 10:35:49
 */
import { ref, reactive, watchEffect } from 'vue';
// import { defaultYnMap, basicForm } from '../config/globalSetting';
import { getModelDetails } from '@/api/seed';
import { showWarning, successInfo } from '@futurefab/components/dist/utils';
import { useI18n } from 'vue-i18n';
export default function useMeasureRecipe() {
    const handelGenerateCpe = () => {};
    const handelGenerate1stLotCorrection = () => {};
    const handelGenerate1stWlcSubrecipe = () => {};
    return { handelGenerateCpe, handelGenerate1stLotCorrection, handelGenerate1stWlcSubrecipe };
}
