<template>
    <dialog class="container" open>
        <div class="dialog">
            <slot></slot>
        </div>    
    </dialog>   
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .container{
        position: fixed;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background-color: grey;
        opacity: 0.8;
    }
    .dialog{
        z-index:100;
        padding:16px;
        background-color: whitesmoke;
        border-radius:10px;
        position: absolute;
        left:50%;
        top:40%;
        transform: translate(-50%, 0);
    }
</style>