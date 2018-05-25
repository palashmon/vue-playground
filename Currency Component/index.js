Vue.config.productionTip = false;
Vue.config.devtools = false;
var validator = window.validators;
Vue.use(window.vuelidate.default);
var validationMixin = window.vuelidate.validationMixin;

// Wrapper Component Example
// Get formated currency
Vue.component('currency-input', {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    v: {
      type: Object
    }
  },
  template: '#currency-template',
  data: function() {
    return {
      isInputActive: false,
      copiedValue: this.value
    };
  },
  watch: {
    value: function(value) {
      this.copiedValue = value;
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. un-format display value for user
          return this.copiedValue == 0 ? '' : this.copiedValue.toString();
        } else {
          if (typeof this.copiedValue === 'string') {
            this.copiedValue = this.isNumeric(this.copiedValue) ? parseFloat(this.copiedValue) : 0;
          }
          // User is not modifying now. Format display value for user interface
          if (this.copiedValue == 0) return '';
          return '$ ' + this.copiedValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''));
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = '';
        }
        // Note: we cannot set this.copiedValue as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue);
        if (!!this.v) this.v.$touch();
      }
    }
  },
  methods: {
    isNumeric: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    status(validation) {
      if (!validation) return;
      return {
        error: validation.$invalid && validation.$error,
        valid: validation.$dirty && !validation.$invalid
      };
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
    price3: 22,
    price: {
      name: '',
      ref: ''
    },
    submitStatus: null
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

    validate: function() {
      this.isButtonClicked = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING';
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    }
  },
  validations: {
    price: {
      name: { required: validator.required }
    }
  }
});
