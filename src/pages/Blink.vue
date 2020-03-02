<template>
<el-container class="home-container">
    <el-header :height="'auto'">
        <main-menu></main-menu>
    </el-header>
    <el-container>
        <el-main class="blink-main">
            <blink-item></blink-item>
            <blink-item></blink-item>
            <blink-item></blink-item>
        </el-main>
        <el-footer class="blink-pagination" :height="'auto'">
            <el-pagination id="pagination" layout="prev, pager, next, jumper" background :total="100"></el-pagination>
            <el-pagination id="pagination-small" layout="prev, pager, next" background small :total="100"></el-pagination>
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
