<template>
    <div class="container px-4 pt-1">
        <div class="mb-3">
            <span class="text-xl tracking-wider truncate mb-2" :title="regulation.program.name">{{ regulation.program.name}}</span>
            <span class="font-normal text-xs ml-3">{{ regulation.short_name }} / {{ regulation.start_year }}</span>
        </div>
        <div class="flex justify-start">
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Semesters</div>
                <div class="text-xl tracking-wider text-gray-900">{{ regulation.total_semesters }}</div>
            </div>
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Credits</div>
                <div class="text-xl tracking-wider text-gray-900">{{ regulation.total_credits }}</div>
            </div>
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Launch Year</div>
                <div class="text-xl tracking-wider text-gray-900">{{ regulation.start_year }}</div>
            </div>
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Subjects</div>
                <div class="text-xl tracking-wider text-gray-900">440</div>
            </div>
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Specializations</div>
                <div class="text-xl tracking-wider text-gray-900">{{ regulation.specializations.length}}</div>
            </div>
            <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Status</div>
                <div class="text-xl tracking-wider text-gray-900">In Force</div>
            </div>
        </div>
        <div class="flex justify-start mt-6">
            <div class="text-xs tracking-wider mr-5">Explore</div>
            <div class="w-24 text-xs text-right uppercase tracking-wider mr-3 border-b border-gray-400">Regulations</div>
            <div class="cursor-pointer w-24 text-xs text-right uppercase tracking-wider mr-3" :class="activeTab == 'Scheme' ? 'border-b-2 border-red-500' : 'border-b border-gray-400'" @click="activeTab = 'Scheme'">Scheme</div>
            <div class="cursor-pointer w-24 text-xs text-right uppercase tracking-wider mr-3" :class="activeTab == 'Subjects' ? 'border-b-2 border-red-500' : 'border-b border-gray-400'" @click="activeTab = 'Subjects'">Subjects</div>
            <div class="w-24 text-xs text-right uppercase tracking-wider mr-3 border-b border-gray-400">Performance</div>
            <div class="w-24 text-xs text-right uppercase tracking-wider mr-3 border-b border-gray-400">Feedback</div>
        </div>
        <Scheme v-if="activeTab == 'Scheme'" :regulation="regulation" class="my-6"/>
        <Subjects v-if="activeTab == 'Subjects'" :regulation="regulation" class="my-6"/>
        <!-- <keep-alive>
        <component :is="activeTab"></component>
        </keep-alive> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Scheme from './Scheme'
import Subjects from './Subjects'
export default {
    components: {
        Scheme,
        Subjects,
    },

    data() {
        return {
            isLoading: false,
            activeTab: "Subjects",
        }
    },

    computed: {
        ...mapState(['regulations']),

        id() {
            return this.$route.params.id
        },

        regulation() {
            let id = this.id
            return this.regulations.find(r => r.id == id)
        },

        fetchedSpecializations() {
            return this.$store.getters.fetchedSpecializations(this.id)
        }

    },

    created() {
        this.isLoading = true
        this.fetcheData(this.id)
        this.isLoading = false
    },

    methods: {
        showTab(tab) {

        },

        async fetcheData(regulation_id) {
            await this.$store.dispatch('doFetchSpecializations', regulation_id)
                .then(() => {
                    this.$store.dispatch('doFetchSemesters', regulation_id)
                })
                .then(() => {
                    this.$store.dispatch('doFetchScheme', regulation_id)
                })
        },
    },

}
</script>