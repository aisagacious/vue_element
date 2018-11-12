<template>
  <div class="phone">
    <div class="p-title">
      <p>{{title}}</p>
      <span>{{month}}&nbsp;</span>
    </div>
    <div class="content" v-html="ueText">
    </div>
  </div>
</template>

<script>
import format from '../../utils/timeFilter.js'
export default {
  data() {
    return {
      html: '',
      month: format.fmtDate(new Date(), 'MM-dd hh:mm') // yyyy-MM-dd hh:mm:ss
    };
  },
  props: {
    ueText: {
      default: ''
    },
    title: {
      default: 'msg'
    }
  },
  mounted() {
    
  },
  methods: {
    catchData(val) {
      this.html = val
    }
  }
}
</script>

<style lang="scss">
.phone {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  .p-title {
    margin-bottom: 5px;
    p {
      font-size: 20px;
      font-weight: bold;
      color: #3f4146;
      margin-bottom: 5px;
    }
    span {
      margin-left: 3px;
      font-family: Helvetica;
      color: #9b9ea3;
    }
  }
  .content {
    p {
      font-size: 15px;
      line-height: 25px;
      letter-spacing: 0.3px;
      text-align: left;
      color: rgb(63, 65, 70);
      margin-bottom: 2px;
    }
    p:last-child {
      margin-bottom: 3px;
    }
    strong,
    b {
      font-weight: bold;
    }
    img {
      max-width: 100%;
    }
    span {
      font-size: 12px;
      color: #9b9ea3;
      line-height: 14px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    div {
      line-height: 20px;
      color: rgb(63, 65, 70);
      font-size: 18px;
      letter-spacing: 0.3px;
    }
    h1 {
      font-size: 22px;
    }
    h2 {
      font-size: 21px;
    }
    h3 {
      font-size: 20px;
    }
    h4 {
      font-size: 19px;
    }
    h5 {
      font-size: 18px;
    }
    h6 {
      font-size: 17px;
    }
  }
}
.phone::-webkit-scrollbar {
  display: none;
}
</style>
