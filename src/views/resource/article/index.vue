<template>
    <div>
        <el-card style="margin:20px 0px">
          <CategorySelect @getTagID="getTagID"></CategorySelect>
        </el-card>
        <el-card>
          <!-- 表格 -->
          <el-table border style="width: 100%" :data="articleList">
            <el-table-column type="index" label="序号" width="80" align="center">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="articleInfo.title" label="标题" width="150"></el-table-column>
            <el-table-column prop="articleInfo.image" label="头图" width="150">
              <template slot-scope="{row}">
                <img :src="row.articleInfo.image" alt="" style="width:80px;height:80px">
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="所属标签">
              <template slot-scope="{row}">
                <el-tag type="success" v-for="info in row.articleInfo.tags" :key="info.id">{{info.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者" width="150"></el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row}">
                <el-button type="primary" icon="el-icon-folder-opened" @click="checkDetail(row)">查看</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteArticle(row)">删除</el-button>
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
          <el-dialog :visible.sync="dialogVisable" title="文章详情">
            <el-form style="width:80%" :model="articleDetail" >
              <el-form-item label="文章ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="articleDetail.id"/>
              </el-form-item>
              <el-form-item label="用户ID" label-width="100px">
                <el-input autocomplete="off" readonly v-model="articleDetail.authorID"/>
              </el-form-item>
              <el-form-item label="发布时间" label-width="100px">
                <el-input autocomplete="off" readonly v-model="articleDetail.format"/>
              </el-form-item>
              <el-form-item label="标题" label-width="100px">
                <el-input autocomplete="off" readonly v-model="articleDetail.title"/>
              </el-form-item>
              <el-form-item label="副标题" label-width="100px">
                <el-input autocomplete="off" readonly v-model="articleDetail.subtitle"/>
              </el-form-item>
              <el-form-item label="内容" label-width="100px">
                <el-input type="textarea" readonly autocomplete="off" :rows="12" v-model="articleDetail.content"/>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="cancelCheck">
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
  name: 'Article',
  data(){
    return {
      tagID: '',
      articleList:[],
      page:1,
      size:5,
      total:0,
      dialogVisable: false,
      articleDetail:{}
    }
  },
  methods:{
    getTagID(tagID){
      console.log('收到的ID', tagID)
      this.tagID = tagID
      this.getTagArticle()
    },
    getTagArticle(){
      console.log('发送请求')
      this.$API.article.reqTagArticles(this.tagID,this.page,this.size).then(res => {
        console.log('标签文章', res)
        if(res.code === 1000){
          this.total = res.data.total
          this.articleList = res.data.list
        }
      })
    },
    handleSizeChange(size){
      this.size = size
      this.getTagArticle()
    },
    handleCurrentChange(page){
      this.page = page
      this.getTagArticle()
    },
    checkDetail(row){
      this.dialogVisable = true
      this.$API.article.reqArticleDetail(row.articleInfo.id).then(res => {
        if(res.code === 1000){
          this.articleDetail = res.data.article
          console.log('articleDetail', this.articleDetail)
        }
      })
    },
    cancelCheck(){
      this.dialogVisable = false
      this.articleDetail = {}
    },
    deleteArticle(row){
      this.$prompt('请输入密码', `确定要删除这篇文章?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const authAndID = {
            id: row.articleInfo.id,
            secret: value
          }
          console.log('authAndID',authAndID)
          this.$API.article.reqDeleteArticle(authAndID).then(res => {
            if(res.code == 1000){
              this.$message({
                type:'success',
                message: '删除成功'
              })
              this.handleCurrentChange(this.articleList.length > 1? this.page: this.page-1)
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

</style>