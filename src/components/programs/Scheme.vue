<template>
    <div class="mt-4">
        <div class="flex items-center">
            <label for="branch" class="w-32">Specialization</label>
            <div class="relative">
                <select id="branch" v-model="selectedSpecializationId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option v-for="specialization in regulation.specializations" :key="specialization.id" :value="specialization.id"> {{ specialization.name}} </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>

        <div class="flex items-center mt-2">
            <label for="semester" class="w-32">Semester</label>
            <div class="relative">
                <select id="semester" v-model="selectedSemesterId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option  v-for="semester in regulation.semesters" :key="semester.id" :value="semester.id"> {{ semester.name}} </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>

        <div class="flex flex-col mt-2">
            <div class="flex my-1">
                <div class="flex">
                    <div class="w-20 border-b-2 border-gray-400">Code</div>
                    <div class="w-64 border-b-2 border-gray-400 truncate">Title</div>
                </div>
                <div class="w-20 border-b-2 border-gray-400">Category</div>
                <div class="w-16 border-b-2 border-gray-400">Type</div>
                <div class="w-16 border-b-2 border-gray-400">L-T-P</div>
                <div class="w-10 border-b-2 border-gray-400">IM</div>
                <div class="w-10 border-b-2 border-gray-400">EM</div>
                <div class="w-10 border-b-2 border-gray-400">Credits</div>
            </div>
            <div v-for="schemeItem in scheme" :key="schemeItem.id" class="flex">
                <div v-for="subject in schemeItem.subjects" :key="subject.id" class="flex flex-col">
                    <div class="flex">
                        <div class="w-20 border-b border-gray-400">{{ subject.code}}</div>
                        <div class="w-64 border-b border-gray-400 truncate" :title="subject.name">{{ subject.name }}</div>
                    </div>
                </div>
                <div class="w-20 border-b border-gray-400">{{ schemeItem.subject_category.short_name }}</div>
                <div class="w-16 border-b border-gray-400">{{ schemeItem.subject_offering_type.description }}</div>
                <div class="w-16 border-b border-gray-400">{{ schemeItem.scheme.lectures + "-" + schemeItem.scheme.tutorials + "-" + schemeItem.scheme.practicals}}</div>
                <div class="w-10 border-b border-gray-400">{{ schemeItem.scheme.internal_marks }}</div>
                <div class="w-10 border-b border-gray-400">{{ schemeItem.scheme.end_marks }}</div>
                <div class="w-10 border-b border-gray-400">{{ schemeItem.scheme.credits }}</div>
            </div>
        </div>

        <!-- comments -->
        <div class="my-4 bg-gradient-gray-light border border-gray-400 p-4 w-full max-w-md">
            <h2 class="text-lg text-gray-700 mb-4">Leave your comments here</h2>
            <form class="" @submit.prevent="addComment"> 
                <div class="w-full mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="email">
                        Email
                    </label>
                    <input v-model="userEmail" class="appearance-none block w-full text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email">
                </div>
                <div class="w-full mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="comment">
                        Comment
                    </label>
                    <textarea v-model="comment" class="appearance-none block w-full text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="comment" />
                </div>
                <button class="flex-shrink-0 bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-2 px-2 rounded-sm" type="submit">
                    Submit
                </button>
            </form>
        </div>
      </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            selectedSpecializationId: null,
            selectedSemesterId: null,
            userEmail: null,
            comment: null,
        }
    },

    props: {
        regulation: Object,
    },

    computed: {
        scheme() {
            let vm = this
            let temp = []
            let schemeItems = []
            vm.regulation.scheme.forEach(sem => {
                sem.forEach(item => {
                    if (item.specialization_id == vm.selectedSpecializationId && item.semester_id == vm.selectedSemesterId) {
                        schemeItems.push(item)
                    }
                })
            })
            return schemeItems
        },

    },

    created() {
        this.selectedSpecializationId = this.regulation.specializations[0].id
        this.selectedSemesterId = this.regulation.semesters[0].id
    },

    methods: {
        addComment() {

        }
    }

}
</script>