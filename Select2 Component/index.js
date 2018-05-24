Vue.config.productionTip = false;
Vue.config.devtools = false;

// Wrapper Component Example
// We are integrating a 3rd party jQuery plugin (select2) by wrapping it inside a custom component.
Vue.component('select2', {
  props: ['options', 'value'],
  template: '#select2-template',
  mounted: function() {
    var vm = this;
    $(this.$el)
      // init select2
      .select2({
        data: this.options,
        placeholder: 'Select an option',
        allowClear: true
      })
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function() {
        vm.$emit('input', this.value);
      });
  },
  watch: {
    value: function(value) {
      // update value
      $(this.$el)
        .val(value)
        .trigger('change');
    },
    options: function(options) {
      // update options
      $(this.$el)
        .empty()
        .select2({ data: options });
    }
  },
  destroyed: function() {
    $(this.$el)
      .off()
      .select2('destroy');
  }
});

// app Vue instance
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    options: [],
    selected: ''
  },
  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.options = this.getArrayData;
      $(this.$refs.example1).select2({
        placeholder: 'Select an option',
        allowClear: true
      });
    });
  },
  computed: {
    getArrayData: function() {
      var arr = Array.from({ length: 50 }, (i, v) => ({ id: v + 1, text: `Option ${v + 1}` }));
      return arr;
    }
  },
  methods: {
    getValue: function() {
      console.log(this.selected);
    },
    setValue: function() {
      this.selected = this.getRandomInt(1, 50);
    },

    // Returns a random integer between min (included) and max (included)
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
});
