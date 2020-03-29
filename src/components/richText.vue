<template>
<div id="rich" v-html="richText"></div>
</template>

<script>
import marked from 'marked';
// import highlight from 'highlight.js';
import 'highlight.js/styles/night-owl.css';

export default {
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    computed: {
        richText: function () {
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                },
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            });
            let text = this.text.replace(/\\"/g, "\"").replace(/\\'/g, "'");
            return marked(text).replace(/<pre>/g, "<pre class='hljs'>");
        }
    }
}
</script>

<style lang="scss">
$themeColor: #C81912;
$strongColor: #f64b3c;
$lightColor: #fdba9a;
$vueFont: Avenir, Helvetica, Arial, sans-serif;

#rich {
    margin: 10px 0;
    text-align: left;
    line-height: 1.8;

    p {
        text-indent: 2em;
    }

    a {
        color: $themeColor;
    }

    blockquote {
        margin: 0;
        padding: 5px 1em;
        background: rgba($lightColor, .2);
        font-size: 90%;
        border-left: 5px solid $lightColor;
    }

    img {
        max-width: 100%;
        display: block;
        margin: 10px auto;
    }

    strong {
        color: $strongColor;
    }

    code:not([class]) {
        font-family: $vueFont;
        font-style: italic;
        padding: .1em .2em;
        margin: 0;
        font-size: 85%;
        color: $themeColor;
        background-color: rgba($themeColor, .05);
        border-radius: 3px;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
        max-width: 100%;
        overflow: hidden;

        thead {
            background: $themeColor;
            color: #ffffff;
        }

        tr:nth-child(even) {
            background: rgba($lightColor, .5);
        }

        th,
        td {
            padding: .2em 1.5em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>
