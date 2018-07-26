<template>
  <div id="app">
    <el-button @click="handleStartUpload">点击上传</el-button>
      <vue-slice-uploader ref="sliceUploader"
                          action="http://localhost:5000/upload"
                          @change="handleFileChange"
                          @on-progress="handleFileProgress"
                          @on-complete="handleFileComplete"
                          :auto="false"
                          :showButton="false"
                          :multiple="true">
      </vue-slice-uploader>
      <el-table :data="fileList"
                stripe
                max-height="100%"
                :show-header="false">
        <el-table-column prop="name"
                         width="200px"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <template v-if="scope.row.code == 1">
              <span class="progress-tip">读取文件</span>
              <el-progress class="progress-bar"
                           :percentage="scope.row.progress"
                           color="#8e71c7"></el-progress>
            </template>
            <template v-else-if="scope.row.code == 2">
              <span class="progress-tip">读取出错</span>
            </template>
            <template v-else-if="scope.row.code == 101">
              <template v-if="!scope.row.success">
                <span class="progress-tip">上传进度</span>
                <el-progress class="progress-bar"
                             :percentage="scope.row.progress"
                             color="#8e71c7"></el-progress>
              </template>
              <template v-else>
                <i class="el-icon-success"
                   style="color:#67C23A;">上传成功</i>
              </template>
            </template>
            <template v-else-if="scope.row.code == 102">
              <span class="progress-tip"
                    style="color:#F36068;">
                <i class="el-icon-error"></i>上传出错</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column width="100px">
          <template slot-scope="scope">
            <i class="iconfont icon-restart"
               style="font-size:18px;"
               @click="handleRestart(scope.row)"
               v-if="scope.row.code == 2 || scope.row.code == 102"></i>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fileList: []
    }
  },
  mounted () {

  },
  methods: {
    handleStartUpload () {
      this.$refs.sliceUploader.start()
    },
    handleFileChange (files) {
      this.fileList.push(...files);
      this.$refs.sliceUploader.upload(files)
    },
    handleFileProgress (file, params) {
      file.code = params.code;
      file.progress = params.percent
      this.$set(this.fileList, file._index, file)
    },
    handleFileComplete (file) {
      file.success = true
      this.$set(this.fileList, file._index, file)
    }
  }
}
</script>

<style lang="scss">
</style>
