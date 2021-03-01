<template>
	<div class="layout">
		<!-- 公用头部区域 -->
		<div class="layout-top">
			<Header></Header>
		</div>
		<div class="layout-main">
			<!-- 动态菜单展示区域 -->
			<div class="layout-main-left">
				<NavBar :isCollapse="menuCollapse"></NavBar>
			</div>
			<div class="layout-main-right">
				<!-- 标签展示区域 -->
				<div class="right-nav">
					<TagNav></TagNav>
				</div>
				<!-- 标签动态路由区域 -->
				<div class="right-inner">
					<keep-alive :include="tagNavList">
						<router-view></router-view>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NavBar from "./NavBar";
import TagNav from "./TagNav.vue";
import Header from "../../components/Header.vue";
export default {
	name: "layout",
	components: {
		Header,
		TagNav,
		NavBar,
	},
	data() {
		return {
			// 菜单栏是否是展开状态
			menuCollapse: false,
		};
	},
	computed: {
		// 读取缓存的标签页面
		tagNavList() {
			return this.$store.state.tagNav.cachedPageName;
		},
	},
	methods: {},
	created() {},
};
</script>
<style lang="scss" scoped>
.layout {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	.layout-top {
		border: 0;
		z-index: 1000;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 50px;
	}
	.layout-main {
		display: flex;
		margin-top: 60px;
	}
	.layout-main-left {
		width: 220px;
		height: 100%;
	}
	.layout-main-right {
		width: 100%;
		height: 100%;
	}
}
</style>
