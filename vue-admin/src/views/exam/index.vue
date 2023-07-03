<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="exam">
		<div class="list">
			<p class="title">{{ title }}</p>
			<div v-for="(pro, p) in list" :key="p">
				<div v-for="(item, i) in pro" :key="i" class="list-item">
					<span
						class="list-item-cont"
						v-html="
							`<b>${item.sequence}${item.solution.length > 1 ? '*' : '.'}</b>${
								item.description
							}&nbsp;&nbsp;&nbsp;`
						"
					></span>
					<span
						v-for="(label, l) in item.options"
						:key="l"
						:style="{ textDecoration: item.solution.includes(label.label) ? 'underline' : '' }"
						v-html="`${label.label}.${label.description}&nbsp;`"
					></span>
				</div>
				<br />
			</div>
		</div>
		<NavBroadside :nav-list="navList" @navClick="navClick" />
	</div>
</template>
<script>
// import { dataObj, navList } from './components/data1';
import NavBroadside from './components/NavBroadside.vue';
export default {
	components: { NavBroadside },
	data() {
		return {
			// 化学
			list: [],
			// 侧边导航
			navList: [],
			dataObj: {},
			title: ''
		};
	},
	async mounted() {
		const term = this.$route.name ?? 'term1';
		try {
			await require([`./components/${term}.js`], ({ dataObj, navList }) => {
				this.dataObj = dataObj;
				this.navList = navList;
			});
		} catch (error) {
			console.error('无法加载 term:', error);
		}
		// 下载文件
		// const url =
		// 	'https://pjp1-word-view.officeapps.live.com/wv/ResR…6daa8f75b2864c76841d868bebfe9a20b&waccluster=PJP1';
		// const fileName = 'filename.docx';
		// this.downloadFile(url, fileName);
	},
	methods: {
		navClick(e) {
			this.title = e.title;
			this.list = this.dataObj[e.code];
		}
		// downloadFile(url, fileName) {
		// 	fetch(url)
		// 		.then(response => response.blob())
		// 		.then(blob => {
		// 			const url = window.URL.createObjectURL(blob);
		// 			const a = document.createElement('a');
		// 			a.href = url;
		// 			a.download = fileName;
		// 			a.click();
		// 			window.URL.revokeObjectURL(url);
		// 		})
		// 		.catch(error => {
		// 			console.error('文件下载失败:', error);
		// 		});
		// }
	}
};
</script>

<style lang="scss" scoped>
.exam {
	background: #f3f3f3f3;
	padding: 20px 0 60px 0;
	.title {
		text-align: center;
	}
	.list {
		margin: 0 auto;
		min-height: 600px;
		padding: 32px;
		// border: 1px solid #656565;
		box-shadow: 0px 3px 12px #656565;
		//  1/1.41
		width: 1110px;
		// height: 1565.1px;
		// 1138
		// height: 2105px;
		font-size: 15px;
		&-item {
			// &-cont {
			// }
		}
	}
}
</style>
