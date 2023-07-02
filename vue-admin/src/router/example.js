import Layout from '@/layout';
export const example = [
	{
		path: '/example',
		component: Layout,
		redirect: '/example/table',
		name: 'Example',
		meta: { title: '综合实例', icon: 'el-icon-s-help' },
		children: [
			{
				path: 'table',
				name: 'Table',
				component: () => import('@/views/table/index'),
				meta: { title: '表格', icon: 'table' }
			},
			{
				path: 'tree',
				name: 'Tree',
				component: () => import('@/views/tree/index'),
				meta: { title: '树', icon: 'tree' }
			}
		]
	},
	{
		path: '/form',
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'Form',
				component: () => import('@/views/form/index'),
				meta: { title: '表单', icon: 'form' }
			}
		]
	},
	{
		path: '/nested',
		component: Layout,
		redirect: '/nested/menu1',
		name: 'Nested',
		meta: {
			title: '嵌套',
			icon: 'nested'
		},
		children: [
			{
				path: 'menu1',
				component: () => import('@/views/nested/menu1/index'), // Parent router-view
				name: 'Menu1',
				meta: { title: '菜单1' },
				children: [
					{
						path: 'menu1-1',
						component: () => import('@/views/nested/menu1/menu1-1'),
						name: 'Menu1-1',
						meta: { title: '菜单1-1' }
					},
					{
						path: 'menu1-2',
						component: () => import('@/views/nested/menu1/menu1-2'),
						name: 'Menu1-2',
						meta: { title: '菜单1-2' },
						children: [
							{
								path: 'menu1-2-1',
								component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
								name: 'Menu1-2-1',
								meta: { title: '菜单1-2-1' }
							},
							{
								path: 'menu1-2-2',
								component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
								name: 'Menu1-2-2',
								meta: { title: '菜单1-2-2' }
							}
						]
					},
					{
						path: 'menu1-3',
						component: () => import('@/views/nested/menu1/menu1-3'),
						name: 'Menu1-3',
						meta: { title: '菜单1-3' }
					}
				]
			},
			{
				path: 'menu2',
				component: () => import('@/views/nested/menu2/index'),
				name: 'Menu2',
				meta: { title: '菜单2' }
			}
		]
	}
];
