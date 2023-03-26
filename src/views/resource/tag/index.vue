<template>
    <div>
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px"
      @click="createButton">添加</el-button>
      <el-table :data="list" style="width:100%" border>
        <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
        <el-table-column prop="name" label="标签名称" width="150px"></el-table-column>
        <el-table-column prop="image" label="标签图片" width="130px">
          <template slot-scope="{row}">
            <img :src="row.image" alt="" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="标签描述" width="270px"></el-table-column>
        <el-table-column prop="articleNum" label="文章数量" width="80px"></el-table-column>
        <el-table-column prop="followerNum" label="关注数量" width="80px"></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-edit" @click="updateButton(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteTag(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
      style="margin-top:20px; textAlign:center"
      :current-page="page"
      :total="total"
      :page-size="size"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      ></el-pagination>

      <!-- 对话框 -->
      <el-dialog :visible.sync="dialogFormCreate" title="添加标签">
        <el-form style="width:80%" :model="tagForm" :rules="rules" ref="ruleForm">
          <el-form-item label="标签ID" label-width="100px" prop="id">
            <el-input autocomplete="off" v-model="tagForm.id"/>
          </el-form-item>
          <el-form-item label="标签名称" label-width="100px" prop="name">
            <el-input autocomplete="off" v-model="tagForm.name"/>
          </el-form-item>
          <el-form-item label="标签描述" label-width="100px">
            <el-input autocomplete="off" v-model="tagForm.introduction"/>
          </el-form-item>
          <el-form-item label="图片上传" label-width="100px" prop="image">
            <el-upload
              class="avatar-uploader"
              :action= URL
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="tagForm.image" :src="tagForm.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormCreate = false">取消</el-button>
            <el-button type="primary" @click="createTag">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormUpdate" title="修改标签">
        <el-form style="width:80%" :model="tagForm" :rules="rules" ref="ruleUpdateForm">
          <el-form-item label="标签ID" label-width="100px">
            <el-input autocomplete="off" v-model="tagForm.id" disabled/>
          </el-form-item>
          <el-form-item label="标签名称" label-width="100px" prop="name">
            <el-input autocomplete="off" v-model="tagForm.name"/>
          </el-form-item>
          <el-form-item label="标签描述" label-width="100px">
            <el-input autocomplete="off" v-model="tagForm.introduction"/>
          </el-form-item>
          <el-form-item label="图片上传" label-width="100px" prop="image">
            <el-upload
              class="avatar-uploader"
              :action= URL
              :headers="headerObj"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="tagForm.image" :src="tagForm.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过5MB</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormUpdate = false">取消</el-button>
            <el-button type="primary" @click="updateTag">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'Tag',
  data(){
    return {
      page: 1,
      size: 5,
      total: 0,
      list: [],
      disabled: true,
      dialogFormCreate: false,
      dialogFormUpdate: false,
      tagForm:{
        id: '',
        name: '',
        image: '',
        introduction: ''
      },
      URL: process.env.VUE_APP_BASE_API  + 'api/upload',
      headerObj:{
        Authorization: `Bearer ${getToken()}`
      },
      rules:{
        id: [
          { required: true, message: '请输入标签ID 标签ID为最大标签数+1', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        image: [
            { required: true, message: '请选择标签图片', trigger: 'change' }
          ],
      }
    }
  },
  mounted(){
    this.getPageList()
  },
  methods:{
    getPageList(){
      const { page, size } = this;
      //获取标签列表
      this.$API.tag.reqTagsList(page, size).then(res => {
        console.log('标签列表', res)
        if(res.code === 1000){
          this.total = res.data.total
          this.list = res.data.list
        }
      })
    },
    handleCurrentChange(pager){
      console.log('pager', pager)
      this.page = pager
      this.getPageList()
    },
    handleSizeChange(size){
      console.log('size', size)
      this.size = size
      this.getPageList()
    },
    createButton(){
      this.dialogFormCreate = true
      this.tagForm = {name:'', image:'', introduction:'', id:''}
    },
    updateButton(row){
      console.log('row',row)
      this.dialogFormUpdate = true
      this.tagForm = {...row}
    },
    handleAvatarSuccess(res, file){
      // console.log(res,file)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.tagForm.image = res.data.url
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if(!isJPG){
        this.$message.error('上传图片只能是JPG格式!')
      }
      if(!isLt5M){
        this.$message.error('上传图片大小不能超过5MB!')
      }
      return isJPG && isLt5M
    },
    createTag(){
      this.$refs.ruleForm.validate(success => {
        if(success){
          this.dialogFormCreate = false
          if(Number(this.tagForm.id) !== this.total+1) {
            this.$message("ID为最大标签数+1")
            return false
          }
          this.$API.tag.reqCreateTag(this.tagForm).then(res => {
            if(res.code === 1000) {
              this.$message({
                type:'success',
                message: "添加标签成功"
              })
              this.getPageList()
            }
          })
        } else{
          console.log('error submit!!')
          return false
        }
      })
    },
    updateTag(){
      this.$refs.ruleUpdateForm.validate(success => {
        if(success){
          this.dialogFormUpdate = false
          this.$API.tag.reqUpdateTag(this.tagForm).then(res => {
            if(res.code === 1000) {
              this.$message({
                type:'success',
                message: "修改标签成功"
              })
              this.getPageList()
            }
          })
        } else{
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteTag(row){
      this.$prompt('请输入密码', `确定要删除 ${row.name} ?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const authAndID = {
            id: row.id,
            secret: value
          }
          console.log('authAndID',authAndID)
          this.$API.tag.reqDeleteTag(authAndID).then(res => {
            if(res.code == 1000){
              this.$message({
                type:'success',
                message: '删除成功'
              })
              this.handleCurrentChange(this.list.length > 1? this.page: this.page-1)
            } 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });       
        });
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>