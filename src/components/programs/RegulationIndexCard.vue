<template>
    <div class="shadow-lg rounded-sm bg-gradient-gray-light p-3 mb-1 border border-gray-500 hover:bg-gradient-gray-dark" @click="programSelected(regulation.id)">
        <h2 class="text-lg font-semibold text-gray-900" :title="regulation.program.name">{{ regulation.program.short_name }}</h2>
        <hr class="border-2" :class="active ? 'border-red-600' : 'border-gray-400'"> 
        <div class="mt-1 font-normal text-xs text-gray-700">
            <span>{{ regulation.short_name }} / {{ regulation.start_year }}</span>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        regulation: Object,
    },

    data() {
        return {
            active: false,
        }
    },

    created() {
        EventDispatcher.listen('programSelected', this.setSelectedProgram)
    },

    watch: {
        $route: function(route) {
            console.log('in watch: ' + route.params.id)
            this.active = this.regulation.id == route.params.id
        }
    },

    methods: {
        setSelectedProgram(id) {
            console.log('in event callback ' + id)
            this.active = this.regulation.id == id
        },

        programSelected(id) {
            EventDispatcher.fire('programSelected', id)
        }
    }
}
</script>
