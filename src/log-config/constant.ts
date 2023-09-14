export const SEPARATOR = '-';
export const FIELDSEPARATOR = ':';
export const PROJECTNAME = 'dcp-';
export const SEARCH = 'search';
export const ADD = 'add';
export const DELETE = 'delete';
export const SAVE = 'save';
export const REFRESH = 'refresh';
export const IMPORT = 'import';
export const EXPORT = 'export';
export const ADDVIRTUALEVENT = 'add-virtual-event';
export const ADDVIRTUALWVENTPARAMTER = 'add-virtual-event-parameter';

//buttonId
export const setButtons = (buttonList: string[], suffix?: string) => {
    const buttonObj: any = {};
    buttonList.forEach((item: string) => {
        buttonObj[item] = suffix && suffix != '' ? `${suffix}${SEPARATOR}${item}` : item;
    });
    return buttonObj;
};
