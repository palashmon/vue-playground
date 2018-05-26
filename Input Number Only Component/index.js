Vue.config.productionTip = false;
Vue.config.devtools = false;
const { required, minLength, maxLength } = window.validators;
Vue.use(window.vuelidate.default);

// Wrapper Component Example
// A number only input vue component
Vue.component('input-number', {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    v: {
      type: Object
    }
  },
  template: '#input-number-template',
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
          return this.copiedValue.toString();
        } else {
          if (typeof this.copiedValue === 'string') {
            if (this.isNumeric(this.copiedValue)) {
              this.copiedValue = parseFloat(this.copiedValue);
            } else {
              return '';
            }
          }
          // User is not modifying now. Format display value for user interface
          if (this.copiedValue < 0) return '';
          return this.copiedValue.toFixed(0).replace(/\D/g, '');
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/\D/g, ''));
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
        'is-invalid': validation.$invalid && validation.$error,
        'is-valid': validation.$dirty && !validation.$invalid
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
    count: '',
    count2: '',
    submitStatus: null
  },
  methods: {
    getValue: function() {
      console.log(this.count);
    },
    setValue: function() {
      this.count = this.getRandomInt(1, 100);
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
    count2: {
      required
    }
  }
});
