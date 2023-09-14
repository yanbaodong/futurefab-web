import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';
import { VXETable } from '@futurefab/vxe-table';
import store from '@/store/store';
import { getPortalUrl } from '@/api/data';
import { filterNoPermission } from '@futurefab/components/dist/utils';
import { baseUrl } from '@/assets/const';

const base: string = (window as any).__POWERED_BY_QIANKUN__ ? baseUrl : '';

const initRouter = () => {
    const router = createRouter({
        history: createWebHistory(base),
        routes,
    });

    router.beforeEach(async (to: any, from: any, next: any) => {
        const token = localStorage.getItem('token');
        const isDev = process.env.NODE_ENV === 'development';
        if (token && !isDev) {
            filterNoPermission(to, next, baseUrl);
        }
        if (store.state.portalUrl == '' && token) {
            // await getPortalUrl({
            //     bodyParams: {},
            //     crossDomainAppName: 'portal',
            // }).then((result: any) => {
            //     if (result.status == 'SUCCESS') {
            //         store.commit('SET_PORTALURL', result.data);
            //     }
            // });
        }
        if (!(window as any).__POWERED_BY_QIANKUN__) {
            const isDev = process.env.NODE_ENV === 'development';
            if (!isDev) {
                window.location.href = `${store.state.portalUrl}/login`;
            } else {
                if (to.path == '/login') {
                    next('home');
                }
                if (token) {
                    next();
                } else {
                    VXETable.requestFun
                        .http('portal')
                        ._post({
                            url: 'userLoginService',
                            bodyParams: {
                                userId: 'admin',
                                userPwd: 'xxxxxxxxxxxxxxxxxxxxxx',  // md5
                                language: 'zh-CN',
                            },
                            crossDomainAppName: 'portal',
                        })
                        .then((result: any) => {
                            localStorage.setItem('token', result.data.token);
                            localStorage.setItem(
                                'locationData',
                                JSON.stringify({
                                    rawId: result.data.locationRawId,
                                    site: result.data.site,
                                    fab: result.data.fab,
                                    line: result.data.line,
                                }),
                            );
                            localStorage.setItem(
                                'areaData',
                                JSON.stringify({
                                    area: result.data.area,
                                    rawId: result.data.areaRawId,
                                }),
                            );
                            next('/home');
                        });
                }
            }
        } else {
            if (to.name == undefined) {
                next({ ...to });
            } else {
                next();
            }
        }
    });

    return router;
};
export default initRouter;
