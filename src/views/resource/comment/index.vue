<template>
    <div>
        <el-card style="margin:20px 0px">
        </el-card>
        <el-card>
            <!-- 表格 -->
          <el-table border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center">
              <!-- <template slot-scope="scope">
                {{scope.$index + 1}}
              </template> -->
            </el-table-column>
            <el-table-column prop="" label="状态" width="" align="center">
                <template slot-scope="">
                    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="" label="类型"></el-table-column>
            <el-table-column prop="" label="内容" width="150"></el-table-column>
            <el-table-column prop="" label="作者" width="150"></el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="">
                <el-button type="primary" icon="el-icon-folder-opened" >查看</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  data(){
    return {
        value: true
    }
  }
}
</script>

<style>

</style>