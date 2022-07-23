<template>
  <div class="container">
    <Header title="个人信息"></Header>
    <van-cell-group class="main-cell">
      <van-cell title="头像" is-link>
        <van-uploader>
          <van-image
            round
            width="0.8rem"
            height="0.8rem"
            :src="userInfo.photo"
          />
        </van-uploader>
      </van-cell>
      <van-cell title="昵称" is-link @click="showName = true">
        {{ userInfo.name }}
      </van-cell>
      <van-cell title="性别" is-link @click="showGender = true">{{
        userInfo.gender ? '女' : '男'
      }}</van-cell>
      <van-cell title="生日" is-link @click="showDate = true">{{
        userInfo.birthday | dataFormat
      }}</van-cell>
    </van-cell-group>
    <!-- 年月日选择器 -->
    <van-popup
      v-model="showDate"
      round
      position="bottom"
      :style="{ height: '48%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @confirm="confirmBirthday"
        @cancel="showDate = false"
        :min-date="minDate"
        :max-date="maxDate"
    /></van-popup>
    <!-- 选择性别 -->
    <van-popup
      v-model="showGender"
      round
      position="bottom"
      :style="{ height: '48%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="['男', '女']"
        @confirm="confirmGender"
        @cancel="showGender = false"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <van-popup
      v-model="showName"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div>
        <div class="title">
          <van-button class="btn" @click="showName = false">取消</van-button>
          <p class="edit-name">更新昵称</p>
          <van-button class="btn" @click="confirmName">保存</van-button>
        </div>
        <van-field
          v-model="userInfo.name"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入留言"
          show-word-limit
        >
        </van-field>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import { getUserDetailInfo, editUserInfo } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'User',
  components: {
    Header
  },
  data() {
    return {
      userInfo: {},
      showDate: false,
      showGender: false,
      showName: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2035, 10, 1),
      currentDate: new Date(2000, 0, 17)
    }
  },

  created() {
    this.getUserDetailInfo()
  },

  methods: {
    async getUserDetailInfo() {
      const { data } = await getUserDetailInfo()
      this.userInfo = data.data
    },
    async confirmBirthday(val) {
      try {
        val = dayjs(val).format('YYYY-MM-DD')
        this.userInfo.birthday = val
        this.showDate = false
        await editUserInfo({ birthday: val })
        this.$toast.success('更新个人信息成功')
      } catch (error) {
        if (error.status === 401) {
          this.$toast.fail('登录身份过期,请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast.fail('个人信息修改失败,请重试')
        }
      }
    },
    async confirmGender(val) {
      this.showGender = false
      if (val === '女') {
        this.userInfo.gender = 1
      } else {
        this.userInfo.gender = 0
      }
      try {
        await editUserInfo({ gender: this.userInfo.gender })
        this.$toast.success('更新个人信息成功')
      } catch (error) {
        if (error.status === 401) {
          this.$toast.fail('登录身份过期,请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast.fail('个人信息修改失败,请重试')
        }
      }
    },
    async confirmName() {
      if (this.userInfo.name === '') {
        return this.$toast.fail('昵称不能为空')
      }
      try {
        this.showName = false
        await editUserInfo({ name: this.userInfo.name })
        this.$toast.success('更新昵称成功')
      } catch (error) {
        if (error.status === 401) {
          this.$toast.fail('登录身份过期,请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast.fail('个人信息修改失败,请重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  background-color: #f5f7f9;
  .van-picker {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    border: unset;
    font-size: 28px;
    color: #1989fa;
  }
  .edit-name {
    font-size: 32px;
    color: #323233;
  }
}
.main-cell {
  padding-top: 92px;
}
</style>
