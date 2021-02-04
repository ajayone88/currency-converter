<template>
    <div>
        <ul>
            <li v-for="item in footerMenuItems" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                footerMenuItems: ['AboutUs', 'Contact']
            }
        }   
    }
</script>

<style scoped>
    div {
         background-color:#ffc75f;
    }
    ul{
        display:flex;
        justify-content:center;
        list-style: none;
    }
    li{
        cursor: pointer;
        background-color: white;
        margin:16px;
        padding:8px 16px;
        border-radius: 5px;
        
    }
</style>