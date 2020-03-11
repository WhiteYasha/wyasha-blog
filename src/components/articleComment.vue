<template>
<div class="comment-container">
    <div class="comment-left">
        <el-avatar :size="32" :src="reply.user.avatar"></el-avatar>
    </div>
    <div class="comment-right">
        <div class="comment-right-header">
            <p :style="{ color: reply.user.email == 'white_yasha@163.com' ? '#C81912' : '' }">{{ reply.user.name }}</p>
            <p v-if="reply.replyUser">{{ $t("message.reply", {0: reply.replyUser.name}) }}</p>
            <div class="flex-gap"></div>
            <i>{{ $g.fromNow(reply.replyTime, $i18n.locale) }}</i>
        </div>
        <div class="comment-right-main" v-if="reply.content" v-html="replyContent"></div>
        <div class="comment-right-footer">
            <el-button type="text" size="mini" @click="onClick_comment">{{ $t("message.comment") }}</el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "articleComment",
    props: {
        reply: Object,
        comment: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        replyContent: function () {
            return this.reply.content.replace(/\\n/g, '<br>');
        }
    },
    methods: {
        onClick_comment: function () {
            this.comment(this.reply.user);
        }
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$grayColor: #aaa;
$mutedColor: #a7abb3;

.comment-container {
    width: 100%;
    display: flex;
    text-align: left;

    .comment-left {
        flex: 0 0 32px;
        margin-right: 12px;
    }

    .comment-right {
        display: flex;
        flex: 1;
        flex-direction: column;

        .comment-right-header {
            display: flex;
            width: calc(100% - 44px);
            align-items: center;

            p {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-anchor: hidden;
                color: $titleColor;
                margin: 0;
            }

            p+p {
                color: $mutedColor;
                margin-left: 1em;
                font-size: 12px;
                font-weight: 600;
            }

            i {
                font-size: 12px;
                color: $mutedColor;
            }
        }

        .comment-right-main {
            white-space: normal;
            word-break: break-all;
            font-size: 14px;
            line-height: 1.5;
            color: $contentColor;

            .comment-reply {
                color: $grayColor;
            }
        }
    }
}

@media screen and (min-width: 1000px) {
    .comment-right-header {
        height: 32px;
        line-height: 32px;
    }
}

@media screen and (max-width: 1000px) {
    .comment-right-header {
        flex-wrap: wrap;

        .flex-gap,
        i {
            flex: 0 0 100%;
            text-align: right;
        }
    }
}
</style>
