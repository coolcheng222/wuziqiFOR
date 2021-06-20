<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>
        <websocket1 :path="websocket2" :msg-state="msg"></websocket1>
    </div>
</template>

<script>
    import Maping from "./game/maping";
    import Chessing from "./game/chessing";
    import Websocket1 from "./game/websocket1";
    export default {
        name: "game",
        components:{
            Websocket1,
            Chessing,
            Maping
        },
        data(){
            return {

            }
        },
        mounted() {
            new WebSocket(`http://localhost:8080`)
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