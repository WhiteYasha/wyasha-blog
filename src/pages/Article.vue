<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu :showMenu="false"></main-menu>
    </el-header>
    <el-main class="article-main" v-if="article">
        <el-page-header :title="$t('message.back')" @back="onClick_back"></el-page-header>
        <div v-loading="articleLoading">
            <h1 class="article-title">{{ article.title }}</h1>
            <el-row class="article-info" type="flex" align="middle" justify="space-between">
                <el-col class="article-info-subTitle" :span="16" :xs="24">
                    <h4 v-if="article.subTitle">{{ article.subTitle }}</h4>
                </el-col>
                <el-col class="article-info-detail" :span="8" :xs="24">
                    <span>{{ $moment(article.time).format("YYYY/MM/DD hh:mm:ss") }}</span>
                </el-col>
            </el-row>
            <div class="article-content" v-html="article.content"></div>
        </div>
        <el-divider content-position="left">{{ $t("message.totalComment", {0: total}) }}</el-divider>
        <div v-loading="commentLoading">
            <el-card shadow="never" v-for="reply in replies" :key="reply._id">
                <article-comment :reply="reply"></article-comment>
            </el-card>
        </div>
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" background small></el-pagination>
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
            article: null,
            replies: [],
            articleLoading: true,
            commentLoading: true,
            page: 1,
            pageSize: 5,
            total: 0
        };
    },
    methods: {
        onClick_back: function () {
            this.$router.push({
                name: "ArticleList"
            });
        },
        initArticle: async function () {
            let params = {
                aid: this.$route.params.id
            };
            let articleResponse = await this.$g.call("/article/get", "GET", params);
            if (articleResponse.data.error) {
                this.$message({
                    type: 'danger',
                    message: `${ articlesResponse.data.errorMsg }`
                });
            } else {
                this.article = articleResponse.data.result;
                this.articleLoading = false;
            }
        },
        initReplies: async function () {
            let params = {
                aid: this.$route.params.id,
                page: this.page,
                pageSize: this.pageSize
            };
            let repliesResponse = await this.$g.call("/reply/article", 'GET', params);
            if (repliesResponse.data.error) {
                this.$message({
                    type: 'danger',
                    message: `${ articlesResponse.data.errorMsg }`
                });
            } else {
                this.replies = repliesResponse.data.result.replies;
                this.total = repliesResponse.data.result.total;
                this.commentLoading = false;
            }
        }
    },
    created() {
        this.initArticle();
        this.initReplies();
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

        .el-pagination {
            margin-top: 20px;
        }
    }
}

.el-card+.el-card {
    margin-top: 20px;
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
