Vue.component('app-icon',{
  template: '<span :class="cssClasses" aria-hidden="true"></span>',
  props: ['img'],
  computed: {
    cssClasses: function (){
      return 'glyphicon glyphicon-'+this.img;
    }
  }
});

Vue.component('app-task',{
  data: function (){
    return {
      editing: false,
      draft: ''
    };
  },
  template: '#task-template',
  props: ['task', 'index'],
  methods: {
    toggleStatus: function () {
      this.task.pending = !this.task.pending;
    },
    edit: function(){
      // this.$parent.tasks.forEach(function (task){
      //   task.editing = false;
      // });
      //
      this.draft = this.task.description;

      this.task.editing = true;
    },
    update: function () {

      this.task.description = this.draft;

      this.task.editing = false;
    },
    discard: function () {
      this.task.editing = false;
    },
    remove: function () {
      this.$emit('remove', this.index);
    }
  }
});

var vm = new Vue({
  el:'#app',
  methods: {
    createTask: function () {
      this.tasks.push({
        description:this.new_task,
        pending: true,
        editing: false
      });

      this.new_task = '';
    },
    toggleStatus: function (task) {
      task.pending = !task.pending;
    },
    deleteTask: function (index){
      this.tasks.splice(index, 1);
    },
    deleteCompleted: function () {
      this.tasks = this.tasks.filter (function (task){
        return task.pending;
      });
    }
  },
  data: {
    draft: '',
    new_task: '',
    tasks: [
      {
        description: 'Aprender Vue.js',
        pending: true,
      },
      {
        description: 'Suscribirse a Stude.net',
        pending: true,
      },
      {
        description: 'Grabar lección de Vue',
        pending: false,
      }
    ]
  }
});
