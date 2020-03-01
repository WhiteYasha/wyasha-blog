<template>
<div class="header-container">
    <el-badge is-dot :hidden="true">
        <el-avatar :size="40"></el-avatar>
    </el-badge>
    <div class="header-right">
        <el-dropdown>
            <span class="header-dropdown-link">
                {{ $i18n.locale == 'zh_cn' ? "中文" : ($i18n.locale == 'ja' ? '日本語' : 'English') }}
                <i class="el-icon el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh_cn" v-if="$i18n.locale != 'zh_cn'">中文</el-dropdown-item>
                <el-dropdown-item command="en" v-if="$i18n.locale != 'en'">English</el-dropdown-item>
                <el-dropdown-item command="ja" v-if="$i18n.locale != 'ja'">日本語</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" v-if="showMenu" :icon="`el-icon ${isShowMenu ? 'el-icon-close' : 'el-icon-menu'}`" @click="onClick_toggleShowMenu"></el-button>
    </div>
    <transition name="el-zoom-in-top">
        <ul class="header-menu" v-if="showMenu" v-show="isShowMenu">
            <li :class="$route.name == 'Home' ? 'active' : ''" @click="onClick_changeItem('Home')">首页</li>
            <li :class="$route.name == 'ArticleList' ? 'active' : ''" @click="onClick_changeItem('ArticleList')">文章</li>
            <li :class="$route.name == 'Category' ? 'active' : ''" @click="onClick_changeItem('Category')">相册</li>
            <li :class="$route.name == 'About' ? 'active' : ''" @click="onClick_changeItem('About')">关于</li>
        </ul>
    </transition>
</div>
</template>

<script>
export default {
    name: "mainMenu",
    props: {
        showMenu: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShowMenu: window.innerWidth < 1000 ? false : true
        }
    },
    methods: {
        onClick_toggleShowMenu: function () {
            if (this.isShowMenu) {
                this.isShowMenu = false;
            } else {
                this.isShowMenu = true;
            }
        },
        onClick_changeItem: function(routeName) {
            this.$router.push({
                name: routeName
            });
        }
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$mutedColor: #a7abb3;
$lightColor: #eaeaea;

.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-avatar {
        flex-basis: 40px;
    }

    .header-right {
        display: flex;
        align-items: center;

        .el-button {
            margin-left: 1em;
            font-size: 24px;
        }

        .header-dropdown-link {
            cursor: pointer;
        }
    }

    .header-menu {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        background: $titleColor;
        color: $lightColor;
        transition: opacity .5;
        border-radius: 3px;
        z-index: 5000;

        li {
            width: 1em;
            padding: 1em 1.5em;
            cursor: pointer;
            transition: background-color .3s;
        }

        li:hover {
            background: $mutedColor;
        }

        li.active {
            background: $themeColor;
        }
    }
}

@media screen and (min-width: 1000px) {
    .header-menu {
        position: fixed;
        top: 50px;
        right: 150px;
    }
}

@media screen and (max-width: 1000px) {
    .header-container {
        flex-wrap: wrap;

        .header-menu {
            width: 100%;
            flex-wrap: wrap;

            li {
                letter-spacing: .5em;
                flex: 0 0 50%;
                padding: 1em 0;
            }
        }
    }
}
</style>
