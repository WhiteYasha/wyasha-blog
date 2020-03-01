<template>
<el-container class="home-container">
    <el-main class=content-container>
        <div class="content">
            <h1>404</h1>
            <h4>OH NO.GOT LOST</h4>
            <p>Page does not exist. Plearse make sure that you visit the page presence.</p>
            <div class="content-reload">
                <i class="el-icon el-icon-refresh-right" @click="onClick_reload"></i>
                Reload
            </div>
        </div>
    </el-main>
    <el-footer :height="'auto'">
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
        onClick_reload: function () {
            window.location.reload();
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

    .content-container {
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
