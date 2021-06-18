<template>
    <div class="board">
        <!--eslint-disable-->
        <div class="shell">
            <div v-for="index of 16" class="clearfix">
                <div v-for="index2 of 16" :ref="getId(index,index2)" class="grid" :class="cls[`${getId(index,index2)}`]" @click="setChess($event,index,index2)">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "game",
        data(){
            return {
                black:{
                    borderRadius: `12px`,
                    backgroundColor: `black`,
                    boxShadow:` 2px 2px 3px #0a0a0a`
                },
                white:{
                    borderRadius: `12px`,
                    backgroundColor: `white`,
                    boxShadow:` 2px 2px 3px black`
                },
                setted:new Set(),
                black$white: true,
                cls: []
            }
        },
        methods:{
            setChess(ele,index,index2){
                // if(this.setted.has(target.ref))
                let id = this.getId(index,index2);
                if(this.cls[id]){
                    return;
                }
                if(this.black$white){
                    this.cls[id] = `black`;
                }else{
                    this.cls[id] = `white`;
                }
                this.reverse();
            },
            reverse(){
                this.black$white = !this.black$white;
            },

            getId(index,index2){
                return `id_${index}_${index2}`;
            }

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
    .shell{
        height: 23px;
        position: absolute;
        top: 11px;
        left: 11px;
    }
    .clearfix:before,.clearfix:after{
        content: "";
        display: table;
        clear:both;
    }
    .grid{
        height: 19.5px;
        width: 19.5px;
        margin: 2px;
        box-sizing: border-box;
        /*border: 1px dashed red;*/
        float: left;
    }
    .black,.white{
        border-radius: 12px;
        box-shadow:2px 2px 3px black;
    }
    .black{
        background-color: black;
    }
    .white{
        background-color: white;
    }
</style>