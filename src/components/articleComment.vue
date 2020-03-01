<template>
<div class="comment-container">
    <div class="comment-main">
        <div class="comment-left" v-if="size == 'normal'">
            <el-avatar :size="32"></el-avatar>
        </div>
        <div class="comment-right">
            <div class="comment-right-header">
                <p>Wyasha</p>
                <i>2秒前</i>
            </div>
            <div class="comment-right-main">
                1231231231123123123112312312311231231231<br>
                1231231412
            </div>
            <div class="comment-right-footer">
                <el-button type="text" size="mini">回复</el-button>
            </div>
        </div>
    </div>
    <div class="comment-reply">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: "articleComment",
    props: {
        size: {
            type: String,
            default: "normal"
        }
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$mutedColor: #a7abb3;

.comment-container {
    width: 100%;
}

.comment-reply {
    margin-left: 2em;
}

.comment-main {
    width: 100%;
    padding: 10px 0;
    text-align: left;
    display: flex;

    .comment-left {
        flex: 0 0 32px;
        margin-right: 12px;
    }

    .comment-right {
        display: flex;
        flex-direction: column;

        .comment-right-header {
            height: 32px;
            line-height: 32px;

            * {
                vertical-align: middle;
                display: inline-block;
            }

            p {
                margin: 0;
            }

            i {
                font-size: 12px;
                color: $mutedColor;
                margin-left: 2em;
            }
        }

        .comment-right-main {
            white-space: normal;
            word-break: break-all;
            font-size: 14px;
            line-height: 1.5;
        }
    }
}
</style>
