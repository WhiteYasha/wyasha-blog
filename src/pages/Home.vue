<template>
<el-container class="home-container">
    <el-container class="home-left">
        <el-header :height="'auto'">
            <main-menu></main-menu>
        </el-header>
        <el-main class="home-main-container">
            <div class="home-left-content">
                <h1>WYASHA的个人博客</h1>
                <p>Now is better than never.</p>
                <el-button type="primary">Start</el-button>
            </div>
        </el-main>
        <el-footer :height="'auto'">
            <main-footer></main-footer>
        </el-footer>
    </el-container>
    <el-container class="home-right">
        <el-main class="home-main-container">
            <div class="right-cover-container">
                <el-image fit="cover" class="home-right-cover" :class="coverIndex == 0 ? 'active' : ''" src="/image/cover.jpg"></el-image>
                <el-image fit="cover" class="home-right-cover" :class="coverIndex == 1 ? 'active' : ''" src="/image/cover2.jpg"></el-image>
                <el-image fit="cover" class="home-right-cover" :class="coverIndex == 2 ? 'active' : ''" src="/image/cover3.jpg"></el-image>
            </div>
            <el-button id="prev" circle icon="el-icon el-icon-back" @click="onClick_prevCover"></el-button>
            <el-button id="next" circle icon="el-icon el-icon-right" @click="onClick_nextCover"></el-button>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';

export default {
    name: "Home",
    components: {
        mainMenu,
        mainFooter
    },
    data() {
        return {
            coverIndex: 0
        }
    },
    methods: {
        onClick_nextCover: function () {
            this.coverIndex = (this.coverIndex + 1) % 3;
        },
        onClick_prevCover: function () {
            this.coverIndex = this.coverIndex - 1 < 0 ? 2 : this.coverIndex - 1;
        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    padding-top: 30px;

    .home-main-container {
        position: relative;
    }

    .home-left,
    .home-right {
        height: 100%;
    }

    .home-left {
        .home-left-content {
            width: 80%;
            text-align: left;
            position: absolute;
            top: 40%;
            left: 10%;

            h1,
            p {
                font-size: 1.5em;
                margin: 0;
                line-height: 2;
            }

            .el-button {
                float: right;
            }
        }

        .home-left-content:after {
            content: "";
            display: block;
            clear: both;
        }
    }

    .home-right {
        flex: 0 0 40%;

        .home-main-container {
            height: 100%;
            padding: 0 10px;
            text-align: left;

            .right-cover-container {
                width: 60%;
                height: 100%;
                position: relative;
                overflow: hidden;

                .el-image {
                    position: absolute;
                    opacity: 0;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: opacity 1s;
                }

                .el-image.active {
                    opacity: 1;
                }
            }

            #prev,
            #next {
                position: absolute;
                bottom: 20%;
                transition: background-color .3s;
            }

            #prev {
                left: calc(60% - 60px);
            }

            #next {
                left: calc(60% + 20px);
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .home-right {
        display: none;
    }
}
</style>
