<template>
<div class="header-container">
    <el-badge is-dot :hidden="!$store.isUnread">
        <el-avatar v-if="showAvatar" :size="40" :src="avatar" @click.native="onClick_showUser"></el-avatar>
    </el-badge>
    <div class="header-right">
        <el-dropdown @command="onClick_changeLocale">
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
            <li :class="$route.name == 'Home' ? 'active' : ''" @click="onClick_changeItem('Home')">{{ $t("message.home") }}</li>
            <li :class="$route.name == 'ArticleList' ? 'active' : ''" @click="onClick_changeItem('ArticleList')">{{ $t("message.article") }}</li>
            <li :class="$route.name == 'Blink' ? 'active' : ''" @click="onClick_changeItem('Blink')">{{ $t("message.blink") }}</li>
            <li :class="$route.name == 'About' ? 'active' : ''" @click="onClick_changeItem('About')">{{ $t("message.about") }}</li>
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
        },
        showAvatar: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShowMenu: window.innerWidth < 1000 ? false : true
        }
    },
    computed: {
        avatar: function () {
            return this.$store.state.isLoggedIn ? this.$store.state.user.avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
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
        onClick_changeItem: function (routeName) {
            this.$router.push({
                name: routeName
            });
        },
        onClick_showUser: function () {
            if (!this.$store.state.isLoggedIn) {
                this.$router.push({
                    name: "Login"
                });
            } else {

            }
        },
        onClick_changeLocale: function (command) {
            localStorage.setItem("lang", command);
            this.$i18n.locale = command;
            this.$moment.locale(command);
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
        cursor: pointer;
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
        z-index: 5;

        li {
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
        top: 70px;
        right: 100px;
    }
}

@media screen and (max-width: 1000px) {
    .header-container {
        flex-wrap: wrap;
        position: relative;

        .header-menu {
            width: 100%;
            position: absolute;
            top: 100%;
            flex-wrap: wrap;

            li {
                flex: 0 0 50%;
                padding: 1em 0;
            }
        }
    }
}
</style>
