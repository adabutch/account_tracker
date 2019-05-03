import Vue          from 'vue'
import {
  mapFields }       from 'vuex-map-fields'

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
     * A Promise for Account Requests by Request Status
     *
     * @promise  getAccountRequests
     * @resolve  { Object }
     * @reject   { Error }
     * @return   { Promise <Object[]> } Resolves to an Object of Arrays.
     *
     */
    getAccountRequests() {
      return new Promise((resolve, reject) => {
        let pendingReqs = new Promise((resolve, reject) => {
          this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=pending`)
          .then((res) => {
            resolve(
              this.$store.dispatch('acctReqs/accountRequestsPending', res.data.results)
            )
          })
          .catch((e) => reject(`Pending Account Requests:: ${e}`))
        });

        let newReqs = new Promise((resolve, reject) => {
          this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=new`)
          .then((res) => {
            resolve(
              this.$store.dispatch('acctReqs/accountRequestsNew', res.data.results)
            )
          })
          .catch((e) => reject(`New Account Requests:: ${e}`))
        });

        let deniedReqs = new Promise((resolve, reject) => {
          this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=denied`)
          .then((res) => {
            resolve(
              this.$store.dispatch('acctReqs/accountRequestsDenied', res.data.results)
            )
          })
          .catch((e) => reject(`Denied Account Requests:: ${e}`))
        });

        let approvedReqs = new Promise((resolve, reject) => {
          this.$axios.get(`${process.env.api}${process.env.accountRequest}?limit=1000&request_status=denied`)
          .then((res) => {
            resolve(
              this.$store.dispatch('acctReqs/accountRequestsApproved', res.data.results)
            )
          })
          .catch((e) => reject(`Approved Account Requests:: ${e}`))
        });

        Promise.all([pendingReqs,newReqs,deniedReqs,approvedReqs])
        .then(() => {
          resolve(
            console.log(`%c getAccountRequests 👌 `, this.consoleLog.success)
          )
        })
        .catch((reject) => {
          console.log(`%c getAccountRequests 🛑 `,
                    this.consoleLog.error,
                    `\n\n ${reject} \n\n`);
        });
      })
    },
     /**
     * A Promise for an Account Request by ID
     *
     * @promise  getAccountRequestByID
     * @resolve  { Object }
     * @reject   { Error }
     * @return   { Promise <Object> } Returns the Account Request Object
     *
     */
     getAccountRequestByID(id) {
      return new Promise((resolve, reject) => {
        this.$axios
        .get(`${process.env.api}${process.env.accountRequest}${id}/`)
        .then(response => resolve(response.data))
        .catch(e => reject(e))
      })
    },
  }
})