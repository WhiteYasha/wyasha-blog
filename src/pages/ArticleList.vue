<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu></main-menu>
    </el-header>
    <el-container class="list-container">
        <el-container class="list-left-container">
            <el-main class="list-left-main" v-loading="loading">
                <article-list-item v-for="article in articles" :key="article.aid" :article="article"></article-list-item>
                <div id="nodata" v-show="articles.length == 0">
                    <h4>{{ $t("message.noArticle") }}</h4>
                </div>
            </el-main>
            <el-footer :height="'auto'" class="list-left-footer">
                <el-pagination id="pagination" :page-size="pageSize" :total="total" background layout="prev, pager, next, jumper"></el-pagination>
                <el-pagination id="pagination-small" :page-size="pageSize" :total="total" background small layout="prev, pager, next"></el-pagination>
            </el-footer>
        </el-container>
        <el-container class="list-right-container">
            <el-main class="list-right-main">
                <el-input clearable v-model="keyword">
                    <i slot="prefix" class="el-input__icon el-icon el-icon-search" @click="onClick_searchArticles"></i>
                </el-input>
            </el-main>
        </el-container>
    </el-container>
    <el-footer :height="'auto'">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';
import articleListItem from './../components/articleListItem';

export default {
    name: "ArticleList",
    components: {
        mainMenu,
        mainFooter,
        articleListItem
    },
    watch: {
        $route: function () {
            this.keyword = this.$route.query.keyword || "";
            this.initArticles();
        }
    },
    data() {
        return {
            loading: true,
            articles: [],
            total: 0,
            pageSize: 10,
            keyword: this.$route.query.keyword || ""
        }
    },
    computed: {
        page: function () {
            return isNaN(Number(this.$route.query.page)) ? 1 : Number(this.$route.query.page);
        }
    },
    methods: {
        initArticles: async function () {
            this.loading = true;
            let params = {
                keyword: this.keyword,
                page: this.page,
                pageSize: this.pageSize
            };
            let articlesResponse = await this.$g.call("/article", "GET", params);
            if (articlesResponse.data.error) {
                this.$message({
                    type: 'danger',
                    message: `${ articlesResponse.data.errorMsg }`
                });
            } else {
                this.total = articlesResponse.data.result.total;
                this.articles = articlesResponse.data.result.articles;
                this.loading = false;
            }
        },
        onClick_searchArticles: function () {
            this.$router.push({
                query: {
                    keyword: this.keyword
                }
            });
        }
        // handleKeyword: function(keyword) {
        //     return keyword.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/on/g, "on_");
        // }
    },
    created() {
        this.initArticles();
    }
}
</script>

<style lang="scss" scoped>
$titleColor: #18191b;

.home-container {
    width: 100%;
    min-height: 100%;
    padding-top: 30px;
}

.list-container {
    width: 100%;
    height: 100%;
    text-align: left;

    .list-left-footer {
        padding: 10px 0;
    }
}

#pagination,
#pagination-small {
    display: none;
}

@media screen and (min-width: 1000px) {
    #pagination {
        display: block;
    }

    .list-container {
        width: 80%;
        margin: 0 auto;

        .list-left-container {
            flex-basis: 75%;
        }

        .list-right-container {
            flex-basis: 25%;

            .list-right-main {
                padding: 0;
                padding-top: 50px;

                i.el-icon {
                    cursor: pointer;
                }

                >*:not(:first-child) {
                    margin-top: 20px;
                }

                .el-card {
                    h4 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: 500;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    #pagination-small {
        display: block;
    }

    .list-container {
        flex-wrap: wrap;

        .list-left-container,
        .list-right-container {
            flex-basis: 100%;
        }

        .list-left-container {
            order: 2;

            .list-left-footer {
                text-align: center;
            }
        }

        .list-right-container {
            order: 1;
            height: 100%;

            .list-right-main {
                padding-bottom: 0;
            }

            .el-card {
                display: none;
            }
        }
    }
}
</style>
