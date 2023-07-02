import Layout from '@/layout';
export const exam = [
	{
		path: '/exam',
		component: Layout,
		redirect: '/example/table',
		name: 'Example',
		meta: { title: '综合实例', icon: 'el-icon-data-analysis' },
		children: [
			{
				path: 'exam1',
				name: 'exam1',
				component: () => import('@/views/exam/index'),
				meta: { title: '第一学期', icon: 'el-icon-printer' }
			},
			{
				path: 'exam2',
				name: 'exam2',
				component: () => import('@/views/exam/index'),
				meta: { title: '第二学期', icon: 'el-icon-printer' }
			}
		]
	}
];
