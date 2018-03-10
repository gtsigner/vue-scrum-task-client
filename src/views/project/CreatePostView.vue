<template>
  <div class="">
    <textarea name="" id="postContent" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
  import Simditor from 'simditor'

  export default {
    name: "create-post-view",
    methods: {
      loadEditor() {
        this.editor = new Simditor({
          textarea: document.getElementById('postContent'),
          pasteImage: false,//是否允许粘贴上传图片，依赖 upload 选项，仅支持 Firefox 和 Chrome 浏览器。
          tabIndent: false,//是否在编辑器中使用 tab 键来缩进
        });
      },
    },
    created() {
      this.loadEditor();
    }
  }
</script>

<style scoped lang="scss">

</style>
