<template>
<el-container class="home-container">
    <el-container class="login-container">
        <el-container class="login-left-container">
            <el-main class="login-left-main">
                <el-image class="login-cover" src="/image/cover.jpg" fit="cover"></el-image>
            </el-main>
        </el-container>
        <el-container class="login-right-container">
            <el-header :height="'auto'" :style="{ padding: '10px' }">
                <main-menu :showMenu="false" :showAvatar="false"></main-menu>
            </el-header>
            <el-main class="login-right-main">
                <div class="login-content">
                    <div class="login-content-info">
                        <el-button type="text" size="mini" circle icon="el-icon el-icon-arrow-left" @click="onClick_back"></el-button>
                    </div>
                    <h1>{{ $t("message.login") }}</h1>
                    <el-form v-model="form">
                        <el-form-item>
                            <el-input v-model="form.email" :placeholder="$t('message.email')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.password" type="password" :placeholder="$t('message.password')"></el-input>
                        </el-form-item>
                        <el-form-item :style="{ textAlign: 'left' }">
                            <el-checkbox v-model="form.remember">{{ $t("message.remember") }}</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">{{ $t("message.login") }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="login-content-info">
                        <router-link :to="{}">{{ $t("message.forget") }}</router-link>
                        <router-link :to="{}">注册</router-link>
                    </div>
                </div>
            </el-main>
            <el-footer class="login-right-footer" :height="'auto'">
                <main-footer></main-footer>
            </el-footer>
        </el-container>
    </el-container>
</el-container>
</template>

<script>
import mainFooter from './../components/mainFooter';
import mainMenu from './../components/mainMenu';

export default {
    name: "Login",
    components: {
        mainFooter,
        mainMenu
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
                remember: false
            }
        }
    },
    methods: {
        onClick_back: function () {
            this.$router.push({
                name: "Home"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
$mutedColor: #a7abb3;
$whiteColor: #fff;

.home-container {
    width: 100%;
    height: 100%;

    .login-container {
        width: 100%;
        height: 100%;
        position: relative;

        .login-left-main {
            padding: 0;
            overflow: hidden;

            .login-cover {
                height: 100%;
            }
        }

        .login-right-main {
            display: flex;
            justify-content: center;
            align-items: center;

            .login-content {
                box-sizing: border-box;
                padding: 20px 2em;
                box-shadow: $mutedColor 0 0 10px;
                border-radius: 5px;
                background: $whiteColor;

                .el-form .el-button {
                    width: 100%;
                }

                .login-content-info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;

                    a {
                        color: $mutedColor;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 1000px) {
    .login-left-container {
        flex: 0 0 40%;
    }

    .login-content {
        width: 50%;
    }
}

@media screen and (max-width: 1000px) {
    .login-left-container {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .login-right-container {
        z-index: 1;

        .login-content {
            width: 80%;
        }

        .login-right-footer {
            background: $whiteColor;
        }

    }
}
</style>
