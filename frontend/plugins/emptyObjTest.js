import Vue from 'vue'

Vue.mixin({
  methods: {
    isEmpty(obj) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  }
})