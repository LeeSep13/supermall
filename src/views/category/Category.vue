<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <scroll id="tab-menu" >
        <tab-menu :categories="categories"
                  @selectItem="selectItem"></tab-menu>
      </scroll>

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabMenu from "@/views/category/childComps/TabMenu";
import Scroll from "@/components/common/scroll/Scroll";
import TabContentCategory from "@/views/category/childComps/TabContentCategory";
import TabControl from "@/components/content/tabControl/TabControl";
import TabContentDetail from "@/views/category/childComps/TabContentDetail";

import {getCategory,getSubcategory,getCategoryDetail} from "@/network/category";


export default {
  name: "Category",
  components: {
    Scroll,
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  data(){
    return{
      categories:[],
      categoryData:{},
      currentIndex: -1,
      currentType:'pop',
    }
  },
  created() {
    // 1.请求分类数据
    this.getCategory()
  },
  computed:{
    showSubcategory(){
      if (this.currentIndex === -1) return{}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods:{
    getCategory(){
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            // subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        // 3.请求的第一个分类的数据
        this.getSubcategory(0)
      })
    },

    getSubcategory(index){
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },

    getCategoryDetail(type){
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求，传入miniWallkey和type
      getCategoryDetail(miniWallkey,type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index){
      this.getSubcategory(index)
    },

    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
  }
}
</script>

<style scoped>
  #category{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 55px;
    left: 0;
    right: 0;
    overflow: hidden;

    display: flex;
  }
  #tab-menu{
    background-color: #f6f6f6;
    width: 30%;
    height: 100%;
    box-sizing: border-box;
    float: left;
  }
  #tab-content{
    height: 100%;
    flex: 1;
  }
</style>