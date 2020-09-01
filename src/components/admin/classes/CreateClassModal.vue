<template>
  <transition name="modal-fade">
    <div class="modalbackdrop fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-gray-900" >
		<div class="modal- bg-white shadow-md overflow-x-auto flex flex-col justify-start p-6 rounded-sm w-1/2 text-sm" >
			<header class="modalheader text-lg font-semibold border-b border-gray-600 flex" id="modalTitle" >
				<span name="header">Create Class</span>
				<button type="button" class="btnclose ml-auto appearance-none border-0 bg-transparent" @click="hideModal">
					<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</button>
			</header>
			<div v-if="isLoading">
				Please wait. Loading date...
			</div>
			<section v-else class="modalbody py-2">
				<div class="flex items-start my-2">
					<label for="academic_year" class="w-1/5">Academic year</label>
                    <div class="flex w-4/5"> 
                        <input disabled v-model="academic_year_plus_one" type="text" class="appearance-none bg-gray-200 border border-gray-300 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight" />
						<span class="flex items-center">
							<svg viewBox="0 0 20 20" fill="currentColor" class="plus-circle w-5 h-5 mx-1 cursor-pointer text-teal-600" @click="academic_year++"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
							<svg viewBox="0 0 20 20" fill="currentColor" class="minus-circle w-5 h-5 cursor-pointer text-teal-500" @click="academic_year--"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
						</span>
                    </div>
				</div> 

				<div class="flex items-start my-2"> <!-- regulations -->
					<label for="regulation" class="w-1/5">Regulation</label>
                    <div class="relative w-4/5" v-if="regulations.length > 0">
                        <select id="regulation" v-model="selected_regulation" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 pl-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option v-for="regulation in regulations" :key="regulation.id" :value="regulation"> {{ regulation.name}} </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div v-else>
                        <span>No regulations found</span>
                    </div>
				</div>

				<div class="flex items-start my-2"> <!-- specializations -->
					<label for="regulation" class="w-1/5">Branch</label>
                    <div class="relative w-4/5" v-if="specializations.length > 0">
                        <select id="regulation" v-model="selected_specialization" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 pl-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option v-for="specialization in specializations" :key="specialization.id" :value="specialization"> {{ specialization.name}} </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div v-else>
                        <span>No specializations found</span>
                    </div>
				</div>

				<div class="flex items-start my-2"> <!-- semesters -->
					<label for="subject" class="w-1/5">Semester</label>
                    <div v-if="semesters.length > 0" class="w-3/5">
						<div class="flex flex-col">
							<div class="flex text-sm">
								<span>Select:</span>
								<input class="mx-2" type="radio" name="odd" id="odd" v-model="selected_semester_band" value="odd"><span>Odd semesters</span>
								<input class="mx-2" type="radio" name="odd" id="odd" v-model="selected_semester_band" value="even"><span>Even semesters</span>
							</div>
							<ul>
								<li v-for="semester in filtered_semesters" :key="semester.id" class="flex items-center px-2 py-1 w-auto truncate bg-gray-200 hover:bg-gray-400 cursor-pointer">
									<span class="flex w-full cursor-pointer" @click="semester.selected = !semester.selected">
										<svg v-show="semester.selected" viewBox="0 0 20 20" fill="currentColor" class="check w-4 h-4 text-green-600"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
										<svg v-show="!semester.selected" viewBox="0 0 20 20" fill="currentColor" class="x w-4 h-4 text-red-600"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
										<span class="ml-2">{{ semester.name }}</span>
									</span>
									<span v-show="semester.selected" class="ml-auto flex items-center" title="sections">
										<span class="ml-2">{{ semester.sections }}</span>
										<svg viewBox="0 0 20 20" fill="currentColor" class="plus-circle w-5 h-5 mx-1 cursor-pointer text-teal-600" @click="semester.sections++"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
										<svg viewBox="0 0 20 20" fill="currentColor" class="minus-circle w-5 h-5 cursor-pointer text-teal-500" @click="semester.sections > 1 ? semester.sections-- : null"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-if="semesters.length > 0" class="w-1/5 mx-3 mt-auto">
						<button :disabled="addClassesBtnDisabled" class="bg-gradient-gray-light  border-gray-500 text-sm border text-gray-900 py-1 px-2 rounded-sm" :class="addClassesBtnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-gray-dark hover:border-teal-700'" type="button" @click="add_classes()">
							Add Classes
						</button>
					</div>
					<div v-else class="w-4/5">
						<span>No semesters found</span>
					</div>
				</div>
				<!-- scheduled classes -->
				<div class="flex items-start my-2 h-64 overflow-y-auto">
					<div class="w-1/5">Classes</div>
					<table class="w-4/5">
						<tr class="border-b border-gray-500">
							<td>Program</td>
							<td>Branch</td>
							<td>Semester</td>
							<td>Sections</td>
							<td></td>
						</tr>
						<tr v-for="cls in scheduled_classes" :key="cls.id" class="border-b border-gray-500">
							<td>{{ cls.program_name }}</td>
							<td>{{ cls.specialization_name }}</td>
							<td>{{ cls.semester_name }}</td>
							<td>{{ get_section_labels(cls.academic_year, cls.semester_id, cls.specialization_id, cls.sections) }}</td>
							<td>
								<svg viewBox="0 0 20 20" fill="currentColor" class="trash w-4 h-4 text-teal-500 cursor-pointer" @click="delete_class(cls)"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
							</td>
						</tr>
						<tfoot v-show="scheduled_classes.length == 0">
							<tr>
								<td colspan="5">No classes are scheduled</td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div class="flex">
					<div class="w-1/5"></div>
					<div class="w-4/5">
						<span class="mx-2">Total classes: {{ totalClasses }}</span>
						<span>Total sections: {{ totalSections }}</span>
					</div>
				</div>


			</section>
			<footer class="modalfooter pt-2 my-2 border-t border-gray-600">
				<div class="flex">
					<button class="bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-1 px-2 rounded-sm" type="button" @click="hideModal">
						Close
					</button>
					<button :disabled="cretateBtnDisabled" class="bg-gradient-gray-light border-gray-500 text-sm border text-gray-900 py-1 px-2 ml-2 rounded-sm" :class="cretateBtnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-gray-dark hover:border-teal-700'" type="button" @click="create_class()">
						Create
					</button>
				</div>
				<div v-show="creating" class="text-sm my-2">
					Creating... {{ feedback }}
				</div>
			</footer>
		</div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	props: {
		academic_classes: Array,

	}, // end of props


    data() {
        return {
			isLoading: false,
            creating: false,
            feedback: '',
            academic_year: new Date().getFullYear(),
			selected_regulation: {},
			selected_specialization: {},
            selected_semester_band: 'odd',
			scheduled_classes: [],
			
        }
    }, //  end of data

    computed: {
		...mapState(['regulations']),
		...mapGetters(['fetchedRegulations']),

        academic_year_plus_one() {
            return this.academic_year + "-" + (this.academic_year + 1 - Math.trunc(this.academic_year/100) * 100)
        },

        specializations() {
			let s = []
			if (this.selected_regulation.program.hasOwnProperty('specializations'))
				{
					s = Array.from(this.selected_regulation.program.specializations)
					// s.forEach(i => {
					// 	this.$set(i, 'selected', false)
					// })
				}
			return s
        },

        semesters() {
			let s =[]
			if (this.selected_regulation.hasOwnProperty('semesters')) {
				s = Array.from(this.selected_regulation.semesters)
				s.forEach(i => {
					this.$set(i, 'selected', false)
					this.$set(i, 'sections', 1)
				})
			}
			return s
        },

        filtered_semesters() {
            return this.semesters.filter(s => {
                return s.semester_number % 2 == (this.selected_semester_band == 'odd' ? 1 : 0)
            })
		},

		totalClasses() {
			return this.scheduled_classes.length
		},

		totalSections() {
			return this.scheduled_classes.reduce((total,sc) => {
				return total + sc.sections
			}, 0)
		},

		addClassesBtnDisabled() {
			return this.semesters.length == 0 || this.specializations.length == 0 || this.filtered_semesters.reduce((unselected, fs) => { return unselected && !fs.selected}, true)
		},

		cretateBtnDisabled() {
			return this.scheduled_classes.length == 0
		}

    }, // end of computed

    methods: {
		hideModal() {
			EventDispatcher.fire("hide-create-class-modal");
		},

		create_class() {
			this.creating = true
			axios.defaults.baseURL = "http://sixsigma.api/api"
			axios.post("/academics/classes", {
				class_list: this.scheduled_classes
			})
			.then(() => {
				this.feedback = "sent"
				setTimeout(() => {
					this.subject = ""
					this.body = ""
					this.hideModal()
				}, 2000)
			})
			.catch(error => {
				this.feedback = "failed. Try again"
				setTimeout(() => {
					console.log(error)
				}, 2000)
			})
			.finally(() => {
				this.creating = false
			})
		},

		getRegulations() {
			let vm = this
			this.isLoading = true
			this.$store.dispatch('doFetchRegulations')
				.then(() => {
					vm.isLoading = false
					if (vm.regulations.length > 0) vm.selected_regulation = vm.regulations[0]
				})
				.catch(error => {
					console.log(error)
					vm.isLoading = false
				})
		},

		add_classes() {
			let cls = {}
			this.filtered_semesters.forEach(fs => {
				if (fs.selected)
					if (!this.scheduled_classes.reduce((repeat, sc) => {
						return repeat || (sc.semester_id == fs.id && sc.specialization_id == this.selected_specialization.id)
					}, false))
						this.scheduled_classes.push({
							'id': Math.round(Math.random() * 1000000),
							'academic_year': this.academic_year,
							'semester_id': fs.id,
							'specialization_id': this.selected_specialization.id,
							'specialization_name': this.selected_specialization.short_name,
							'sections': fs.sections,
							'name': `${this.academic_year_plus_one}-${this.selected_regulation.short_name}-${fs.name}`,
							'program_name': this.selected_regulation.program.short_name,
							'semester_name': fs.name,
							'start_date': new Date(),
							'end_date': new Date(),
						})
			})
		},

		delete_class(cls) {
			this.scheduled_classes = this.scheduled_classes.filter(sc => {
				return sc.id != cls.id
			})
		},

		get_section_labels(academic_year, semester_id, specialization_id, sections_count) {
			let cls = this.academic_classes.find(ac => {
				return ac.semester_id == semester_id && ac.specialization_id == specialization_id && ac.academic_year == academic_year
			})

			let section_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
			let start = (typeof cls === "object") ? cls.sections.length : 0
			let end = (start + sections_count) > 8 ? 8 : start + sections_count
			let label = ""
			for (let i = start; i < end; i++) {
				label = label + " " + section_labels[i] + " "
			}
			return label.trim()
		} 

	}, // end of methods

	created() {
		if (!this.fetchedRegulations) 
			this.getRegulations()
		else if (this.regulations.length > 0)
			this.selected_regulation = this.regulations[0]

		if (this.specializations.length > 0) this.selected_specialization = this.specializations[0]
	},

}
</script>