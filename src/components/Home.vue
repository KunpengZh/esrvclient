<template>
    <div class="homediv">
        <h1>Welcome to Smart Supply Management</h1>
        <el-select placeholder="请选择" v-model="value">
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data: function() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕',
                    id: "0001"
                }, {
                    value: '选项2',
                    label: '双皮奶',
                    id: "0002"
                }, {
                    value: '选项3',
                    label: '蚵仔煎',
                    id: "0003"
                }, {
                    value: '选项4',
                    label: '龙须面',
                    id: "0004"
                }, {
                    value: '选项5',
                    label: '北京烤鸭',
                    id: "0005"
                }],
                value: "value1",
                brand: '',
                releaseDate: '',
                datePickerOptions: {},
                fullscreenLoading: false
            }
        },
        methods: {
            onselectchange: function(value) {
                console.log(value);
            }
        }
    }
</script>

<style>
    .homediv {
        margin: 30px;
    }
</style>