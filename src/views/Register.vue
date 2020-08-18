<template>
    <div id="register">
        <div id="register1">
            <el-form label-position="right" ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="账号" prop="name" autocomplete="off">
                    <el-input v-model="form.name"  placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="alias">
                    <el-input v-model="form.alias"  placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="password" autocomplete="off">
                    <el-input type="password" placeholder="请输入密码"  v-model="form.password" ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password1"  autocomplete="off" >
                    <el-input type="password" placeholder="请重复输入密码"  v-model="form.password1" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.sex" prop="sex" style="width:100px;" >
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item><br>

                <el-form-item>
                    <el-button type="primary" @click="register('form')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {

        name: "ManagerLogin",
        methods: {

            register(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/customer/register",{
                            account:this.form.name,
                            alias:this.form.alias,
                            password:this.form.password,
                            sex:this.sex?1:0,
                            portrait:1
                        }).then(response=>{
                            this.$message({
                                type:'success',
                                message:"注册成功！"
                            })
                            this.$router.push('/login')
                        }).catch(error=>{
                            this.$message({
                                type:'error',
                                message:"注册失败！"
                            })
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


                console.log('submit!');
            }
        },
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                rules:{
                    name:[  { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
                    alias:[{ required: true, message: '请填写昵称', trigger: 'blur' }],
                    password:[{ required: true, message: '请填写密码', trigger: 'blur' }],
                    password1:[{ validator: validatePass2, trigger: 'blur' }],
                    sex:[{ required: true, message: '请选择活动区域', trigger: 'change' }]
                },

                form: {
                    name: '',
                    alias:'',
                    password:'',
                    password1:'',
                    sex:'',
                }
            }
        },
    }
</script>

<style scoped>
    #register{
        height: 100%;
        background: url("../assets/timg.jpg ");
        background-size: 100%;

    }
    #register1{
        position: absolute;width:440px;height:400px;left:50%;top:50%;
        margin-left:-201px;margin-top:-200px;border:1px solid #00F;
        padding-top: 60px;
        background:ghostwhite;
        border-radius:5px
    }
    .el-form-item{
        display: inline-block;
    }
</style>
