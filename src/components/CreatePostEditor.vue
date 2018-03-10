<template>
  <div class="modal thin-scroll">
    <div class="modal-creator">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">创建分享至 <span>敏捷开发-毕业设计</span></h5>
          <button @click="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="create-post-view">
            <div class="form-group">
              <input v-model="post.title" type="text" class="form-control" placeholder="输入文档标题">
            </div>
            <div class="form-group">
              <textarea v-model="post.content" id="post-editor" placeholder="输入文档内容" autofocus></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer fixed-bottom">
          <button @click="submit" type="button" class="btn btn-primary">创建分享</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Simditor from 'simditor'

  //import 'simditor/styles/simditor.scss'
  import '../assets/scss/simditor.scss'

  export default {
    name: "create-post-editor",
    props: {
      post: {}
    },
    data() {
      return {
        editorType: 'Normal',//[normal,markdown]
      }
    },
    methods: {
      loadEditor() {
        console.log(this.editor);
        this.$editor = new Simditor({
          textarea: document.getElementById('post-editor')
        });
      },
      close() {
        this.$emit('close');
      },
      submit() {
        this.post.content = this.$editor.getValue();
        this.$emit('submit', this.post);
      }
    },
    mounted() {
      this.loadEditor();
    }
  }
</script>

<style scoped lang="scss">

  .create-post-view {
    max-width: 920px;
    display: block;
    margin: 0 auto;
    .form-group .form-control {
      border: none;
      line-height: 50px;
      font-size: 20px;
      color: $color-font-gay;
    }
    .simditor {
      border: none;
    }
  }

  .simditor {
    border: none;
  }

  .modal {
    opacity: 1;
    background: #fff;
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    .modal-creator {
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      min-height: 100%;
      width: 100%;
    }
    .modal-content {
      display: block;
      border-bottom: none;
    }
    .modal-body {
      padding: 10px 0 101px;
    }
    .modal-footer {
      background: #fff;
    }
  }

  /*过度*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
