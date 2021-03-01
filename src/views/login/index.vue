<template>
	<div class="login">
		<div class="shadowBorder"></div>
		<div class="content">
			<div class="formInput">
				<div class="logoTitle">
					<div class="title">车辆智能运维系统</div>
				</div>
				<div class="version"></div>
				<div class="loginArea">
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="30px" class="loginForm">
						<el-form-item prop="username" class="loginFormItem">
							<el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户账号" clearable>
								<img slot="prefix" src="../../assets/login/account.png" class="icon" />
							</el-input>
						</el-form-item>
						<el-form-item label prop="pwd" class="loginFormItem labelSpace">
							<el-input
								v-model="ruleForm2.pwd"
								show-password
								placeholder="用户密码"
								clearable
								@keyup.native.enter="submitForm('ruleForm2', 'enterWebPage')"
							>
								<img slot="prefix" src="../../assets/login/mimajiesuo.png" class="icon" />
							</el-input>
						</el-form-item>
						<el-form-item class="loginFormItem button">
							<!-- <el-button type="primary" @click="submitForm('ruleForm2', 'enterLargeScreen')" :loading="loginLoading1"
								>运维监控</el-button
							> -->
							<el-button type="primary" @click="submitForm('ruleForm2', 'enterWebPage')" :loading="loginLoading"
								>登录</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Encrypt from "@/util/encrypt.js";
import md5 from "js-md5";

export default {
	data() {
		var checkUsername = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("用户账号不能为空"));
			} else if (!value.match(/^[a-zA-Z0-9_]{4,16}$/)) {
				return callback(new Error("用户名由4到16位（字母，数字，下划线）组成"));
			} else {
				callback();
			}
		};
		var validatePwd = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
				// } else if (
				// 	!value.match(
				// 		/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
				// 	)
				// ) {
				// 	callback(new Error("密码由6-16位字母、数字组成"));
			} else {
				// if (this.ruleForm2.checkPass !== "") {
				// 	this.$refs.ruleForm2.validateField("checkPass");
				// }
				callback();
			}
		};
		return {
			ruleForm2: {
				username: "",
				pwd: "",
			},
			rules2: {
				username: [{ validator: checkUsername, trigger: "blur" }],
				pwd: [{ validator: validatePwd, trigger: "blur" }],
			},
			loginLoading: false,
			loginLoading1: false,
		};
	},
	methods: {
		submitForm(formName, operate) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (operate === "enterWebPage") {
						this.loginLoading = true;
					} else if (operate === "enterLargeScreen") {
						this.loginLoading1 = true;
					}
					let params = {
						account: this.ruleForm2.username,
						password: md5(this.ruleForm2.pwd),
					};

					this.$api.baseData
						.userLogin(params)
						.then((result) => {
							if (!result.data.success) {
								this.$message({
									type: "error",
									message: result.data.data.msg || "账号或者密码错误！",
								});
								return;
							}
							let tokenInfo = result.data.data;
							Encrypt.token.set(tokenInfo.ssoticket);
							Encrypt.account.set(params.account);
							Encrypt.password.set(params.password);
							Encrypt.userName.set(tokenInfo.userName);
							if (operate === "enterWebPage") {
								this.loginFrontEndManage();
							} else if (operate === "enterLargeScreen") {
								this.enterLargeScreen();
							}
						})
						.finally(() => {
							this.loginLoading = false;
							this.loginLoading1 = false;
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		loginFrontEndManage() {
			this.$router.push("/home");
		},
		enterLargeScreen() {
			this.$router.push("/largeScreen");
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("../../assets/login/loginBackground.png") no-repeat 100% 100%;
	background-size: 100% 100%;
	.shadowBorder {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.content {
		margin: 20px;
		background: rgba(218, 224, 241, 0.2);
		border: 1px solid rgba(49, 148, 180, 1);
		border-radius: 10px;
		display: flex;
		padding: 10px;
		padding-right: 35px;
		margin-bottom: 200px;
		.formInput {
			position: relative;
		}
		.leftImg {
			width: 50px;
			height: 50px;
		}
		.loginForm {
			width: 100%;
		}
		.loginArea {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.logoTitle {
		color: #ffffff;
		display: flex;
		justify-content: center;
		margin-top: 30px;
		margin-left: 30px;
		.title {
			font-size: 26px;
			font-weight: bold;
		}
		.logo {
			height: 39px;
			width: 125px;
		}
	}
	.version {
		margin: 0 0 40px;
		color: #d9dee3;
		text-align: right;
		padding-right: 10px;
		font-size: 14px;
	}
	.loginFormItem {
		width: 100%;
		.el-button--primary {
			letter-spacing: 1em;
			width: 177px;
			background: linear-gradient(0deg, rgba(0, 84, 209, 1) 0%, rgba(36, 165, 255, 1) 100%);
			border-radius: 5px;

			&:hover {
				background: #0054d1;
			}
		}
	}
	::v-deep .el-input__inner {
		border: none;
		border-radius: 0;
	}
	.loginFormItem.button {
		margin-top: 35px;
		position: relative;
	}
	.icon {
		height: 20px;
		width: 16px;
		margin-top: 10px;
		margin-left: 10px;
	}
	::v-deep .el-input--prefix .el-input__inner {
		padding-left: 35px;
	}
	::v-deep .el-icon-loading {
		width: 14px;
	}
	@keyframes waveFlow {
		from {
			background-position-x: -10px, 0;
		}
		to {
			background-position-x: -30px, -20px;
		}
	}
}
</style>
