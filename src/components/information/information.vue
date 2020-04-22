<template>
<wv-tabs swipeable>
    <wv-tab :title="'产品资讯'">
        <wv-panel title="图文组合列表">
            <wv-media-box thumb="thumb" title="标题一" description="description" to="/"></wv-media-box>
            <wv-media-box thumb="thumb" title="标题二" description="description" to="/"></wv-media-box>

            <wv-cell title="查看更多" is-link slot="ft"></wv-cell>
        </wv-panel>
    </wv-tab>
    <wv-tab :title="'烘焙小知识'">
        烘焙小知识
    </wv-tab>
</wv-tabs>
</template>

<script>
import qs from "qs";
export default {
    name: "information",
    data() {
        return {
            selected: "1"
        };
    },
    props: {

    },
    computed: {

    },
    mounted() {

    },
    methods: {},
};
</script>

<style scoped>
</style>
