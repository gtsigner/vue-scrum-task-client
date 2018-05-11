<template>
  <div class="user-info-view">
    <el-form class="form" ref="form" :model="form" label-width="100px">
      <div class="user-avatar text-center el-form-item">
        <label for="">头像</label>
        <img :src="user.avatar" class="avatar" alt="">
        <el-button plain>更换头像</el-button>
      </div>
      <el-form-item label="姓名">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.work"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="个人网址">
        <el-input v-model="form.website"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-block" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "user-my-info",
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    data() {
      return {
        form: {
          nickname: 'godtoy',
          work: '程序员',
          contact: '15760079693',
          address: '四川 成都',
          website: 'https://blog.oeynet.com'
        }
      }
    },
    methods: {
      submit() {
        
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-info-view {
    padding: 20px;
    .form {
      max-width: 500px;
    }
    .user-avatar {
      display: flex;
      align-items: center;
      label {
        width: 100px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
      }
      img {
        margin-left: 10px;
      }
      button {
        margin-left: 30px;
      }
    }
    .avatar {
      height: 130px;
      width: 130px;
      border-radius: 50%;
    }
  }
</style>
