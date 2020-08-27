<template>
    <div class="mt-4">
        <div class="flex items-center">
            <label for="branch" class="w-32">Subject</label>
            <div class="relative" v-if="subjects.length > 0">
                <select id="branch" v-model="selectedSubjectId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id"> {{ subject.name}} </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <div v-else>
                <span>Not found</span>
            </div>
        </div>
        <div class="mt-4 flex flex-col ml-32" v-if="selectedSubject">
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Code</div>
                <div>{{ selectedSubject ? selectedSubject.code : "Not found"}}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Department</div>
                <div>{{ selectedDepartment ? selectedDepartment.name : "Not found"}}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Office email</div>
                <div>{{ selectedDepartment ? selectedDepartment.office_email : "Not found"}}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">HoD email</div>
                <div>{{ selectedDepartment ? selectedDepartment.hod_email : "Not found"}}</div>
            </div>
            <div class="text-xs uppercase tracking-wider flex">
                <div class="w-24">Instruction</div>
                <div>{{ selectedSubject ? (selectedSubject.is_theory ? 'Theory' : '') + '/' + (selectedSubject.is_lab ? 'Laboratory' : '') + '/' + (selectedSubject.is_project ? 'Project' : '') : "Not found"}}</div>
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

            <!-- anchor links -->
            <div v-if="selectedSubject">
                <div class="text-xs uppercase tracking-wider flex justify-evenly">
                    <div><a href="#syllabus">Syllabus</a></div>
                    <div><a href="#resources">Resources</a></div>
                    <div><a href="#performance">Performance</a></div>
                    <div><a href="#reviews">Review &amp; Rate</a></div>
                    <div><a href="#contact">Contact</a></div>
                </div>
    
                <!-- syllabus -->
                <div id="syllabus" class="mt-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700 text-base transition-height duration-1000 delay-300 ease-in-out">
                    <div class="flex items-center">
                        <h2 class="text-lg">Syllabus</h2>
                        <svg @click="showSyllabus = !showSyllabus" class="h-4 w-4 cursor-pointer ml-3 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path class="up" v-if="showSyllabus" d="M5 15l7-7 7 7"></path>
                            <path class="down" v-if="!showSyllabus" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <transition name="slide-fade">
                        <div v-html="syllabus" v-show="showSyllabus" class="mt-3"></div>
                    </transition>
                </div>
    
                <!-- Resources -->
                <div id="resources" class="mt-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700 text-base transition-height duration-1000 delay-300 ease-in-out">
                    <div class="flex items-center">
                        <h2 class="text-lg">Resources</h2>
                        <svg @click="showResources = !showResources" class="h-4 w-4 cursor-pointer ml-3 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path class="up" v-if="showResources" d="M5 15l7-7 7 7"></path>
                            <path class="down" v-if="!showResources" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <transition name="slide-fade">
                        <div v-show="showResources" class="mt-3">Resources here</div>
                    </transition>
                </div>
    
                <!-- Performace -->
                <div id="performance" class="mt-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700 text-base transition-height duration-1000 delay-300 ease-in-out">
                    <div class="flex items-center">
                        <h2 class="text-lg">Performance</h2>
                        <svg @click="showPerformance = !showPerformance" class="h-4 w-4 cursor-pointer ml-3 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path class="up" v-if="showPerformance" d="M5 15l7-7 7 7"></path>
                            <path class="down" v-if="!showPerformance" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <transition name="slide-fade">
                        <div v-show="showPerformance" class="mt-3">Performance here</div>
                    </transition>
                </div>
    
                <!-- Reviews -->
                <div id="reviews" class="mt-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700 text-base transition-height duration-1000 delay-300 ease-in-out">
                    <div class="flex items-center">
                        <h2 class="text-lg">Reviews</h2>
                        <svg @click="showReviews = !showReviews" class="h-4 w-4 cursor-pointer ml-3 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path class="up" v-if="showReviews" d="M5 15l7-7 7 7"></path>
                            <path class="down" v-if="!showReviews" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <transition name="slide-fade">
                        <reviews :id=selectedSubjectId :object="'subject'" key="reviews" v-show="showReviews"/>
                    </transition>
                </div>
    
                <!-- contact -->
                <div id="contact" class="mt-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700 text-base transition-height duration-1000 delay-300 ease-in-out">
                    <div class="flex items-center">
                        <h2 class="text-lg">Contact</h2>
                        <svg @click="showContact = !showContact" class="h-4 w-4 cursor-pointer ml-3 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path class="up" v-if="showContact" d="M5 15l7-7 7 7"></path>
                            <path class="down" v-if="!showContact" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <transition name="slide-fade">
                        <div v-show="showContact" class="mt-3">Contact here</div>
                    </transition>
                </div>
            </div>

            <!-- <button type="button" class="btn" @click="showModal">
                Open Modal
            </button> -->

            <!-- <Modal v-show="isModalVisible" :component="comments" /> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import Modal from './../utils/Modal'
import Comments from './../programs/Comments'
import Reviews from './../programs/Reviews'

export default {
    components: {
        // Modal,
        Comments,
        Reviews,
    },

    data() {
        return {
            selectedSubjectId: null,
            isModalVisible: false,
            comments: Comments,
            isLoadingSyllabus: false,
            showSyllabus: true,
            showReviews: true,
            showResources: true,
            showPerformance: true,
            showContact: true,
        }
    },

    props: {
        regulation: Object
    },

    computed: {
        ...mapState(['departments']),

        fetchedSyllabus() {
            return this.$store.getters.fetchedSyllabus(this.selectedSubjectId)
        },

        syllabus() {
            return this.$store.getters.getSyllabus(this.selectedSubjectId)
        },

        subjects() {
            let vm = this
            let subjectItems = []
            if (!vm.regulation.hasOwnProperty('scheme')) return []
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
            if (this.subjects.length == 0) return null
            return this.subjects.filter(s => {
                return s.id == this.selectedSubjectId
            })[0]
        },

        selectedDepartment() {
            if (!this.selectedSubject) return null
            return this.departments.find(d => d.id == this.selectedSubject.department_id)
        }
    },

    created() {
        if (this.subjects.length > 0) this.selectedSubjectId = this.subjects[0].id
        // EventDispatcher.listen("hide-modal", this.hideModal)
    },

    methods: {
        showModal() {
            this.isModalVisible = true;
        },

        hideModal() {
            this.isModalVisible = false;
        },

        async fetchSyllabus() {
            if (!(this.selectedSubjectId == null)) await this.$store.dispatch('doFetchSyllabus', this.selectedSubjectId)
        },
    }, // end of methods

     watch: {
        selectedSubjectId: {
            immediate: true,
            handler(val, oldVal) {
                let vm = this
                if (!vm.fetchedSyllabus) {
                    vm.isLoading = true
                    vm.fetchSyllabus()
                        .catch((e) => {
                            console.error(e)
                        })
                        .finally(() => {
                            vm.isLoading = false
                        })
                }
            }
        },
    }, // end of watch

}
</script>

<style>
    h3 {
        margin-top: 10px;
        font-size: 1em;
        font-weight: 700;
    }
</style>

<style scoped>
    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s ease-in-out;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>