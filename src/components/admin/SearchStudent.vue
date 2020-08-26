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
                    <div v-else>
                        <div v-if="studentList.length > 2" class="bg-gray-200 overflow-auto h-64 text-gray-900">
                            <ul>
                                <li v-for="student in studentList" :key="student.id" class="px-2 py-1 text-sm truncate hover:bg-gray-400 cursor-pointer" @click="selectedStudent = student">{{ student.regdno + " " + student.surname + " " + student.given_name }}</li>
                            </ul>
                        </div>
                        <div>Regd No: {{ selectedStudent.regdno }}</div>
                        <div>Name: {{ selectedStudent.surname + " " + selectedStudent.given_name }}</div>
                    </div>
                </div>
                <div v-else>
                    Not found
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            searchString: "",
            studentList: [],
            selectedStudent: {},
            isLoading: false,
            dirty: false
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
                        this.isLoading = false
                    } else {
                        // single
                        this.studentList = [response.data]
                        this.selectedStudent = response.data
                        this.isLoading = false
                    }
                })
                .catch(error => {
                    this.studentList = []
                    this.isLoading = false
                })

        },

    }, // end of methods
}
</script>