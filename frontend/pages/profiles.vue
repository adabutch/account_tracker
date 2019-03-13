<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <h3>Service Profile Composer</h3>
      <h5>Configure a Service Profile for a specific Group.</h5>

      <div class="builder-layout">
        <div class="first">
          <h4><span>1</span> Select the Department</h4>
          <div class="field-group">
            <label for="department">Department</label>
            <select name="department"
                    id="department"
                    type="select"
                    v-model="selectedDept">
              <option>---</option>
              <option v-for="(item, index) in getDepts"
                      :value="{id: item.value, name: item.text}">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>

        <div class="second">
          <h4><span>2</span> Select the Group</h4>
          <div class="field-group">
            <label for="group">Group</label>
            <select name="group"
                    id="group"
                    type="select"
                    v-model="group">
              <option v-for="(item, index) in deptGroups"
                      :value="{id: item.value, name: item.text}">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>

        <div class="third">
          <h4><span>3</span> Select the Services</h4>

          <exampleCheckbox
            legend="Default Services:"
            name="default-services"
            :options="[
              { text: 'Gmail', value: 'gMail' },
              { text: 'TimeTrack', value: 'TimeTrack' }
            ]" />

            <exampleCheckbox
            legend="Group Specific Services:"
            name="group-services"
            :options="[
              { text: 'Adobe Suite', value: 'adobe-suite' },
              { text: 'ArcGIS', value: 'arcgis' },
              { text: 'Asset Track', value: 'asset-track' }
            ]" />
        </div>

        <div class="third">
          <h4><span>4</span> Additional Questions</h4>
          <h5>
            <strong>note:</strong> These will appear as an extra step on the Creation Wizard.
          </h5>
        </div>
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

import headerComponent from '~/components/headerComponent'
import exampleCheckbox from '~/components/exampleCheckbox'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    exampleCheckbox
  },
  mounted() {
    axios.get(`${process.env.ttApi}${process.env.deptService}`)
    .then((res) => {
      console.log(res);
      this.serviceDepts = res.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
      serviceDepts:     [],
      selectedDept:     {},
      serviceGroups:    [],
      selectedGroup:    {},
      selectedServices: [],
    }
  },
  watch: {
    selectedDept: function(val) {
      if(val) {
        this.getGroups();
      }
    }
  },
  computed: {
    dateFormatted() {},
    ...mapFields([]),
    getDepts() {
      let deptSelectArray = [];

      let depts = this.serviceDepts.map(
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
    deptGroups() {
      let groupSelectArray = [];

      let groups = this.serviceGroups.map(
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
  },
  methods: {
    getGroups() {
      axios.get(`${process.env.ttApi}${process.env.groupService}?department_id=${this.selectedDept.id}`)
      .then((res) => {
        console.log(res.data);
        this.serviceGroups = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

h3 {
  border-bottom: 1px solid lighten($text-color, 50%);
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
}

h5 {
  border-bottom: 1px solid lighten($text-color, 50%);
  padding: 0 0 10px 0;
  margin: 0 0 20px 0;
}

.builder-layout {
  display: flex;
  flex-wrap: wrap;
  // background-color: red;

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
    border-bottom: none;
    margin: 0 0 0 50px;
  }

  .field-group {
    margin: 0 0 0 50px;
  }

  div {
    &.first,
    &.second {
      flex-basis: 50%;
      // background-color: orange;
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