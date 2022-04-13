<template>
  <view class="trailer_star">
    <view class="movie_score_wrapper">
      <image
        v-for="(item, itemKey) in yellowScore"
        :key="itemKey"
        src="../../../static/icons/star-yellow.png"
        mode=""
        class="star"
      ></image>
      <image
        v-for="(item, iKey) in grayScore"
        :key="iKey"
        src="../../../static/icons/star-gray.png"
        mode=""
        class="star"
      ></image>
      <view class="movie_score" v-if="showNum">
        {{ innerScore }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    innerScore: {
      //外部传入的分数
      type: Number,
      default: 0,
    },
    showNum: {
      //是否显示具体分数 1-显示 0-不显示
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      yellowScore: 0,
      grayScore: 5,
    };
  },
  created() {
    let tempScore = 0;
    if (this.innerScore) {
      // 假数据
      if (this.innerScore > 10) {
        tempScore = Math.ceil(Math.random() * 10);
      } else {
        tempScore = this.innerScore;
      }
    }
    this.yellowScore = parseInt(tempScore / 2);
    this.grayScore = 5 - this.yellowScore;
  },
};
</script>

<style lang="less" scoped>
.trailer_star {
  .movie_score_wrapper {
    display: flex;
    justify-content: center;
    .star {
      width: 20upx;
      height: 20upx;
      margin-top: 6upx;
    }
    .movie_score {
      color: gray;
      font-size: 12px;
      margin-left: 8upx;
    }
  }
}
</style>
