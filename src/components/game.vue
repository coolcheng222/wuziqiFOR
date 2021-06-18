<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>

    </div>
</template>

<script>
    import Maping from "./game/maping";
    import Chessing from "./game/chessing";
    export default {
        name: "game",
        components:{
            Chessing,
            Maping
        },

    }
</script>

<style scoped>
    .board{
        width: 400px;
        height: 400px;
        /*background-size: cover;*/
        background-image: url("~@/assets/pan5.jpg");
        position: relative;
    }

</style>