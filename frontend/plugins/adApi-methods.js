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
    }
  }
})