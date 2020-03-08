<template>
<div id="rich" v-html="richText"></div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
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
                    return highlight.highlightAuto(code).value;
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
            return marked(this.text).replace(/<pre>/g, "<pre class='hljs'>");
        }
    }
}
</script>

<style lang="scss">
$themeColor: #C81912;

#rich {
    margin: 10px 0;
    text-align: left;

    a {
        color: $themeColor;
    }

    blockquote {
        margin: 0;
        padding: 5px 1em;
        background: #eaeaea;
        border-left: 5px solid #b7b7b7;
    }

    img {
        max-width: 100%;
        display: block;
        margin: 10px auto;
    }
}
</style>
