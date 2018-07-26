# vue-slice-uploader

> 基于vue的文件上传插件
支持文件切片上传，断点续传，暂停和重新上传。

### Usage

```
npm install vue-slice-uploader -D
```

```js
// ES6 import 
import vueSliceUploader from 'vue-slice-uploader' 
// 通过require 导入 
var  vueSliceUploader = require('vue-slice-uploader') 
// 通过use挂载 
Vue.use(vueSliceUploader) 
// 或者直接导入js文件 
<script src="./dist/vue-slice-uploader"></script>
```

```js
<vue-slice-uploader ref="sliceUploader"
    action="http://localhost:5000/upload"
    @change="handleFileChange"
    @on-progress="handleFileProgress"
    @on-complete="handleFileComplete"
    :multiple="true">
</vue-slice-uploader>
```

### Attributes

| 属性       | 描述  | 类型  |  值  |
| --------   | -----  | ----  |--- |
| chunkSize  | 切片的大小       | Number |   单位是Byte，默认是5M，即1024x1024x5     |
| auto       | 是否自动上传    |  Boolean   |   **true**   |
| multiple   | 是否可多文件上传   |   Boolean   |  **false**  |
| showButton | 是否显示上传按钮，若不显示则需手动调用start方法| Boolean|**true**|
| suffix     | 文件后缀名   |   String  | * |
| action     | 文件上传请求路径|String||
| unique     | 是否对文件进行md5，保证文件唯一性，比较耗时|Boolean|**false**


### Methods

| 属性       | 方法  | 参数 |
| --------   | -----  | ----  |
| on-progress | 文件上传进程监听|`function(file,{code,percent,msg})`|
| on-complete | 文件上传完成|`function(file){}`|
| on-speed    | 文件上传速率监听 | `function(file,speed){}`
| start        | 启动选择文件       |       |
| upload       | 执行上传方法    |  待上传的文件列表  |

### 关于回调的文件对象

- `_index`:文件所在列表的下标，可用于更新文件数组
- `_uploader`:文件上传实例的引用
    - pause():   暂停上传任务
    - restart(): 重新开始上传任务
    - continue(): 继续上传任务