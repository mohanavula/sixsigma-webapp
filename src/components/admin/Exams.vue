<template>
    <div class="container px-4 pt-1">
        <div class="flex justify-start">
            <div v-if="isLoading">
                <h2>Please wait...</h2>
            </div>
            <div v-else>
                <div class="mb-3">
                    <span class="text-xl tracking-wider truncate mb-2">Exams</span>
                    <span class="font-normal text-xs ml-3">Manager</span>
                </div>
                <div class="flex justify-start"> <!-- stats -->
                    <div class="w-40 w- shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Active Exams</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ active_exams }}</div>
                    </div>
                    <div class="w-40 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Active Registrations</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ active_registrations }}</div>
                    </div>
                    <div class="w-40 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Total Exams</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ total_exams_held }}</div>
                    </div>
                    <div class="w-40 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Total Registrations</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ total_registrations }}</div>
                    </div>
                    <div class="w-40 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Next Exam On</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ next_exam_on }}</div>
                    </div>
                </div> <!-- stats end -->

                <div class="flex justify-start mt-6 mb-2"> <!-- explore commands -->
                    <div class="text-xs tracking-wider mr-5">Explore</div>
                    <div v-for="link in explore_links" :key="link" class="cursor-pointer w-24 text-xs text-right uppercase tracking-wider mr-3" :class="activeTab == link ? 'border-b-2 border-red-500' : 'border-b border-gray-400'" @click="activeTab = link">{{ link }}</div>
                </div> <!-- explore commands end -->

                <ManageExams v-show="activeTab == 'Exams'" />

            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            active_exams: 10,
            active_registrations: 1200,
            total_exams_held: 120,
            total_registrations: 4500,
            next_exam_on: "15-Sep-2020",

            explore_links: ['Exams', 'Registrations', 'Schedules', 'Attendance', 'Marks', 'Reports',],
            activeTab: 'Exams',
        }
    }
}
</script>