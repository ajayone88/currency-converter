<template>
    <div class="footer">&#169; {{ $t('FOOTER.COPYRIGHT')}}</div>
</template>

<script>
    export default {}
</script>
<style scoped>
    .footer {
         position: fixed;
         bottom: 0;
         background-color:#252525;
         padding: 16px 32px;
         color: white;
         height: 50px;
         width: 100%;
    }
</style>