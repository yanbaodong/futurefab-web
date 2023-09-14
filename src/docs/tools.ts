export const setHtml = (html: string) => {
    let str = '<div class="vxe-table--tooltip-help_message github-markdown-body">' + html;
    str = str + '</div>';
    return str;
};

export const setParamHtml = (html: string) => {
    let str =
        '<div class="vxe-table--tooltip-help_message github-markdown-body vxe-table--tooltip_param">' +
        html;
    str = str + '</div>';
    return str;
};
