import Vue from 'vue'
import App from './App.vue'

import { Button, Table, TableColumn, Progress } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(Button.name, Button)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Progress.name, Progress)
import vueSliceUploader from './component/index.js'
Vue.use(vueSliceUploader)
new Vue({
  el: '#app',
  render: h => h(App)
})
