<template>
  <div>
    <div class="title-row">
      <h3>
        Service Profile Manager
        <span>Updated: 5 seconds ago</span>
      </h3>
      <p>Configure a <strong>Service Profile</strong> for a specific <strong>Group</strong> &amp;/or <strong>Dept.</strong></p>
    </div>

    <div class="builder-wrapper">
      <aside>
        <div class="first">
          <h4><span>1</span> Select Department</h4>
          <div class="field-group">
            <label for="department">Department</label>
            <select name="department"
                    id="department"
                    type="select"
                    v-model="selectedDept">
              <option v-for="(item, index) in setDepts"
                      :value="{id: item.value, name: item.text}">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>

        <div class="second" v-if="deptServices && selectedDept">
          <h4><span>2</span> Select Group</h4>
          <div class="field-group">
            <label for="group">Group</label>
            <select name="group"
                    id="group"
                    type="select"
                    v-model="selectedGroup">
              <option v-for="(item, index) in setDeptGroups"
                      :value="{id: item.value, name: item.text}">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>
      </aside>

      <div class="questions-wrapper">
        <fn1-tabs>
          <fn1-tab :name="`Services`"
                   :selected="true">
            <h4 v-if="deptServices && selectedDept">
              <span>3</span> Configure Profile Services
            </h4>

            <p v-if="!selectedDept">
              First, select a <strong>Department</strong>.
            </p>

            <div class="dept-services" v-if="selectedDept">
              <template v-if="!deptServices && selectedDept">
                <p>No <strong>Department Service Profile</strong> associated with <strong>{{selectedDept.name}}.</strong></p>
              </template>

              <template v-if="deptServices">
                <div class="search-wrapper">
                  <fn1-input v-model="deptServicesAddSearch"
                             label="Add Department Service"
                             autocomplete="off"
                             placeholder="Search Services"
                             name="acct-req-search"
                             id="acct-req-search" />

                  <template v-if="deptServicesAddSearch">
                    <ul class="search-results">
                      <li v-for="s, i in availDeptServicesList"
                          :key="i">
                        <strong>{{s.id}}:</strong>&nbsp;{{s.name}}
                        <fn1-button @click.native="addService('dept', s, i)">
                          + add
                        </fn1-button>
                      </li>
                    </ul>
                  </template>
                </div>

                <h5>
                  Department Services&nbsp;
                  <fn1-badge class="default">
                    {{deptServices.length}}
                  </fn1-badge>
                </h5>
                <p><small>ID: Name</small></p>

                <ul>
                  <li v-for="s, i in deptServices" :key="i">
                    <exampleModal ref="deptModal"
                                  title="Remove - Dept Service"
                                  launchButtonText="&#10005;">

                      <p slot="body">{{i}} Remove <strong>{{s.name}}</strong> from <strong>{{deptProfile.name}}'s Services Profile</strong>?</p>

                      <fn1-button slot="footer"
                                  title="Confirm - Remove Service"
                                  @click.native="removeService('dept', s, i, $event)">
                        Confirm
                      </fn1-button>

                      <fn1-button slot="footer"
                                  title="Cancel - Remove Service"
                                  @click.native="cancelRemoveService('dept', i, $event)">
                        Cancel
                      </fn1-button>
                    </exampleModal>

                    <strong>{{s.id}}:&nbsp;</strong>{{s.name}}
                  </li>
                </ul>
              </template>
            </div>

            <div class="group-services" v-if="deptServices && selectedGroup">
              <template v-if="!groupServices && selectedGroup">
                <p>No <strong>Group Service Profile</strong> associated with <strong>{{selectedDept.name}} / {{selectedGroup.name}}.</strong></p>
              </template>

              <template v-if="groupServices">
                <div class="search-wrapper">
                  <fn1-input v-model="groupServicesAddSearch"
                     label="Add Group Service"
                     autocomplete="off"
                     placeholder="Search Services"
                     name="acct-req-search"
                     id="acct-req-search" />

                  <template v-if="groupServicesAddSearch">
                    <ul class="search-results">
                      <li v-for="s, i in availGroupServicesList"
                          :key="i">
                        <strong>{{s.id}}:</strong>&nbsp;{{s.name}}
                        <fn1-button @click.native="addService('group', s, i)">
                          Add
                        </fn1-button>
                      </li>
                    </ul>
                  </template>
                </div>

                <h5>
                  Group Services&nbsp;
                  <fn1-badge class="default">
                    {{groupServices.length}}
                  </fn1-badge>
                </h5>
                <p><small>ID: Name</small></p>

                <ul>
                  <li v-for="s, i in groupServices" :key="i">
                    <exampleModal ref="groupModal"
                                  title="Remove - Group Service"
                                  launchButtonText="&#10005;">

                      <p slot="body">{{i}} Remove <strong>{{s.name}}</strong> from <strong>{{selectedGroup.name}}'s Services Profile</strong>?</p>

                      <fn1-button slot="footer"
                                  title="Confirm - Remove Service"
                                  @click.native="removeService('group', s, i, $event)">
                        Confirm
                      </fn1-button>

                      <fn1-button slot="footer"
                                  title="Cancel - Remove Service"
                                  @click.native="cancelRemoveService('group', i, $event)">
                        Cancel
                      </fn1-button>
                    </exampleModal>

                    <strong>{{s.id}}:</strong>&nbsp;{{s.name}}
                  </li>
                </ul>
              </template>
            </div>
          </fn1-tab>

          <fn1-tab :name="`Questions`">
            <template v-if="selectedDept">
              <h4>
                <span>4</span> Additional Questions
              </h4>

              <p class="question-note"><strong>note:</strong> Shown below is how each question will appear on the <strong>Account Request Wizard</strong>.</p>

              <div class="dept-questions">
                <div class="title-row">
                  <h5>Department Questions</h5>
                  <exampleModal ref="addDeptQuestionModal"
                                title="Add - Department Question"
                                launchButtonText="add new">

                    <p slot="body">So, you want to add a new question, huh?!</p>

                    <fn1-button slot="footer"
                                title="Confirm">
                      Confirm
                    </fn1-button>

                    <fn1-button slot="footer"
                                title="Cancel">
                      Cancel
                    </fn1-button>
                  </exampleModal>
                </div>

                <div class="inside-wrapper" v-if="deptQuestions">
                  <template v-for="question, i in deptQuestions">
                    <template v-if="question.type == 'select'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <exampleModal ref="editDeptQuestionModal"
                                title="Edit - Department Question"
                                launchButtonText="edit">

                            <p slot="body">Lets edit it</p>

                            <fn1-button slot="footer"
                                        title="Confirm">
                              Confirm
                            </fn1-button>

                            <fn1-button slot="footer"
                                        title="Cancel">
                              Cancel
                            </fn1-button>
                          </exampleModal>

                          <exampleModal ref="removeDeptQuestionModal"
                                title="Remove - Department Question"
                                launchButtonText="&#10005;">

                            <p slot="body">Sure you want to remove?</p>

                            <fn1-button slot="footer"
                                        title="Confirm">
                              Confirm
                            </fn1-button>

                            <fn1-button slot="footer"
                                        title="Cancel">
                              Cancel
                            </fn1-button>
                          </exampleModal>
                        </div>

                        <div class="field-group">
                          <label :for="question">{{question.text}}</label>
                          <select
                                  :name="question"
                                  :id="question"
                                  type="select">
                            <option v-for="(value, index) in question.value"
                                    :value="value">
                              {{ value }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </template>

                    <template v-if="question.type == 'text'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <fn1-input
                                   :key="index"
                                   :label="question.text"
                                   :placeholder="question.text"
                                   :name="question.text"
                                   :id="question.text" />
                      </div>
                    </template>

                    <template v-if="question.type == 'number'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <fn1-input type="number"

                                   :label="question.text"
                                   :placeholder="question.text"
                                   :name="question.text"
                                   :id="question.text" />
                      </div>
                    </template>

                    <template v-if="question.type == 'textarea'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <div class="field-group">
                          <label :for="question.text">{{question.text}}</label>
                          <textarea type="textarea"

                                    :id="question.text"
                                    :name="question.text"
                                    :placeholder="question.text"></textarea>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>

              <div class="group-questions">
                <div class="title-row">
                  <h5>Group Questions</h5>
                  <fn1-button>
                    add new
                  </fn1-button>
                </div>


                <div class="inside-wrapper" v-if="groupQuestions">
                  <template v-for="question, i in groupQuestions">
                    <template v-if="question.type == 'select'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <div class="field-group">
                          <label :for="question">{{question.text}}</label>
                          <select
                                  :name="question"
                                  :id="question"
                                  type="select">
                            <option v-for="(value, index) in question.value"
                                    :value="value">
                              {{ value }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </template>

                    <template v-if="question.type == 'text'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <fn1-input
                                   :key="index"
                                   :label="question.text"
                                   :placeholder="question.text"
                                   :name="question.text"
                                   :id="question.text" />
                      </div>
                    </template>

                    <template v-if="question.type == 'number'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <fn1-input type="number"
                                   :label="question.text"
                                   :placeholder="question.text"
                                   :name="question.text"
                                   :id="question.text" />
                      </div>
                    </template>

                    <template v-if="question.type == 'textarea'">
                      <div class="edit-wrapper">
                        <div class="actions">
                          <fn1-button>edit</fn1-button>
                          <fn1-button>&#10005;</fn1-button>
                        </div>

                        <div class="field-group">
                          <label :for="question.text">{{question.text}}</label>
                          <textarea type="textarea"
                                    :id="question.text"
                                    :name="question.text"
                                    :placeholder="question.text"></textarea>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
            </template>

            <p v-if="!selectedDept">
              First, select a <strong>Department</strong>.
            </p>
          </fn1-tab>
        </fn1-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }         from 'vuex'
import { mapFields }   from 'vuex-map-fields'
import axios           from 'axios'

import headerNav       from '~/components/headerNav'
import exampleModal    from '~/components/exampleModal'
import exampleCheckbox from '~/components/exampleCheckbox'

export default {
  layout:           'profiles',
  middleware:       'authenticated',
  components: {
    headerNav,
    exampleModal,
    exampleCheckbox
  },
  mounted() {
    this.getDepts();
    this.getServices()
    .then((resolve) => {
      this.allServices = resolve;
      console.log(`%c getServices 👌 `, this.consoleLog.success);
    }, (reject) => {
      console.log(`%c getServices 🛑 `, this.consoleLog.error);
    })
  },
  data() {
    return {
      allServices:            [],

      deptServicesAddSearch:  null,
      deptServiceIDs:         [],
      deptQuestions:          [],
      availDeptServices:      [],

      groupServicesAddSearch: null,
      groupServiceIDs:        [],
      groupQuestions:         [],
      availGroupServices:     [],

      deptTypeModal:         'dept',
      departments:           [],
      selectedDept:          null,
      deptProfile:           [],
      selectedDeptServices:  [],

      groupTypeModal:        'group',
      groups:                [],
      selectedGroup:         null,
      groupProfile:          [],
      selectedGroupServices: [],
    }
  },
  watch: {
    selectedDept: function(val, oldVal) {
      if(val !== oldVal) {
        this.getGroups();

        this.deptQuestions  = [],
        this.groupQuestions = [],
        this.groupProfile   = [],
        this.selectedGroup  = null;

        this.getDeptProfile()
        .then((resolve) => {
          console.log(resolve);
          this.deptProfile = resolve;

          if(resolve.questions !== null) {
            let parsedDeptQs = JSON.parse(resolve.questions);
            this.deptQuestions = parsedDeptQs;
          }

          this.getDeptServiceIDs()
          .then((resolve) => {
            console.log(`%c getDeptServiceIDs 👌 `, this.consoleLog.success);

            this.getAvailDeptServices()
            .then((resolve) => {
              this.availDeptServices = resolve;
              console.log(`%c availDeptServices 👌 `, this.consoleLog.success);
            });
          });

          console.log(`%c getDeptProfile 👌 `, this.consoleLog.success);
        }, (reject) => {
          this.deptProfile = [],
          this.deptServiceIDs = [],
          this.availDeptServices = [];

          console.log(`%c getDeptProfile 🛑 `, this.consoleLog.error);
        });
      }
    },
    selectedGroup: function(val, oldVal) {
      if(val !== oldVal) {
        this.groupQuestions = [];

        this.getGroupProfile()
        .then((resolve) => {
          this.groupProfile = resolve;

          if(resolve.questions !== null) {
            let parsedGroupQs = JSON.parse(resolve.questions);
            this.groupQuestions = parsedGroupQs;
          }

          this.getGroupServiceIDs()
          .then((resolve) => {
            console.log(`%c getGroupServiceIDs 👌 `, this.consoleLog.success);

            this.getAvailGroupServices()
            .then((resolve) => {
              this.availGroupServices = resolve;
              console.log(`%c availGroupServices 👌 `, this.consoleLog.success);
            });
          });

          console.log(`%c getGroupProfile 👌 `, this.consoleLog.success);
        }, (reject) => {
          this.groupProfile = [],
          this.groupServiceIDs = [],
          this.availGroupServices = [];

          console.log(`%c getGroupProfile 🛑 `, this.consoleLog.error);
        });
      }
    }
  },
  computed: {
    ...mapFields(['consoleLog']),
    setDepts() {
      let deptSelectArray = [];

      let depts = this.departments.map(
        value => { return {id: value.id, name: value.name}}
      );

      depts.forEach(function(dept) {
        deptSelectArray.push({
          "value": dept.id,
          "text": dept.name
        });
      });
      return deptSelectArray;
    },
    setDeptGroups() {
      let groupSelectArray = [];

      let groups = this.groups.map(
        value => { return {id: value.id, name: value.name}}
      );

      groups.forEach(function(group) {
        groupSelectArray.push({
          "text": group.name,
          "value": group.id
        });
      });
      return groupSelectArray;
    },
    deptServices() {
      return this.deptProfile.services
    },
    groupServices() {
      return this.groupProfile.services
    },
    availDeptServicesList() {
      return this.availDeptServices
      .filter(service => {
        let name = service.name.toLowerCase();
        return name.includes(this.deptServicesAddSearch.toLowerCase())
      })
    },
    availGroupServicesList() {
      return this.availGroupServices
      .filter(service => {
        let name = service.name.toLowerCase();
        return name.includes(this.groupServicesAddSearch.toLowerCase())
      })
    },
  },
  methods: {
    getServices() {
      return new Promise((resolve,reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.service}?limit=5000`)
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((e) => {
          reject(e);
        });
      });
    },
    getDepts() {
      axios.get(`${process.env.ttApi}${process.env.deptService}`)
      .then((res) => {
        this.departments = res.data;
        console.log(`%c getDepts 👌 `, this.consoleLog.success);
      })
      .catch((e) => {
        console.log(`%c getDepts 🛑 `, this.consoleLog.error);
      })
    },
    getDeptProfile() {
      return new Promise((resolve, reject) => {
        this.$axios.get(`${process.env.api}${process.env.profile}?department_id=${this.selectedDept.id}`)
        .then((response) => {
          if(response.data.results.length > 0) {
            resolve(response.data.results[0]);
          } else {
            reject();
          }
        })
        .catch((e) => {
          console.log(e);
        })
      });
    },
    getDeptServiceIDs() {
      this.deptServiceIDs = [];
      return new Promise((resolve) => {
        resolve(
          this.deptServices.forEach((s) => {
            this.deptServiceIDs.push(s.id)
          })
        )
      });
    },
    getAvailDeptServices() {
      return new Promise((resolve) => {
        resolve(
          this.allServices.filter((item) => {
            return this.deptServiceIDs.indexOf(item.id) == -1;
          })
        )
      });
    },
    getGroups() {
      axios.get(`${process.env.ttApi}${process.env.groupService}?department_id=${this.selectedDept.id}`)
      .then((res) => {
        this.groups = res.data;
        console.log(`%c getGroups 👌 `, this.consoleLog.success);
      })
      .catch((error) => {
        console.log(`%c getDepts 🛑 `, this.consoleLog.error);
      })
    },
    getGroupProfile() {
      return new Promise((resolve, reject) => {
        this.$axios.get(`${process.env.api}${process.env.profile}?department_id=${this.selectedDept.id}&group_id=${this.selectedGroup.id}`)
        .then((response) => {
          if(response.data.results.length > 0) {
            resolve(response.data.results[0]);
          } else {
            reject();
          }
        })
        .catch((e) => {
          console.log(e);
        })
      });
    },
    getGroupServiceIDs() {
      this.groupServiceIDs = [];
      return new Promise((resolve) => {
        resolve(
          this.groupServices.forEach((s) => {
            this.groupServiceIDs.push(s.id)
          })
        )
      });
    },
    getAvailGroupServices() {
      return new Promise((resolve) => {
        resolve(
          this.allServices.filter((item) => {
            return this.groupServiceIDs.indexOf(item.id) == -1;
          })
        )
      });
    },
    addService(type, service, i) {
      alert(JSON.stringify(service));

      if(type === this.deptTypeModal) {
        alert(JSON.stringify(this.deptProfile));
        this.deptServicesAddSearch = null;
      } else if(type === this.groupTypeModal){
        alert(JSON.stringify(this.groupProfile));
        this.groupServicesAddSearch = null;
      }
    },
    removeService(type, service, i, e) {
      if(type === this.deptTypeModal) {
        this.$refs.deptModal[i].showModal = false;
      } else if(type === this.groupTypeModal){
        this.$refs.groupModal[i].showModal = false;
      }

      let profileID = this.deptProfile.id;

      // alert(JSON.stringify(service));
      // alert(JSON.stringify(this.deptProfile));
    },
    cancelRemoveService(type, i, e) {
      if(type === this.deptTypeModal) {
        this.$refs.deptModal[i].showModal = false;
      } else if(type === this.groupTypeModal){
        this.$refs.groupModal[i].showModal = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  p {
    small {
      display: block;
      font-size: 14px;
      color: lighten($text-color, 25%);
      font-weight: 600;
      margin: 0 0 10px 0;
    }

    &.question-note {
      margin: 0 0 20px 50px;
    }
  }

  .title-row {
    border-bottom: 1px solid lighten($text-color, 50%);
    padding: 0 0 10px 0;
    margin: 0 0 20px 0;

    h3 {
      display: flex;
      border-bottom: 1px solid lighten($text-color, 50%);
      padding: 0 0 10px 0;
      margin: 0 0 10px 0;

      span {
        margin-left: auto;
        font-size: 14px;
        color: lighten($text-color, 25%);
        font-weight: 600;
      }
    }

    p {
      padding: 0 0 10px 0;
      margin: 0 0 10px 0;

      &:last-of-type {
        padding: 0;
        margin: 0;
      }
    }
  }

  .modal-footer{
    .button,
    button {
      color: white !important;
      padding: 5px 15px !important;
      margin: 0 10px 0 0 !important;
      border-radius: $radius-default !important;

      &:hover {
        color: white !important;
      }

      &:first-child {
        background-color: $color-green !important;

        &:hover {
          background-color: darken($color-green, 5%) !important;
        }
      }

      &:last-child {
        background-color: $color-orange-darker !important;

        &:hover {
          background-color: darken($color-orange-darker, 5%) !important;
        }
      }
    }
  }

  .tabs-group {
    flex: 1;
    height: 100%;

    /deep/ .tabs {
      ul {
        li {
          position: relative;
          color: $text-color;
          font-size: 18px;
          line-height: 18px;
          border-bottom: 1px solid transparent;
        }
      }
    }

    /deep/ .tab-content {
      padding: 0;
      height: calc(100% - 36px);

      ul {
        display: block;
        width: auto;
        // background-color: green;
        margin: 0;
        padding: 0;

        li {
          color: $text-color;
          border: none;
          text-align: left;
          cursor: default;
          padding: 0;
          margin: 0 0 5px 0;
          display: block;
          width: 100%;
          border-radius: 0;

          &:nth-child(even) {
            background: rgba($color-cloud, 0.3);
          }

          &:hover {
            background-color: lighten($color-grey, 10%);
            color: $text-color;
          }
        }
      }
    }
  }

  .builder-wrapper {
    display: flex;
    flex-wrap: wrap;
    // background-color: red;
    height: calc(100vh - 270px);

    aside {
      // background-color: blue;
      color: $text-color;
      width: 350px;
      margin: 0 40px 0 0;
    }

    .questions-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;

      .tab-pane {
        // background-color: purple;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        padding: 20px 0;
        height: 100%;
      }

      ul {
        position: relative;
        // background-color: pink;
        width: 100%;
        border-bottom: none;
        height: calc(100% - 158px);
        overflow-y: scroll;

        li {
          border-top: 1px solid lighten($text-color, 50%);
          padding: 8px 0 8px 8px;
          margin: 0;
          // background-color: green;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          /deep/ button {
            margin: 0 10px 0 0;
            background-color: transparent;
            border-radius: 0;
            border: none;
            padding: 0;
            color: $color-vermilion;

            &:hover {
              color: $color-green;
            }
          }
        }
      }

      .dept-services,
      .dept-questions {
        margin: 0 40px 0 0;
      }

      .group-services,
      .group-questions {
        padding: 0 0 0 40px;
        border-left: 1px solid lighten($text-color, 50%);
      }

      .dept-questions,
      .group-questions {

        .title-row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 !important;
          padding: 0 0 10px 0;
          border-bottom: 1px solid lighten($text-color, 50%);

          h5 {
            display: inline-block;
            width: auto;
          }

          /deep/ button {
            background-color: $color-green;
            margin-left: auto;
          }
        }

        .inside-wrapper {
          // background-color: red;
          height: calc(100% - 100px);
          overflow-y: scroll;
        }

        .edit-wrapper {
          margin: 0;
          padding: 20px 8px;
          border-bottom: 1px solid lighten($text-color, 50%);
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          &:nth-child(even) {
            background: rgba($color-cloud, 0.3);
          }

          &:hover {
            background-color: lighten($color-grey, 10%);
          }

          &:last-of-type {
            border-bottom: none;
          }

          .field-group {
            margin: 0;
          }

          .actions {
            width: 100px;
            margin: 0 20px 0 0;
            border-right: 1px solid lighten($text-color, 50%);

            button {
              background-color: $color-silver;
            }
          }
        }
      }

      .dept-services,
      .group-services,
      .dept-questions,
      .group-questions {
        height: calc(100% - 20px);
        flex: 1;
        // background-color: purple;

        .badge {
          font-size: 14px;
        }

        .field-group {
          margin: 0 0 20px 0;
        }

        .search-wrapper {
          position: relative;

          .field-group {
            z-index: 10;
            position: relative;
            margin: 20px 0;
          }

          ul {
            &.search-results {
              z-index: 1;
              background-color: white;
              filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
              height: auto;
              max-height: 350px;
              position: absolute;
              top: 61px;
              border: 1px solid lighten($text-color, 50%);
              border-bottom-left-radius: $radius-default;
              border-bottom-right-radius: $radius-default;

              li {
                &:hover {
                  /deep/ button {
                    color: $color-green;
                  }
                }
              }

              button {
                color: $text-color;
                margin-left: auto;

                &:hover {
                  color: $color-green;
                }
              }
            }
          }
        }
      }
    }

    h4 {
      display: flex;
      align-items: center;

      span {
        background-color: $color-blue;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin: 0 10px 0 0;
        border-radius: $radius-circle;
      }
    }

    h5 {
      color: $text-color;
      font-size: 18px;
      margin-bottom: 8px !important;
      font-weight: 600;
      width: 100%;
    }

    .field-group {
      margin: 0 0 0 50px;
    }

    .form-group {
      position: relative;
      margin: 0 0 40px 0;
      height: 450px;
      width: 400px;
      overflow-y: hidden;
      padding: 0;

      fieldset {
        padding: 0;

        legend {
          font-weight: $weight-semi-bold;
          border-bottom: 1px solid lighten($text-color, 50%);
          width: 100%;
          padding: 0 0 5px 0;
          margin: 0 0 10px 0;
        }

        div {
          padding: 0;
          align-items: center;
          margin: 0 0 8px 0;
        }

        small {
          display: block;
          font-size: 14px;
          color: lighten($text-color, 25%);
          font-weight: 600;
          margin: 0 0 10px 0;
        }
      }

      label {
        font-weight: $weight-normal;
        font-size: 16px;
        line-height: 18px;
        color: $text-color;
        margin: 0 0 0 8px !important;
      }

      .checkbox-wrapper {
        position: absolute;
        display: block;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: scroll;
      }
    }

    div {
      &.first,
      &.second {
        flex-basis: 50%;
        // background-color: orange;
        margin: 0 0 40px 0;
      }

      &.third {
        margin: 20px 0 0 0;
        flex-basis: 100%;
        // background-color: green;

        .form-group {
          // background-color: red;
          display: inline-flex;
          color: $text-color;
          border-right: 1px solid lighten($text-color, 50%);
          margin: 15px 25px 0 25px;
          padding: 0 25px 0 0;

          /deep/ fieldset {
            padding: 0;

            legend {
              font-size: 16px;
              line-height: 21px;
              font-weight: $weight-semi-bold;
            }

            label {
              font-size: 16px;
              margin-bottom: 0 !important;
            }
          }

          &:first-of-type {
            margin: 0 0 0 50px;
            padding: 0 25px 0 0;
          }

          &:last-of-type {
            border-right: none;
          }
        }
      }
    }
  }
</style>