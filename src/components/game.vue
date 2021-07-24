<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>
        <websocket1 :path="`room/1/12312`"></websocket1>
    </div>
</template>

<script>
    import Maping from "./game/maping";
    import Chessing from "./game/chessing";
    import Websocket1 from "./game/websocket1";
    export default {
        name: "game",
        components:{
            //eslint-disable
            // eslint-disable-next-line vue/no-unused-components
            Websocket1,
            Chessing,
            Maping
        },
        data(){
            return {

            }
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