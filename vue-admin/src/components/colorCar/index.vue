<!--
 * @Description: 色卡
 * @Version: 1.0
 * @Autor: zhaodongming
 * @Date: 2022-08-17 11:45:03
 * @LastEditors: zhaodongming
 * @LastEditTime: 2022-08-19 13:55:59
-->
<template>
	<div>
		<el-drawer
			:visible.sync="drawerVal"
			:direction="direction"
			:append-to-body="true"
			:wrapper-closable="true"
			:before-close="handleClose"
			:with-header="false"
		>
			<div>
				<h3 class="setting-title">主题色</h3>
				<div class="color">
					<div
						v-for="(color, index) in defaultColorList"
						:key="index"
						class="color-spot"
						:style="`background-color:${color}`"
						@click="handleColorSelect(color)"
					></div>
					<div class="color-more">
						<el-color-picker v-model="color" size="mini"></el-color-picker>
					</div>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script>
import { presetPalettes, generate } from '@eoss-design/color';
// 获取element版本号,便于拉去对应版本的主题文件
const version = require('element-ui/package.json').version;
// 默认主题颜色
const defaultColor = '#1890ff';

export default {
	props: {
		drawer: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// 是否打开设置面板
			drawerVal: true,
			// 设置面板打开方向
			direction: 'rtl',
			// 默认颜色列表
			defaultColorList: [],
			// 默认颜色
			theme: defaultColor,
			// 样式字符串
			chalk: ''
		};
	},
	watch: {
		drawer(newVal, oldVal) {
			this.drawerVal = newVal;
		},
		// 1、监听默认主题变化,主题切换要同步给theme对象
		async theme(newVal, oldVal) {
			console.log('this.theme', oldVal);
			// 1-根据颜色算法获取到新的色系和旧的色系
			const newCluster = this.handlerGetThemeCluster(newVal);
			const oldCluster = this.handlerGetThemeCluster(oldVal);
			const $message = this.$message({
				message: '  正在切换主题',
				type: 'success',
				duration: 0,
				iconClass: 'el-icon-loading'
			});
			// 获取主题文件内容
			// |----获取sass文件远程URl
			const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
			// |----获取sass文件内容
			await this.handlerGetCSSString(url, 'chalk');
			// 开始更新色彩文件内容
			const newColorStr = this.handleUpdateColor(this.chalk, newCluster, oldCluster);
			// 更新到项目中去
			const thalk = document.getElementById('chalk-style');
			if (!thalk) {
				let ele = document.createElement('style');
				ele.setAttribute('id', 'chalk-style');
				ele.innerText = newColorStr;
				document.head.appendChild = ele;
				return;
			}
			thalk.innerText = newColorStr;
			$message.close();
		}
		// 2-提示正在切换主题
		// 3-获取到原始色系
		// 4-使用原始色系和新色系更新主题颜色，以及修改主题状态
		// 色系更新完后得到最新的样式字符串
		// 获取style标签，如果没有则创建一个，将新的主题scss字符串插入进去
	},
	async mounted() {
		this.HandleGetDefaultColor();
		const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
		await this.handlerGetCSSString(url, 'chalk');
		// console.log(this.chalk)
		setTimeout(() => {
			this.theme = 'red';
		});
	},
	methods: {
		handleClose(done) {
			this.drawerVal = false;
			this.$emit('change', this.drawerVal);
		},
		// 获取内置色系
		HandleGetDefaultColor() {
			let newColor = [];
			console.log(presetPalettes);
			newColor = Object.keys(presetPalettes).map(colors => {
				return presetPalettes[colors][5];
			});
			this.defaultColorList = newColor;
		},
		// 切换品牌色
		handleColorSelect(color) {
			this.theme = color;
			// const colorLine = generate(color);
			// const styleSheet = document.createElement('style');
			// styleSheet.innerText =
			// 	':root[theme="blue"]{' +
			// 	'--blue-1:' +
			// 	colorLine[0] +
			// 	';--blue-2:' +
			// 	colorLine[1] +
			// 	';--blue-3:' +
			// 	colorLine[2] +
			// 	';--blue-4:' +
			// 	colorLine[3] +
			// 	';--blue-5:' +
			// 	colorLine[4] +
			// 	';--blue-6:' +
			// 	colorLine[5] +
			// 	';--blue-7:' +
			// 	colorLine[6] +
			// 	';--blue-8:' +
			// 	colorLine[7] +
			// 	';--blue-9:' +
			// 	colorLine[8] +
			// 	';--blue-10:' +
			// 	colorLine[9] +
			// 	'}';
			// document.head.appendChild(styleSheet);
			// document.documentElement.setAttribute('theme', 'blue');
		},
		// 获取样式文件方法
		handlerGetCSSString(url, variable) {
			// 创建XHR对象
			return new Promise(resolve => {
				const xhr = new XMLHttpRequest();
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4 && xhr.status === 200) {
						this[variable] = xhr.responseText;
						resolve();
					}
				};
				xhr.open('GET', url);
				xhr.send();
			});
		},
		// 获取色彩列表的方法
		handlerGetThemeCluster(theme) {
			return generate(theme);
		},
		// 更新样式的方法
		handleUpdateColor(chalk, newCluster, oldCluster) {
			const colorString = chalk;
			oldCluster.forEach((color, index) => {
				// 遍历就颜色替换为新颜色
				colorString.replace(new RegExp(color, 'ig'), newCluster[index]);
			});
			return colorString;
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__body {
	padding: 24px;
}
.setting-title {
	margin: 0 0 24px 0;
}
.color {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	&-spot {
		width: 20px;
		height: 20px;
		margin-right: 8px;
		margin-bottom: 10px;
		font-weight: 700;
		color: #fff;
		text-align: center;
		cursor: pointer;
		border-radius: 2px;
	}
}
</style>
