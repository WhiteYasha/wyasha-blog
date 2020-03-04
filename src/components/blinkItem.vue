<template>
<div class="blink-item-container">
    <div class="blink-item-main">
        <p class="blink-item-content">
            还有1个月我们就要和2019告别了，回顾2019，有没有什么事情对你来说是难忘的，有意义的，甚至是你2019生活的转折呢？
        </p>
        <div class="blink-item-images" v-show="image.length > 0">
            <el-image v-for="(img, i) in image" :key="i" :src="img" :preview-src-list="image"></el-image>
        </div>
        <div class="blink-item-info">
            <i>2020-03-02 12:31:23</i>
            <el-button type="text" size="mini" @click="onClick_toggleReply">回复(3)</el-button>
        </div>
    </div>
    <transition name="el-zoom-in-top">
        <div class="blink-item-reply" v-show="showReply">
            <article-comment></article-comment>
            <el-pagination :total="3" layout="prev, pager, next" small></el-pagination>
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
        image: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            showReply: false
        }
    },
    methods: {
        onClick_toggleReply: function () {
            this.showReply = !this.showReply;
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
            flex: 0 0 45%;
        }
    }
}
</style>
