<template>
    <div class="shadow-lg rounded-sm bg-gradient-gray-light p-3 mb-1 border border-gray-500 hover:bg-gradient-gray-dark" @click="dashboardItemSelected(caption)">
        <h2 class="text-lg font-semibold text-gray-900">{{ caption }}</h2>
        <hr class="border-2" :class="active ? 'border-red-600' : 'border-gray-400'"> 
        <div class="mt-1 font-normal text-xs text-gray-700">
            <span> {{ caption }}</span>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        caption: String,

    }, // end of props

    data() {
        return {
            active: false,
        }
    }, // end of data

    methods: {
        dashboardItemSelected(caption) {
            EventDispatcher.fire('dashboardItemSelected', caption)
        }
    }, // end of methods

    created() {
        EventDispatcher.listen('dashboardItemSelected', (caption) => {
            this.active = this.caption == caption
        })

    }, // end of created

}
</script>