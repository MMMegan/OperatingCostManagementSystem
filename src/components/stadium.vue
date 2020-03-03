<template>
    <div class="stadiumD" @click="handleStadium">
                <el-card class="box-card" >
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="require('../assets/site.jpg')"></el-image>
                    <div>
                        <P CLASS="name">{{item.name}}</P>
                        <P class="address">{{item.location }}</P>
                    </div>
                </el-card>
    </div>
</template>
<script>
    export default {
    
        props:{
            item:{
                type: Object
            }

        },
        methods:{
            handleStadium(){
                this.$router.push({name:'stadiumDetail',params: {id: this.item.id}});
            }
        }

    }
</script>
<style scoped>
 .name{
    font-size: 16px;
     font-weight: bolder;
 }
    .address{
        font-size: 14px;
        color: #666666;
    }

</style>