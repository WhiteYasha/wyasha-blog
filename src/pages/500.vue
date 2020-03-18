<template>
<el-container class="home-container">
    <el-header height="auto">
        <el-dropdown @command="onClick_changeLocale">
            <span class="header-dropdown-link">
                {{ $i18n.locale == 'zh_cn' ? "中文" : ($i18n.locale == 'ja' ? '日本語' : 'English') }}
                <i class="el-icon el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh_cn">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="ja">日本語</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <el-main class=content-main>
        <div class="content">
            <h1>500</h1>
            <h4>{{ $t("errorTitle") }}</h4>
            <p>{{ $t("errorContent") }}</p>
            <div class="content-reload">
                <i class="el-icon el-icon-s-home" @click="onClick_gotoHome"></i>
                Home
            </div>
        </div>
    </el-main>
    <el-footer height="auto">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainFooter from './../components/mainFooter';

export default {
    components: {
        mainFooter
    },
    methods: {
        onClick_gotoHome: function () {
            this.$router.push({
                name: "Home"
            });
        },
        onClick_changeLocale: function (command) {
            localStorage.setItem("lang", command);
            this.$i18n.locale = command;
            // this.$moment.locale(command);
        }
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$mutedColor: #a7abb3;

.home-container {
    width: 100%;
    height: 100%;
    padding-top: 30px;

    .el-header {
        text-align: right;

        .header-dropdown-link {
            cursor: pointer;
        }
    }

    .content-main {
        width: 100%;
        padding: 0;
        position: relative;

        .content {
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            position: absolute;
            top: 30%;

            h1 {
                color: $themeColor;
            }

            h4 {
                color: $contentColor;
            }

            p {
                color: $mutedColor;
            }

            .content-reload {
                display: flex;
                flex-direction: column;
                color: $contentColor;

                .el-icon {
                    font-size: 24px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
