<template>
  <div class="update-avatar">
    <div class="userAvaterPopuo">
      <div class="img-container">
        <img :src="photo" alt="" ref="img" />
      </div>
    </div>
    <div class="toolbar">
      <van-cell
        ><span slot="title" @click="cancel">取消</span>
        <span @click="confirm">确认</span></van-cell
      >
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { editUserPhoto } from '@/api'
export default {
  name: 'PopupCropper',

  data() {
    return {
      photoUrl: ''
    }
  },
  props: ['photo'],
  mounted() {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      background: false, // 关闭默认背景
      aspectRatio: 1 / 1, // 默认比例
      guides: false, // 裁剪框的虚线(九宫格)
      autoCropArea: 0.3, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
      dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
      movable: true, // 是否允许移动剪裁框
      resizable: true, // 是否允许改变裁剪框的大小
      scalable: true, // 是否可以缩放图片
      zoomable: false, // 是否允许缩放图片大小
      mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
      touchDragZoom: false, // 是否允许通过触摸移动来缩放图片
      rotatable: false // 是否允许旋转图片
    })
  },

  methods: {
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('this.photo', blob)
        const { data } = await editUserPhoto(blob)
        this.photoUrl = data.data.photo
        // 更新视图
        this.$parent.$parent.showPhoto = false
        this.$emit('setPhoto', this.photoUrl)
      })
    },
    cancel() {
      this.$parent.$parent.showPhoto = false
    }
  }
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    :deep(.van-cell) {
      position: absolute;
      bottom: 0;
      color: #fff;
      width: 96%;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      .van-cell__value {
        color: #fff;
      }
    }
  }
}
:deep(.van-overlay) {
  position: relative;
  // height: 100%;
  .footer {
    position: absolute;
    bottom: 0;
  }
}
.userAvaterPopuo {
  position: relative;
  background-color: #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;
  .before {
    width: 100px;
    height: 100px;
    overflow: hidden;
    /* 这个属性可以得到想要的效果 */
  }
  .img-container {
    width: 750px;
    height: 750px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }

    :deep(.van-loading) {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
    }
  }
}
</style>
