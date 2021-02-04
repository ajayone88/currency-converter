<template>
   <div class="base_card">
       <slot></slot>
   </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .base_card{
        margin:16px auto;
        padding:32px;
        background: #2ca3a3;
        color:white;
        box-shadow: 3px 3px 5px black;
        border-radius:3px;
    }
    @media(max-width:450px){
       .base_card{
            padding:0px;
            margin:0;
       }
    }
</style>