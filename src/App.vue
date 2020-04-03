<template>
<div id="app">
    <transition name="el-fade-in">
        <router-view />
    </transition>
    <el-backtop></el-backtop>
</div>
</template>

<script>
export default {
    methods: {
        onCreate_autoLogin: async function () {
            let email = localStorage.email,
                password = localStorage.password;
            if (email && password) {
                let params = {
                    email,
                    password
                };
                let response = await this.$g.call("/auth/login", "GET", params);
                if (!response.data.error) {
                    this.$store.state.user = response.data.result;
                    this.initUnreadReplies(this.$store.state.user._id);
                    this.$store.state.isLoggedIn = true;
                } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                }
            }
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
    },
    created() {
        if (this.$g.filterDate()) {
            document.getElementsByTagName("html")[0].style.filter = "grayscale(100%)";
        }
        this.onCreate_autoLogin();
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

@media screen and (min-width: 1440px) {
    #app {
        width: 1440px;
        margin: 0 auto;
    }
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.flex-gap {
    flex: 1;
}

#nodata {
    width: 100%;
    height: 100%;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b7b7b7;

    * {
        font-weight: 400;
    }
}

.avatar-uploader {
    .el-upload {
        border: 1px solid #b7b7b7;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .el-upload:hover {
        border-color: #C81912;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
