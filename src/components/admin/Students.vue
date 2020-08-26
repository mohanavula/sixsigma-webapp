<template>
    <div class="container px-4 pt-1">
        <div class="flex justify-start">
            <div v-if="isLoading">
                <h2>Please wait...</h2>
            </div>
            <div v-else>
                <div class="mb-3">
                    <span class="text-xl tracking-wider truncate mb-2">Students</span>
                    <span class="font-normal text-xs ml-3">Manager</span>
                </div>
                <div class="flex justify-start"> <!-- stats -->
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Total Students</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ totalStudents }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Active</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ onrollsStudents }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">On Wait</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ waitingStudents }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Suspended</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ suspendedStudents }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Discontinued</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ discontinuedStudents }}</div>
                    </div>
                </div> <!-- stats end -->

                <div class="flex justify-start mt-6 mb-2"> <!-- explore commands -->
                    <div class="text-xs tracking-wider mr-5">Explore</div>
                    <div v-for="link in exploreLinks" :key="link" class="cursor-pointer w-24 text-xs text-right uppercase tracking-wider mr-3" :class="activeTab == link ? 'border-b-2 border-red-500' : 'border-b border-gray-400'" @click="activeTab = link">{{ link }}</div>
                </div> <!-- explore commands end -->

                <SearchStudent v-show="activeTab == 'Search'" />

            </div>
        </div>
    </div>

</template>

<script>
import SearchStudent from "./SearchStudent"
export default {
    components: {
        SearchStudent,

    },  // end of components
    
    data() {
        return {
            isLoading: false,
            totalStudents: 100,
            suspendedStudents: 0,
            onrollsStudents: 90,
            waitingStudents: 10,
            discontinuedStudents: 0,

            exploreLinks: ['View List', 'Search', 'Add Student', 'Edit Student', 'Report',],
            activeTab: 'View List',

        }
    }
}
</script>