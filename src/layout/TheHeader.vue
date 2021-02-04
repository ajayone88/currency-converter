<template>
    <div>
        <ul>
            <h1>All in one currency converter</h1>
            <li v-for="(value, key) in menuItems" :key="key" @click="$emit('toggleComponent', key)">{{ value }}</li>
        </ul>
        <div class="smallHeader">
            <h1>Converter</h1>
            <hr>
            <span v-for="(value, key) in menuItems" :key="key" @click="$emit('toggleComponent', key)">{{ value }}</span>
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
    .smallHeader{
        display: none;
    }
    div {
        background-color:#845ec2;
    }

    ul {
        display:flex;
        justify-content: flex-end;
        list-style: none;
    }

    h1{
        align-self: center;
        flex-grow: 1;
        margin-left:32px;
    }

    li {
        cursor: pointer;
        background-color: white;
        margin:16px;
        padding:8px 16px;
        border-radius: 5px;
    }

    @media(max-width:850px){ 
        ul{
            display:none;
        }
        .smallHeader{
            display:block;
        }
        h1{
            text-align: center;
            margin-left:0px;
        }
        span{
           padding:8px;
           display:block;
           color:white;
        }
    }

</style>