<template>
<el-container class="home-container">
    <el-container class="login-container">
        <el-container class="login-left-container">
            <el-main class="login-left-main">
                <el-image class="login-cover" src="/image/cover1-sm.jpg" fit="cover" srcset="/image/cover1.jpg 800w"></el-image>
            </el-main>
        </el-container>
        <el-container class="login-right-container">
            <el-header :height="'auto'" :style="{ padding: '10px' }">
                <main-menu :showMenu="false" :showAvatar="false"></main-menu>
            </el-header>
            <el-main class="login-right-main">
                <div class="login-content" v-loading="loading">
                    <div :style="{ textAlign: 'left' }">
                        <el-button type="" size="mini" circle icon="el-icon el-icon-arrow-left" @click="onClick_back"></el-button>
                    </div>
                    <h1>{{ $t("message.login") }}</h1>
                    <el-form :model="form" ref="form" :rules="rules" :show-message="false">
                        <el-form-item prop="email">
                            <el-input v-model="form.email" :placeholder="$t('message.email')"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" type="password" :placeholder="$t('message.password')"></el-input>
                        </el-form-item>
                        <el-form-item :style="{ textAlign: 'left' }" prop="remember">
                            <el-checkbox v-model="form.remember">{{ $t("message.remember") }}</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onClick_login('form')">{{ $t("message.login") }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="login-content-info">
                        <el-button type="text" @click="onClick_forget" size="mini">{{ $t("message.forget") }}</el-button>
                        <el-button type="text" @click="onClick_signup" size="mini">{{ $t("message.signup") }}</el-button>
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
    watch: {
        locale: function () {
            this.$forceUpdate();
        }
    },
    computed: {
        locale: function () {
            return this.$i18n.locale;
        }
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
                remember: false
            },
            rules: {
                email: [{
                        required: true
                    },
                    {
                        type: "email"
                    }
                ],
                password: [{
                    required: true
                }]
            },
            loading: false
        }
    },
    methods: {
        onClick_back: function () {
            this.$router.push({
                name: "Home"
            });
        },
        onClick_login: function (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    let params = {
                        email: this.form.email,
                        password: this.form.password
                    };
                    let response = await this.$g.call("/auth/login", "GET", params);
                    if (response.data.error) {
                        this.$message({
                            type: "error",
                            message: response.data.errorMsg
                        });
                    } else {
                        if (this.form.remember) {
                            sessionStorage.setItem("email", this.form.email);
                            sessionStorage.setItem("password", this.form.password);
                        }
                        this.initUnreadReplies(response.data.result._id);
                        this.$message({
                            type: "success",
                            message: "登录成功"
                        });
                        this.$store.state.user = response.data.result;
                        this.$store.state.isLoggedIn = true;
                        this.$router.go(-1);
                    }
                    this.loading = false;
                } else {
                    this.$message({
                        type: "info",
                        message: this.$t("message.errorForm")
                    });
                }
            });
        },
        onClick_forget: function () {
            this.$alert(this.$t("developing"), {
                type: 'warning'
            });
        },
        onClick_signup: function () {
            this.$alert(this.$t("developing"), {
                type: 'warning'
            });
        },
        initUnreadReplies: async function (to_uid) {
            if (to_uid) {
                let params = {
                    to_uid: to_uid,
                    page: 1,
                    pageSize: 0
                };
                let repliesReponse = await this.$g.call("/reply/isUnread", "GET", params);
                if (!repliesReponse.data.error) {
                    this.$store.isUnread = repliesReponse.data.result > 0;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$mutedColor: #a7abb3;
$whiteColor: #fff;

.home-container {
    width: 100%;

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
    .home-container {
        height: 100%;

        .login-left-container {
            flex: 0 0 40%;
        }

        .login-content {
            width: 50%;
        }
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

        .login-content-info {
            flex-wrap: wrap;

            >* {
                flex: 0 0 100%;
            }

            .el-button+.el-button {
                margin: 0;
            }
        }
    }
}
</style>
