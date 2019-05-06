import Vue          from 'vue'
import axios        from 'axios'
import {
mapFields }         from 'vuex-map-fields'

Vue.mixin({
  data() {
    return {}
  },
  computed: {
    ...mapFields([
      'consoleLog',
      'acctReqs',
    ])
  },
  methods: {
    /**
     * A Promise for Departments
     *
     * @promise     getDepts
     * @resolve     { Object }
     * @reject      { Error }
     * @return      { Promise <Object[]> } Resolves to an Array of Objects.
     *
     */
    getDepts() {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.ttApi}${process.env.deptService}`)
        .then(res => resolve(res.data))
        .catch(e  => reject(e));
      })
    },
    /**
     * A Promise for Groups via an
     * associated Department
     *
     * @promise     getDepts
     * @param       { Number } deptID - ID of the Department
     *                         of which you want Groups from
     * @resolve     { Object }
     * @reject      { Error }
     * @return      { Promise <Object[]> } Resolves to an Array of Objects.
     *
     */
    getGroups(deptID) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.ttApi}${process.env.groupService}?department_id=${deptID}`)
        .then(res => resolve(res.data))
        .catch(e  => reject(e));
      })
    },
  }
})