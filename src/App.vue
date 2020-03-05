<template>
<div id="app">
    <router-view />
</div>
</template>

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
</style>
