<template>
    <div class="md:container mx-auto px-4 pt-4">
        <h2 class="text-xl text-gray-800 uppercase font-semibold tracking-wider">Admin Dashboard</h2>
        <div>
            <div v-if="isLoading">
                <div class="shadow-lg rounded-sm bg-gradient-gray-light p-3 mb-1 border border-gray-500 hover:bg-gradient-gray-dark">
                    <h2 class="text-lg font-semibold text-gray-900">Please wait...</h2>
                    <hr class="border-2 border-gray-400"> 
                </div>
            </div>
            <div v-else class="mt-2 flex flex-col md:flex-row">
                <div class="sidemenu flex sm:flex-row md:flex-col">
                        <router-link class="" v-for="dashboardItem in dashboardItems" :key="dashboardItem.caption" :to="{ name: dashboardItem.pathName }">
                            <DashboardIndexCard  :caption="dashboardItem.caption" />
                        </router-link>
                </div>
                <div class="content md:ml-2 bg-gray-700 text-gray-200 flex-grow h-full">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardIndexCard from './DashboardIndexCard'
export default {
    components: {
        DashboardIndexCard,

    }, // end of components

    data() {
        return {
            isLoading: false,
            dashboardItems: [
                {
                    caption: "Academics",
                    pathName: "adminAcademics",
                },
                {
                    caption: "Classes",
                    pathName: "adminClasses",
                },
                {
                    caption: "Students",
                    pathName: "adminStudents",
                },
                {
                    caption: "Faculty",
                    pathName: "adminFaculty",
                },
                {
                    caption: "Exams",
                    pathName: "adminExams",
                },
            ],

        }
    }, // end of data

}
</script>
