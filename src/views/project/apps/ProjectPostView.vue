<template>
  <div class="wall-right">
    <div class="post-view thin-scroll">
      <div class="post-detail-warp">
        <div class="post-view-header">
          <h3 class="title" v-html="post.title"></h3>
          <div class="menu">
            <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑分享</el-dropdown-item>
                <el-dropdown-item>置顶分享</el-dropdown-item>
                <el-dropdown-item>取消置顶</el-dropdown-item>
                <el-dropdown-item>复制分享链接</el-dropdown-item>
                <el-dropdown-item>删除分享</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="post-content-view mt-2">
          <div class="simditor">
            <div class="simditor-body" v-html="post.content"></div>
          </div>
        </div>
      </div>
      <div class="tags-view">
        <div class="tags-content-warp">
          <div class="tags-header">
            <span class="ion ion-thermometer"></span>标签：
          </div>
          <div class="tags-list-real">
            <ul class="list-group list-unstyled tags-list list-inline">
              <li>分享</li>
              <li>技术</li>
              <li>PHP</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="comments-view">
        <h5 class="big-title">评论：</h5>
        <ul class="list-unstyled">
          <li class="comment-item" v-for="comment in comments" :key="comment._id">
            <div>
              <img class="avatar" :src="comment.creator.avatar"/>
            </div>
            <div>
              <span class="username" v-html="comment.creator.username"></span>
              <p v-html="comment.content"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer class="activity-creator-wrapper">
      <div class="activity-creator">
        <div class="activity-creator-wrap">
          <div class="flex-text-wrap">
            <div class="comment-input-box">
              <textarea
                v-model="newComment.content"
                placeholder="发表评论"
                class="form-control comment-input">
              </textarea>
            </div>
            <div class="comment-submit-box">
              <button type="button" @click="submitComment" class="btn btn-primary">评论</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "ProjectPostView",
    methods: {
      //发布评论
      async submitComment() {
        let comment = {
          '_postId': this.postId,
          'content': this.newComment.content
        };
        let res = await this.$api.createPostComment(this.postId, comment);
        this.comments = [res, ...this.comments];
      },
      //加载所有评论
      async loadComments(postId) {
        let comments = await this.$api.postComments(postId);
        this.comments = [...comments];
      },
      async loadPost(postId) {
        this.post = await this.$api.post(postId);
        await this.loadComments(postId);
      },
      async edit() {

      },
      async remove() {

      },
      //置顶
      async toggleTop() {

      },
      async copyLink() {

      }
    },
    data() {
      return {
        post: {},
        comments: [],
        newComment: {},
        postId: this.$route.params.postId,
        projectId: this.$route.params._projectId
      }
    },
    watch: {
      ['$route.params.postId'](n) {
        if (n) {
          this.loadPost(n);
        }
      }
    },
    async mounted() {
      this.loadPost(this.postId);
    }
  }
</script>

<style scoped lang="scss">
  .activity-creator-wrapper {
    padding: 10px 15px;
    background-color: #e5e5e5;
    border-top: 1px solid #d9d9d9;
    .flex-text-wrap {
      display: flex;
      flex-direction: row;
      position: relative;
      .comment-input-box {
        flex: 1 1;
        textarea {
          height: 70px;
        }
      }
      .comment-submit-box {
        line-height: 70px;
        padding-left: 15px;
        .btn {
          padding: 10px 20px;
        }
      }
    }
  }

  .post-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #ffffff;
    flex: 1 1;
    .post-view-header {
      border-bottom: 1px solid $color-border-gary;
      padding: 0 10px 10px;
      display: flex;
      .title {
        flex: auto;
      }
      .menu {
        text-align: right;
        width: 200px;
        align-self: center;
      }
    }
    .post-detail-warp {
      padding: 15px;
    }
    .tags-view {
      margin: 15px;
      .tags-content-warp {
        border-top: 1px solid $color-border-gary;
        border-bottom: 1px solid $color-border-gary;
        display: flex;
        color: $color-font-gay;
        padding: 0 10px;
        line-height: 30px;
        .tags-header {
          padding: 15px 0;
          .ion {
            margin-right: 5px;
          }
        }
        .tags-list-real {
          padding: 15px 0;
        }
      }
      ul.list-inline {
        display: block;
      }
      .list-inline {
        li {
          position: relative;
          float: left;
          margin-right: 10px;
          line-height: 30px;
          border-radius: 50px;
          min-width: 60px;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          border: 1px solid $color-border-gary;
          &:hover {
            background: #aaaaaa;
            color: #ffffff;
          }
        }
      }
    }
  }

  .comments-view {
    background: #f5f5f5;
    padding: 20px;
    .big-title {
      line-height: 50px;
      margin-top: -15px;
      font-size: 25px;
    }
    .comment-item {
      display: flex;
      margin-bottom: 20px;
      .avatar {
        margin: 0 10px;
        height: 45px;
        width: 45px;
        border-radius: 50%;
      }
      .username {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
</style>
