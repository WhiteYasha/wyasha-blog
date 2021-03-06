<template>
<div class="blink-item-container">
    <div class="blink-item-main" v-if="blink">
        <p class="blink-item-content" v-html="content"></p>
        <div class="blink-item-images" v-show="blink.image.length > 0">
            <el-image fit="cover" v-for="(img, i) in blink.image" :key="i" :src="img" :preview-src-list="blink.image"></el-image>
        </div>
        <div class="blink-item-info" v-if="blink.replies">
            <i>{{ $g.fromNow(blink.time, $i18n.locale) }}</i>
            <el-button type="text" size="mini" @click="onClick_toggleReply">{{ $t("message.comment") }}({{ blink.replies.length }})</el-button>
        </div>
    </div>
    <transition name="el-zoom-in-top">
        <div class="blink-item-reply" v-show="showReply" v-if="blink.replies">
            <article-comment v-for="reply in currentReplies" :key="reply._id" :reply="reply" :comment="onClick_comment"></article-comment>
            <div id="nodata" v-show="blink.replies.length == 0">
                <h4>{{ $t("message.noComment") }}</h4>
            </div>
            <el-pagination hide-on-single-page :total="blink.replies.length" :page-size="pageSize" layout="prev, pager, next" small @current-change="onChange_page"></el-pagination>
            <div class="blink-item-form">
                <el-input type="textarea" v-model="text" maxlength="140" :rows="2" :placeholder="placeholder"></el-input>
                <el-button type="primary" size="mini" @click="onClick_send" v-loading="commentLoading">{{ $t("message.send") }}</el-button>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import articleComment from './articleComment';

export default {
    components: {
        articleComment
    },
    props: {
        blink: Object
    },
    data() {
        return {
            showReply: false,
            text: "",
            replyUser: null,
            page: 1,
            pageSize: 5,
            commentLoading: false
        }
    },
    computed: {
        placeholder: function () {
            if (this.replyUser) return this.$t("message.replyto", {
                0: this.replyUser.name
            });
            else return "";
        },
        currentReplies: function () {
            let min = Math.max(0, (this.page - 1) * this.pageSize),
                max = Math.min(this.blink.replies.length, this.page * this.pageSize);
            return this.blink.replies.slice(min, max);
        },
        content: function () {
            return this.blink.content.replace(/\\n/g, "<br>");
        }
    },
    methods: {
        onClick_toggleReply: function () {
            this.showReply = !this.showReply;
        },
        onClick_comment: function (user) {
            if (this.replyUser && this.replyUser._id == user._id) {
                this.replyUser = null;
            } else {
                this.replyUser = user;
            }
        },
        onChange_page: function (page) {
            this.page = page;
        },
        onClick_send: async function () {
            if (this.$store.state.isLoggedIn && this.$store.state.user) {
                let params = {
                    rid: this.blink._id,
                    type: 1,
                    uid: this.$store.state.user._id,
                    to_uid: this.replyUser ? this.replyUser._id : null,
                    content: this.text
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
                        this.blink.replies = [reply].concat(this.blink.replies);
                        this.text = "";
                        this.$message.success(this.$t("message.commentSuccess"));
                    }
                    this.commentLoading = false;
                }
            } else {
                this.$message.error(this.$t("message.noLogin"));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$mutedColor: #a7abb3;
$grayColor: #f7f7f7;

.blink-item-container+.blink-item-container {
    margin-top: 10px;
}

.blink-item-container {
    width: 100%;

    .blink-item-main,
    .blink-item-reply {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;

    }

    .blink-item-main {
        border: 1px solid $grayColor;

        .blink-item-content {
            font-size: 14px;
            margin: 10px 0;
        }

        .blink-item-images {
            width: 100%;
            display: flex;
            margin-top: -10px;
            margin-bottom: 10px;

            .el-image {
                margin-top: 10px;
                height: 120px;
            }
        }

        .blink-item-info {
            display: flex;
            align-items: center;
            justify-content: space-between;

            i {
                color: $mutedColor;
                font-size: 12px;
            }
        }
    }

    .blink-item-reply {
        background: $grayColor;

        >*:not(:first-child) {
            margin-top: 10px;
        }

        .blink-item-form {
            display: flex;
            flex-direction: column;

            .el-button {
                margin-top: 10px;
                align-self: flex-end;
            }
        }
    }
}

@media screen and (min-width: 1000px) {
    .blink-item-images {
        overflow-x: scroll;

        .el-image {
            flex: 0 0 150px;
        }

        .el-image+.el-image {
            margin-left: 50px;
        }
    }
}

@media screen and (max-width: 1000px) {
    .blink-item-images {
        justify-content: space-between;
        flex-wrap: wrap;

        .el-image {
            flex: 0 0 33%;
        }
    }
}

@media screen and (max-width: 768px) {
    .blink-item-images .el-image {
        flex: 0 0 45%;
    }
}
</style>
