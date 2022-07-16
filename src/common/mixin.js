import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
import {BACK_POSITION} from "@/common/const";

export const itemListenerMixin = {
    data(){
        return{
            itemImgListener:null,
            refresh:null,
        }
    },
    mounted(){
        // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度
        // 图片加载完成的事件监听，
        this.refresh = debounce(this.$refs.scroll.refresh,50)

        // 对监听的事件进行保存
        this.itemImgListener = ()=> {
            this.refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false,
        }
    },
    methods:{
        backTop(){
            this.$refs.scroll.scrollTo(0,0)
        },
        listenShowBackClick(position){
            this.isShowBackTop = (-position.y) > BACK_POSITION
        }
    }
}