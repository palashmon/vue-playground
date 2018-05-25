Vue.config.productionTip = false;
Vue.config.devtools = false;
const { required, minLength } = window.validators;
Vue.use(window.vuelidate.default);
const validationMixin = window.vuelidate.validationMixin;

// app Vue instance
const checkEmpty = value => !value || value * 1 === 0;
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    form: {
      email: '',
      password: '',
      state: '',
      comment: ''
    },
    submitStatus: null
  },
  methods: {
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
    },
    status(validation) {
      if (!validation) return;
      return {
        'is-invalid': validation.$invalid && validation.$error
      };
    },
    selectStatus(validation) {
      if (!validation) return;
      return {
        'is-invalid': validation.$invalid && validation.$error && validation.isEmpty
      };
    }
  },
  validations: {
    form: {
      email: { required: required, minLength: minLength(4) },
      password: { required: required, minLength: minLength(6) },
      state: {
        required: required,
        isEmpty(value) {
          return !value || value * 1 === 0;
        }
      },
      comment: { required: required }
    }
  }
});
