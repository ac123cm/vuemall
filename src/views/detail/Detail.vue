<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <ul>
      <li>{{ $store.state.cartList.length }}</li>
    </ul>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品图片信息 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <!-- 评论信息 -->
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <!-- 推荐 -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./chlidComps/DetailNavBar";
import DetailSwiper from "./chlidComps/DetailSwiper";
import DetailBaseInfo from "./chlidComps/DetailBaseInfo";
import DetailShopInfo from "./chlidComps/DetailShopInfo";
import DetailGoodsInfo from "./chlidComps/DetailGoodsInfo";
import DetailParamInfo from "./chlidComps/DetailParamInfo";
import DetailCommentInfo from "./chlidComps/DetailCommentInfo";
import DetailBottomBar from "./chlidComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";
import Toast from "@/components/common/toast/Toast";

import Scroll from "@/components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "@/network/detail";
import { debounce } from "../../../common/uttilts";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false,
      message: "",
      show: false,
    };
  },
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // 1.获取数据
      // console.log(res);
      const data = res.result;

      // 2.获取顶部轮播图图片
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.获取商品详细数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY复制（对进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  updated() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // this.getThemeTopY();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息（图片、标题、描述、价格、id）
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车(1.Promise 2.mapActions)
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res); // 3.添加到购物车成功
      // })
      // 2.mapActions
      this.addCart(product).then((res) => {
        console.log(res);
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1500);
      });
    },
    ...mapActions(["addCart"]),
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 41px;
  bottom: 43px;
  left: 0;
  right: 0;
}
</style>