import uploader from './index.vue' // 导入组件
const SliceUploader = {
  install(Vue, options) {
    Vue.component(uploader.name, uploader)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SliceUploader)
}
export default SliceUploader // 导出..
