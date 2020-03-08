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
        onCreate_autoLogin: function () {
            let email = sessionStorage.email,
                password = sessionStorage.password;
        }
    },
    created() {
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b7b7b7;

    * {
        font-weight: 400;
    }
}

@media screen and (min-width: 1440px) {
    #app {
        width: 1440px;
        margin: 0 auto;
    }
}
</style>
