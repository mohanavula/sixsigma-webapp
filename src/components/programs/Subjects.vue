<template>
    <div class="mt-4">
        <div class="flex items-center">
            <label for="branch" class="w-32">Subject</label>
            <div class="relative">
                <select id="branch" v-model="selectedSubjectId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id"> {{ subject.name}} </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
        <div class="mt-4 flex flex-col ml-32">
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Code</div>
                <div>{{ selectedSubject.code }}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Department</div>
                <div>{{ selectedDepartment.name }}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Office email</div>
                <div>{{ selectedDepartment.office_email }}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">HoD email</div>
                <div>{{ selectedDepartment.hod_email }}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Instruction</div>
                <div>{{ (selectedSubject.is_theory ? 'Theory' : '') + '/' + (selectedSubject.is_lab ? 'Laboratory' : '') + '/' + (selectedSubject.is_project ? 'Project' : '')}}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Rating</div>
                <div class="flex items-center">
                    <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= 4 ? 'text-yellow-600' : 'text-gray-400'" class="h-4 w-4 fill-current">
                    <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span class="ml-2">100 reviews</span>
                </div>
            </div>
            <div class="text-xs tracking-wider my-4 flex">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quibusdam provident asperiores tempore pariatur quos et delectus debitis recusandae fugiat, qui voluptatem facere doloribus ad. Molestiae dolores quis alias ab?Voluptatibus est pariatur ad animi fugit nulla in, sapiente et consectetur illo libero accusamus ex autem ipsum. Excepturi sint quidem, est architecto expedita at numquam veniam? Nostrum accusantium adipisci corrupti.
            </div>

            <!-- action buttons -->
            <div class="text-xs uppercase tracking-wider flex justify-evenly">
                <div>Syllabus</div>
                <div>Reviews</div>
                <div>Download</div>
                <div>Rate</div>
                <div>Suggest a Subject</div>
            </div>

            <!-- test modal -->
            <button type="button" class="btn" @click="showModal">
                Open Modal
            </button>

            <Modal v-show="isModalVisible" :component="comments" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from './../utils/Modal'
import Comments from './../programs/Comments'
export default {
    components: {
        Modal,
        Comments,
    },

    data() {
        return {
            selectedSubjectId: null,
            isModalVisible: false,
            comments: Comments
        }
    },

    props: {
        regulation: Object
    },

    computed: {
        ...mapState(['departments']),

        subjects() {
            let vm = this
            let subjectItems = []
            vm.regulation.scheme.forEach(sem => {
                sem.forEach(schemeItem => {
                    schemeItem.subjects.forEach(subj => {
                        let repeat = false
                        subjectItems.forEach(si => {
                            if (si.code == subj.code) repeat = true
                        })
                        if (!repeat) subjectItems.push(subj)
                    })
                })
            })
            return subjectItems
        },

        selectedSubject() {
            return this.subjects.filter(s => {
                return s.id == this.selectedSubjectId
            })[0]
        },

        selectedDepartment() {
            return this.departments.find(d => d.id == this.selectedSubject.department_id)
        }
    },

    created() {
        this.selectedSubjectId = this.subjects[0].id
        EventDispatcher.listen("hide-modal", this.hideModal)
    },

    methods: {
        showModal() {
            this.isModalVisible = true;
        },

        hideModal() {
            this.isModalVisible = false;
        }
    },

}
</script>