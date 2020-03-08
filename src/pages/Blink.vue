<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu></main-menu>
    </el-header>
    <el-container>
        <el-main class="blink-main">
            <div v-loading="blinkLoading">
                <blink-item v-for="blink in blinks" :key="blink._id" :blink="blink"></blink-item>
            </div>
            <div id="nodata" v-show="blinks.length == 0">
                <h1>{{ $t("message.noBlink") }}</h1>
            </div>
        </el-main>
        <el-footer class="blink-pagination" :height="'auto'">
            <el-pagination id="pagination" layout="prev, pager, next, jumper" background :total="total" :page-size="pageSize"></el-pagination>
            <el-pagination id="pagination-small" layout="prev, pager, next" background small :total="total" :page-size="pageSize"></el-pagination>
        </el-footer>
    </el-container>
    <el-footer :height="'auto'">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';
import blinkItem from './../components/blinkItem';

export default {
    name: "Blink",
    components: {
        mainFooter,
        mainMenu,
        blinkItem
    },
    data() {
        return {
            blinkLoading: true,
            pageSize: 10,
            total: 0,
            blinks: []
        }
    },
    computed: {
        page: function () {
            return isNaN(Number(this.$route.query.page)) ? 1 : Number(this.$route.query.page);
        }
    },
    methods: {
        initBlinks: async function () {
            let params = {
                page: this.page,
                pageSize: this.pageSize
            };
            let blinksResponse = await this.$g.call("/blink", "GET", params);
            if (blinksResponse.data.error) {
                this.$message({
                    type: 'danger',
                    message: `${ articlesResponse.data.errorMsg }`
                });
            } else {
                this.total = blinksResponse.data.result.total;
                let blinks = [];
                for (var i = 0; i < blinksResponse.data.result.blinks.length; i++) {
                    let params = {
                        bid: blinksResponse.data.result.blinks[i]._id
                    };
                    let repliesResponse = await this.$g.call("/reply/blink", "GET", params);
                    blinks.push(Object.assign(blinksResponse.data.result.blinks[i], {
                        replies: repliesResponse.data.result
                    }));
                }
                this.blinks = blinks;
                this.blinkLoading = false;
            }
        }
    },
    created() {
        this.initBlinks();
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    min-height: 100%;
    padding-top: 30px;
}

.blink-main {
    text-align: left;
    padding: 0;
    margin: 0 auto;
}

.blink-pagination {
    text-align: center;
    padding: 20px 0;
}

#pagination,
#pagination-small {
    display: none;
}

@media screen and (min-width: 1000px) {
    .blink-main {
        width: 70%;
    }

    #pagination {
        display: block;
    }
}

@media screen and (max-width: 1000px) {
    .blink-main {
        width: 90%;
    }

    #pagination-small {
        display: block;
    }
}
</style>
