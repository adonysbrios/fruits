<template>
        <div class="view">
          <router-view/>
        </div>
</template>

<script>
export default{
  name: 'App',
}
</script>

<style>

a{
        text-decoration: none;
}

body{
  min-height: 100vh;
  background-color: #f1f1f1;
}

.view{
  display: block;
  min-height: 100%;
  width: calc(100% - 10px);
  margin: 5px auto;
  border-radius: 32px;
  background-color: #fff;
  padding: 20px 0px;
}
</style>
