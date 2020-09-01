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
                                <td>Program</td>
                                <td>Specialization</td>
                                <td>Semester</td>
                                <td>Start Date</td>
                                <td>End Date</td>
                                <td>Status</td>
                            </tr>
                            <tr v-for="academic_class in academic_classes" :key="academic_class.id">
                                <td>{{ academic_year_plus_one(academic_class.academic_year) }}</td>
                                <td>{{ academic_class.specialization_id }}</td>
                                <td>{{ academic_class.specialization_id }}</td>
                                <td>{{ academic_class.semester_id }}</td>
                                <td>{{ academic_class.start_date }}</td>
                                <td>{{ academic_class.end_date }}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="flex my-2"> <!-- action buttons -->
                        <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-800 py-1 px-2 mr-2 rounded-sm hover:bg-teal-500 hover:text-teal-100" type="button" @click="createClass()" title="Create class">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="folder-add w-6 h-6"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modals -->
        <CreateClassModal v-if="show_create_class_modal" :academic_classes="academic_classes"/>
        
    </div>
</template>

<script>
import axios from 'axios'
import CreateClassModal from './CreateClassModal'
export default {
    components: {
        CreateClassModal,
    },

    data() {
        return {
            isLoading: false,
            academic_classes: [],
            error_message: '',
            isError: false,

            show_create_class_modal: false

        }
    }, // end of data

    computed: {
        
    },

    methods: {
        academic_year_plus_one: (year) => {
            return year + '-' + (year - Math.floor(year/100) * 100)
        },

        async getClasses() {
            axios.defaults.baseURL = 'http://sixsigma.api/api'
            this.isLoading = true
            this.isError = false
            await axios.get('/academics/classes')
                .then(response => {
                    this.academic_classes = response.data
                    this.isLoading = false
                })
                .catch(error => {
                    this.isError = true
                    this.isLoading = false
                    console.log(error.response)
                    if (error.response) {
                        this.error_message = error.response.statusText
                    } else {
                        this.error_message = error.message
                    }
                })
        },

        createClass() {
            this.show_create_class_modal = true
        },

    }, // end of methods

    mounted() {
        this.getClasses()
        EventDispatcher.listen("hide-create-class-modal", () => {
            this.show_create_class_modal = false
        })
    }
}
</script>