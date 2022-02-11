<template>
  <div class="home">
    <div v-if="seeDoctorRows || updatedAtRows || createdAtRows" class="Loader">
      <div class="q-gutter-sm" style="text-align: center">
        <p>Display By:</p>
        <q-radio
          v-model="filterName1"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="toSeeDoctor"
          label="To See Doctor"
        />
        <q-radio
          v-model="filterName1"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="transaction"
          label="Transaction Mails"
        />
      </div>
      <div class="q-gutter-sm">
        <div v-if="filterName1 == 'toSeeDoctor'">
          <SeeDoctorTable :rows="seeDoctorRows" />
        </div>
        <div v-if="filterName1 == 'transaction'">
          <TransactionTable :rows="transactionRows" />
        </div>
      </div>

      <div class="q-gutter-sm" style="text-align: center">
        <p>Display By:</p>
        <q-radio
          v-model="filterName2"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="createdAt"
          label="Created At"
        />
        <q-radio
          v-model="filterName2"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="updatedAt"
          label="Updated At"
        />
      </div>
      <div class="q-gutter-sm">
        <div v-if="filterName2 == 'createdAt'">
          <CreatedAtTable :rows="createdAtRows" />
        </div>
        <div v-if="filterName2 == 'updatedAt'">
          <UpdatedAtTable :rows="updatedAtRows" />
        </div>
      </div>
    </div>
    <div v-else class="Loader">
      <q-inner-loading :showing="true">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SeeDoctorTable from "@/components/SeeDoctorTable.vue";
import CreatedAtTable from "@/components/CreatedAtTable.vue";
import UpdatedAtTable from "@/components/UpdatedAtTable.vue";
import TransactionTable from "@/components/TransactionTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      filterName1: "toSeeDoctor",
      filterName2: "",
      showing: false,
    };
  },
  components: {
    SeeDoctorTable,
    CreatedAtTable,
    UpdatedAtTable,
    TransactionTable,
  },
  computed: {
    ...mapGetters({
      seeDoctorRows: "mails/getToSeeDoctorMails",
      updatedAtRows: "mails/getUpdatedMails",
      createdAtRows: "mails/getCreatedMails",
      transactionRows: "mails/getCreatedMails",
    }),
  },
};
</script>
