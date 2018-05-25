Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(window.vuelidate.default);

// Wrapper Component Example
// Get formated currency
Vue.component('currency-input', {
  props: ['value'],
  template: '#currency-template',
  data: function() {
    return {
      isInputActive: false
    };
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. un-format display value for user
          return this.value.toString();
        } else {
          // User is not modifying now. Format display value for user interface
          return '$ ' + this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''));
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0;
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue);
      }
    }
  }
});

// app Vue instance
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    price1: 4321.66,
    price2: 1234.55,
    price3: 22
  },
  methods: {
    getValue: function() {
      console.log(this.price2);
    },
    setValue: function() {
      this.price2 = this.getRandomInt(1000, 10000);
    },

    // Returns a random integer between min (included) and max (included)
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    validate: function() {}
  }
});
