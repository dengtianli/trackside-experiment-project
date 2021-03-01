/* eslint-disable vue/return-in-computed-property */
<template>
    <div class="side-nav" :class="layout">
        <el-menu router ref="navbar" :default-active="defActive" :mode="navMode" :collapse="tem_Collapse"
                v-for="(item, n) in menuList" :key="n" class="el-menu-vertical" :default-openeds="defaultOpeneds">
            <el-submenu v-if="item.children && item.children.length !==0 " :index="item.path">
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </template>
                <el-menu-item v-for="(subItem,m) in item.children" :index="subItem.path" :route="{path: subItem.path}" :key="m" v-show="subItem.type == 0 ">
                    <i v-if="subItem.icon" :class="subItem.icon"></i>
                    {{ subItem.name }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :route="{path: item.path}" v-show="item.type == 0">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
/**
 - @description 左侧菜单展示组件
 - @author      sunsy
 - @createTime  2020/07/11
 */
import { mapState } from 'vuex'
export default {
    name: "NavBar",
    data() {
        return {
            // 菜单列表数组
            navList: [],
            // 菜单是否折叠
            tem_Collapse: false,
            // 默认展开的菜单栏数组
            defaultOpeneds: [],
        }
    },
    props: {
        layout: {
            type: String,
            default: 'left'
        },
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        ...mapState({
            menuList: state => state.auth.navList
        }),
        defActive(){
            return this.$route.path
        },
        // eslint-disable-next-line vue/return-in-computed-property
        navMode(){
            if(this.layout == "left"){
                return "vertical"
            } else if(this.layout == "left1"){
                return "vertical"
            } else if(this.layout == "top"){
                return "horizontal"
            }
        },
    },
    watch: {
        isCollapse(newVal,oldVal){
            if(newVal != oldVal) {
                this.tem_Collapse = newVal;
            }
        },
    },
}
</script>
