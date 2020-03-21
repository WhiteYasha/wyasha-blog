<template>
<el-container class="home-container">
    <el-header height="auto">
        <main-menu :showMenu="false"></main-menu>
    </el-header>
    <el-main class="article-main">
        <el-page-header :title="$t('message.back')" @back="onClick_back"></el-page-header>
        <div v-if="article">
            <h1 class="article-title">{{ article.title }}</h1>
            <el-row class="article-info" type="flex" align="middle" justify="space-between">
                <el-col class="article-info-subTitle" :span="16" :xs="24">
                    <h4 v-if="article.subTitle">{{ article.subTitle }}</h4>
                </el-col>
                <el-col class="article-info-detail" :span="8" :xs="24">
                    <span>{{ $g.f(article.time, "yyyy/MM/dd HH:mm:ss") }}</span>
                </el-col>
            </el-row>
            <rich-text :text="article.content"></rich-text>
        </div>
        <div id="placeholder" v-else v-loading="true"></div>
        <el-divider content-position="left">{{ $t("message.totalComment", {0: total}) }}</el-divider>
        <div id="comments" v-loading="commentLoading">
            <el-card shadow="never" v-for="reply in replies" :key="reply._id">
                <article-comment :reply="reply" :comment="onClick_comment"></article-comment>
            </el-card>
            <div id="nodata" v-show="replies.length == 0">
                <h4>{{ $t("message.noComment") }}</h4>
            </div>
        </div>
        <el-pagination hide-on-single-page layout="prev, pager, next" :current-page="page" :page-size="pageSize" :total="total" background small @current-change="onChange_page"></el-pagination>
        <el-divider content-position="right">
            <el-button type="text" @click="onClick_comment(null)">{{ $t("message.comment") }}</el-button>
        </el-divider>
        <el-input type="textarea" :rows="3" maxlength="140" v-model="commentText" :placeholder="placeholder"></el-input>
        <div :style="{ marginTop: '10px', textAlign: 'right' }">
            <el-button type="success" size="small" @click="onClick_send">{{ $t("message.send") }}</el-button>
            <el-button type="info" size="small" @click="onClick_clear">{{ $t("message.clear") }}</el-button>
        </div>
    </el-main>
    <el-footer height="auto">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';
import articleComment from './../components/articleComment';
import richText from './../components/richText';

export default {
    components: {
        mainMenu,
        mainFooter,
        articleComment,
        richText
    },
    data() {
        return {
            article: null,
            context: "",
            replies: [],
            commentLoading: true,
            pageSize: 5,
            total: 0,
            commentText: "",
            replyUser: null
        };
    },
    watch: {
        page: function () {
            this.initReplies();
        }
    },
    computed: {
        page: function () {
            return isNaN(Number(this.$route.query.page)) ? 1 : Number(this.$route.query.page);
        },
        placeholder: function () {
            if (this.replyUser) return this.$t("message.replyto", {
                0: this.replyUser.name
            });
            else return "";
        }
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
            if (!articleResponse.data.error) {
                this.article = articleResponse.data.result;
                this.articleLoading = false;
                this.initReplies();
            }
        },
        initReplies: async function () {
            let params = {
                aid: this.$route.params.id,
                page: this.page,
                pageSize: this.pageSize
            };
            let repliesResponse = await this.$g.call("/reply/article", 'GET', params);
            if (!repliesResponse.data.error) {
                this.replies = repliesResponse.data.result.replies;
                this.total = repliesResponse.data.result.total;
                this.commentLoading = false;
            }
        },
        onClick_comment: function (user) {
            this.replyUser = user;
        },
        onClick_clear: function () {
            this.replyUser = "";
        },
        onChange_page: function (page) {
            let path = this.$route.path.indexOf("#comments") > -1 ? this.$route.path : this.$route.path + "#comments";
            this.$router.push({
                path: path,
                query: {
                    page: page
                }
            });
        },
        onClick_send: async function () {
            if (this.$store.state.isLoggedIn && this.$store.state.user) {
                let params = {
                    rid: this.$route.params.id,
                    type: 0,
                    uid: this.$store.state.user._id,
                    to_uid: this.replyUser ? this.replyUser._id : null,
                    content: this.replyUser
                };
                if (params.content.length > 140) {
                    this.$message.success(this.$t("form.lengthContent"));
                } else if (!params.content || params.content == "") {
                    this.$message.error(this.$t("form.requireComment"));
                } else {
                    this.commentLoading = true;
                    let response = await this.$g.call("/reply/add", "GET", params);
                    if (!response.data.error) {
                        let reply = Object.assign({}, response.data.result, {
                            user: this.$store.state.user,
                            replyUser: this.replyUser
                        });
                        this.total++;
                        this.replies = [reply].concat(this.replies);
                        this.onClick_clear();
                        this.$message.success(this.$t("message.commentSuccess"));
                    }
                    this.commentLoading = false;
                }
            } else {
                this.$message.error(this.$t("message.noLogin"));
            }
        }
    },
    created() {
        this.initArticle();
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$mutedColor: #a7abb3;

#placeholder {
    height: 300px;
}

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
            }

            .article-info-detail {
                font-size: 12px;
                text-align: right;
            }
        }

        .el-pagination {
            margin-top: 20px;
        }
    }
}

.el-card+.el-card {
    margin-top: 20px;
}

.dialog-info {
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: 10px;

    .el-avatar {
        flex: 0 0 32px;
    }

    p {
        margin: 0;
        margin-left: .5em;
        line-height: 32px;
        height: 32px;
        font-weight: 500;
    }
}

@media screen and (min-width: 1000px) {
    .article-main {
        width: 80%;
        margin: 0 auto;

        h1.article-title,
        .article-info-subTitle {
            text-align: left;

            h4 {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
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
