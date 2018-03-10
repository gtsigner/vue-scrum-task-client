<template>
  <div class="ball-loading">
    <div class="la-ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      loading: {
        default: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .ball-loading {
    text-align: center;
    z-index: 1000;
    .la-ball-pulse {
      display: inline-block;
      font-size: 0;
      color: $color-primary
    }

    .la-ball-pulse, .la-ball-pulse > div {
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box
    }

    .la-ball-pulse.la-dark {
      color: #333
    }

    .la-ball-pulse > div {
      display: inline-block;
      float: none;
      background-color: currentColor;
      border: 0 solid currentColor
    }

    .la-ball-pulse {
      width: 60px;
      height: 30px;
      vertical-align: middle;
      line-height: 30px;
    }

    .la-ball-pulse > div:nth-child(1) {
      -webkit-animation-delay: -200ms;
      -moz-animation-delay: -200ms;
      -o-animation-delay: -200ms;
      animation-delay: -200ms
    }

    .la-ball-pulse > div:nth-child(2) {
      -webkit-animation-delay: -100ms;
      -moz-animation-delay: -100ms;
      -o-animation-delay: -100ms;
      animation-delay: -100ms
    }

    .la-ball-pulse > div:nth-child(3) {
      -webkit-animation-delay: 0ms;
      -moz-animation-delay: 0ms;
      -o-animation-delay: 0ms;
      animation-delay: 0ms
    }

    .la-ball-pulse > div {
      width: 12px;
      height: 12px;
      margin: 4px;
      border-radius: 100%;
      -webkit-animation: ball-pulse 1s ease infinite;
      -moz-animation: ball-pulse 1s ease infinite;
      -o-animation: ball-pulse 1s ease infinite;
      animation: ball-pulse 1s ease infinite
    }

    .la-ball-pulse.la-sm {
      width: 26px;
      height: 8px
    }

    .la-ball-pulse.la-sm > div {
      width: 4px;
      height: 4px;
      margin: 2px
    }

    .la-ball-pulse.la-2x {
      width: 108px;
      height: 36px
    }

    .la-ball-pulse.la-2x > div {
      width: 20px;
      height: 20px;
      margin: 8px
    }

    .la-ball-pulse.la-3x {
      width: 162px;
      height: 54px
    }

    .la-ball-pulse.la-3x > div {
      width: 30px;
      height: 30px;
      margin: 12px
    }

  }

  @-webkit-keyframes ball-pulse {
    0%, 60%, 100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
    30% {
      opacity: .1;
      -webkit-transform: scale(0.01);
      transform: scale(0.01)
    }
  }

  @-moz-keyframes ball-pulse {
    0%, 60%, 100% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1)
    }
    30% {
      opacity: .1;
      -moz-transform: scale(0.01);
      transform: scale(0.01)
    }
  }

  @-o-keyframes ball-pulse {
    0%, 60%, 100% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1)
    }
    30% {
      opacity: .1;
      -o-transform: scale(0.01);
      transform: scale(0.01)
    }
  }

  @keyframes ball-pulse {
    0%, 60%, 100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1)
    }
    30% {
      opacity: .1;
      -webkit-transform: scale(0.01);
      -moz-transform: scale(0.01);
      -o-transform: scale(0.01);
      transform: scale(0.01)
    }
  }
</style>
