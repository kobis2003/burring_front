<template>
    <div id="app">
        <div id="banner">
            <img v-bind:src="'./owkin_image.png'" height="70" width="150"  class="border-image"/>
            <div id="banner-content" >
                <h1>Blurring project</h1>
            </div>
        </div>
        <div id="main-content">
            <BlurringPage></BlurringPage>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BlurringPage from '@/pages/BlurringPage.vue'

export default defineComponent({
    name: "App",
    components: {BlurringPage},
});
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

div#banner {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #DDEEEE;
    width: 100%;
}
.border-image {
    position: absolute;
    top: 0;
    left: 0;
}
div#banner-content {
    width: 800px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #000;
    text-align: center;
}

div#main-content {
    padding-top: 70px;
}
</style>