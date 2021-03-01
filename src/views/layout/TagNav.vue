<template>
	<div class="tag-nav">
		<!-- <span class="ss" @click="toggleNav">
			<img class="icon-ss" src="@/assets/icon-ss.png" />
		</span> -->
		<scroll-bar ref="scrollBar" style="height:100%">
			<router-link
				ref="tag"
				class="tag-nav-item"
				:class="isActive(item) ? 'cur' : ''"
				v-for="(item, index) in tagNavList"
				:to="{ path: item.path, query: item.query }"
				:key="index"
				style="display:inline-block; "
			>
				{{ item.title }}
				<span v-if="item.name !== 'home'" @click.prevent.stop="closeTheTag(item, index)"
					><i class="el-icon-close"></i
				></span>
			</router-link>
		</scroll-bar>

		<div class="info">
			<el-tooltip content="清空标签">
				<span @click="closeAllTags"><i class="el-icon-delete"></i> </span>
			</el-tooltip>
		</div>
	</div>
</template>
<script>
/**
 * @description 多标签展示组件
 * @author      sunsy
 * @createTime  2020/07/11
 */
import ScrollBar from "./ScrollBar";
export default {
	name: "TagNav",
	components: {
		ScrollBar,
	},
	data() {
		return {
			defaultPage: "/home",
		};
	},
	computed: {
		tagNavList() {
			return this.$store.state.tagNav.openedPageList;
		},
	},
	mounted() {
		// 首次加载时将默认页面加入缓存
		this.addTagNav();
	},
	watch: {
		$route() {
			this.addTagNav();
			this.scrollToCurTag();
		},
	},
	methods: {
		// 清空之前缓存的所有标签以及缓存数据
		closeAllTags() {
			this.$store.dispatch("tagNav/clearAllTag");
		},
		addTagNav() {
			this.$store.dispatch("tagNav/initPageList");
			// 如果需要缓存则必须使用组件自身的name，而不是router的name
			this.$store.commit("tagNav/addTagNav", {
				name: this.$router.getMatchedComponents()[1].name,
				path: this.$route.path,
				title: this.$route.meta.name,
				fullpath: this.$route.fullPath,
				query: this.$route.query,
			});
		},
		isActive(item) {
			// 根据当前路由访问更新当前访问标签页面数据
			if (item.path == this.$route.path) {
				this.$store.commit("tagNav/setCurrentTagNav", item);
			}
			return item.path === this.$route.path;
		},
		closeTheTag(item, index) {
			// 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
			// 如果没有前一个Tag，则加载默认页面
			this.$store.commit("tagNav/removeTagNav", item);
			if (this.$route.path == item.path) {
				// 去掉当前页面之后，还有已打开的tab页面时
				if (this.tagNavList.length != 0) {
					// 关闭的页面不为已打开页面的首个tab页面
					if (index != 0) {
						this.$router.push({ path: this.tagNavList[index - 1].path, query: this.tagNavList[index - 1].query });
					} else {
						// 关闭首个tab页面
						this.$router.push({ path: this.tagNavList[index].path, query: this.tagNavList[index].query });
					}
				} else {
					// 已经没有已打开的tab页面，默认打开首页
					this.$router.push(this.defaultPage);
				}
			}
			this.scrollToCurTag();
		},
		// 根据当前访问页面滚动到相应标签位置
		scrollToCurTag() {
			this.$nextTick(() => {
				for (let item of this.$refs.tag) {
					if (item.to.path === this.$route.path) {
						this.$refs.scrollBar.scrollToCurTag(item.$el);
						break;
					}
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.tag-nav-item {
}
.tag-nav {
	z-index: 2000;
	height: 42px;
	width: 100%;
	// background: #fafafa;
	background: lightgray;
	line-height: 40px;
	display: flex;
	.el-tabs {
		width: 94%;
		flex: 1;
	}
	.ss {
		width: 30px;
		background: #edf2f6;
		margin-right: 0;
		border-radius: 0px;
		border-right: 4px solid #ccd3d9;
		padding: 4px 10px;
		.icon-ss {
			height: 16px;
			width: 16px;
			&:hover {
				cursor: pointer;
			}
		}
	}
	.close {
		padding: 4px 0px;
		.icon-ss {
			height: 12px;
			width: 12px;
			&:hover {
				cursor: pointer;
			}
		}
	}

	.el-tabs--card > .el-tabs__header {
		background: #dee6ed;
	}
	.tag-nav-item {
		padding: 1px 10px;
		background: #edf2f6;
		margin-right: 5px;
		border-radius: 5px;
	}

	.tag-nav-item.is-active {
		background: #fff;
	}
	.el-icon-close {
		width: 15px;
		height: 15px;
		background: rgba(192, 198, 204, 0.6);
		border-radius: 50%;
		color: #edf2f6;
		&:hover {
			width: 15px;
			height: 15px;
			background: rgba(192, 198, 204, 1);
		}
	}
}
.info {
	position: absolute;
	right: 2px;
	top: 60px;
}
</style>
