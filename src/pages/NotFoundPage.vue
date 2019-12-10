<template>
  <div class="full-screen container">
    <div class="row mt-5">
      <div class="col-12 mt-5 text-center">
        <h2 class="title text-danger">{{$t('notFound.title')}}</h2>
        <h2 class="title">{{$t('notFound.description')}}</h2>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link :to="{path:'/'}">{{$t('notFound.backToHome')}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
