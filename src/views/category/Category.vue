<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!-- 左边分类 -->
    <category-left-bar
      :category-list="categoryList"
      @itemClick="itemClick"
    ></category-left-bar>
    <!-- 右边内容 -->
    <scroll class="content">
      <sub-category :subcategory-list="subcategoryList"></sub-category>
    </scroll>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CategoryLeftBar from './CategoryLeftBar'
import SubCategory from './SubCategory'

import { getCateGory, getSubCateGory } from '@/network/category'

import Scroll from '@/components/common/scroll/Scroll'

export default {
  name: 'category',
  components: {
    NavBar,
    CategoryLeftBar,
    Scroll,
    SubCategory,
  },
  data() {
    return {
      currentIndex: 0,
      // 分类左边内容数据
      categoryList: [],
      // 分类右边内容数据
      subcategoryList: [],
    }
  },
  created() {
    // 请求详细数据
    getCateGory()
      .then((res) => {
        // 1.获取数据
        console.log(res)

        // 分类数据
        this.categoryList = res.data.category.list
        // 当前分类右边内容数据
        this._getSubCateGory(this.currentIndex)
      })
      .catch((err) => {})
  },
  methods: {
    _getSubCateGory(index) {
      const maitKey = this.categoryList[index].maitKey
      getSubCateGory(maitKey).then((res) => {
        console.log(res)
        this.subcategoryList = res.data.list
      })
    },
    itemClick(index) {
      this.currentIndex = index
      this._getSubCateGory(this.currentIndex)
    },
  },
}
</script>

<style scoped>
.category {
  display: flex;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: fixed;
  top: 44px;
  right: 0;
  left: 25%;
  bottom: 49px;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
