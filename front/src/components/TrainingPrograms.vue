<template>
  <div>
    <h2 class="display-6">Программы тренировок</h2>
    <ul class="list-group list-group-flush list-group-item-action">
      <router-link
        class="list-group-item list-group-item-action"
        v-for="program in programs"
        v-bind:key="program.id"
        :to="{ name: 'trainingProgram', params: { id: program.id } }"
        v-text="program.name"
      ></router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "TrainingPrograms",
  data() {
    return {
      programs: [],
    };
  },
  methods: {
    getPrograms() {
      return this.$store.getters.getDefaultData.training_programs;
    },
  },
  mounted: function () {
    this.programs = this.getPrograms();
  },
};
</script>
