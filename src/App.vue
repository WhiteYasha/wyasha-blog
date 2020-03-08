<template>
<div id="app">
    <router-view />
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
}

@media screen and (min-width: 1200px) {
    #app {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
