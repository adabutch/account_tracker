<template>
  <div>
    <div class="search">
      <div class="wrapper">
        <fn1-input v-model="serviceSearch"
                 label="Service Search"
                 placeholder="Search by Name"
                 name="acct-req-search"
                 id="acct-req-search" />
      </div>
    </div>

    <div class="results-wrapper">
      <div class="results-header">
        <h4>Total Services: <strong>{{allServices.length}}</strong></h4>

        <exampleModal ref="addServiceModal"
                      title="Add - Service"
                      launchButtonText="+ add service">

          <template slot="body">
            <form>
              <div class="row">
                <exampleSelect v-model="formDeployment"
                             label="Deployment"
                             name="deployment"
                             id="deployment"
                             :options="serviceDeploymentOptions" />

                <div class="form-group inline">
                  <fieldset>
                    <legend>Active?</legend>
                    <div v-for="r, i in tfRadios">
                      <input type="radio"
                             name="active-radio"
                             id="active-radio"
                             :value="r.value"
                             v-model="formActive">
                      <label for="active-radio">{{r.text}}</label>
                    </div>
                  </fieldset>
                </div>

                <div class="form-group inline">
                  <fieldset>
                    <legend>Standard Build?</legend>
                    <div v-for="r, i in tfRadios">
                      <input type="radio"
                             name="standard-build"
                             id="standard-build"
                             :value="r.value"
                             v-model="formBuild">
                      <label for="standard-build">{{r.text}}</label>
                    </div>
                  </fieldset>
                </div>

                <div class="form-group inline">
                  <fieldset>
                    <legend>Public?</legend>
                    <div v-for="r, i in tfRadios">
                      <input type="radio"
                             name="public"
                             id="public"
                             :value="r.value"
                             v-model="formPublic">
                      <label for="public">{{r.text}}</label>
                    </div>
                  </fieldset>
                </div>

                <div class="form-group inline">
                  <fieldset>
                    <legend>Internal?</legend>
                    <div v-for="r, i in tfRadios">
                      <input type="radio"
                             name="internal"
                             id="internal"
                             :value="r.value"
                             v-model="formInternal">
                      <label for="internal">{{r.text}}</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <fn1-input v-model="formName"
                         label="Name"
                         placeholder="Name"
                         name="name"
                         id="name" />

              <fn1-input v-model="formUrl"
                         label="URL"
                         placeholder="URL"
                         name="formUrl"
                         id="formUrl" />

              <div class="row">
                <fn1-input v-model="formDeveloper"
                         label="Developer"
                         placeholder="Developer"
                         name="developer"
                         id="developer" />

                <fn1-input v-model="formVersion"
                         label="Version"
                         placeholder="Version"
                         name="version"
                         id="version" />
              </div>

              <div class="row">
                <fn1-input v-model="formPrimaryPOC"
                         label="Primary POC"
                         placeholder="Primary Point of Contact"
                         name="primary-poc"
                         id="primary-poc" />

                <fn1-input v-model="formSecondaryPOC"
                           label="Secondary POC"
                           placeholder="Secondary Point of Contact"
                           name="secondary-poc"
                           id="secondary-poc" />
              </div>

              <div class="field-group">
                <label for="description">Description</label>
                <textarea v-model="formDescription"
                          type="textarea"
                          id="description"
                          placeholder="An optional Service description."></textarea>
              </div>
            </form>
          </template>

          <fn1-button slot="footer"
                      title="Confirm - Remove Service"
                      @click.native="addService()">
            Confirm
          </fn1-button>

          <fn1-button slot="footer"
                      title="Cancel - Remove Service"
                      @click.native="closeModal('addServiceModal')">
            Cancel
          </fn1-button>
        </exampleModal>
      </div>

      <div class="sidebar">
        <p>
          <strong>Updated:</strong>
          <small>{{MMDYYYYDateFormat(lastUpdated)}}</small>
          <small>{{timeAgo(lastUpdated)}}</small>
        </p>

        <div class="status-legend">
          <fn1-badge v-for="s, i in filterStatusLegend"
                     :key="i"
                     :class="s">
            <template v-if="s === 'active'">
              {{s}} <small>&nbsp;{{activeServicesCount}}</small>
            </template>
            <template v-if="s === 'inactive'">
              {{s}} <small>&nbsp;{{inactiveServicesCount}}</small>
            </template>
          </fn1-badge>
        </div>
      </div>

      <div class="results" v-if="allServices">
        <div v-for="s, i in filteredServices"
             class="result"
             :class="{'active': s.active, 'inactive': !s.active}">

          <div>
            <p class="label">{{s.name}}</p>
          </div>

          <div>
            <p class="label">Last Update</p>
            <p v-if="s.updated">{{MMDYYYYDateFormat(s.updated)}}</p>
            <p v-if="s.updated">{{timeAgo(s.updated)}}</p>
          </div>

          <div class="actions">
            <exampleModal ref="editServiceModal"
                          title="Edit - Service"
                          launchButtonText="edit">

              <template slot="body">
                <form>
                  <!-- <div class="row">
                    <exampleSelect v-model="formDeployment"
                                 label="Deployment"
                                 name="deployment"
                                 id="deployment"
                                 :options="serviceDeploymentOptions" />

                    <div class="form-group inline">
                      <fieldset>
                        <legend>Active?</legend>
                        <div v-for="r, i in tfRadios">
                          <input type="radio"
                                 name="active-radio"
                                 id="active-radio"
                                 :value="r.value"
                                 v-model="formActive">
                          <label for="active-radio">{{r.text}}</label>
                        </div>
                      </fieldset>
                    </div>

                    <div class="form-group inline">
                      <fieldset>
                        <legend>Standard Build?</legend>
                        <div v-for="r, i in tfRadios">
                          <input type="radio"
                                 name="standard-build"
                                 id="standard-build"
                                 :value="r.value"
                                 v-model="formBuild">
                          <label for="standard-build">{{r.text}}</label>
                        </div>
                      </fieldset>
                    </div>

                    <div class="form-group inline">
                      <fieldset>
                        <legend>Public?</legend>
                        <div v-for="r, i in tfRadios">
                          <input type="radio"
                                 name="public"
                                 id="public"
                                 :value="r.value"
                                 v-model="formPublic">
                          <label for="public">{{r.text}}</label>
                        </div>
                      </fieldset>
                    </div>

                    <div class="form-group inline">
                      <fieldset>
                        <legend>Internal?</legend>
                        <div v-for="r, i in tfRadios">
                          <input type="radio"
                                 name="internal"
                                 id="internal"
                                 :value="r.value"
                                 v-model="formInternal">
                          <label for="internal">{{r.text}}</label>
                        </div>
                      </fieldset>
                    </div>
                  </div> -->

                  <fn1-input v-model="s.name"
                             label="Name"
                             placeholder="Name"
                             name="name"
                             id="name" />

                  <!-- <fn1-input v-model="formUrl"
                             label="URL"
                             placeholder="URL"
                             name="formUrl"
                             id="formUrl" />

                  <div class="row">
                    <fn1-input v-model="formDeveloper"
                             label="Developer"
                             placeholder="Developer"
                             name="developer"
                             id="developer" />

                    <fn1-input v-model="formVersion"
                             label="Version"
                             placeholder="Version"
                             name="version"
                             id="version" />
                  </div>

                  <div class="row">
                    <fn1-input v-model="formPrimaryPOC"
                             label="Primary POC"
                             placeholder="Primary Point of Contact"
                             name="primary-poc"
                             id="primary-poc" />

                    <fn1-input v-model="formSecondaryPOC"
                               label="Secondary POC"
                               placeholder="Secondary Point of Contact"
                               name="secondary-poc"
                               id="secondary-poc" />
                  </div>

                  <div class="field-group">
                    <label for="description">Description</label>
                    <textarea v-model="formDescription"
                              type="textarea"
                              id="description"
                              placeholder="An optional Service description."></textarea>
                  </div> -->
                </form>
              </template>

              <fn1-button slot="footer"
                          title="Confirm - Edit Service"
                          @click.native="editService(s, i)">
                Confirm
              </fn1-button>

              <fn1-button slot="footer"
                          title="Cancel - Edit Service"
                          @click.native="closeModal('editServiceModal', i)">
                Cancel
              </fn1-button>
            </exampleModal>

            <exampleModal ref="removeServiceModal"
                          title="Remove - Service"
                          launchButtonText="&#10005;">

              <p slot="body">Remove <strong>{{s.name}}</strong>?</p>

              <fn1-button slot="footer"
                          title="Confirm - Remove Service"
                          @click.native="removeService(s, i)">
                Confirm
              </fn1-button>

              <fn1-button slot="footer"
                          title="Cancel - Remove Service"
                          @click.native="closeModal('removeServiceModal', i)">
                Cancel
              </fn1-button>
            </exampleModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

import exampleModal   from '~/components/exampleModal'
import exampleSelect  from '~/components/exampleSelect'

export default {
  layout:           'services',
  middleware:       'authenticated',
  components: {
    exampleModal,
    exampleSelect
  },
  mounted() {
    this.loadServices();
  },
  data() {
    return {
      allServices:   [],
      serviceSearch: '',
      serviceDeploymentOptions: [
        {text: 'Desktop', value: 'desktop'},
        {text: 'Mobile',  value: 'mobile'},
        {text: 'Cloud',   value: 'cloud'},
      ],
      tfRadios:     [
        { text: 'True',  value: true },
        { text: 'False', value: false }
      ],
      // Form
      formActive:       null,
      formName:         null,
      formPublic:       null,
      formDescription:  null,
      formUrl:          null,
      formDeployment:   null,
      formBuild:        null,
      formInternal:     null,
      formVersion:      null,
      formPrimaryPOC:   null,
      formSecondaryPOC: null,
      formDeveloper:    null,
    }
  },
  computed: {
    ...mapFields([
      'auth.authUser',
      'consoleLog',
      'requestStatuses',
    ]),
    filterStatusLegend() {
      return this.requestStatuses
      .filter((q) => q !== 'new')
      .filter((q) => q !== 'pending')
      .filter((q) => q !== 'approved')
      .filter((q) => q !== 'denied');
    },
    activeServicesCount() {
      return this.allServices.filter((s) => s.active == true).length
    },
    inactiveServicesCount() {
      return this.allServices.filter((s) => s.active == false).length
    },
    lastUpdated() {
      if(this.allServices.length) {
        let copy = [...this.allServices];
        copy.sort((a,b) =>
          new Date(b.updated) - new Date(a.updated)
        );
        return copy[0].updated
      }
    },
    filteredServices() {
      return this.allServices
      .filter(service => {
        let serviceName   = service.name.toLowerCase();

        return serviceName.includes(this.serviceSearch.toLowerCase())
      })
      .sort((a, b) => {
        let nameA = a.name.toUpperCase(),
        nameB     = b.name.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
    },
  },
  methods: {
    closeModal(modalRef, i) {
      if(modalRef === 'editServiceModal')
        this.$refs.editServiceModal[i].showModal = false;
      if(modalRef === 'removeServiceModal')
        this.$refs.removeServiceModal[i].showModal = false;
      if(modalRef === 'addServiceModal')
        this.$refs.addServiceModal.showModal = false;
    },
    addService() {

      let fD = new FormData();
      fD.append(`active`,         this.formActive);
      fD.append(`name`,           this.formName);
      fD.append(`public`,         this.formPublic);
      fD.append(`description`,    this.formDescription);
      fD.append(`url`,            this.formUrl);
      fD.append(`deployment`,     this.formDeployment);
      fD.append(`build`,          this.formBuild);
      fD.append(`internal`,       this.formInternal);
      fD.append(`version`,        this.formVersion);
      fD.append(`primary_poc`,    this.formPrimaryPOC);
      fD.append(`secondary_poc`,  this.formSecondaryPOC);
      fD.append(`developer`,      this.formDeveloper);

      this.$axios
      .post(`${process.env.api}${process.env.service}`,fD)
      .then((res) => {
        this.$refs.addServiceModal.showModal = false;
        this.loadServices();
        console.log(`%c addService 👌 `, this.consoleLog.success);
      })
      .catch((e) => {
        console.log(e);
        console.log(`%c addService 🛑 `, this.errLogStyle);
      });
    },
    removeService(s, i) {
      this.$axios
      .delete(`${process.env.api}${process.env.service}${s.id}/`)
      .then((res) => {
        this.$refs.removeServiceModal[i].showModal = false;
        this.loadServices();
        console.log(`%c removeService 👌 `, this.consoleLog.success);
      })
      .catch((e) => {
        console.log(e);
        console.log(`%c removeService 🛑 `, this.errLogStyle);
      });
    },
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
    loadServices(){
      this.getServices()
      .then((resolve) => {
        this.allServices = resolve;
        console.log(`%c loadServices 👌 `, this.consoleLog.success);
      }, (reject) => {
        console.log(reject);
        console.log(`%c loadServices 🛑 `, this.errLogStyle);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  /deep/ .modal-footer{
    display: flex;

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

  fieldset {
    legend {
      color: $text-color;
      font-size: 16px;
      margin-bottom: 0 !important;
      font-weight: $weight-semi-bold;
      width: 100%;
    }

    label {
      color: $text-color;
      font-size: 16px;
      margin: 0 0 0 8px !important;
      font-weight: $weight-normal;
      width: 100%;
    }
  }

  .search {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: lighten($color-slate, 25%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 50px 0 0 0;
    z-index: 0;

    .wrapper {
      position: relative;
      border-top-left-radius: ($radius-default * 2);
      border-top-right-radius: ($radius-default * 2);
      background: rgba(255, 255, 255, 0.08%);
      padding: 50px 100px;
      width: 750px;
      margin: 0;

      p {
        position: absolute;
        bottom: 15px;
        color: white;
        font-style: italic;
      }
    }

    /deep/ .field-group {
      width: 100%;
      margin: 0;

      label {
        color: rgba(255, 255, 255, 0.9%);
      }
    }
  }

  .results-wrapper {
    width: 100%;
    height: calc(100vh - 320px);
    position: fixed;
    overflow-y: scroll;
    top: 312px;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .results-header {
      background-color: #f2f2f2;
      position: fixed;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      z-index: 1;
      border-right: 1px solid darken($color-grey-lighter, 7%);
      border-bottom: 1px solid darken($color-grey-lighter, 7%);
      border-left: 1px solid darken($color-grey-lighter, 7%);
      width: 750px;
      padding: 20px;

      /deep/ .modal-wrapper {
        .modal-container {
          width: 675px;

          .modal-body {
            max-height: 650px;

            form {
              .field-group,
              .form-group {
                margin-bottom: 10px;

                &:last-of-type {
                  margin-bottom: 0;
                }
              }

              .row {
                display: flex;

                &:first-of-type {

                  .field-group,
                  .form-group {
                    border-right: 1px solid darken($color-grey-lighter, 7%);
                    width: auto;
                    margin: 0;
                    padding: 0 10px;

                    &:first-of-type {
                      width: 130px;
                      padding: 0;
                    }

                    &:last-of-type {
                      padding: 0 0 0 10px;
                      border-right: none;
                    }
                  }
                }

                &:nth-of-type(n+2) {

                  .field-group,
                  .form-group {
                    &:first-of-type {
                      padding: 0 10px 0 0;
                    }

                    &:last-of-type {
                      padding: 0 0 0 10px;
                    }
                  }
                }

              }
            }
          }
        }
      }

      h4 {
        width: auto;
        color: lighten($text-color, 15%);
        font-size: 20px;
        line-height: 24px;
      }

      div {
        &:last-of-type {
          margin-left: auto;
        }
      }

      /deep/ button {
        height: fit-content;
        display: flex;
        align-items: center;
        align-self: center;
        background-color: $color-green;
        margin: 0;
        padding: 10px 15px;

        &:hover {
          background-color: darken($color-green, 5%);
        }
      }
    }

    .sidebar {
      text-align: right;
      position: fixed;
      transform: translate(-295%);
      left: 50%;
      top: 330px;
      width: 200px;

      p {
        margin: 0 0 10px 0;

        small {
          display: block;
          font-size: 14px;
          color: #8f8f8f;
          font-weight: 600;
        }

        &:first-of-type {
          margin: 0 0 10px 0;
        }
      }

      /deep/ button {
        margin: 0 0 10px 0;
      }

      .status-legend {
        span {
          display: flex;
          flex-wrap: wrap;
          width: 100px;
          padding: 2px;
          margin: 0 0 10px auto;

          &:last-of-type {
            margin: 0 0 0 auto;
          }
        }
      }
    }

    .results {
      width: 750px;
      overflow-y: scroll;
      position: absolute;
      top: 86px;
      background-color: rgba(255, 255, 255, 0.5%);
      border-bottom-left-radius: ($radius-default * 2);
      border-bottom-right-radius: ($radius-default * 2);

      h4 {
        // background-color: green;
        color: lighten($text-color, 25%);
        width: 100%;
        padding: 20px;
        text-align: center;
        font-size: 20px;
        line-height: 24px;
      }

      .no-results {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;

        h4 {
          // background-color: red;
          display: inline-block;
          width: fit-content;
        }

        button {
          height: fit-content;
          display: flex;
          align-items: center;
          align-self: center;
          background-color: $color-green;
          margin: 0 20px 0 auto;
          padding: 10px 15px;

          &:hover {
            background-color: darken($color-green, 5%);
          }
        }
      }
    }
  }

  .result {
    // background-color: pink;
    margin: 0;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid darken($color-grey-lighter, 7%);
    border-left: 10px solid;

    &.active {
      border-left-color: $color-green;
    }

    &.inactive {
      border-left-color: $text-color;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 15%);
    }

    &:last-of-type {
      border-bottom: none;
    }

    div {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      &:nth-of-type(1) {
        // background-color: orange;
        width: 250px;
      }

      &:nth-of-type(2){
        // background-color: red;
        width: 125px;
        margin-left: 20px;
        padding-left: 20px;
        border-left: 1px solid darken($color-grey-lighter, 7%);
      }

      &:last-of-type {
        // background-color: red;
        margin-left: auto;
        flex-direction: row;
        align-items: center;

        div {
          width: auto;
          padding: 0;
          margin: 0;
          border: none;
        }

        /deep/ button {
          margin: 0 0 0 10px;
          padding: 0;
          background-color: transparent;
          color: lighten($text-color, 20%);

          // &:hover {
          //   background-color: darken($color-green, 5%);
          // }
        }
      }
    }

    p {
      color: $text-color;
      font-weight: $weight-semi-bold;

      &:not(:first-of-type) {
        font-size: 14px;
        color: lighten($text-color, 25%);
      }
    }
  }
</style>