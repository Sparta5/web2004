import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';
import { exam } from './exam';
// import { example } from './example';
Vue.use(Router);

/**
 * docs: 子菜单只有在route children.length>=1时才会显示
 * hidden: true                   设置为true, item不会出现在侧边栏中(默认是false)
 * alwaysShow: true               设置为true, 将始终显示在根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路线时，
 *                                它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中不会重定向
 * name:'router-name'             路由名 (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色 (您可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 显示在侧边栏的图标 dashboard el-icon-s-help table tree form nested
    breadcrumb: false            设置为false, 该项将隐藏在面包屑中b(默认是true)
    activeMenu: '/example/list'  如果设置path, 侧边栏将突出显示您设置的路径
  }
 */

export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/index'),
				meta: { title: '仪表盘', icon: 'dashboard' }
			}
		]
	},
	...exam,
	// ...example,
	// 404 页面必须放在末尾
	{ path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
	new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	});

const router = createRouter();
// 详情文档 参考: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher;
}

export default router;
