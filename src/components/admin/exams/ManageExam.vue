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
                <div class="w-32">Exams</div>
                <div class="flex flex-col">
                    <div v-if="academic_classes.length == 0">
                        No exams found
                    </div>
                    <div v-else>
                        <table >
                            <tr>
                                <td>Academic Year</td>
                                <td class="px-2">Program</td>
                                <td class="px-2">Regulation</td>
                                <td class="px-2">Semester</td>
                                <td class="px-2">Start Date</td>
                                <td class="px-2">End Date</td>
                                <td class="px-2">category</td>
                                <td>Status</td>
                            </tr>
                            <tr v-for="exam in exams" :key="exam.id">
                                <td>{{ academic_year_plus_one(exam.academic_year) }}</td>
                                <td class="px-2">{{ program_short_name(exam.semester_id) }}</td>
                                <td class="px-2">{{ regulation_short_name(exam.semester_id) }}</td>
                                <td class="px-2">{{ semester_short_name(exam.semester_id) }}</td>
                                <td class="px-2">{{ exam.start_date }}</td>
                                <td class="px-2">{{ exam.end_date }}</td>
                                <td class="px-2">{{ exam.exam_category }}</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>

                    <div class="flex my-2"> <!-- action buttons -->
                        <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-800 py-1 px-2 mr-2 rounded-sm focus:outline-none hover:bg-teal-500 hover:text-teal-100" type="button" @click="show_create_exam_modal()" title="Create exam">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="folder-add w-6 h-6"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modals -->
        <CreateExamModal v-if="is_create_exam_modal_visible" :exams="exams"/>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {mapGetters} from 'vuex'
import CreateExamModal from './CreateExamModal'
export default {
  components: {
    CreateExamModal
  },

  data() {
    return {
            isLoading: false,
            error_message: '',
            isError: false,
            is_create_exam_modal_visible: false
    }
  }, // end of data

  computed: {
    ...mapState(['regulations', 'exams']),
    ...mapGetters(['fetchedRegulations', 'fetchedExams'])
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

    academic_year_plus_one: (year) => {
        return year + '-' + (1 + (year - Math.floor(year/100) * 100))
    },

    show_create_exam_modal() {
        this.is_create_exam_modal_visible = true
    },

    async fetchData() {
        let promises = []
        if (!this.fetchedRegulations) {
            let regulationsPromise = this.$store.dispatch('doFetchRegulations')
            promises.push(regulationsPromise)
        }
        if (!this.fetchedExams) {
            let examsPromise = this.$store.dispatch('doFetchExams')
            promises.push(examsPromise)
        }
        await Promise.all(promises)
    },

  }, // end of methods

  mounted() {
    EventDispatcher.listen("hide-create-exam-modal", () => {
        this.is_create_exam_modal_visible = false
    })
    
    if (this.fetchedRegulations && this.fetchedExams) return
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