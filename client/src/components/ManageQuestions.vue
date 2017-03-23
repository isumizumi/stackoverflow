<template>
  <section>
      <save-question-form :question="questionInForm" v-on:submit="onFormSave" v-on:cancel="resetQuestionInForm"></save-question-form>
      <question-list @key="getQuestions" v-bind:questions="questions"></question-list>
      <!-- <question-list :questions="questions" v-on:edit="onEditClicked" v-on:remove="onRemoveClicked"></question-list> --> -->
    </section>
</template>

<script>

// import { mapGetters, mapActions } from 'vuex'
import QuestionList from './QuestionList'
import SaveQuestionForm from './SaveQuestionForm'
import uuid from 'uuid';
import axios from 'axios';

const initialData = () => {
  return {
    questionInForm: {
      title: '',
      content: '',
      answer: [],
      upvote: [],
      downvote: [],
      author: '',
    },
    questions : [
      {
        title: 'Mongodb error',
        content: 'Can not connect',
        answer: [],
        upvote: [],
        downvote: [],
        author: 'isumi'
      }],
    computed: {
      slug() {
        return this.title.toLowerCase()
      }
    }
  }
}

export default {
  components: {
    QuestionList,
    SaveQuestionForm
  },
  data: initialData,
  // computed: mapGetters({
  //   questions: 'getQuestions'
  // }),
  mounted: function() {
      this.getQuestions()
  },

  methods: {
    getQuestions() {
      axios.get('http://localhost:3000/question')
        .then( (res) => {
          this.questions = res.data
          console.log(res.data);
        })
        .catch( (err) => {
          console.log(err);
        })
    },
    onFormSave() {
      axios.post('http://localhost:3000/question', {
        title: this.title,
        content: this.content
      }).then( (err, res) => {
        if (err) {
          res.send(err)
        } else {
          this.$router.push(`/question/${res.data._id}`)
        }
      })
    },
    resetQuestionInForm() {
      this.questionInForm = initialData().questionInForm;
    }
  }
  //   ...mapActions([
  //    'saveQuestion',
  //    'deleteQuestion'
  //  ]),
    // onFormSave(question) {
    //   const index = this.questions.findIndex((p) => p.id === question.id);
      // update, if it exists or create it if it doesn't
  //     if (index !== -1) {
  //       this.questions.splice(index, 1, question)
  //     } else {
  //       question.id = uuid.v4();
  //       this.questions.push(question);
  //     }
  //
  //     this.resetQuestionInForm();
  //   },
    // resetQuestionInForm() {
    //   this.questionInForm = initialData().questionInForm;
    // },
  //   onEditClicked(question) {
  //     this.questionInForm = { ...question };
  //   },
  //   onRemoveClicked(question) {
  //     const index = this.questions.findIndex((p) => p.id === question.id);
  //
  //     this.questions.splice(index, 1);
  //
  //     if (question.id === this.questionInForm.id) {
  //       this.resetQuestionInForm();
  //     }
  //   }
  // }
}
</script>
