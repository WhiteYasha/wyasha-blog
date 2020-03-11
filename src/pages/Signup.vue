<template>
<el-container class="home-container">
    <el-header height="auto">
        <main-menu :showAvatar="false"></main-menu>
    </el-header>
    <el-container>
        <el-header height="100px">
            <el-image src="/image/cover2.jpg" fit="cover"></el-image>
        </el-header>
        <el-main class="sign-main">
            <transition name="el-zoom-in-center">
                <el-card class="sign-card" :class="signStep == 1 ? 'active' : ''" v-if="signStep >= 1">
                    <h1>{{ $t("message.firstStep") }}</h1>
                    <el-form v-if="signStep == 1" :model="codeForm" :rules="codeRules" ref="codeForm" v-loading="signLoading">
                        <el-form-item prop="email">
                            <el-input v-model="codeForm.email" :placeholder="$t('message.email')"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input :maxlength="6" v-model="codeForm.code">
                                <el-button slot="append" size="mini" :disabled="isCountDown" v-loading="sendLoading" @click="onClick_sendCode('codeForm')">
                                    {{ isCountDown ? `${$t("message.resend")}(${countDown})` : $t("message.sendCode") }}
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <i>*{{ $t("form.codeHint") }}</i>
                        <el-form-item>
                            <el-button class="next-btn" type="primary" @click="onClick_nextStep2('codeForm')">{{ $t("message.next") }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div id="placeholder" v-else>
                        <i class="el-icon el-icon-check"></i>
                    </div>
                </el-card>
            </transition>
            <transition name="el-zoom-in-center">
                <el-card class="sign-card" :class="signStep == 2 ? 'active' : ''" v-if="signStep >= 2">
                    <h1>{{ $t("message.secondStep") }}</h1>
                    <el-form v-if="signStep == 2" :model="infoForm" :rules="infoRules" ref="infoForm">
                        <el-form-item prop="name">
                            <el-input v-model="infoForm.name" :placeholder="$t('message.username')"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="infoForm.password" type="password" :placeholder="$t('message.password')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="next-btn" type="primary" @click="onClick_nextStep3('infoForm')">{{ $t("message.next") }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div id="placeholder" v-else>
                        <i class="el-icon el-icon-check"></i>
                    </div>
                </el-card>
            </transition>
            <transition name="el-zoom-in-center">
                <el-card class="sign-card" :class="signStep == 3 ? 'active' : ''" v-if="signStep >= 3">
                    <h1>{{ $t("message.thirdStep") }}</h1>
                    <el-upload class="avatar-uploader" :action="`http://localhost:9000/auth/upload?email=${codeForm.email}`" name="avatar" :show-file-list="false" :on-success="onSuccess_upload" :before-upload="onBefore_upload">
                        <el-image v-if="avatarUrl" :src="avatarUrl" class="avatar" fit="cover"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button class="next-btn" type="primary" @click="onClick_confirm(avatarUrl)">{{ $t("message.confirm") }}</el-button>
                    <el-button class="next-btn" type="info" @click="onClick_confirm()">{{ $t("message.skip") }}</el-button>
                </el-card>
            </transition>
        </el-main>
    </el-container>
    <el-footer height="auto">
        <main-footer></main-footer>
    </el-footer>
</el-container>
</template>

<script>
import mainMenu from './../components/mainMenu';
import mainFooter from './../components/mainFooter';

export default {
    components: {
        mainMenu,
        mainFooter
    },
    data() {
        return {
            signStep: 2,
            signLoading: false,
            sendLoading: false,
            isCountDown: false,
            countDown: 60,
            countDownInterval: null,
            avatarUrl: "",
            codeForm: {
                email: "",
                code: ""
            },
            infoForm: {
                name: "",
                password: ""
            }
        }
    },
    computed: {
        codeRules: function () {
            return {
                email: [{
                        required: true,
                        message: this.$t("form.requireEmail")
                    },
                    {
                        type: "email",
                        message: this.$t("form.errorEmail")
                    },
                    {
                        validator: async (rule, value, callback) => {
                            let params = {
                                email: value
                            };
                            let response = await this.$g.call("/auth/hasemail", "GET", params);
                            if (response.data.result) callback(this.$t("form.existedEmail"));
                            else callback();
                        },
                        trigger: "change"
                    }
                ],
                code: [{
                        required: true,
                        message: this.$t("form.requireCode")
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value.match(/\d{6}/g)) callback();
                            else callback(this.$t("form.lengthCode"));
                        }
                    }
                ]
            };
        },
        infoRules: function () {
            return {
                name: [{
                        required: true,
                        message: this.$t("form.requireName")
                    },
                    {
                        validator: async (rule, value, callback) => {
                            const reg = /[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]/g;
                            if (value.match(reg)) callback(this.$t("form.errorName"));
                            let params = {
                                name: value
                            };
                            let response = await this.$g.call("/auth/hasname", "GET", params);
                            if (response.data.result) callback(this.$t("form.existedName"));
                            else callback();
                        },
                        trigger: "change"
                    }
                ],
                password: [{
                        required: true,
                        message: this.$t("form.requirePassword")
                    },
                    {
                        min: 6,
                        message: this.$t("form.lengthPassword")
                    }
                ]
            }
        }
    },
    methods: {
        onClick_sendCode: function (formName) {
            if (!this.isCountDown) {
                this.$refs[formName].validateField("email", async (err) => {
                    if (!err) {
                        this.sendLoading = true;
                        let params = {
                            email: this.codeForm.email
                        };
                        let response = await this.$g.call("/auth/code/send", "GET", params);
                        if (!response.data.error) {
                            this.$message({
                                message: this.$t("message.sendCodeSuccess"),
                                type: "success"
                            });
                            this.sendLoading = false;
                            this.isCountDown = true;
                            this.countDown = 60;
                            this.countDownInterval = setInterval(() => {
                                this.countDown--;
                                if (this.countDown <= 0) {
                                    clearInterval(this.countDownInterval);
                                    this.isCountDown = false;
                                }
                            }, 1000);
                        }
                    }
                });
            }
        },
        onClick_nextStep2: function (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.signLoading = true;
                    let params = {
                        email: this.codeForm.email
                    };
                    let response = await this.$g.call("/auth/code", "GET", params);
                    if (!response.data.error) {
                        let code = response.data.result;
                        if (code == this.codeForm.code) {
                            this.signStep++;
                        } else {
                            this.$message({
                                message: this.$t("message.errorCode"),
                                type: "error"
                            });
                        }
                    }
                    this.signLoading = false;
                }
            });
        },
        onClick_nextStep3: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.signStep++;
                }
            });
        },
        onClick_confirm: async function (avatar) {
            this.signLoading = true;
            let params = {
                name: this.infoForm.name,
                email: this.codeForm.email,
                password: this.infoForm.password,
                avatar: avatar
            };
            let userResponse = await this.$g.call("/auth/sign", "GET", params);
            if (!userResponse.data.error) {
                this.$store.state.user = userResponse.data.result;
                this.$store.state.isLoggedIn = true;
                this.$message({
                    message: this.$t("message.signSuccess"),
                    type: "success"
                });
                this.$router.push({
                    name: "Home"
                });
            }
            this.signLoading = false;
        },
        onSuccess_upload: function (data) {
            if (!data.error) {
                this.avatarUrl = data.result;
            }
        },
        onBefore_upload: function (file) {
            if (file.type !== 'image/jpeg') {
                this.$message.error(this.$t("form.avatarFormat"));
                return false;
            }
            if (file.size / 1024 / 1024 >= 1) {
                this.$message.error(this.$t("form.avatarSize"));
                return false;
            }
            return true;
        }
    }
}
</script>

<style lang="scss" scoped>
$grayColor: #b7b7b7;
$themeColor: #C81912;

#placeholder {
    width: 100%;
    min-height: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        font-size: 42px;
        color: $themeColor;
        font-weight: 700;
    }
}

.home-container {
    width: 100%;

    .el-header .el-image {
        width: 100%;
        height: 100%;
    }

    .sign-main {
        display: flex;

        i {
            color: $grayColor;
            font-size: 12px;
        }

        .next-btn {
            width: 100%;
            margin: 0;
            margin-top: 10px;
        }
    }
}

@media screen and (max-width: 1000px) {
    .home-container {
        height: auto;

        .sign-card {
            flex: 0 0 100%;
        }

        .sign-card:not(.active) {
            display: none;
        }
    }
}

@media screen and (min-width: 1000px) {
    .home-container {
        height: 100%;

        .sign-card {
            flex: 0 0 30%;
        }

        .sign-card+.sign-card {
            margin-left: 5%;
        }
    }
}
</style>
