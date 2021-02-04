<template>
   <div id="baseCard">
       <slot></slot>
   </div>
</template>

<script>
    export default {
        data(){
            return {};
        }
    }
</script>

<style scoped>
    #baseCard{
        margin:16px auto;
        padding:32px;
        background: white;
        box-shadow: 3px 3px 5px black;
        border-radius:3px;
    }
    @media(max-width: 768px){
        #baseCard{
            background: #f9f871;
            margin:0;
            padding:4px;
            box-shadow: none;
        }
    }
</style>