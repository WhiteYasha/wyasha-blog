<template>
<div class="list-item">
    <h1>{{ article.title }}</h1>
    <h4 v-show="article.subTitle">{{ article.subTitle }}</h4>
    <p v-show="article.summary">{{ article.summary }}</p>
    <div class="list-item-footer">
        <router-link :to="{ name: 'Article', params: { id: article._id } }">{{ $t("message.showAll") }}</router-link>
        <i>{{ $moment(article.replyTime).format("YYYY/MM/DD hh:mm:ss") }}</i>
    </div>
</div>
</template>

<script>
export default {
    props: {
        article: Object
    }
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
