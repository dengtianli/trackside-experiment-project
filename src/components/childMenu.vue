<template class="menu-tree">
	<div>
		<template v-for="(list, index) in dataList">
			<el-submenu
				:index="list.path"
				v-if="list.children && list.children.length > 0"
				:disabled="list.openModel == 'disable'"
				:key="'sub' + index"
			>
				<template slot="title">
					<img v-if="list.imgPath" :src="require('@/assets/svg/' + list.imgPath)" class="icon-img" alt="" />
					<span>{{ list.label }}</span>
				</template>
				<child-menu :dataList="list.children"></child-menu>
			</el-submenu>
			<el-menu-item v-else :index="list.path" :disabled="list.openModel == 'disable'" :key="'sub' + index">
				<img v-if="list.imgPath" :src="require('@/assets/svg/' + list.imgPath)" class="icon-img" alt="" />
				<span slot="title">{{ list.label }}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
export default {
	name: "childMenu",
	props: ["dataList"],
};
</script>
