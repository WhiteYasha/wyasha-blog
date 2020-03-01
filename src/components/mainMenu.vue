<template>
<div class="header-container">
    <el-avatar :size="40"></el-avatar>
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
        <el-button type="text" :icon="`el-icon ${isShowMenu ? 'el-icon-close' : 'el-icon-menu'}`" @click="onClick_toggleShowMenu"></el-button>
    </div>
    <transition name="el-zoom-in-top">
        <ul class="header-menu" v-show="isShowMenu">
            <li class="active">首页</li>
            <li>主题</li>
            <li>相册</li>
            <li>关于</li>
        </ul>
    </transition>
</div>
</template>

<script>
export default {
    name: "mainMenu",
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
        position: absolute;
        top: 50px;
        right: 50px;
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
