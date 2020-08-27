<template>
    <div class="mt-4">
        <div class="flex items-start">
            <label for="branch" class="w-32">Search</label>
            <div>
                <input v-model="searchString" @keypress.enter="searchStudent()" type="input" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                <p class="text-sm ">Search by register number or name or email</p>
            </div>
            <button class="bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-1 px-2 rounded-sm" type="button" @click="searchStudent()">
                Search
            </button>
        </div>
        <div v-if="isLoading">
            <div class="flex items-start">
                <div class="w-32">Results</div>
                <div>Fetching...</div>
            </div>
        </div>
        <div v-else>
            <div v-show="dirty" class="flex items-start my-4">
                <div class="w-32">Results</div>
                <div v-if="studentList.length > 0">
                    <div v-if="isLoading">Fetching...</div>
                    <div v-else class="flex">
                        <div v-if="studentList.length > 2">
                            <div class="flex items-center text-sm mb-1 mx-2">
                                <span class="mr-2">Showing records: {{ resultMeta.from + ' to ' + resultMeta.to + ' of ' + resultMeta.total }}</span>
                                <span :class="resultMeta.current_page == 1 ? 'cursor-not-allowed pointer-events-none text-gray-500' : 'cursor-pointer'" class="mx-1 border hover:border-gray-200" @click="showPage(resultMeta.first_page_url)">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-double-left w-4 h-4"><path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                                </span>
                                <span :class="resultMeta.prev_page_url ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none text-gray-500'" class="mx-1 border hover:border-gray-200" @click="showPage(resultMeta.prev_page_url)">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-left w-4 h-4"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </span>
                                <span :class="resultMeta.next_page_url ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none text-gray-500'" class="mx-1 border hover:border-gray-200" @click="showPage(resultMeta.next_page_url)">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-right w-4 h-4"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </span>
                                <span :class="resultMeta.last_page == resultMeta.current_page ? 'cursor-not-allowed pointer-events-none text-gray-500' : 'cursor-pointer'" class="mx-1 border hover:border-gray-200" @click="showPage(resultMeta.last_page_url)">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-double-right w-4 h-4"><path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </span>
                                
                            </div>
                            <ul class="bg-gray-200 overflow-auto h-64 text-gray-900">
                                <li v-for="student in studentList" :key="student.id" class="px-2 py-1 text-sm truncate hover:bg-gray-400 cursor-pointer" :class="selectedStudent == student ? 'bg-gray-500' : 'bg-gray-200'" @click="selectedStudent = student">{{ student.regdno + " " + student.surname + " " + student.given_name }}</li>
                            </ul>
                        </div>
                        <div class="text-sm ml-4">
                            <table>
                                <tr>
                                    <td colspan="2">Student Details</td>
                                </tr>
                                <tr>
                                    <td>Regd No.</td>
                                    <td class="pl-1">{{ selectedStudent.regdno }}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{{ selectedStudent.surname + " " + selectedStudent.given_name }}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{{ selectedStudent.gender }}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td class="pl-1">{{ selectedStudent.email }}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td class="pl-1">{{ selectedStudent.phone }}</td>
                                </tr>
                                <tr>
                                    <td>Program</td>
                                    <td class="pl-1">{{ selectedStudent.regulation.program.name }}</td>
                                </tr>
                                <tr>
                                    <td>Specialization</td>
                                    <td class="pl-1">{{ selectedStudent.specialization.name }}</td>
                                </tr>
                                <tr>
                                    <td>Regulation</td>
                                    <td class="pl-1">{{ selectedStudent.regulation.short_name }}</td>
                                </tr>
                            </table>
                            <div class="flex mt-2">
                                <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-900 py-1 px-2 mr-2 rounded-sm hover:bg-teal-500 hover:text-teal-100" type="button" @click="sendEmail()" title="Send Email">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="mail w-6 h-6"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </button>
                                <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-900 py-1 px-2 mr-2 rounded-sm hover:bg-teal-500 hover:text-teal-100" type="button" @click="sendEmail()" title="Academic Details">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="academic-cap w-6 h-6"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                </button>
                                <button class="fiex flex-col bg-teal-300 border border-teal-500 text-sm  text-teal-900 py-1 px-2 mr-2 rounded-sm hover:bg-teal-500 hover:text-teal-100" type="button" @click="sendEmail()" title="Fees and dues">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="currency-rupee w-6 h-6"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div v-else>
                    Not found
                </div>
            </div>
        </div>

        <!-- modals -->
        <SendEmail v-show="showSendEmailModal" :to="selectedStudent.email" reply_to="sixsigma@ksrmce.ac.in" :name="selectedStudent.surname + ' ' + selectedStudent.given_name" />
        
    </div>
</template>

<script>
import axios from 'axios'
import SendEmail from '../common/SendEmail'
export default {
    components: {
        SendEmail,
    },

    data() {
        return {
            searchString: "",
            studentList: [],
            selectedStudent: {},
            isLoading: false,
            dirty: false,
            resultMeta: {},
            isNext: false,
            isPrevious: false,
            showSendEmailModal:false,
        }
    }, // end of data

    methods: {
        searchStudent() {
            if (this.searchString.trim() == "") return
            this.isLoading = true
            this.dirty = true
            axios.defaults.baseURL = 'http://sixsigma.api/api'
            axios.get('/students/' + this.searchString)
                .then(response => {
                    console.log(response.data)
                    if (response.data.hasOwnProperty('data')) {
                        // multiple results
                        this.studentList = response.data.data
                        this.selectedStudent = response.data.data[0]
                        this.resultMeta = response.data
                    } else {
                        // single
                        this.studentList = [response.data]
                        this.selectedStudent = response.data
                    }
                })
                .catch(error => {
                    this.studentList = []
                    
                })
                .finally(() => {
                    this.isLoading = false
                })

        },

        showPage(url) {
            if (!url) return
            this.isLoading = true
            axios.get(url)
                .then(response => {
                    this.studentList = response.data.data
                    this.selectedStudent = response.data.data[0]
                    this.resultMeta = response.data
                })
                .catch(error => {
                    this.studentList = []
                    
                })
                .finally(() => {
                    this.isLoading = false
                })
        },

        sendEmail() {
            this.showSendEmailModal = true
        }

    }, // end of methods

    created() {
        EventDispatcher.listen("hide-send-email-modal", () => {
            this.showSendEmailModal = false
        })
    }
}
</script>