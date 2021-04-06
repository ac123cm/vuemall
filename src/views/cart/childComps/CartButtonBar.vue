<template>
  <div class="botton-bar">
      <div class="check-content">
          <check-button class="check-button"></check-button>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="caculate">
          去结算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
    name: 'CartButtonBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        }
    },
}
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