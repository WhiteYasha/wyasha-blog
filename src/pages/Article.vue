<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu :showMenu="false"></main-menu>
    </el-header>
    <el-main class="article-main">
        <el-page-header @back="onClick_back"></el-page-header>
        <div v-loading="articleLoading">
            <h1 class="article-title">ES6 Generator</h1>
            <el-row class="article-info" type="flex" align="middle" justify="space-between">
                <el-col class="article-info-subTitle" :span="16" :xs="24">
                    <h4>JavaScript异步编程</h4>
                </el-col>
                <el-col class="article-info-detail" :span="8" :xs="24">
                    <span>2020-03-01 19:21</span>
                </el-col>
            </el-row>
            <div class="article-content">123412312</div>
        </div>
        <el-divider content-position="left">共21条评论</el-divider>
        <div v-loading="commentLoading">
            <el-card class="article-comment-card" shadow="never" :body-style="{ padding: '10px 20px' }">
                <article-comment>
                    <article-comment>
                        <article-comment>
                            <article-comment></article-comment>
                        </article-comment>
                    </article-comment>
                </article-comment>
            </el-card>
            <el-card class="article-comment-card" shadow="never" :body-style="{ padding: '10px 20px' }">
                <article-comment></article-comment>
            </el-card>
        </div>
        <el-pagination layout="prev, pager, next" :total="12" background small></el-pagination>
    </el-main>
    <el-footer :height="'auto'">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';
import articleComment from './../components/articleComment';

export default {
    components: {
        mainMenu,
        mainFooter,
        articleComment
    },
    data() {
        return {
            articleLoading: true,
            commentLoading: true
        };
    },
    methods: {
        onClick_back: function () {
            this.$router.push({
                name: "ArticleList"
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

.home-container {
    width: 100%;
    height: auto;
    margin-top: 30px;

    .article-main {
        h1.article-title {
            margin: 10px 0;
            font-size: 32px;
            font-weight: 500;
            color: $titleColor;
        }

        .article-info {
            color: $mutedColor;

            .article-info-subTitle h4 {
                margin: 0;
                font-weight: 400;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .article-info-detail {
                font-size: 12px;
                text-align: right;
            }
        }

        .article-content {
            margin: 10px 0;
            text-align: left;
        }

        .el-pagination,
        .article-comment-card+.article-comment-card {
            margin-top: 20px;
        }
    }
}

@media screen and (min-width: 1000px) {
    .article-main {
        width: 80%;
        margin: 0 auto;

        h1.article-title,
        .article-info-subTitle {
            text-align: left;
        }
    }
}

@media screen and (max-width: 1000px) {
    .article-main {
        width: 100%;

        .article-info {
            flex-wrap: wrap;

            .article-info-subTitle {
                text-align: center;
            }
        }
    }
}
</style>
