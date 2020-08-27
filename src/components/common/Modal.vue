<template>
  <transition name="modal-fade">
    <div class="modalbackdrop fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center text-gray-900">
      <div class="modal- bg-white shadow-md overflow-x-auto flex flex-col justify-start p-4 rounded-sm w-1/3" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modalheader text-lg font-semibold border-b border-gray-600 flex" id="modalTitle">
          <slot name="header">
            This is the default tile!
          </slot>
          <button type="button" class="btnclose ml-auto appearance-none border-0 bg-transparent " @click="hideModal" aria-label="Close modal">x</button>
        </header>
        <section class="modalbody relative py-2" id="modalDescription">
          <slot name="body">I'm the default body!</slot>
        </section>
        <footer class="modalfooter pt-2 my-2 border-t border-gray-600 flex">
          <slot name="footer">
            I'm the default footer!
            <button type="button" class="btngreen ml-auto bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-2 px-2 rounded-sm" @click="hideModal" aria-label="Close modal">Close</button>
          </slot>
        </footer>
        <dynamic-component :is="component"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    component: Object

  },

  beforeMount() {
    this.$options.components.DynamicComponent = this.component
  },

  methods: {
    hideModal() {
      // this.$emit("close");
      EventDispatcher.fire("hide-modal")
    },
  },
};
</script>

<style>

</style>