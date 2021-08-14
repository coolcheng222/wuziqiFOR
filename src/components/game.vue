<template>
    <div class="board">
        <!--eslint-disable-->
        <maping></maping>
        <chessing></chessing>
<!--        <websocket1 :path="`room/1/12312`"></websocket1>-->
    </div>
    <div class="room">
        <div class="user other">
            <template v-if="!info.other">
                等待用户
            </template>
            <template v-else>
                用户: {{info.other}}
            </template>
            <button @click="getRoomInfo"></button>
        </div>
        <div class="user me">
            用户(您): {{me}}
        </div>
    </div>
</template>

<script>
    import Maping from "./game/maping";
    import Chessing from "./game/chessing";
    import {mapState} from 'vuex';
    export default {
        name: "game",
        components:{
            //eslint-disable
            // eslint-disable-next-line vue/no-unused-components
            Chessing,
            Maping
        },
        data(){
            return {
                token: '',
                info:{
                    mePrepared: false,
                    other: '',
                    otherPrepared: false,
                    gaming: false
                }
            }
        },
        async mounted() {
            if(!(this.me && this.rid)){
                try{
                    let data = await this.$https.get('game/check');
                    this.$store.commit('enRoom',{rid: data.extend.rid,uid:data.extend.me});
                }catch(e){
                    alert(e)
                    this.$router.push({name:'login'})
                    return;
                }
            }
            this.createWebSocket();
        },
        methods:{
            createWebSocket(){
                this.$ws.getWs(this.rid,this.me,(msg)=>{
                    let parse = JSON.parse(msg.data);
                    console.log(parse)
                    if(parse.message === "token"){
                        this.token = parse.extend
                    }
                });
                // eslint-disable-next-line no-constant-condition
            },
            async getRoomInfo(){
                try{
                    let data = await this.$https.get(`/game/check`,{
                        headers:{token: this.token}
                    })
                    Object.assign(this.info,data.extend);
                }catch(e){
                    alert(e);
                }

            }
        },
        computed:{
            ...mapState({
                me: state=> state.room.uid,
                rid: state => state.room.rid
            }),
            uids(){
                return [this.me,this.other];
            }
        },
        beforeRouteLeave(){
            console.log("leaving")
            this.$https.delete(`/room`);
            this.$store.commit('deRoom');
            this.$ws.close1();
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