<template>
    <div>
        <el-card style="margin:20px 0px">
          <div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="资源ID">
                <el-input autocomplete="off" v-model="itemID"/>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form>
          </div>
        </el-card>
        <el-card>
            <!-- 表格 -->
          <el-table border style="width: 100%"  :data="commentList" :row-class-name="tableRowClassName">
            <el-table-column type="index" label="序号" width="80" align="center">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="" label="状态" width="80" align="center">
                <template slot-scope="{row}">
                    <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ff4949"
                    :active-value= "1" @change="setStatus(row)"
                    :inactive-value= "0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="comment_content" label="内容" width="">
            </el-table-column>
            <el-table-column prop="user_name" label="用户名称" width="100"></el-table-column>
            <el-table-column prop="format" label="发布时间" width="160"></el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row}">
                <el-button type="primary" icon="el-icon-folder-opened" @click="getCommentInfo(row)">查看</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteComment(row)">删除</el-button>
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
            <!-- 查看文章 -->
          <el-dialog :visible.sync="dialogVisable" title="评论详情">
            <el-form style="width:80%" :model="commentInfo">
              <el-form-item label="所属资源ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="commentInfo.comment_info.item_id"/>
              </el-form-item>
              <el-form-item label="评论ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="commentInfo.comment_info.comment_id"/>
              </el-form-item>
              <el-form-item label="用户ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="commentInfo.comment_info.user_id"/>
              </el-form-item>
              <el-form-item label="发布时间" label-width="100px">
                <el-input autocomplete="off" readonly v-model="commentInfo.comment_info.format"/>
              </el-form-item>
              <el-form-item label="内容" label-width="100px">
                <el-input type="textarea" readonly autocomplete="off" :rows="2"
                v-model="commentInfo.comment_info.comment_content"/>
              </el-form-item>
              <div v-if="commentInfo.have_superior">
                <el-form-item label="上级评论" label-width="100px">
                </el-form-item>
                <el-form-item label="评论ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="commentInfo.superior_comment_info.comment_id"/>
                </el-form-item>
                <el-form-item label="用户ID" label-width="100px">
                  <el-input autocomplete="off" readonly v-model="commentInfo.superior_comment_info.user_id"/>
                </el-form-item>
                <el-form-item label="用户名称" label-width="100px">
                  <el-input autocomplete="off" readonly v-model="commentInfo.superior_comment_info.user_name"/>
                </el-form-item>
                <el-form-item label="发布时间" label-width="100px">
                  <el-input autocomplete="off" readonly v-model="commentInfo.superior_comment_info.format"/>
                </el-form-item>
                <el-form-item label="内容" label-width="100px">
                  <el-input type="textarea" readonly autocomplete="off" :rows="2"
                   v-model="commentInfo.superior_comment_info.comment_content"/>
                </el-form-item>
              </div>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisable = false">
                  返回
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  data(){
    return {
      dialogVisable: false,
      page: 1,
      size: 5,
      total: 0,
      commentList:[],
      commentInfo:{
        comment_info:{},
        superior_comment_info:{},
        have_superior: false
      },
      itemID: '',
    }
  },
  mounted(){
    this.getCommentList()
  },
  methods:{
    tableRowClassName({row}){
      if(row.status === 1){
        return 'success-row'
      } else if(row.status === 0){
        return 'warning-row'
      }
      return ''
    },
    getCommentList(){
      const {page, size} = this
      this.$API.comment.reqAllComment(page,size).then(res => {
        if(res.code === 1000){
          console.log('评论列表', res.data.list)
          this.commentList = res.data.list
          this.total = res.data.total
        }
      })
    },
    getCommentInfo(row){
      this.dialogVisable = true
      console.log('row.comment_id', row.comment_id)
      this.$API.comment.reqCommentInfo(row.comment_id).then(res => {
        console.log('评论信息', res.data)
        this.commentInfo = res.data
      })
    },
    setStatus(row){
      console.log('change','id',row.comment_id,'status',row.status)
      let status = 0
      if (row.status == 1){
        status = 0
      } else if (row.status == 0){
        status = 1
      }
      this.$API.comment.reqSetStatus(row.comment_id,status).then(res => {
        if(res.code === 1000){
          this.$message({
            type: 'success',
            message:'操作成功'
          })
        }
      })
    },
    search(){
      const {page, size, itemID} = this
      if(itemID === ''){
        this.getCommentList()
        return
      }
      this.$API.comment.reqCommentByItemID(itemID,page,size).then(res => {
        if(res.code === 1000){
          console.log('搜索评论列表', res.data.list)
          this.commentList = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(size){
      this.size = size
      if(this.itemID != ''){
        this.search()
      } else{
        this.getCommentList()
      }
    },
    handleCurrentChange(page){
      this.page = page
      if(this.itemID != ''){
        this.search()
      } else{
        this.getCommentList()
      }
    },
    deleteComment(row){
      this.$prompt('请输入密码', `确定要删除这条评论?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const sendData = {
            itemType: row.item_type,
            id: row.comment_id,
            secret: value
          }
          console.log('sendData',sendData)
          this.$API.comment.reqDeleteComment(sendData).then(res => {
            if(res.code == 1000){
              this.$message({
                type:'success',
                message: '删除成功'
              })
              this.handleCurrentChange(this.commentList.length > 1? this.page: this.page-1)
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>