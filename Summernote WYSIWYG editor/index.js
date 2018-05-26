Vue.config.productionTip = false;
Vue.config.devtools = false;

// Wrapper Component Example
// Bootstrap Switch Component
Vue.component('summernote', {
  props: ['options', 'value'],
  template: '<textarea></textarea>',
  data: function() {
    return {
      bsSwitchDomElement: null
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.render();
    });
  },
  methods: {
    render: function() {
      var vm = this;
      var initOptions = {
        height: 150,
        placeholder: 'Enter some text here...',
        callbacks: {
          onInit: function() {
            $(vm.$el).summernote('code', vm.value);
          },
          onBlur: function() {
            vm.$emit('change', $(vm.$el).summernote('code'));
          },
          onChange: function() {
            vm.$emit('change', $(vm.$el).summernote('code'));
          }
        }
      };

      const opts = Object.assign({}, initOptions, this.options);
      $(this.$el).summernote(opts);
    },
    refresh: function(newCode) {
      $(this.$el).summernote('code', newCode);
    },
    setCode: function(value) {
      if (typeof value !== undefined) {
        return $(this.$el).summernote('code', value);
      }
    },
    getCode: function() {
      return $(this.$el).summernote('code');
    }
  },
  beforeDestroy: function() {
    $(this.$el).summernote('destroy');
  }
});

// app Vue instance
var app = new Vue({
  el: '#app',
  // app initial state
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    editor: '',
    editor2: ''
  },
  methods: {
    setValue() {
      this.$refs.editor1.setCode('<p><h2>Hello World</h2><hr/>This is a <b>sample</b> text.</p>');
    },
    getValue() {
      //console.log(this.$refs.editor1.getCode());
      console.log(this.editor);
    },
    clearValue() {
      this.$refs.editor1.setCode('');
    },
    summernoteOnChange(value) {
      //console.log('Current value: ', { value });
      this.editor = value;
    }
  }
});
