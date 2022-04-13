<template>
  <view class="page index">
    <!-- 轮播 -->
    <swiper :indicator-dots="true" :autoplay="true" class="carousel">
      <swiper-item v-for="item in swiperList" :key="item.id">
        <image :src="item.image" mode="heightFix" class="swiper_img"></image>
      </swiper-item>
    </swiper>
    <view class="tag" v-for="(tag, i) in tagList" :key="i">
      <!-- 超音热播 -->
      <Tag :imgSrc="tag.imgSrc || ''" :hotTitle="tag.hotTitle" />
      <scroll-view
        v-if="i === 0 && hotData.length > 0"
        scroll-x="true"
        class="page_block hot_srcoll"
      >
        <view class="single_wrapper" v-for="item in hotData" :key="item.id">
          <view class="poster_wrapper">
            <image
              wx:if="{undefined{item.images.small.length>0}}"
              :src="item.images.small"
              @error="errorImg($event, item.id)"
              mode=""
              class="poster"
            />
            <view class="movie_name overflow">{{ item.title }}</view>
          </view>
          <!-- 评分组件 -->
          <uni-trailerStar :innerScore="item.rating.average" :showNum="1" />
        </view>
      </scroll-view>

      <!-- 热门预告 -->
      <view v-if="i == 1" class="hot_movies page_block">
        <video
          v-for="(item, iKey) of hotTrailerList"
          :key="iKey"
          :id="item.id"
          :src="item.src"
          :poster="item.poster"
          controls
          object-fit="fill"
          class="video"
        ></video>
      </view>

      <!-- 猜你喜欢 -->
      <view v-if="i == 2" class="guess page_block">
        <view
          v-for="(gitem, gindex) in guessData"
          :key="gindex"
          class="guess_move"
        >
          <!-- <view class="img_u"> -->
          <image class="poster" :src="gitem.images.small" mode="" />
          <!-- </view> -->
          <view class="guess__box">
            <view class="guess__box-title">{{ gitem.title }}</view>
            <uni-trailerStar :innerScore="gitem.rating.average" :showNum="0" />
            <view class="guess__box-info">{{ gitem.mainland_pubdate }}</view>
            <view class="guess__box-info">
              <text v-for="(g, i) in gitem.genres" :key="i">{{ g }}/</text>
            </view>
            <view class="guess__box-info"> 时长：{{ gitem.durations[0] }}</view>
            <view class="guess__box-info">
              点赞数：{{ gitem.collect_count }}</view
            >
          </view>
          <view class="guess_operation" @tap="praiseMe" :data-gindex="gindex">
            <image
              src="../../static/icons/praise.png"
              mode=""
              class="praise_icon"
            >
            </image>
            <view class="praise_it">点赞</view>
            <view
              :animation="animationDataArr[gindex]"
              class="praise_it animation"
            >
              +1
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Tag from "@/components/index/Tag.vue";
export default {
  components: {
    Tag,
  },
  data() {
    return {
      swiperList: [
        {
          id: 1,
          movieID: "",
          // 使用https://images.weserv.nl/?url=方式解决forbidden问题
          image:
            "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/l/public/p2410755737.webp",
          sort: 1,
          isShow: 1,
        },
        {
          id: 2,
          movieID: "",
          image:
            "https://images.weserv.nl/?url=//img3.doubanio.com/view/photo/l/public/p2556561071.webp",
          sort: 1,
          isShow: 1,
        },
        {
          id: 3,
          movieID: "",
          image:
            "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/l/public/p2559849368.webp",
          sort: 1,
          isShow: 1,
        },
        {
          id: 4,
          movieID: "",
          image:
            "https://images.weserv.nl/?url=img3.doubanio.com/view/photo/l/public/p2432517600.webp",
          sort: 1,
          isShow: 1,
        },
      ],
      tagList: [
        {
          hotTitle: "热门超英",
          imgSrc: "../../static/icons/hot.png",
        },
        {
          hotTitle: "热门预告",
          imgSrc: "../../static/icons/interest.png",
        },
        {
          hotTitle: "猜你喜欢",
          imgSrc: "../../static/icons/guess-u-like.png",
        },
      ],
      // 热门预告
      hotTrailerList: [
        {
          id: "004",
          src: "http://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_d35f9f934fa64fb7b1c2f225337cf55c.f0.mp4?vkey=EF84BEC7B073D830522ADCDC3936E4F97318D878FD5B75D24D2B83D465724F1E8FD7465E3D1053139E75BFCA0112DFB33FE3AA851730FAEA841047CDEEDBA726E6FEF84FC3AF0005F46ED2A5BCB107A5D3D8AFD06458E4CC&sha=0",
          poster:
            "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg",
        },
        {
          id: "004",
          src: "http://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_d35f9f934fa64fb7b1c2f225337cf55c.f0.mp4?vkey=EF84BEC7B073D830522ADCDC3936E4F97318D878FD5B75D24D2B83D465724F1E8FD7465E3D1053139E75BFCA0112DFB33FE3AA851730FAEA841047CDEEDBA726E6FEF84FC3AF0005F46ED2A5BCB107A5D3D8AFD06458E4CC&sha=0",
          poster:
            "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg",
        },
      ],
      // 热门超英
      hotData: [],
      guessData: [],
      animationData: {},
      animationDataArr: [],
    };
  },
  onUnload() {
    this.animationData = {};
  },
  onLoad() {
    // 请求热门
    this.getHot();
    this.getGuess();
    // 创建动画
    this.animation = uni.createAnimation();
  },
  methods: {
    // 图片加载错误处理
    errorImg(e, id) {
      console.log(e, id);
      const i = this.hotData.findIndex((current) => {
        return current.id === id;
      });
      const newdata = this.hotData[i];
      newdata.images.small =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fd6a3789c8b9f271fb4a179dd42a9473f2b5ce49a7f32-JgDwcQ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641817793&t=2070482ba5b89df55da9217b984895ea";
      this.$set(this.hotData, i, newdata);
    },
    // 视频播放
    videoPlay(id) {
      // 解决真机无限播放暂停问题
      if (this.videoId == id) {
        return false;
      }
      this.videoCtx = uni.createVideoContext(id);
      // 确保只能有一个视频被播放，其它的暂停
      this.hotTrailerList.forEach((item) => {
        if (item.id == id) {
          this.videoCtx.play();
          this.videoId = id;
        } else {
          uni.createVideoContext(item.id).pause();
        }
      });
    },
    getHot() {
      uni.request({
        url: "http://rap2api.taobao.org/app/mock/295569/top250", //仅为示例，并非真实接口地址。
        method: "GET",
        // data: {
        //   text: "uni.request",
        // },
        // header: {
        //   "custom-header": "hello", //自定义请求头信息
        // },
        success: (res) => {
          console.log(res);
          this.hotData = res.data.subjects;
          // this.hotData.shift();
        },
        fail: (res) => {
          console.log(res);
        },
      });
    },
    getGuess() {
      uni.request({
        url: "http://rap2api.taobao.org/app/mock/295569/weekly", //仅为示例，并非真实接口地址。

        success: (res) => {
          const dataRes = res.data.subjects;
          // 截取5条数据，每次展示5条
          let newArr = [];
          if (dataRes.length > 0) {
            for (let i = 0; i < dataRes.length; i++) {
              // if (i + this.guessCount - 5 < this.guessCount) {
              let item = dataRes[i].subject;
              // 对图片做处理
              item.images.small = item.images.small.replace(
                "https://",
                "https://images.weserv.nl/?url="
              );
              newArr.push(item);
              // }
            }
          }
          this.guessData = newArr;
          console.log("guessData", this.guessData);

          // this.text = 'request success';
        },
      });
    },
    // 实现动画点赞
    praiseMe(e) {
      const gIndex = e.currentTarget.dataset.gindex;
      console.log(gIndex);
      // return;
      // 构建动画数据，并且通过step来表示这组动画的完成
      this.animation.opacity(1).translateY(-60).step({
        duration: 400,
      });
      // 导出数据到view组件，实现组件的动画效果
      this.animationData = this.animation;
      this.animationDataArr[gIndex] = this.animationData.export();

      // 还原动画
      setTimeout(() => {
        this.animation.translateY(0).opacity(0).step({ duration: 0 });
        // this.animationDataArr[gindex] = this.animation.export();
        this.animationData = this.animation;
        this.animationDataArr[gIndex] = this.animationData.export();
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
.index {
  padding-bottom: 40upx;
  .carousel {
    width: 100%;
    height: 440upx;
    .swiper_img {
      width: 100% !important;
    }
  }
  .hot_srcoll {
    width: 100%;
    white-space: nowrap;
    .single_wrapper {
      display: inline-block;
      margin-right: 20upx;
      .poster_wrapper {
        display: flex;
        flex-direction: column;
        .poster {
          width: 200upx;
          height: 270upx;
        }

        .movie_name {
          width: 200upx;
          margin-top: 10upx;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
        }
      }
    }
  }
  .hot_movies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20upx 20upx 20upx;
    .video {
      width: 350upx;
      height: 220upx;
      margin-top: 10upx;
    }
  }
  .guess {
    .guess_move {
      display: flex;
      flex-wrap: nowrap;
      padding-left: 20upx;
      padding-right: 20upx;
      padding-bottom: 40upx;
      .poster {
        width: 180upx;
        height: 240upx;
        border-radius: 3%;
        margin-right: 40upx;
        flex-shrink: 0;
      }

      .guess__box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .guess__box-title {
          font-size: 16px;
          line-height: 16px;
          width: 80px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .guess__box-info {
          font-size: 14px;
          line-height: 14px;
          color: #909090;
          margin-bottom: 10upx;
        }
      }
      .guess_operation {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: dashed 2px;
        border-left-color: #dbdbda;
        width: 180upx;
        .praise_icon {
          width: 40upx;
          height: 40upx;
        }
        .praise_it {
          color: #feab2a;
          font-size: 14px;
        }
        .animation {
          opacity: 0;
        }
      }
      ::v-deep .trailer_star {
        // width: 240upx;
        display: flex;
        justify-content: start;
      }
    }
  }
}
</style>
