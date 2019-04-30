import Vue          from 'vue'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }      from 'vuex'
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
    }
  }
})