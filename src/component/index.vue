<template>
  <div class="vue-slice-uploader">
    <div class="uploader-btn"
         :class="{'hidebtn':!showButton}">
      <el-button size="small"
                 ref="button"
                 type="primary">上传</el-button>
      <input type="file"
             :accept="suffix"
             ref="file"
             :multiple="multiple"
             @change="handleFileChange">
    </div>
  </div>
</template>

<script>
import FileUploader from './uploader'
export default {
  name: 'vue-slice-uploader',
  data () {
    return {
      allFiles: []
    }
  },
  props: {
    chunkSize: {
      type: Number,
      default: Math.pow(1024, 2) * 5
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auto: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: String,
      default: '*'
    },
    action: {
      type: String,
      default: ''
    },
    unique: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.suffixList = this.suffix.split(',')
  },
  methods: {
    handleFileChange (e) {
      let files = e.target.files, addFileList = []
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        this.allFiles.push(file)
        file._index = this.allFiles.length - 1;
        addFileList.push(file)
      }
      this.$emit('change', addFileList)
      if (this.auto) {
        this.upload(addFileList)
      }
    },
    upload (fileList) {
      if (!this.action) {
        console.warn('找不到上传路径')
        return;
      }
      fileList.map((file) => {
        let uploader = new FileUploader(file, {
          url: this.action,
          unique: this.unique,
          chunkSize: this.chunkSize,
          formData: this.formData,
          headers: this.headers,
          progress: (code, percent, msg) => {
            this.$emit('on-progress', file, {
              code, percent, msg
            })
          },
          getSpeed: (speed) => {
            this.$emit('on-speed', file, speed)
          },
          complete: obj => {
            this.$emit('on-complete', obj)
          }
        })
        uploader.run();
        file._uploader = uploader
      })
    },
    start () {
      this.$refs.file.click();
    }
  }
}
</script>

<style lang="scss">
.vue-slice-uploader {
  position: relative;
  .uploader-btn {
    position: relative;
    display: inline-block;
    &.hidebtn {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: -1;
    }
    input[type='file'] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 2;
    }
  }
}
</style>
