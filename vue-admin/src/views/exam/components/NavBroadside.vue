<template>
	<div class="broadside-box">
		<span
			v-for="(item, index) in navList"
			:key="index"
			class="broadside-box-item"
			:class="item.title === activeTitle ? 'broadside-box-item--active' : ''"
			@click="handleClick(item)"
		>
			{{ item.title }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'NavBroadside',
	props: {
		navList: {
			type: Array,
			default: () => {
				return [
					// {
					// 	title: '大学化学',
					// 	code: 'chemistry'
					// }
				];
			}
		}
	},
	data() {
		return {
			activeTitle: ''
		};
	},
	watch: {
		navList: {
			immediate: true,
			handler: function () {
				this.$nextTick(() => {
					const code = this.$route?.query?.code ?? '';
					if (code) {
						const arrI = this.navList.filter(e => {
							return e.code === code;
						});
						arrI.length > 0 ? this.handleClick(arrI[0]) : (this.activeTitle = '大学化学');
					} else {
						this.activeTitle = this.handleClick(this.navList[0]);
					}
				});
			}
		}
	},
	methods: {
		async handleClick(item) {
			await this.$router.push({
				query: {
					code: item.code
				}
			});
			this.$emit('navClick', item);
			this.activeTitle = item.title;
		}
	}
};
</script>

<style lang="scss" scoped>
.broadside-box {
	width: 176px;
	height: 666px;
	position: fixed;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	top: 150px;
	right: -140px;
	z-index: 2100;
	padding-top: 74px;
	overflow: auto;
	transition: all 0.6s ease;
	background-image: url('https://dayuding.wisesoft.org.cn/images/fy/layout/broadside-bg.png');

	&::-webkit-scrollbar {
		display: none;
	}
	&-item {
		display: block;
		text-align: center;
		width: 100%;
		align-items: center;
		font-size: 16px;
		font-family: SourceHanSerifSC-Heavy, SourceHanSerifSC;
		font-weight: 800;
		color: #404040;
		line-height: 23px;
		height: 23px;
		margin-bottom: 40px;
		cursor: pointer;
		position: relative;
		&--active {
			color: #980f09;
			&::after {
				position: absolute;
				content: '';
				display: inline-block;
				width: 103px;
				height: 14px;
				bottom: -18px;
				left: calc(50% - 51.5px);
				background-image: url('https://dayuding.wisesoft.org.cn/images/fy/layout/broadside-icon.png');
				background-size: 100% 100%;
			}
		}
		&:hover {
			animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
		}
	}
	&:hover {
		right: 0;
	}
}
</style>
