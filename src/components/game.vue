<template>
    <div class="rinfo">
        <div>房间ID:{{rid}} <span class="exit" @click="exiting">退出房间</span></div>
    </div>

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
                <span class="other name">用户: {{info.other}}</span>
                <template v-if="!info.gaming">
                    <div class="o-prepared">{{preparing}}</div>
                </template>
            </template>
        </div>
        <div class="user me">
            <div class="me name">用户(您): {{me}}</div>
            <div @click="prepare" :class="{prepared: info.mePrepared}" class="m-prepared">
                {{mPreparing}}
            </div>
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
                        this.getRoomInfo();
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

            },
            async exiting(){
                if(confirm('确认退出?')){
                    this.$https.delete('/room');
                    this.$router.push({name:'login'});
                }
            },
            async prepare(){
                this.info.mePrepared = !this.info.mePrepared;
                try{
                    await this.$https.post(`/game/prepare`);
                }catch(e){
                    alert('准备失败,多半网络问题');
                    this.info.mePrepared = !this.info.mePrepared;
                    console.log(e)
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
            },
            preparing(){
                if(this.info.otherPrepared){
                    return '已准备';
                }else if(this.info.otherPrepared === false){
                    return '未准备';
                }else{
                    return undefined;
                }
            },
            mPreparing(){
                if(this.info.mePrepared){
                    return '取消准备';
                }else{
                    return '准备';
                }
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
        text-align: center;
        width: 200px;
        height: 200px;
        padding-top: 40px;
    }
    .name{
        display: inline-block;
        height: 30px;

    }
    .m-prepared{
        background-color: blueviolet;
        color: white;
        padding: 5px;
        border-radius: 4px;
        width: 20%;
        display: block;
        margin: 0 auto;
        cursor: pointer;
        user-select: none;
    }
    .m-prepared:hover{
        background-color: #84bfff;
    }
    .m-prepared:active{
        background-color: #e4eab7;
    }
    .m-prepared.prepared{
        width: 40%;
        background-color: #d9d5d5;
        color: #323030;
    }
    .m-prepared.prepared:hover{
        color: #000000;
        background-color: rgba(255, 236, 230, 0.9);
    }
    .m-prepared.prepared:active{
        background-color: #fff;
        color: #908c8c;
    }
    .exit{
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        color: blue;
    }
    .exit:hover{
        color: cornflowerblue;
        text-decoration: underline;
    }


</style>