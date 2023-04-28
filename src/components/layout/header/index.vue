<template>
    <div class="header">
        <h1 class="header__short-brand">{{ $t('HEADER.BRAND.SHORT') }}</h1>
        <h1 class="header__long-brand">{{ $t('HEADER.BRAND.LONG') }}</h1>
        <div class="header__menu">
            <a v-for="(value, key) in getMenu" 
            class="header__menu--item"
            :key="key" 
            @click="$emit('navigate', key)">{{ value }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'header',
        computed: {
            getMenu(){
                return {
                    converter: this.$t('HEADER.MENU.CONVERTER'),
                    history: this.$t('HEADER.MENU.HISTORY'),
                    chart: this.$t('HEADER.MENU.CHART'),
                }
            },
        }
    }
</script>

<style scoped>

    .header {
        display:flex;
        justify-content: space-between;
        background:#252525;
        color:white;
        padding: 16px 32px;
    }
    .header__short-brand{
        flex:1;
        display:none;
    }
    .header__long-brand{
        flex:1;
        display:block;
    }
    .header__menu{
        min-width: 250px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        cursor: pointer
    }

    .header__menu--item:hover{
        color: grey;
    }

    @media(max-width:620px){
        .header__short-brand{
            display:block;
        }
        .header__long-brand{
            display:none;
        }
    }
</style>