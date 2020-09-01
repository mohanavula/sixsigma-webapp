<template>
    <div class="mt-4">
        <div v-if="isLoading || isError">
            <div class="flex items-start">
                <div class="w-32">Classes</div>
                <div v-show="isLoading">Fetching...</div>
                <div v-show="isError">{{ error_message }}</div>
            </div>
        </div>

        <div v-else>
            <div class="flex items-start">
                <div class="w-32">Classes</div>
                <div class="flex flex-col">
                    <div v-if="academic_classes.length == 0">
                        No classes found
                    </div>
                    <div v-else>
                        <table >
                            <tr>
                                <td>Academic Year</td>
                                <td class="px-2">Program</td>
                                <td class="px-2">Regulation</td>
                                <td class="px-2">Specialization</td>
                                <td class="px-2">Semester</td>
                                <td class="px-2">Sections</td>
                                <td class="px-2">Start Date</td>
                                <td class="px-2">End Date</td>
                                <td>Status</td>
                            </tr>
                            <tr v-for="academic_class in academic_classes" :key="academic_class.id">
                                <td>{{ academic_year_plus_one(academic_class.academic_year) }}</td>
                                <td class="px-2">{{ program_short_name(academic_class.semester_id) }}</td>
                                <td class="px-2">{{ regulation_short_name(academic_class.semester_id) }}</td>
                                <td class="px-2">{{ specialization_short_name(academic_class.specialization_id) }}</td>
                                <td class="px-2">{{ semester_short_name(academic_class.semester_id) }}</td>
                                <td class="px-2">{{ academic_class.sections.length }}</td>
                                <td class="px-2">{{ academic_class.start_date }}</td>
                                <td class="px-2">{{ academic_class.end_date }}</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>

                    <div class="flex my-2"> <!-- action buttons -->
                        <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-800 py-1 px-2 mr-2 rounded-sm focus:outline-none hover:bg-teal-500 hover:text-teal-100" type="button" @click="show_create_class_modal()" title="Create class">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="folder-add w-6 h-6"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modals -->
        <CreateClassModal v-if="is_create_class_modal_visible" :academic_classes="academic_classes"/>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {mapGetters} from 'vuex'
import CreateClassModal from './CreateClassModal'
export default {
    components: {
        CreateClassModal,
    },

    data() {
        return {
            isLoading: false,
            // academic_classes: [],
            error_message: '',
            isError: false,
            is_create_class_modal_visible: false

        }
    }, // end of data

    computed: {
        ...mapState(['regulations', 'academic_classes']),
        ...mapGetters(['fetchedRegulations', 'fetchedAcademicClasses'])
    },

    methods: {
        regulation_short_name(semester_id) {
            let val = "N/A"
            this.regulations.forEach(r => {
                r.semesters.forEach(s => {
                    if (s.id == semester_id) {
                        val = r.short_name
                    }
                })
            });
            return val
        },

        program_short_name(semester_id) {
            let val = "N/A"
            this.regulations.forEach(r => {
                r.semesters.forEach(s => {
                    if (s.id == semester_id) {
                        val = r.program.short_name
                    }
                })
            });
            return val
        },

        semester_short_name(semester_id) {
            let val = "N/A"
            this.regulations.forEach(r => {
                r.semesters.forEach(s => {
                    if (s.id == semester_id) val = s.short_name
                })
            });
            return val
        },

        specialization_short_name(specialization_id) {
            let val ="N/A"
            this.regulations.forEach(r => {
                r.program.specializations.forEach(s => {
                    if (s.id == specialization_id) val = s.short_name
                })
            });
            return val
        },

        academic_year_plus_one: (year) => {
            return year + '-' + (1 + (year - Math.floor(year/100) * 100))
        },

        // async getClasses() {
        //     axios.defaults.baseURL = 'http://sixsigma.api/api'
        //     this.isLoading = true
        //     this.isError = false
        //     await axios.get('/academics/classes')
        //         .then(response => {
        //             this.academic_classes = response.data
        //             this.isLoading = false
        //         })
        //         .catch(error => {
        //             this.isError = true
        //             this.isLoading = false
        //             console.log(error.response)
        //             if (error.response) {
        //                 this.error_message = error.response.statusText
        //             } else {
        //                 this.error_message = error.message
        //             }
        //         })
        // },

        show_create_class_modal() {
            this.is_create_class_modal_visible = true
        },

        async fetchData() {
            let promises = []
            if (!this.fetchedRegulations) {
                let regulationsPromise = this.$store.dispatch('doFetchRegulations')
                promises.push(regulationsPromise)
            }
            if (!this.fetchedAcademicClasses) {
                let academicClassesPromise = this.$store.dispatch('doFetchAcademicClasses')
                promises.push(academicClassesPromise)
            }
            await Promise.all(promises)
        },

    }, // end of methods

    mounted() {
        EventDispatcher.listen("hide-create-class-modal", () => {
            this.is_create_class_modal_visible = false
        })
        
        if (this.fetchedRegulations && this.fetchedAcademicClasses) return
        let vm = this
        vm.isLoading = true
        vm.isError = false

        vm.fetchData()
            .then(() => {
                vm.isLoading = false
            })
            .catch((e) => {
                vm.isLoading = false
                vm.isError = true
                this.error_message = e.message
                console.log(e)
            })



    }, // end of mounted
}
</script>