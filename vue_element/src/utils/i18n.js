export  function getRouteTitle(title) {
    // $te这个方法用以判断需要翻译的key在你提供的语言包(messages)中是否存在
    const hasKey = this.$te('route.' + title)
    //$t 翻译函数, 调用的是VueI18n实例上提供的方法
    const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

    if (hasKey) {
        return translatedTitle
    }
    return title
}