import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    //主应用中运行
    {
        path: '/eseed', //主应用activeRule对应(需要和baseUrl、package.json的name保持一致)
        redirect: '/home',
    },
    {
        path: '/',
        name: 'default',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "seed-home" */ '../views/home/index.vue'),
    },
    {
        path: '/list-page',
        name: 'list-page',
        component: () =>
            import(/* webpackChunkName: "seed-list-page" */ '../views/list-page/index.vue'),
    },
    {
        path: '/model-recipe-page',
        name: 'model-recipe-page',
        component: () =>
            import(/* webpackChunkName: "seed-list-page" */ '../views/model-recipe-page/index.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: {
            requireAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];
export default routes;
