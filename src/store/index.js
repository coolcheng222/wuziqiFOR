import { createStore } from 'vuex'
import game from '@/store/game.js'
import ws from '@/store/ws.js'
import room from '@/store/room.js'

export default createStore({
  modules:{
    game,
    ws,
    room
  }
})
