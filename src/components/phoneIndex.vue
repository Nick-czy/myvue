<template>
<div>
    <information></information>
    <mt-tabbar v-model="selected">
        <mt-tab-item id="资讯">
            <img slot="icon" src="../assets/100x100.png">
            资讯
        </mt-tab-item>
        <mt-tab-item id="商品">
            <img slot="icon" src="../assets/100x100.png">
            商品
        </mt-tab-item>
        <mt-tab-item id="购物车">
            <img slot="icon" src="../assets/100x100.png">
            购物车
        </mt-tab-item>

        <mt-tab-item id="我的">
            <img slot="icon" src="../assets/100x100.png">
            我的
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
import qs from "qs";
import information from './information/information';
export default {
    name: "phoneIndex",
    data() {
        return {
            selected: '资讯'
        };
    },
    computed: {

    },
    mounted() {

    },
    methods: {},
    components: {
        information
    }
};
</script>
