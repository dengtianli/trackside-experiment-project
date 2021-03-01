<template>
	<div class="frontEndManageNav">
		<div :class="[{ fixPlaceholderMin: isCollapse }, 'fixPlaceholder']"></div>
		<p class="copyRight flexCenter" v-show="!isCollapse && !isOverFlow">
			<img class="logo" src="@/assets/yunda-logo.png" alt />
		</p>
		<el-menu
			:default-active="activeItem"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			@select="handleSelect"
			background-color="#1a2b5c"
			text-color="#fff"
			active-text-color
			:collapse="isCollapse"
			:unique-opened="true"
			router
		>
			<child-menu :dataList="dataList"></child-menu>
		</el-menu>
	</div>
</template>

<script>
import childMenu from "../../components/childMenu";
export default {
	components: { childMenu },
	props: {
		addTab: Function,
		isCollapse: Boolean,
		activeItem: String,
	},
	data() {
		return {
			clickCount: 0,
			isOverFlow: false,
			currentLabel: "首页",
			dataList: [
				// {
				//   path: "/frontEndManage/intelligentDetection",
				//   label: "车辆智能检测",
				//   imgPath: "fault.svg",
				//   menuCode: "1",
				//   children: [
				//     {
				//       path: "/frontEndManage/monitoringAndWarning",
				//       label: "检测状态识别",
				//       imgPath: "",
				//       menuCode: "1-1",
				//       children: [
				//         {
				//           path: "/frontEndManage/monitoringAndWarning/DetectionTracking",
				//           label: "检测跟踪",
				//           imgPath: "",
				//           menuCode: "1-1-1",
				//           openModel: 'disable',
				//         },{
				//           path: "/frontEndManage/monitoringAndWarning/FaultManage",
				//           label: "故障识别",
				//           imgPath: "",
				//           menuCode: "1-1-2"
				//         }
				//       ]
				//     },{
				//       path: "/frontEndManage/PHMAndHealthControl",
				//       label: "检修支撑",
				//       imgPath: "",
				//       menuCode: "1-2",
				//       children: [
				//         {
				//           path: "/frontEndManage/PHMAndHealthControl/dailyDetection/faultDetailList",
				//           label: "故障清单",
				//           imgPath: "",
				//           menuCode: "1-2-1"
				//         },{
				//           path: "/frontEndManage/PHMAndHealthControl/dailyDetection/dDDetailedList",
				//           label: "日检结果清单",
				//           imgPath: "",
				//           menuCode: "1-2-2"
				//         },{
				//           path: "/frontEndManage/statisticsAnalysis/faultAnalysis/faultStatistic",
				//           label: "故障统计",
				//           imgPath: "",
				//           menuCode: "1-2-3",
				//           openModel: 'disable',
				//         }
				//       ]
				//     }
				//   ]
				// }
			],
		};
	},
	computed: {
		path() {
			return this.$router.history.current.path;
		},
	},
	mounted() {
		this.$api.baseData.getMenu().then((data) => {
			if (!data || !data.data || !data.data.data) return;
			this.dataList = data.data.data;
		});
	},
	methods: {
		handleOpen() {
			this.clickCount += 1;
		},
		handleClose() {
			this.clickCount += 1;
		},
		handleSelect(key) {
			this.clickCount += 1;
			let name = key.split("/").pop();
			this.getTabLabelByName(this.dataList, name);
			this.addTab(name);
		},
		getTabLabelByName(dataList, name) {
			dataList.map((item) => {
				if (item.children instanceof Array) {
					this.getTabLabelByName(item.children, name);
				}
				if (item.path.split("/").pop() == name) {
					this.currentLabel = item.label;
				}
			});
		},
	},
};
</script>

<style lang="scss">
.frontEndManageNav {
	.icon-img {
		height: 20px;
		width: 20px;
		margin-right: 10px;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		position: fixed;
		width: 220px;
		z-index: 2001;
		height: 100%;
		overflow: auto;
		text-align: left;
	}

	.el-menu--collapse {
		position: fixed;
		width: 70px;
		z-index: 2001;
		height: 100%;
	}

	.el-menu-item {
		height: 40px;
		line-height: 40px;
	}
	.el-submenu__title,
	.el-menu-item {
		border-bottom: 1px solid #0d1a40;
		box-shadow: 0 2px 3px -1px rgba(255, 255, 255, 0.3);
	}
	.el-submenu__title:last-child,
	li > .el-submenu__title:last-of-type,
	.el-menu-item:last-child {
		box-shadow: none;
	}
	.el-submenu.is-active .el-submenu__title {
		border-bottom-color: #101f4b;
		// border-left: 4px solid #3276ca;
	}
	.el-submenu.is-active ul.el-menu .el-menu-item {
		background: #101f4b !important;
	}
	.el-submenu.is-active ul.el-menu .el-menu-item.is-active {
		background: #3276ca !important;
		color: #fff;
	}
}
.fixPlaceholder {
	width: 220px;
}
.fixPlaceholderMin {
	width: 70px;
}
.blankClass {
	color: gray;
}
.copyRight {
	position: fixed;
	bottom: 5px;
	left: 40px;
	font-size: 10px;
	z-index: 99999;
	color: #000;
	font-family: "Courier New", Courier, monospace;
}
.logo {
	width: 103px;
	margin-bottom: 5px;
}
</style>
