<template>
  <transition name="modal-fade">
    <div class="modalbackdrop fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-gray-900" >
		<div class="modal- bg-white shadow-md overflow-x-auto flex flex-col justify-start p-4 rounded-sm w-1/2" >
			<header class="modalheader text-lg font-semibold border-b border-gray-600 flex" id="modalTitle" >
				<span name="header">Send Email</span>
				<button type="button" class="btnclose ml-auto appearance-none border-0 bg-transparent" @click="hideModal">
					<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</button>
			</header>
			<section class="modalbody py-2">
				<div class="flex items-start my-2">
					<label for="to" class="w-24">To</label>
					<input v-model="to" id="to" type="email" class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled/>
				</div>
				<div class="flex items-start my-2">
					<label for="subject" class="w-24">Subject</label>
					<input v-model="subject" id="subject" type="text" class="appearance-none w-full bg-gray-200 border border-gray-300 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
				</div>
				<div class="flex items-start my-2">
					<label for="message" class="w-24">Message</label>
					<textarea v-model="body" id="message" class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-800 py-1 px-2 mr-1 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
				</div>
			</section>
			<footer class="modalfooter pt-2 my-2 border-t border-gray-600">
				<div class="flex">
					<button class="bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-1 px-2 rounded-sm" type="button" @click="hideModal">
						Cancel
					</button>
					<button class="bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-1 px-2 ml-2 rounded-sm" type="button" @click="sendEmail">
						Send
					</button>
				</div>
				<div v-show="sending" class="text-sm my-2">
					Sending... {{ feedback }}
				</div>
			</footer>
		</div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  	name: "modal",
  	props: {
		to: String,
		reply_to: String,
	},
	  
	data() {
		return {
			body: '',
			subject: '',
			sending: false,
			feedback: "",
		}
	},

	methods: {
		hideModal() {
			EventDispatcher.fire("hide-send-email-modal");
		},

		sendEmail() {
			this.sending = true
			axios.defaults.baseURL = "http://sixsigma.api/api"
			axios.post("/sendemail", {
				to: this._to,
				reply_to: this.reply_to || "sixsigma@ksrmce.ac.in",
				subject: this.subject,
				body: this.body
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
				this.sending = false
			})
		}
	},

};
</script>
