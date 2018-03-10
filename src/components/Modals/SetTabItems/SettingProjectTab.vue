<template>
  <form class="project-setting-form">
    <div class="row">
      <div class="col">
        <label class="col-form-label">项目封面</label>
        <div class="project-logo">
          <img :src="project.logo" alt="">
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="form-group col">
        <label class="col-form-label">项目名称</label>
        <input type="text" class="form-control" v-model="project.title">
      </div>
      <div class="form-group col">
        <label class="col-form-label">项目分类</label>
        <select class="form-control disabled" disabled>
          <option value="">暂无分类</option>
        </select>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <label class="col-form-label">项目分类</label>
        <textarea v-model="project.description"
                  class="form-control" name="" id="" cols="30"
                  rows="10"></textarea>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col text-right">
        <button type="button" @click="submit" class="btn btn-primary">保存更改</button>
      </div>
    </div>
  </form>
</template>

<script>
  import Api from '@/utils/api'

  export default {
    name: "setting-project-tab",
    data() {
      return {}
    },
    computed: {
      project: {
        get() {
          return this.$store.state.project;
        }
      }
    },
    methods: {
      submit() {
        Api.updateProject(this.project._id, this.project).then((res) => {
          this.$store.dispatch('getProjectAsync', this.project._id);
        });
      }
    }
  }
</script>

<style scoped lang="scss">

  .project-setting-form {
    padding: 15px;
    .project-logo {
      img {
        height: 150px;
        width: 300px;
        cursor: pointer;
        display: block;
      }
    }
  }
</style>
