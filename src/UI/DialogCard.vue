<template>
    <dialog class="dialog-container" open>
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
    .dialog-container{
        position: fixed;
        top:0;
        left:0;
        height:100vh;
        width:100%;
        background-color: rgba(225,225,225,0.8);
    }
    .dialog{
        z-index:100;
        width:250px;
        padding:16px;
        background-color: whitesmoke;
        border-radius:10px;
        position: absolute;
        left:50%;
        top:40%;
        text-align: center;
        transform: translate(-50%, 0);
    }
</style>