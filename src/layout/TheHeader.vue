<template>
    <div class="container_content">
        <h1 class="short_brand">CC</h1>
        <h1 class="long_brand">Currency converter</h1>
        <div class="menu_items">
            <a v-for="(value, key) in menuItems" :key="key" 
            @click="$emit('toggleComponent', key)">{{ value }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                menuItems: {
                    home:'Home', 
                    conversionHistory:'Conversion History'
                }
            }
        }
    }
</script>

<style scoped>
    .short_brand{
        flex:1;
        display:none;
    }
    .long_brand{
        flex:1;
        display:block;
    }
    .container_content{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background:#252525;
        color:white;
        padding:10px 25px;
    }
    .menu_items{
        display:flex;
        justify-content: center;
        align-items:center;
    }

    .menu_items a{
        cursor: pointer;
        text-decoration: none;
        margin-left:20px;
    }

    @media(max-width:620px){
        .short_brand{
            display:block;
        }
        .long_brand{
            display:none;
        }
    }
</style>