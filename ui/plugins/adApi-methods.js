import Vue          from 'vue'
import {
  mapFields }       from 'vuex-map-fields'

Vue.mixin({
  data() {
    return {}
  },
  computed: {
    ...mapFields([])
  },
  methods: {
    /**
     * A Promise returning all Active Directory results
     *
     * @promise     getAllActiveDirectoryUsers
     * @resolve     { Object }
     * @reject      { Error }
     * @return      { Promise <Object[]> } Returns an Array of Objects
     *              with each being a user in AD.
     */
    getAllActiveDirectoryUsers(){
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.adApi}${process.env.allUsers}`)
        .then(res => resolve(res.data))
        .catch(e  => reject(e));
      })
    },
    /**
     * A Promise for an Account Request
     * by ID
     *
     * @promise     getActiveDirectoryUserByID
     * @param       { Number } id - Active Directory `serialNumber`
     *                              Account Request ID)
     * @resolve     { Object }
     * @reject      { Error }
     * @return      { Promise <Object> } Returns the Active Directory
     *                                   user Object.
     *
     */
    getActiveDirectoryUserByID(id) {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.adApi}${id}/`)
        .then(res => resolve(res.data[0]))
        .catch(e  =>  reject(e))
      })
    },
    /**
     * [getActiveDirectoryUserByAttribute description]
     * @return {[type]} [description]
     */
    getActiveDirectoryUserByAttribute(attribute, value) {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.adApi}${process.env.userAttribute}${attribute}&value=${value}`)
        .then(res => {
          if(res.data.length) {
            resolve(res.data[0])
          } else {
            resolve(null)
          }
        })
        .catch(e  =>  reject(e))
      })
    }
  }
})