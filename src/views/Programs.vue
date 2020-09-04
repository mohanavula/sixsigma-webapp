<template>
    <div class="md:container mx-auto px-4 pt-4">
        <h2 class="text-xl text-gray-800 uppercase font-semibold tracking-wider">Programs</h2>
        <div>
            <div v-if="isLoading || isError">
                <div class="shadow-lg rounded-sm bg-gradient-gray-light p-3 mb-1 border border-gray-500 hover:bg-gradient-gray-dark text-lg font-semibold text-gray-900">
                    <div v-if="isLoading" class="">
                        <img src="../assets/spinner" alt="spinner" class="mr-2">
                        Please wait...
                    </div>
                    <div v-else>
                        {{ error_message }}
                    </div>
                    <hr class="border-2 border-gray-400 mb-2"> 
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
import { mapGetters } from 'vuex'
export default {
    components: {
        RegulationIndexCard,

    }, // components

    data() {
        return {
            isLoading: false,
            isError: false,
            error_message: "",
        }
    }, // data

    computed: {
        ...mapState(['regulations']),
        ...mapGetters(['fetchedRegulations']),

    }, // computed

    created() {
        if (this.fetchedRegulations) return
        let vm = this
        vm.isLoading = true
        vm.isError = false
        vm.error_message = ""
        vm.fetchBasicData()
            .then(() => {
                vm.isLoading = false
                vm.$router.push({ name: 'programProfile', params: { id: vm.regulations[0].id } })
            })
            .catch((e) => {
                vm.isLoading = false
                vm.isError = true
                vm.error_message = e.message
            })
    }, // created

    methods: {
        async fetchBasicData() {
            let regulationsPromise = this.$store.dispatch('doFetchRegulations')
            let departmentsPromise = this.$store.dispatch('doFetchDepartments')
            await Promise.all([regulationsPromise, departmentsPromise])
        },

    }, // methods
    
}
</script>