<template>
  <h1>use google sign in</h1>
</template>

<script>
export default {
  name: "LogInSignUp",
  data(){
    return {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  }
}
</script>

<style scoped>

</style>