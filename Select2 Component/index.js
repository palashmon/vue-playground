Vue.config.productionTip = false;
Vue.config.devtools = false;

// app Vue instance
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    options: []
  },
  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.options = this.getArrayData;
      $(this.$refs.example1).select2({
        placeholder: 'Select an option',
        allowClear: true,
        pageSize: 20
      });
    });
  },
  computed: {
    getArrayData: function() {
      var arr = Array.from({ length: 50 }, (i, v) => ({ id: v + 1, text: `Option ${v + 1}` }));
      return arr;
    }
  },
  methods: {}
});
