<template>
   <div class="card">
       <slot></slot>
   </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .card{
        padding: 16px;
        margin: 16px 16px 66px 16px;
        background: #2ca3a3;
        color:white;
        box-shadow: 3px 3px 5px black;
        border-radius:15px;
    }
    @media(max-width:450px){
        .card{
            margin: 16px 0;
            width: 100%;
        }
    }
</style>