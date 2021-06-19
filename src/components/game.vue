<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>
        <button @click="restart">重新开始</button>

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
        mounted() {
            this.$https.post(`/game/start`);
        },
        methods:{
            restart(){
                this.$https.post(`/game/restart`)
            }
        }


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