<template>
    <div class="md:container mx-auto px-4 pt-4">
        <h2 class="text-xl text-gray-800 uppercase font-semibold tracking-wider">Programs</h2>
        <div class="mt-2 flex flex-col md:flex-row">
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
            isLoading: false 
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
        if(!this.fetchedRegulations) {
            this.isLoading = true
            this.$store.dispatch('doFetchRegulations').then(() => {
                this.isLoading = false
            }).catch(() => {
                this.isLoading = false
            })
        }
    },
    
}
</script>