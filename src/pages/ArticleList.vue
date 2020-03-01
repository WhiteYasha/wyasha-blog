<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu></main-menu>
    </el-header>
    <el-container class="list-container">
        <el-container class="list-left-container">
            <el-main class="list-left-main" v-loading="loading">
                <!-- <article-list-item></article-list-item> -->
                <article-list-item v-for="i in 5" :key="i"></article-list-item>
            </el-main>
            <el-footer :height="'auto'" class="list-left-footer">
                <el-pagination id="pagination" :page-size="pageSize" :total="50" background layout="prev, pager, next, jumper"></el-pagination>
                <el-pagination id="pagination-small" :page-size="pageSize" :total="50" background small layout="prev, pager, next"></el-pagination>
            </el-footer>
        </el-container>
        <el-container class="list-right-container">
            <el-main class="list-right-main">
                <el-input suffix-icon="el-icon el-icon-search"></el-input>
                <el-card shadow="never" :body-style="{ padding: '10px' }">
                    <h4>文章分类</h4>
                    <ol>
                        <li>
                            <router-link :to="{}">前端</router-link>
                        </li>
                        <li>
                            <router-link :to="{}">后端</router-link>
                        </li>
                        <li>
                            <router-link :to="{}">随笔</router-link>
                        </li>
                        <li>
                            <router-link :to="{}">算法</router-link>
                        </li>
                    </ol>
                </el-card>
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
    data() {
        return {
            loading: false,
            page: 1,
            pageSize: 10
        }
    }
}
</script>

<style lang="scss" scoped>
$titleColor: #18191b;

.home-container {
    width: 100%;
    height: 100%;
    padding-top: 30px;
}

.list-container {
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

                >*:not(:first-child) {
                    margin-top: 20px;
                }

                .el-card {
                    h4 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: 500;
                    }

                    ol {
                        margin: 10px 0;
                        line-height: 1.5;
                        font-size: 14px;

                        a {
                            color: $titleColor;
                        }
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

            .el-card {
                display: none;
            }
        }
    }
}
</style>
