<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="caculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartButtonBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      //  2.使用find
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
      checkClick() {
          if (this.isSelectAll) {
              // 全部选中
              this.cartList.forEach(item => item.checked = false)
          } else {
              // 部分或全部不选中
              this.cartList.forEach(item => item.checked = true)
          }
      }
  },
};
</script>

<style scoped>
.botton-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 14px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 15px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.price {
  margin-left: 40px;
  flex: 1;
}

.caculate {
  width: 100px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>