/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
  el: "#player",
  data: {
    musicList: [],
    query: '五月天',
    musicUrl: '',
    picUrl: '',
    commentList: [],
    isplaying: false,
    mvUrl: '',
    showVideo: false,
    playTurn: false
  },
  methods: {
    //搜索音乐
    searchMusic: function () {
      axios.get(`https://autumnfish.cn/search?keywords=${this.query}`).then(res => {
        this.musicList = res.data.result.songs
      }).catch(error => { console.log(error) });
    },
    //播放音乐
    playMusic: function (musicId) {
      this.playTurn = !this.playTurn;
      if (this.playTurn) {
        axios.get(`https://autumnfish.cn/song/url?id=${musicId}`).then(res => {
          this.musicUrl = res.data.data[0].url
          this.$refs.audio.play()
        }).catch(error => {
          console.log(error);
        })
      }else{
        this.$refs.audio.pause()
      };
      //获取评论
      axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${musicId}`).then(res => {
        this.commentList = res.data.hotComments;
      }).catch(error => {
        console.log(error);
      });
      //专辑图片
      axios.get(`https://autumnfish.cn/song/detail?ids=${musicId}`).then(res => {
        this.picUrl = res.data.songs[0].al.picUrl;
      }).catch(error => {
        console.log(error);
      });
    },
    //播放动画
    play: function () {
      this.isplaying = true;
    },
    pause: function () {
      this.isplaying = false
    },
    //播放MV
    playMV: function (mvId) {
      axios.get(`https://autumnfish.cn/mv/url?id=${mvId}`).then(res => {
        //暂停歌曲播放  
        this.$refs.audio.pause()
        this.mvUrl = res.data.data.url
      }).catch(error => {
        console.log(error);
      });
      this.showVideo = true
    },
    closeMV: function () {
      this.showVideo = false
      this.$refs.video.pause()
    }
  }
})