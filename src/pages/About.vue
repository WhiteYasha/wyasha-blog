<template>
<el-container class="about-container">
    <el-header :height="'auto'">
        <main-menu></main-menu>
    </el-header>
    <el-container class="about-father-container">
        <el-container class="about-cover-container">
            <el-main class="about-cover-main">
                <el-image class="about-cover" src="/image/cover.jpg" fit="cover"></el-image>
            </el-main>
        </el-container>
        <el-container class="about-content-container">
            <el-main class="about-content-main">
                <h1>WYASHA</h1>
                <p>家乡浙江金华，杭州师范大学软件工程系大三在读学生，主攻前端方向。宅，平时比较喜欢听摇滚乐、玩拼装模型，偶尔也会运动一下打打篮球。最喜欢的作品是机动战士高达系列，最喜欢的乐队是Ramones。</p>
                <el-divider></el-divider>
                <h4>技能栈</h4>
                <ul>
                    <li>熟悉HTML5/CSS3及盒模型</li>
                    <li>掌握响应式布局</li>
                    <li>了解浏览器适配与页面加载流程</li>
                    <li>掌握JavaScript与ES6语法</li>
                    <li>掌握React/Vue框架的使用</li>
                    <li>了解Webpack、Git等工具的使用</li>
                    <li>了解Node.js和Express框架的使用</li>
                </ul>
                <el-divider></el-divider>
                <h4>联系我</h4>
                <el-form v-model="form">
                    <el-form-item>
                        <el-input type="textarea" v-model="form.content" :rows="3" placeholder="有什么想对我说的" autofocus />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success">发送</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer :height="'auto'">
                <main-footer></main-footer>
            </el-footer>
        </el-container>
    </el-container>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';

export default {
    name: "About",
    components: {
        mainMenu,
        mainFooter
    },
    data() {
        return {
            form: {
                content: ""
            }
        };
    }
}
</script>

<style lang="scss" scoped>
.about-container {
    width: 100%;
    height: auto;
    padding-top: 30px;

    .about-cover-main {
        padding: 0;
    }

    .about-content-container {
        text-align: left;

        .about-content-main {
            h1 {
                margin: 10px 0;
                font-size: 32px;
            }

            h4 {
                margin: 10px 0;
                font-size: 18px;
            }

            p {
                text-indent: 2em;
                margin: 0;
                line-height: 1.5;
            }

            ul {
                margin: 0;
                line-height: 1.5;
            }
        }
    }
}

@media screen and (min-width: 1000px) {
    .about-father-container {
        width: 80%;
        margin: 0 auto;

        .about-cover-container {
            flex-basis: 40%;

            .about-cover {
                width: 100%;
                height: 600px;
            }
        }

        .about-content-container {
            flex-basis: 60%;

            .about-content-main {
                padding: 20px 10%;
                position: relative;
                left: -5%;
                top: 50px;
                background: #fff;
            }

            .el-footer {
                position: relative;
                top: 50px;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .about-father-container {
        width: 100%;
        flex-wrap: wrap;

        .about-cover-container,
        .about-content-container {
            flex-basis: 100%;
        }

        .about-cover-main {
            width: 100%;
            padding: 0 10px;

            .about-cover {
                width: 100%;
                height: 200px;
            }
        }

        .about-content-main {
            width: 100%;
            padding: 0 10%;
        }
    }
}
</style>
