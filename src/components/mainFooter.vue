<template>
<el-row class="footer-container">
    <el-col class="footer-copyright" :span="12" :xs="24">
        <p>Copyright ©2019 Created by Wyasha</p>
        <p>ICP证:&nbsp;<router-link :to="{}">浙ICP备19013245号</router-link>
        </p>
    </el-col>
    <el-col class="footer-contact" :span="12" :xs="24">
        <i class="el-icon el-icon-platform-eleme"></i>
        <i class="el-icon el-icon-platform-eleme"></i>
        <i class="el-icon el-icon-platform-eleme"></i>
    </el-col>
</el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$mutedColor: #a7abb3;

.footer-container {
    width: 100%;
    height: 100%;
    padding: 1em 0;
    border-top: 1px solid $mutedColor;

    .footer-copyright {
        font-size: 12px;
        color: $mutedColor;
        text-align: left;

        p {
            margin: 0;
            line-height: 30px;

            a {
                color: $contentColor;
            }
        }
    }

    .footer-contact {
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 24px;

        .el-icon+.el-icon {
            margin-left: .5em;
        }
    }
}

@media screen and (max-width: 1000px) {
    .footer-container {
        border-top: .5px solid $mutedColor;
    }
}
</style>
