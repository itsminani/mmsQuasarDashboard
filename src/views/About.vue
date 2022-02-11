<template>
  <div class="Mails">
    <h3>Coming Soon....</h3>
    <h4>This is where you will be able to find all mails</h4>
    <q-card flat style="width: 100%" class="center relative-position card-example">
      <q-card-section>
      <q-inner-loading :showing="true">
        <q-spinner-gears size="50px" color="red" />
      </q-inner-loading>
      </q-card-section>
    </q-card>
  </div>
</template>
