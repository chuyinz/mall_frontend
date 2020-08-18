<template>
    <div id="login">
            <div id="login1">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="account">
            <el-input v-model="form.account"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码"   v-model="form.password" ></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="login('ruleForm')">登录</el-button>
            <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
    </el-form>
        </div>
    </div>
</template>

<script>

    export default {

        name: "ManagerLogin",
        data() {
            return {
                form: {
                    account: '',
                    password:''
                },

                //校验规则
                rules:{
                    account:[
                        { required: true, message: '你没有输入账号哦QAQ', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '密码也要给老子输！', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            login(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid)
                    {
                        //this.$axios.post('/login',)
                        this.$axios.post('/login',this.$data.form)
                            .then(response=>{
                                if(response.data.role=='customer')
                                {
                                    localStorage.setItem('jwtToken',response.data.jwt)
                                    localStorage.setItem('account',response.data.account)



                                    // console.log('localStorage')
                                    // console.log(localStorage.getItem('account'))
                                    this.$router.push('/')
                                }
                                else//是管理员账户
                                    this.$message.error('兄嘚，您这儿账户密码不对啊！');
                            })
                            .catch(error=>{
                                this.$message.error('兄嘚，您这儿账户密码不对啊！');
                                console.log(error)
                            })
                    }
                    else
                    {
                        alert("请填写信息啊亲")
                    }
                })
            },
            register(){
                this.$router.push('Register');
            }
        }
    }
</script>

<style scoped>
    #login{
        height: 100%;
        background: url("../assets/timg.jpg ");
        background-size: 100%;

    }
    #login1{
        position: absolute;width:400px;height:200px;left:50%;top:50%;
        margin-left:-201px;margin-top:-131px;border:1px solid #00F;
        padding-top: 60px;
        background:ghostwhite;
        border-radius:5px
    }
    .el-form-item{
        display: inline-block;
    }
</style>

