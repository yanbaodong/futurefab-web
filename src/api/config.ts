import { requestFun } from '@futurefab/vxe-table';
export interface HeaderParams{
    log?:string,
    page?:string,
    action?:string,
}
export interface Data {
    [x: string]: any;
    headerParams?:HeaderParams | undefined,
    bodyParams:any,
    crossDomainAppName?:string
}
const $http = requestFun.http('seed');
export const getData = (url: string, data: Data, crossDomainAppName?: string) => {
    const _post = $http._post({
        url,
        timeout: 60000,
        bodyParams: data.bodyParams,
        headerParams: data.headerParams,
        crossDomainAppName: crossDomainAppName || data.crossDomainAppName,
        signal: data.signal ? data.signal : undefined,
    });
    _post.catch((error: any) => {
        if (error.code == 'PP10006') {
            // 登录超时
        }
    });
    return _post;
};