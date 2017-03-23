<template>
  <table class="ui celled padded table" style="width: 90%; margin-left: 5%;">
    <thead>
      <th class="three coloumn wide" style="text-align: center;">Title</th>
      <th class="four coloumn wide" style="text-align: center;">Question</th>
      <th class="three coloumn wide" style="text-align: center;">Answers</th>
      <th class="one coloumn wide" style="text-align: center;">Votes</th>
    </thead>
    <tbody>
      <tr v-for="question in questions" track-by="id" v-on:click.prevent="onEdit(question)">
        <td>
          <div>
            <label class="ui header">
              {{question.title}}
            </label>
          </div>
          <div class="ui icon buttons">
            <button class="ui primary button" onclick=""><i class="expand icon"></i>Details</button>
            <button class="ui negative button" v-on:click.prevent.stop="onRemove(question)"><i class="erase icon"></i>Delete</button>
            <button class="ui positive button" v-on:click.prevent="onEdit(question)"><i class="edit icon"></i>Edit</button>
          </div>
        </td>
        <td>{{question.content}}</td>
        <td>{{question.answer.length}}</td>
        <td>
          <div class="ui icon buttons">
            <button onclick="" class="ui positive icon button">
              <i class="thumbs up icon"></i>
            </button>
            <div class="or"></div>
            <button onclick="" class="ui negative icon button">
              <i class="thumbs down icon"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  props: ['questions'],
  methods: {
    key() {
      this.$emit('key')
    },
    onEdit(question) {
      this.$emit('edit', question)
    },
    onRemove(question) {
      this.$emit('remove', question)
    }
  }
}
</script>
