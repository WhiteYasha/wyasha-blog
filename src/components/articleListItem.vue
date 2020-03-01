<template>
<div class="list-item">
    <h1>ES6 generator</h1>
    <h4>JavaScript异步编程</h4>
    <p>从前现在过去了再不来,红红落叶长埋尘土内,开始终结总是没变改,天边的你飘泊白云外,苦海翻起爱恨,在世间难逃避命运...</p>
    <div class="list-item-footer">
        <router-link :to="{}">查看全文</router-link>
        <i>2020-02-30 03:21</i>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$themeColor: #C81912;
$titleColor: #18191b;
$contentColor: #52555a;
$mutedColor: #a7abb3;

.list-item {
    width: 100%;
    line-height: 1.5;
    margin-bottom: 75px;

    >*:not(:first-child) {
        margin-top: 10px;
    }

    h1,
    h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    h4,
    i {
        color: $mutedColor;
    }

    h1 {
        color: $titleColor;
        margin: 0;
        font-size: 24px;
        font-weight: 500;
    }

    h4 {
        font-weight: 400;
        margin: 0;
        font-size: 16px;
    }

    p {
        overflow: hidden;
        color: $contentColor;
        margin: 0;
        font-size: 14px;
    }

    .list-item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        a {
            color: $themeColor;
        }
    }
}

.list-item:before {
    content: "";
    width: 10%;
    height: 2px;
    margin-bottom: 30px;
    background: $titleColor;
    display: block;
}
</style>
