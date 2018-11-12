<template>
    <div>
        <el-dropdown @command="handleSetLanguage">
        <span class="el-dropdown-link">
            <i class="el-img-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh" :disabled="language === 'zh'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="language === 'en'">英文</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters(['language'])
    },
    mounted() {
    },
    methods: {
        handleSetLanguage (lang) {
            this.$i18n.locale = lang
            this.$store.dispatch('setLanguage', lang)
            this.$message({
                message: 'switch language success',
                type: 'success'
            })
        }
    }
}
</script>

<style scoped>
.el-img-setting {
  display: block;
  width: 30px;
  height: 30px;
  background: url('../../assets/img/britain.png') 0 0/100% 100% no-repeat;
}
</style>
