<template setup>
    <div class="content">
        <div class="left">
            <el-card>
                <div class="userInfo">
                    <div class="userInfo_icon">
                        <img :src="getImageUrl" class="userIcon">
                    </div>
                    <div class="userInfo_info">
                        <h3>Admin</h3>
                        <p class="grey_text">超级管理员</p>
                    </div>
                </div>
                <template #footer>
                    <div class="logininfo">
                        <div>
                            <p class="grey_text">上次登录时间：<span>2023-08-01 10:00:00</span></p>

                        </div>
                        <div>
                            <p class="grey_text">上次登录地点：<span>中国</span></p>

                        </div>
                    </div>
                </template>
            </el-card>
        </div>
        <div class="right">

        </div>
    </div>

</template>

<script setup lang="ts">
const getImageUrl = new URL("https://img2.baidu.com/it/u=2318884743,3754999155&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500").href;
</script>

<style scoped>
.left {
    width: 30%;
    background-color: bisque;

    .userIcon {
        width: 100px;
        height: 100px;
        background-image: url("https://img2.baidu.com/it/u=2318884743,3754999155&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
        background-size: cover;
        background-position: center;
        border-radius: 50%;


    }

    .userInfo {
        display: flex;

        .userInfo_icon {
            margin-right: 20px;
        }

        .userInfo_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .logininfo {
        span {
            color: #000;
        }
    }
}

.grey_text {
    color: grey;
}

.right {
    width: 70%;
    background-color: aqua;
}

:deep(.el-card__footer) {
    width: 90%;
    margin: 0 auto;
}
</style>
