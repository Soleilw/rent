<template>
    <div class="map">
        <iframe id="mapPage" width="100%" height="800" frameborder=0 :src="getSrc">
        </iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            getSrc() {
                var baseUrl = 'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=' + '3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA' + '&referer=' + 'myapp'
                if (this.lat && this.lng) {
                    baseUrl += `&coord=${this.lat},${this.lng}` 
                }
                return baseUrl
            }
        },
        props: {
            mapKey: {
                type: String,
                default: ''
            },

            keyName: {
                type: String,
                default: ''
            },
            lat: {
                type: [String, Number]
            },
            lng: {
                type: [String, Number]
            }
        },

        mounted() {
            var self = this
            window.addEventListener('message', function(event) {
                // 对于无法识别的地址，直接返回无法选择
                var loc = event.data
                if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                    self.$emit('callback', loc)
                }
            }, false)
        }
    }
</script>

<style lang="scss" scoped>
    .map {
        width: 100%;
        height: 100%;
    }
</style>