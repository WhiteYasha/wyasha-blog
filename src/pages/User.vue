<template>
<el-container class="home-container">
    <el-header height="auto">
        <main-menu :showAvatar="false"></main-menu>
    </el-header>
    <el-main class="user-main">
        <el-card v-if="user" :body-style="{ padding: 0, display: 'flex', flexWrap: 'wrap' }">
            <el-image class="user-avatar" fit="cover" :src="user.avatar"></el-image>
            <div class="user-info">
                <h4>{{ user.name }}</h4>
                <i>{{ user.email }}</i>
                <p>{{ $t("message.signtime") }}:&nbsp;{{ $g.f(user.signTime, "yyyy/MM/dd") }}</p>
                <div class="flex-gap"></div>
                <div v-if="isMyself">
                    <el-button disabled type="text" size="small" icon="el-icon el-icon-setting">{{ $t("message.modify") }}</el-button>
                </div>
                <div v-if="user.email == 'white_yasha@163.com'">
                    <div id="identification"></div>
                    <i id="identification-content" class="el-icon el-icon-star-on"></i>
                </div>
            </div>
        </el-card>
        <el-card :body-style="{ padding: 0 }">
            <el-menu mode="horizontal" :default-active="menuIndex" router>
                <el-menu-item index="User" :route="{ name: 'User' }">{{ $t("message.comment") }}</el-menu-item>
                <el-menu-item index="UserReply" :route="{ name: 'UserReply' }" v-if="isMyself">{{ $t("message.reply") }}</el-menu-item>
            </el-menu>
            <div v-loading="contentLoading">
                <div v-for="reply in replies" :key="reply.rpid" class="user-content" @click="onClick_goToReply(reply)">
                    <article-comment :reply="reply" :readOnly="true"></article-comment>
                </div>
                <div id="nodata" v-show="replies.length == 0">
                    <h4>{{ $t("message.noComment") }}</h4>
                </div>
                <el-pagination layout="prev, pager, next" :current-page="page" :page-size="pageSize" :total="total" background small></el-pagination>
            </div>
        </el-card>
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

export default {
    components: {
        mainMenu,
        mainFooter,
        articleComment
    },
    watch: {
        $route: function () {
            this.initReplies();
        },
        isMyself: function() {
            
        }
    },
    data() {
        return {
            user: null,
            contentLoading: false,
            replies: [],
            pageSize: 10,
            total: 0
        }
    },
    computed: {
        page: function () {
            return isNaN(Number(this.$route.params.page)) ? 1 : Number(this.$route.params.page);
        },
        isMyself: function() {
            return this.user && this.$store.state.user && this.user._id == this.$store.state.user._id;
        },
        menuIndex: function() {
            return this.$store.state.isLoggedIn ? this.$route.name : "User";
        }
    },
    methods: {
        initUser: async function () {
            let params = {
                uid: this.$route.params.id
            };
            let userResponse = await this.$g.call("/user", "GET", params);
            if (!userResponse.data.error) {
                this.user = userResponse.data.result;
                this.initReplies();
            }
        },
        initReplies: async function () {
            this.contentLoading = true;
            let params = {
                uid: this.$route.params.id,
                page: this.page,
                pageSize: this.pageSize
            };
            var repliesResponse;
            if (this.menuIndex == "UserReply") {
                repliesResponse = await this.$g.call("/reply/tome", "GET", params);
                // this.$g.call("/reply/read", "GET", params);
            } else {
                repliesResponse = await this.$g.call("/reply/user", "GET", params);
            }
            if (!repliesResponse.data.error) {
                this.total = repliesResponse.data.result.total;
                this.replies = repliesResponse.data.result.replies;
                this.contentLoading = false;
            }
        },
        onClick_goToReply: function (reply) {
            if (reply.type == 0) {
                this.$router.push({
                    path: `/article/${reply.rid}#comments`
                });
            } else {
                this.$router.push({
                    name: "Blink"
                });
            }
        }
    },
    created() {
        this.initUser();
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$contentColor: #52555a;
$mutedColor: #a7abb3;
$unreadColor: rgba(#fff591, .2);

#identification-content,
#identification {
    position: absolute;
    right: 0;
    top: 0;
}

#identification {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-top: 20px solid $themeColor;
    border-right: 20px solid $themeColor;
}

#identification-content {
    font: 18px Impact;
    color: #fff;
    width: 21px;
    line-height: 20px;
}

.el-menu-item {
    height: 50px !important;
    line-height: 50px !important;
}

.home-container {
    width: 100%;
    padding-top: 30px;

    .user-main {
        padding-top: 0;
    }

    .el-card+.el-card {
        margin-top: 20px;
    }

    .el-card {
        .user-info {
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            padding: 10px;
            line-height: 2;
            text-align: left;
            position: relative;

            h4,
            p,
            i {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-weight: 400;
            }

            h4 {
                margin: 0;
                font-size: 18px;
                font-weight: 500;
                color: $themeColor;
            }

            i {
                color: $mutedColor;
                font-size: 12px;
            }

            p {
                margin: 0;
                font-size: 12px;
                color: $contentColor;
            }
        }

        .user-content {
            padding: 20px;
            cursor: pointer;
            transition: all .5s;
        }

        .user-content:hover {
            background: $unreadColor;
        }

        .el-pagination {
            margin: 10px 0;
        }
    }
}

@media screen and (max-width: 1000px) {
    .user-main {
        width: 100%;
    }

    .user-card {
        flex-wrap: wrap;
    }

    .user-avatar {
        width: 100%;
        height: 150px;
        flex: 0 0 100%;
    }

    .user-info {
        display: none;
        width: 100%;
        flex: 0 0 100%;
    }
}

@media screen and (min-width: 1000px) {
    .user-main {
        width: 80%;
        margin: 0 auto;
    }

    .user-avatar {
        width: 200px;
        height: 200px;
        flex: 0 0 200px;
    }

    .user-info {
        flex: 1;
        margin-left: 20px;
    }
}
</style>
