<template>
    <div @click="toDetail">
        <el-card class="card">
            <h4>{{news.title}}</h4>
            <P class="author">from:{{news.writer.username}}</P>
        </el-card>
    </div>
</template>
<script>
    export default {
        props:{
         news:{
             type: Object,
         }
        },
        methods:{
            toDetail(){
                this.$router.push({name:'newsDetail',params: {id: this.news.id}});
            }
        }
    }
</script>
<style scoped>
.card{
    display: flex;
   float: left;
    width: 200px;
}
    .author{
        color: #909399;
    }

</style>