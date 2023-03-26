<template>
  <div class="page">
    <div class="gva-card-box">
      <div class="gva-card gva-top-card">
        <div class="gva-top-card-left">
          <div class="gva-top-card-left-title">早安，管理员，请开始一天的工作吧</div>
          <div class="gva-top-card-left-rows">
            <el-row>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="el-icon-sort dashboard-icon"></el-icon>
                  今日流量 (2023)
                </div>
              </el-col>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="el-icon-user-solid dashboard-icon"></el-icon>
                  总用户数 (1112)
                </div>
              </el-col>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="el-icon-s-comment dashboard-icon"></el-icon>
                  好评率 (99%)
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <div class="gva-top-card-left-item">
              项目展示：
              <a
                style="color:#409EFF"
                target="view_window"
                href="http://8.134.222.37"
              >8.134.222.37</a>
            </div>
          </div>
        </div>
        <img :src="require('@/assets/image/dashboard.png')" class="gva-top-card-right" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
@mixin flex-center {
    display: flex;
    align-items: center;
}
.page {
    background: #f0f2f5;
    padding: 0;
    .gva-card-box{
      padding: 12px 16px;
      &+.gva-card-box{
        padding-top: 0px;
      }
    }
    .gva-card {
      box-sizing: border-box;
        background-color: #fff;
        border-radius: 2px;
        height: auto;
        padding: 26px 30px;
        overflow: hidden;
        box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.03);
    }
    .gva-top-card {
        height: 260px;
        @include flex-center;
        justify-content: space-between;
        color: #777;
        &-left {
          height: 100%;
          display: flex;
          flex-direction: column;
            &-title {
                font-size: 22px;
                color: #343844;
            }
            &-dot {
                font-size: 16px;
                color: #6B7687;
                margin-top: 24px;
            }
            &-rows {
                // margin-top: 15px;
                margin-top: 18px;
                color: #6B7687;
                width: 600px;
                align-items: center;
            }
            &-item{
              +.gva-top-card-left-item{
                margin-top: 24px;
              }
              margin-top: 14px;
            }
        }
        &-right {
            height: 600px;
            width: 600px;
            margin-top: 28px;
        }
    }
     ::v-deep(.el-card__header){
          padding:0;
          border-bottom: none;
        }
        .card-header{
          padding-bottom: 20px;
          border-bottom: 1px solid #e8e8e8;
        }
}
.dashboard-icon {
    font-size: 20px;
    color: rgb(85, 160, 248);
    width: 30px;
    height: 30px;
    margin-right: 10px;
    @include flex-center;
}
.flex-center {
    @include flex-center;
}
@media (max-width: 750px) {
    .gva-card {
        padding: 20px 10px !important;
        .gva-top-card {
            height: auto;
            &-left {
                &-title {
                    font-size: 20px !important;
                }
                &-rows {
                    margin-top: 15px;
                    align-items: center;
                }
            }
            &-right {
                display: none;
            }
        }
        .gva-middle-card {
            &-item {
                line-height: 20px;
            }
        }
        .dashboard-icon {
            font-size: 18px;
        }
    }
}
</style>