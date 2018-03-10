<template>
  <div>
    <div class="project-posts-view">
      <div class="wall-view">
        <div class="wall-warp">
          <div class="wall-left">
            <header class="wall-left-header clearfix">
              <div class="btn-group float-left">
                <a class="btn btn-link dropdown-toggle">
                  所有分享<span class="icon icon-chevron-down"></span></a>
              </div>
              <div class="btn-group post-create-wrap float-right">
                <a @click="createPost" class="btn btn-link link-add-handler">
                  <span>添加分享</span>
                </a>
              </div>
            </header>
            <nav class="thin-scroll posts-nav">
              <ul class="posts-list list-unstyled">
                <loading class="mt-2" v-if="isLoading"></loading>
                <li @click="postId=pt._id"
                    :class="{'active':pt._id===postId}"
                    class="post-item" v-for="pt in posts">
                  <section>
                    <img class="avatar img-36 img-circle float-left" src="/static/images/head.jpg" alt="">
                    <div class="post-content">
                      <span class="post-title" v-html="pt.title"></span>
                      <p class="post-info">
                        <span v-html="pt.creator.username"></span>
                        <time class="time-stamp" v-html="pt.create_at"></time>
                      </p>
                    </div>
                  </section>
                  <div class="post-icons"><span class="icon icon-pin"></span></div>
                </li>
                <li v-if="posts.length===0&&isLoading===false" class="post-item-none text-center mt-5">
                  <p><span>Oops 暂无任何分享</span></p>
                </li>
              </ul>
            </nav>
          </div>
          <div class="wall-right">
            <div class="post-view thin-scroll">
              <div class="post-view-header">
                <h3 v-html="post.title"></h3>
              </div>
              <div v-html="post.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <create-post-editor
        :post="newPost"
        @close="closeCreator"
        @submit="submitCreator"
        v-if="showCreator"></create-post-editor>
    </transition>
  </div>
</template>
<style scoped lang="scss">
  .wall-view {
    background: #fff;
    display: block;
    border: 1px solid $color-border-gary;
    position: relative;
    width: 100%;
    max-width: 1170px;
    height: 99%;
    margin: 0 auto;
    overflow: hidden;
    .wall-warp {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      background-color: #fff;
      border-radius: 3px 3px 0 0;
      .wall-left {
        position: relative;
        border-right: 1px solid $color-border-gary;
        float: left;
        width: 300px;
        height: 100%;
      }
      .wall-right {
        position: relative;
        height: 100%;
        margin-left: 300px;
      }
    }
  }

  .project-posts-view {
    position: fixed;
    top: 120px;
    margin: 0 auto;
    right: 0;
    bottom: 0;
    left: 0;
    .wall-view {
      background-color: #fff;
      border-radius: 3px 3px 0 0;
      box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
    }
    .wall-left-header {
      line-height: 50px;
      border-bottom: 1px solid $color-border-gary;
      .btn {
        height: 60px;
        line-height: 50px;
        padding: 5px 15px;
        color: $color-font-gay;
        font-size: 18px;
        &.link-add-handler {
          font-size: 16px;
          color: $color-primary;
        }
      }
    }
    .posts-nav {
      position: absolute;
      top: 61px;
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .post-view {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 15px;
    }
    .posts-list {
      .post-item {
        padding: 20px;
        cursor: pointer;
        height: 81px;
        overflow: hidden;
        border-bottom: 1px solid $color-border-gary;
        &:hover, &.active {
          color: $color-primary;
        }
        &.active {
          background: #fafafa;
        }
        .avatar {
          display: block;
          width: 40px;
          height: 40px;
        }
        p {
          margin: 0;
        }
        .post-content {
          margin-left: 50px;
          line-height: 22px;
          padding-right: 12px;
          .post-title {
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            font-size: 15px;
          }
          .post-info {
            color: $color-font-gay;
            line-height: 20px;
            font-size: 12px;
          }
        }
      }
      .post-item-none {
        color: $color-font-gay;
        font-size: 13px;
      }
    }
  }

</style>

<script>
  import Loading from '@/components/Loading';
  import CreatePostEditor from '@/components/CreatePostEditor'
  import Api from '@/utils/api';

  export default {
    name: "project-posts",
    components: {
      Loading, CreatePostEditor
    },
    computed: {
      project() {
        return this.$store.state.project
      }
    },
    watch: {
      'postId': function (n, o) {
        console.log(n);
        this.loadPost(n);
      }
    },
    methods: {
      closeCreator() {
        this.showCreator = false;
      },
      submitCreator(post) {
        console.log(post)
        if (post._id) {
          //update

        } else {
          post._project_id = this.project._id;
          Api.createPost(post).then((res) => {
            //在创建完成之后，关闭后重新LoadPosts
            this.getPosts();
          });
          this.showCreator = false;
        }
      },
      /*当是创建Post的时候*/
      createPost() {
        this.newPost = {title: '', content: ''};
        this.showCreator = true;
      },
      loadPost(n) {
        Api.post(n).then((post) => {
          this.post = post;
        });
      },
      //获取全部分享
      getPosts() {
        Api.projectPosts(this.projectId, {}).then((posts) => {
          this.posts = [];
          this.posts = [...posts];
          this.isLoading = false;
          if (this.posts.length > 0) {
            this.postId = this.posts[0]._id;
          }
        });
      }
    },
    mounted() {
      this.getPosts();
    },
    data() {
      return {
        newPost: {},
        showCreator: false,
        projectId: this.$route.params.project_id,
        postId: '',
        post: {},
        posts: [],
        isLoading: true
      }
    }
  }
</script>

