<template>
	<div class="scroll-wrap" ref="scrollWrap" @wheel.prevent="scroll">
		<div class="scroll-cont" ref="scrollCont" :style="{ left: left + 'px' }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
/**
 * @description 多标签滚动组件
 * @author      sunsy
 * @createTime  2020/07/11
 */
export default {
	name: "ScrollBar",
	data() {
		return {
			// 滚动距离
			left: 0,
			// 滚动速度
			wheelSpeed: 30,
		};
	},
	created() {
		// 从缓存中获取当前left的值，避免页面刷新，不保持问题
		this.left = parseInt(sessionStorage.getItem("leftScroll"));
	},
	methods: {
		// 滚轮滚动定义标签位置
		scroll(e) {
			const scrollWrapWidth = this.$refs.scrollWrap.offsetWidth - this.$refs.scrollWrap.offsetWidth * 0.15;
			const scrollContWidth = this.$refs.scrollCont.offsetWidth;
			if (scrollContWidth > scrollWrapWidth) {
				// 统一不同浏览器下wheel事件的滚动值
				// chrome/FF/Edge/IE11/IE10/IE9
				// e.deltaY > 0 即鼠标滚轮向下滚动，则该条向右滚动，left值变负
				const scrollSpace = e.deltaY > 0 ? -1 * this.wheelSpeed : this.wheelSpeed;
				if (e.deltaY > 0) {
					if (Math.abs(this.left + scrollSpace) <= scrollContWidth - scrollWrapWidth) {
						this.left += scrollSpace;
						sessionStorage.setItem("leftScroll", this.left);
					}
				} else {
					if (this.left + scrollSpace < 0) {
						this.left += scrollSpace;
						sessionStorage.setItem("leftScroll", this.left);
					} else {
						this.left = 0;
						sessionStorage.setItem("leftScroll", this.left);
					}
				}
			} else {
				return;
			}
		},
		// 定位滚动到当前访问页面标签
		scrollToCurTag(tar) {
			const scrollWrapWidth = this.$refs.scrollWrap.offsetWidth - this.$refs.scrollWrap.offsetWidth * 0.15;
			const tarWidth = tar.offsetWidth;
			const tarLeft = tar.offsetLeft;
			if (tarLeft < -1 * this.left) {
				this.left = -tarLeft;
				sessionStorage.setItem("leftScroll", this.left);
			} else if (tarLeft + tarWidth > scrollWrapWidth) {
				this.left = -(tarLeft + tarWidth - scrollWrapWidth);
				sessionStorage.setItem("leftScroll", this.left);
			}
		},
	},
};
</script>
