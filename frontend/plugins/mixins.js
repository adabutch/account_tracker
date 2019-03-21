import Vue          from 'vue'
import moment       from 'moment'

Vue.mixin({
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
    },
    MMDYYYYDateFormat(date) {
      return moment(date).format('MM/D/YYYY');
    },
    timeAgo(date) {
      return moment(date).fromNow();
    },
    userInitial(name) {
      return name.charAt(0);
    },
  },
  computed: {},
})