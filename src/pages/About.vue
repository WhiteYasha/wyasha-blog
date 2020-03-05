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
                <p>{{ $t("message.introduction") }}</p>
                <el-divider></el-divider>
                <h4>{{ $t("message.skillStack") }}</h4>
                <ul>
                    <li>{{ $t("skill.knowledge") }}</li>
                    <li>{{ $t("skill.responsive") }}</li>
                    <li>{{ $t("skill.browser") }}</li>
                    <li>{{ $t("skill.javascript") }}</li>
                    <li>{{ $t("skill.frame") }}</li>
                    <li>{{ $t("skill.tools") }}</li>
                    <li>{{ $t("skill.backend") }}</li>
                </ul>
                <el-divider></el-divider>
                <h4>{{ $t("message.contact") }}</h4>
                <el-form v-model="form">
                    <el-form-item>
                        <el-input type="textarea" v-model="form.content" :rows="3" :placeholder="$t('message.saySomething')" autofocus />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success">{{ $t("message.send") }}</el-button>
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
