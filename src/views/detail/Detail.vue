<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
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
    <detail-param-info :param-info="paramInfo"></detail-param-info>
  </div>
</template>

<script>
import DetailNavBar from "./chlidComps/DetailNavBar";
import DetailSwiper from "./chlidComps/DetailSwiper";
import DetailBaseInfo from "./chlidComps/DetailBaseInfo";
import DetailShopInfo from "./chlidComps/DetailShopInfo";
import DetailGoodsInfo from "./chlidComps/DetailGoodsInfo";
import DetailParamInfo from './chlidComps/DetailParamInfo'

import { getDetail, Goods, Shop, GoodsParams } from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // 1.获取数据
      console.log(res);
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
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>