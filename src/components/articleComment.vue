<template>
<el-card class="comment-container" shadow="never" :body-style="{ padding: '10px 1em', display: 'flex' }">
    <div class="comment-left">
        <el-avatar :size="32"></el-avatar>
    </div>
    <div class="comment-right">
        <div class="comment-right-header">
            <p>{{ reply.user.name }}</p>
            <p v-if="reply.replyUser">回复&nbsp;{{ reply.replyUser.name }}</p>
            <div class="flex-gap"></div>
            <i>{{ $moment(reply.replyTime).fromNow() }}</i>
        </div>
        <div class="comment-right-main" v-if="reply.content" v-html="replyConetnt"></div>
        <div class="comment-right-footer">
            <el-button type="text" size="mini">评论</el-button>
        </div>
    </div>
</el-card>
</template>

<script>
export default {
    name: "articleComment",
    props: {
        reply: Object,
    },
    computed: {
        replyConetnt: function () {
            return this.reply.content.replace(/\n/g, "<br>");
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

.comment-container+.comment-container {
    margin-top: 20px;
}

.comment-container {
    width: 100%;
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
            height: 32px;
            line-height: 32px;
            display: flex;
            align-items: center;

            p {
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
</style>
