<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="标签分类">
            <el-select placeholder="请选择" v-model="tagForm.tagID" @change="handleTagChange">
            <el-option :label="tag.name" :value="tag.id" v-for="tag in tagList" :key="tag.id"></el-option>
            </el-select>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  data(){
    return {
        tagList:[],
        tagForm:{
            tagID: '',
        },
    }
  },
  mounted(){
    this.getSelectTags()
  },
  methods:{
    getSelectTags(){
        this.$API.article.reqSelectTags().then(res => {
            console.log('选择标签', res)
            if(res.code === 1000){
                this.tagList = res.data
            }
        })
    },
    handleTagChange(){
        this.$emit('getTagID',this.tagForm.tagID)
    }
  }
}
</script>

<style>

</style>