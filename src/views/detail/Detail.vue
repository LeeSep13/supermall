<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar  @addCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavbar from "@/views/detail/childComps/DetailNavbar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailImageInfo from "@/views/detail/childComps/DetailImageInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodList from "@/components/content/goods/GoodList";

import {getDetail,Goods,getRecommend} from "@/network/detail";
import {debounce} from "@/common/utils";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components:{
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
  },

  mixins:[itemListenerMixin,backTopMixin],

  data(){
    return{
      iid:null,
      topImages:[],
      goodsInfo:{},
      shopInfo:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2，根据iid请求详情数据
    getDetail(this.iid).then(res =>{

      // 1.获取数据
      const data = res.result

      // 2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages

      // 3.创建商品的对象
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 4.取出店铺的信息
      this.shopInfo = data.shopInfo

      // 5.取出详情的信息
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramsInfo = data.itemParams;

      // 7.取出评论的信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
  },

  mounted() {
  },

  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },

  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.refresh();
      this.getThemeTopY();
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
    },

    contentScroll(position){
      // 1.获取y值
      const positionY = -position.y + 44;

      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++){
        if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.listenShowBackClick(position)
    },

    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart',product)
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res)
      })
    }

  },
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>