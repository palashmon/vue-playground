Vue.config.productionTip = false;
Vue.config.devtools = false;

// Wrapper Component Example
// Bootstrap Switch Component
Vue.component('bootstrap-switch', {
  props: ['options', 'value'],
  template: '<input type="checkbox">',
  data: function() {
    return {
      bsSwitchDomElement: null
    };
  },
  mounted: function() {
    $(this.$el).on('switchChange.bootstrapSwitch', (event, state) => {
      this.$emit('input', state);
    });
    this.$nextTick(function() {
      this.render();
      this.bsSwitchDomElement = $(this.$el).closest('.bootstrap-switch-wrapper');
    });
  },
  methods: {
    render: function() {
      const opts = Object.assign({}, { state: this.value }, this.options);
      $(this.$el).bootstrapSwitch(opts);
    },
    refresh: function(state) {
      $(this.$el).bootstrapSwitch('state', state);
    }
  },
  watch: {
    value: function(value) {
      this.refresh(value);
    }
  },
  beforeDestroy: function() {
    $(this.$el).bootstrapSwitch('destroy');
    $(bsSwitchDomElement).remove();
  }
});

// app Vue instance
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    switchObject: {
      state: true,
      //size: 'small',
      //disabled: false,
      //readonly: false,
      //onColor: 'success',
      //offColor: 'danger',
      //onText: 'ON',
      //offText: 'OFF',
      //handleWidth: 'auto',
      //labelWidth: 'auto',
      //baseClass: 'bootstrap-switch',
      //wrapperClass: 'wrapper',
      onSwitchChange: function(event, state) {
        console.log('Current State: ', { event, state });
      }
    }
  },
  methods: {
    getValue: function() {
      alert(this.switchObject.state);
    }
  }
});
