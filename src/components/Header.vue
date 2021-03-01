<template>
	<div class="content">
		<div class="header">
			<div class="logo-title">
				<img src="@/assets/header/guangzhouTrainNewLogo.png" alt="image error" class="logo" />
				<span class="split"></span>
				<span class="title">{{ headerText }}</span>
			</div>
			<div class="center"></div>
			<div class="userInfo">
				<span class="user">您好，<i class="el-icon-s-custom"></i>{{ useInfo.userName }}</span>

				<span class="split"></span>
				<el-tooltip class="item" effect="dark" content="退出" placement="top-start">
					<img @click="loginOut()" src="@/assets/header/login-out.png" class="login-out" />
				</el-tooltip>
			</div>
		</div>
	</div>
</template>
<script>
import Encrypt from "@/util/encrypt.js";
export default {
	components: {},
	data: function() {
		return {
			headerText: "车辆智能运维系统",
			dialogVisible: false,
		};
	},
	computed: {
		useInfo() {
			return {
				account: Encrypt.account.get(), //登录用户账号
				password: Encrypt.password.get(), //登录用户密码
				userName: Encrypt.userName.get(), //登录用户名字
			};
		},
	},
	methods: {
		loginOut() {
			this.$confirm("您确认退出吗？")
				.then(() => {
					let params = this.useInfo;
					this.$api.baseData.userLoginOut(params).then((result) => {
						if (!result.data.success) {
							this.$message({
								type: "error",
								message: result.data.message,
							});
							return;
						}

						this.$router.push("/login");
					});
				})
				.catch(() => {});
		},
		downloadExe() {
			const link = document.createElement("a");
			link.href = "http://" + location.host + "/YundaInteligentAlarmSystem.zip";
			link.setAttribute("download", "报警程序.zip");
			link.click();
		},
	},
};
</script>
<style lang="scss" scoped>
.navbar-static-top {
	border: 0;
	z-index: 1000;
	position: relative;
	min-height: 50px;
}

.header {
	width: 100%;
	height: 60px;
	background: #3276ca;
	display: flex;
	color: rgba(255, 255, 255, 1);
	.logo-title {
		display: flex;
		align-items: center;
		font-size: 24px;
		margin: 10px 15px;

		// .logo {
		// 	width: 150px;
		// 	height: 40px;
		// 	margin-right: 10px;
		// }
		.logo {
			width: 200px;
			margin-right: 10px;
		}
		.logo1 {
			width: 200px;
			margin-top: 10px;
			margin-right: 10px;
		}

		.title {
			width: 220px;
		}
	}
	.center {
		flex-grow: 1;
	}
	.split {
		width: 1px;
		height: 38px;
		margin-left: 20px;
		margin-right: 20px;
		background: rgba(32, 75, 128, 1);
		box-shadow: 1px 0px 0px 0px rgba(255, 255, 255, 0.3);
	}
	.userInfo {
		display: flex;
		// width: 200px;
		align-items: center;
		margin-right: 10px;
		.user {
			line-height: 60px;
			font-size: 16px;
			font-weight: 400;
			margin-left: 10px;
		}
		.login-out {
			height: 16px;
			width: 16px;
			&:hover {
				cursor: pointer;
			}
		}
		img {
			cursor: pointer;
		}
	}
}
</style>
