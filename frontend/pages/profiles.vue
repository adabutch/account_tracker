<template>
  <div>
    <headerComponent />

    <div class="page-wrapper">
      <h3>Service Profile Builder</h3>

      <div class="builder-layout">
        <div>
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

        <div>
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

        <div>
          <h4><span>3</span> Select the Services</h4>
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

export default {
  middleware: 'authenticated',
  components: {
    headerComponent
  },
  mounted() {
    axios.get(`https://tomcat2.bloomington.in.gov/timetrack/DepartmentService`)
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
    ...mapFields([
      'endpoints',
    ]),
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
      axios.get(`https://tomcat2.bloomington.in.gov/timetrack/GroupService?department_id=${this.selectedDept.id}`)
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

.builder-layout {
  display: flex;
  flex-wrap: wrap;
  background-color: red;

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

  .field-group {
    margin: 0 0 0 50px;
  }

  div {
    &:nth-of-type(1),
    &:nth-of-type(2) {
      flex-basis: 50%;
      background-color: orange;
    }

    &:nth-of-type(3) {
      margin: 20px 0 0 0;
      flex-basis: 100%;
      background-color: green;
    }
  }
}
</style>