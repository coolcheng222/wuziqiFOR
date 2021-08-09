<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>
<!--        <websocket1 :path="`room/1/12312`"></websocket1>-->
    </div>
    <div class="room">
        <div class="user other">
            <template v-if="other === ''">
                等待用户
            </template>
            <template v-else>
                用户: {{other}}
            </template>
        </div>
        <div class="user me">
            用户(您): {{me}}
        </div>
    </div>
</template>

<script>
    import Maping from "./game/maping";
    import Chessing from "./game/chessing";
    import Websocket1 from "./game/websocket1";
    import {mapState} from 'vuex';
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
                other: ''
            }
        },
        mounted() {
            console.log(this.$ws.isConnected());
        },
        methods:{
        },
        computed:{
            ...mapState({
                me: state=> state.room.uid
            }),
            uids(){
                return [this.me,this.other];
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
        float: left;
    }
    .room{
        float: left;
        flex-direction: column;

        display: flex;
        width: 200px;
        height: 400px;
        margin-left: 10px;
    }
    .user{
        display: inline-block;
        line-height: 200px;
        text-align: center;
        width: 200px;
        height: 200px;
    }

</style>