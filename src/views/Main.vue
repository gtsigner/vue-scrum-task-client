<template>
  <div>
    <div class="project-box" hidden>
      <i class="fa fa-plus"></i>
      <p class="h3_title">企业项目</p>
      <div class="text-center trash-none">
        <p><i class="ion ion-social-dropbox-outline"></i></p>
        <p>暂无企业项目</p>
      </div>
    </div>
    <div class="project-box">
      <i class="fa fa-plus"></i>
      <p class="h3_title">个人项目</p>
      <b-card no-body class="project-card">
        <b-tabs pills card>
          <b-tab v-for="tb in tabChooseCategories"
                 :key="tb.type" :title="tb.title" :active="tb.active">
            <div class="tb-content row">
              <div class="col-4" v-for="project in projects" :key="project._id"
                   v-if="(project.type===tb.type||tb.type===0)">
                <router-link :to="{name:'ProjectView',params:{_projectId: project._id}}">
                  <div class="project-detail-box"
                       :style="{
                          backgroundImage: 'url(\''+project.logo+'\')'
                       }">
                    <div class="detail">
                      <h4 class="detail-title" v-html="project.title"></h4>
                      <p class="detail-desc" v-html="project.description"></p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-4">
                <div @click="showCreateProjectModal=true"
                     class="project-detail-box create-project-box">
                  <div class="detail">
                    <p class="text-center"><i class="ion ion-plus-circled"></i></p>
                    <h3>创建新项目</h3>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <div class="trash-box">
      <p class="h3_title">项目回收站</p>
      <div class="text-center trash-none">
        <p><i class="ion ion-social-dropbox-outline"></i></p>
        <p>回收站暂无项目</p>
      </div>
    </div>
    <!--创建项目Modal-->
    <div>
      <b-modal
        v-model="showCreateProjectModal"
        id="createProjectModal" show title="规划新项目" ok-only>
        <div>
          <div class="text-center mb-3 mt-1">
            <p>
              <img src="https://dn-st.teambition.net/teambition/images/illustration@3x.2d8d2cc3.png" alt="">
            </p>
            <small class="mt-2 color-gary">为现代化软件开发模式而生</small>
          </div>
          <form>
            <div class="form-group">
              <input type="text" class="form-control"
                     name="title"
                     v-model="newProject.title"
                     required
                     placeholder="项目名称（必填）">
            </div>
            <div class="form-group">
              <input type="text" class="form-control"
                     name="title"
                     v-model="newProject.name"
                     required
                     placeholder="英文标识（必填，生成后http://team.oeynet.com/oeynet）">
            </div>
            <div class="form-group">
              <textarea class="form-control" name="desc"
                        rows="2"
                        v-model="newProject.description"
                        placeholder="项目简介（选填）"></textarea>
            </div>
            <div class="form-group">
              <label for="viewType">项目模板</label>
              <select class="form-control" id="viewType" v-model="newProject.templateId">
                <option value="0">基础模板</option>
                <option value="1">专业模板</option>
              </select>
            </div>
          </form>
        </div>
        <!--footer-->
        <div slot="modal-footer" class="w-100">
          <b-btn size="md"
                 v-if="!isCreating"
                 class="btn-block"
                 variant="primary"
                 @click="createProject">
            完成并创建项目
          </b-btn>
          <b-btn size="md"
                 v-if="isCreating"
                 class="btn-block disabled"
                 variant="primary">
            项目创建中...
          </b-btn>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
  import Api from '../utils/api'

  export default {
    data() {
      return {
        isCreating: false,
        showCreateProjectModal: false,
        isLoading: true,
        tabChooseCategories: [
          {title: '全部', type: 0, active: true},
          {title: '发起的项目', type: 1, active: false},
          {title: '参与的项目', type: 2, active: false}
        ],
        newProject: {
          title: '',
          name: '',
          viewType: '',
          description: '',
          templateId: 0
        },
        projects: [],
      }
    },
    watch: {},
    computed: {},
    components: {},
    methods: {
      //获取所有项目
      async getMyProjects() {
        let res = await Api.projects();
        this.projects = [];
        res.forEach((project) => {
          this.projects.push({
            _id: project._id,
            title: project.title,
            description: project.description,
            logo: project.logo,
            is_smarty: 1,
            type: 1,
            status: project.status
          })
        });
      },
      //创建项目
      async createProject() {
        let project = {
          name: this.newProject.name,
          title: this.newProject.title,
          description: this.newProject.description,
          type: this.newProject.viewType,
          templateId: this.newProject.templateId,
          logo: "/static/images/project_bg_0.png",
        };
        try {
          this.isCreating = true;
          let resProject = await  Api.createProject(project);
          this.projects.push(resProject);
        } catch (e) {

        } finally {
          this.isCreating = false;
          this.showCreateProjectModal = false;
        }
      }
    },
    async created() {
      this.getMyProjects();
    },
    socket: {
      events: {
        'HEART_CHECK'(packet) {
          console.log(packet);
        },
        reconnect() {

        },
        disconnect() {

        },
        connected() {
          console.log('connect');
        },
      }
    }
  }

</script>
<style scoped lang="scss">
  .h3_title {
    font-size: 20px;
    color: #383838;
    font-weight: 500;
    /*border-bottom: 1px solid #383838;*/
  }

  .project-box, .trash-box {
    width: 100%;
    max-width: 870px;
    margin: 1rem auto 0;
  }

  .project-box {
    .project-card {
      background: transparent;
      border: 0;
      .row {
        margin-left: -30px;
        margin-right: -30px;
      }
      .col-4 {
        padding: 0 8px;
      }
    }
    .project-detail-box {
      border-radius: 4px;
      overflow: hidden;
      transition: 0.3s all;
      height: 140px;
      cursor: pointer;
      margin-bottom: 15px;
      transition: -webkit-transform .218s ease;
      transition: transform .218s ease, -webkit-transform .218s ease;
      -webkit-transform: translateY(0);
      transform: translateY(0);
      justify-content: flex-start;
      background: #f7f7f7 no-repeat;
      background-size: cover;

      .detail {
        color: #fff;
        padding: 10px;
        .detail-title, .detail-desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          width: 100%;
          color: #ffffff;
          text-shadow: 0 1px 1px rgba(0, 0, 0, .35)
        }
        .detail-title {
          font-size: 18px;
          margin-bottom: 0;
        }
        .detail-desc {
          font-size: 15px;
        }
      }
      &:hover {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
        box-shadow: 0 7px 21px rgba(56, 56, 56, .15);
      }
    }
    .create-project-box {
      padding: 20px;
      background: #fff;
      p {
        margin-bottom: 10px;
      }
      .ion-plus-circled {
        color: #aaaaaa;
        font-size: 2.5em;
      }
      &:hover .ion-plus-circled, &:hover h3 {
        color: #1e88e5;
      }
      h3 {
        text-align: center;
        color: #aaaaaa;
        font-size: 18px;
      }
    }
  }

  .trash-box, .project-box {
    .ion-social-dropbox-outline {
      font-size: 4em;
    }
    .trash-none p {
      margin-bottom: 6px;
      color: #a6a6a6;
    }
  }
</style>

