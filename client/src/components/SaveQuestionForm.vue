<template>
  <form class="ui form" style="width: 90%; margin: 5% 0 0 5%;">
    <div class="field">
      <label>Question Title</label>
      <input v-model="title" name="question-title" placeholder="Question Title" type="text">
    </div>
    <div class="field">
      <label>Question Content</label>
      <textarea v-model="content" name="question-content" placeholder="Question Content"></textarea>
    </div>
    <div class="ui buttons">
      <button v-on:click.prevent="onSubmit" class="ui positive button" type="submit">Ask</button>
      <div class="or"></div>
      <button v-on:click.prevent="onCancel" class="ui black deny button" type="submit">Cancel</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  props: ['question'],
  methods: {
    onSubmit(){
      this.$emit('submit', this.question)
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
}
</script>
