<template>
    <div class="md:container mx-auto px-4 pt-4">
        <h2 class="text-xl text-gray-800 uppercase font-semibold tracking-wider">Programs</h2>
        <div>
            <div v-if="isLoading">
                <div class="shadow-lg rounded-sm bg-gradient-gray-light p-3 mb-1 border border-gray-500 hover:bg-gradient-gray-dark">
                    <h2 class="text-lg font-semibold text-gray-900">Please wait...</h2>
                    <hr class="border-2 border-gray-400"> 
                </div>
            </div>
            <div v-else class="mt-2 flex flex-col md:flex-row">
                <div class="sidemenu flex sm:flex-row md:flex-col">
                        <router-link class="" v-for="regulation in regulations" :key="regulation.id" :to="{ name: 'programProfile', params: { id: regulation.id } }">
                            <RegulationIndexCard  :regulation="regulation" />
                        </router-link>
                </div>
                <div class="content md:ml-2 bg-gray-700 text-gray-200 flex-grow h-full">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegulationIndexCard from './../components/programs/RegulationIndexCard'
import { mapState } from 'vuex'
export default {
    components: {
        RegulationIndexCard,
    },

    data() {
        return {
            isLoading: false,
            isError: false
        }
    },

    computed: {
        ...mapState(['regulations']),

        // regulations() {
        //     return this.$store.getters.getRegulations
        // },

        fetchedRegulations() {
            return this.$store.getters.fetchedRegulations
        },
    },

    created() {
        // if(!this.fetchedRegulations) {
        //     this.isLoading = true
        //     this.$store.dispatch('doFetchRegulations').then(() => {
        //         this.isLoading = false
        //     }).catch(() => {
        //         this.isLoading = false
        //     })
        // }
        if (this.fetchedRegulations) return
        let vm = this
        vm.isLoading = true
        vm.isError = false
        vm.fetchBasicData()
            .then(() => {
                vm.isLoading = false
                vm.$router.push({ name: 'programProfile', params: { id: vm.regulations[0].id } })
            })
            .catch((e) => {
                vm.isLoading = false
                vm.isError = true
                console.log(e)
            })
    },

    methods: {
        async fetchBasicData() {
            let regulationsPromise = this.$store.dispatch('doFetchRegulations')
            let departmentsPromise = this.$store.dispatch('doFetchDepartments')
            await Promise.all([regulationsPromise, departmentsPromise])
        },

    }
    
}
</script>