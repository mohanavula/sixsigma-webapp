<template>
    <div class="mt-4">
        <div v-if="isLoading || isError">
            <div class="flex items-start">
                <div class="w-32">Exams</div>
                <div v-show="isLoading">Fetching...</div>
                <div v-show="isError">{{ error_message }}</div>
            </div>
        </div>

        <div v-else class="flex items-start mb-2">
            <div class="w-1/5">Schedule for</div>
            <div class="flex flex-col w-4/5">
                <div v-if="exams.length == 0">
                    No exams found
                </div>
                <div v-else class="flex flex-col w-full">
                    <div class="relative mb-3">
                        <select v-model="selected_exam" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 pl-1 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option v-for="exam in exams" :key="exam.id" :value="exam">{{ exam.name }}</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div class="bg-white rounded-sm">
                        <v-calendar :attributes="attributes" is-expanded title-position="left" nav-visibility="visible" :min-date="selected_exam.start_date" :max-date="selected_exam.end_date" locale="en-GB" class="w-full">
                            <div slot="day-popover" slot-scope="{dayTitle, attributes}">
                                <div class="text-xs text-gray-300 font-semibold text-center">
                                    {{ dayTitle }}
                                </div>
                                <ul>
                                    <li v-for="{ key, customData } in attributes" :key="key">
                                        {{ key + " - " + customData.subject_code}}
                                    </li>
                                </ul>
                            </div>
                        </v-calendar>/>
                    </div>
                    <div class="flex my-2">
                        <div class="flex flex-col w-1/3"> <!-- exam date start -->
                            <label for="exam_date">Exam Date</label>
                            <div class="flex">
                                <input disabled v-model="exam_date" type="text" class="appearance-none bg-gray-200 border border-gray-300 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight" />
                                <span class="flex items-center">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="plus-circle w-5 h-5 mx-1 cursor-pointer text-teal-600" @click="exam_date.setDate(exam_date.getDate() + 1)"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="minus-circle w-5 h-5 cursor-pointer text-teal-500" @click="exam_date.setDate(exam_date.getDate() - 1)"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                </span>
                            </div>
                        </div> <!-- exam date end -->
                        <div class="flex flex-col w-1/3"> <!-- specializations start -->
                            <label for="selected_specialization">Specialization</label>
                            <div class="relative">
                                <select v-model="selected_specialization" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 pl-1 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500 truncate">
                                    <option v-for="s in specializations" :key="s.id" :value="s">{{ s.name }}</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div> <!-- specializations end -->
                        <div class="flex flex-col w-1/3"> <!-- subjects start -->
                            <label for="selected_specialization">Subject</label>
                            <div class="relative">
                                <select v-model="selected_subject" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 pl-1 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500 truncate">
                                    <option v-for="s in subjects" :key="s.id" :value="s">{{ s.name }}</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div> <!-- subjcts end -->
                    </div>
                    <div class="flex flex-col w-full mb-2">
                        <label >Schedule</label>
                        <table class="w-full">
                            <tr>
                                <td>Code</td>
                                <td>Title</td>
                                <td>Exam Date</td>
                                <td></td>
                            </tr>
                            <tr v-for="subject in subjects" :key="subject.id">
                                <td>{{ subject.code }}</td>
                                <td>{{ subject.name }}</td>
                                <td>{{ format_date(subject.exam_date) }}</td>
                                <td>
                                    <span class="flex items-center">
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="plus-circle w-5 h-5 mx-1 cursor-pointer text-teal-600" @click="add_date(subject.exam_date, 1)"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="minus-circle w-5 h-5 cursor-pointer text-teal-500" @click="add_date(subject.exam_date, - 1)"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>

                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {mapGetters} from 'vuex'
import VCalendar from 'v-calendar/lib/components/calendar.umd'
export default {
    components: {
        VCalendar,
    },


    data() {
        let specializations = [
                { id: 1, name: "civil engineeing"},
                { id: 2, name: "electrical engineeing"},
            ]

        let subjects= [
                { id: 1, code:"abc1", name:"Maths-1", exam_date: new Date(2020, 9, 3)},
                { id: 2, code:"abc2", name:"Maths-2", exam_date: new Date(2020, 9, 3)},
                { id: 3, code:"abc3", name:"English", exam_date: new Date(2020, 9, 3)},
            ]

        return {
            isLoading: false,
            isError: false,
            selected_exam: {},
            subject_code: "",
            exam_date: this.format_date(new Date()),
            specializations: specializations,
            selected_specialization: specializations[0],
            subjects: [
                { id: 1, code:"abc1", name:"Maths-1", exam_date: new Date(2020, 9, 3)},
                { id: 2, code:"abc2", name:"Maths-2", exam_date: new Date(2020, 9, 3)},
                { id: 3, code:"abc3", name:"English", exam_date: new Date(2020, 9, 3)},
            ],
            selected_subject: subjects[0],
            schedule: [
                {
                    subject_code: "123",
                    dates: "01-09-2020"
                },
                {
                    subject_code: "456",
                    dates: "02-09-2020"
                },
                {
                    subject_code: "789",
                    dates: "03-09-2020"
                },

            ]

        }
    }, // end od data

    computed: {
        ...mapState(['regulations', 'exams']),
        ...mapGetters(['fetchedRegulations', 'fetchedExams']),

        attributes() {
            return [
                ...this.schedule.map(s => ({
                    dates: s.dates,
                    popover: true,
                    customData: s
                }))
            ]
        },


    }, // end of computed

    methods: {
        format_date(dt) {
			return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear()  
        },
        
        add_date(dt, n) {
            console.log(dt)
            dt = new Date(dt.setDate(dt.getDate() + n))
            console.log(dt)
            return dt
        }
    }, // end of methods

    mounted() {
        if (this.exams.length > 0) this.selected_exam = this.exams[0]

    }, // end of mounted
    
}
</script>