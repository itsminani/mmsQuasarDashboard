<template>
  <div class="q-pa-md">
    <h3 class="title" style="text-align: center">To see doctor today</h3>
    <q-table
      v-if="rows"
      title="To see Doctor Today"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
    ><template v-slot:body-cell="props">
      
        <q-td  @click="redirectToApp(props.row.id)" :props="props">
          <q-tooltip>
          {{props.row.summary}}
        </q-tooltip>
         <div style="cursor: pointer">{{props.value}} </div> 
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile, useQuasar } from "quasar";
import { ref } from "vue";
import { mapGetters } from "vuex";

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  setup() {
    const $q = useQuasar();
  },
  data() {
    return {
      filter: ref(""),
      columns: [
        {
          name: "claimNumber",
          required: true,
          label: "Claim Number",
          align: "left",
          field: "claimNumber",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "senderName",
          align: "center",
          align: "center",
          label: "Sender Name",
          field: "senderName",
          sortable: true,
        },
        {
          name: "date_to_see_doctor",
          align: "center",
          label: "Date to see Doctor",
          field: "date_to_see_doctor",
          sortable: true,
        },
        { name: "status", label: "Status", field: "status", sortable: true },
        {align: "center",

          name: "senderPhone",
          align: "center",
          label: "Phone Number",
          field: "senderPhone",
          sortable: true,
        },
        {
          name: "assignedTo",
          align: "center",
          label: "Assigned To",
          field: "assignedTo",
          sortable: true,
        },
        {
          name: "receptionDate",
          align: "center",
          label: "Reception Date",
          field: "receptionDate",
          sortable: true,
        },
        {
          name: "victimStatus",
          align: "center",
          label: "Victim Status",
          field: "victimStatus",
          sortable: true,
        },
        {
          name: "incapacityRate",
          align: "center",
          label: "Incapacity Rate %",
          field: "incapacityRate",
          sortable: true,
        },
        {
          name: "insuredName",
          align: "center",
          label: "Insured Name",
          field: "insuredName",
          sortable: true,
        },
        {
          name: "senderEmail",
          align: "center",
          label: "Email",
          field: "senderEmail",
          sortable: true,
        },
        {
          name: "transactionDate",
          align: "center",
          label: "Transaction Date",
          field: "transactionDate",
          sortable: true,
        },
        // Add a phone NUmber field and incapacity rate and body injury type
      ],
    };
  },
  methods: {
    redirectToApp(id){
      var link= "https://main.d1534lcmeg5n1i.amplifyapp.com/details/"+id;
       window.open(link,"_blank");
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");
      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      rows: "mails/getToSeeDoctorMails",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin: 10px 0 10px;
  color: rgb(23, 58, 80);
}
</style>
