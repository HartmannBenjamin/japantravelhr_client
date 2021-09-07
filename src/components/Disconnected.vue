<template>
  <div class="ma-8">
    <h1>You are not logged anymore</h1>
    <a @click="$router.replace({ name: 'Login' })">
      Return to the login page
    </a>
  </div>
</template>
