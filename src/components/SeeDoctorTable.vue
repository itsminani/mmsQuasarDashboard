<template>
  <div class="q-pa-md">
    <div v-if="rows">
      <h3 class="title" style="text-align: center">To see doctor today</h3>
      <q-table
        v-if="rows"
        title="To see Doctor Today"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        ><template v-slot:body-cell="props">
          <q-td :props="props">
            <q-tooltip anchor="top middle" self="top middle">
              {{ props.row.summary }}
            </q-tooltip>

            <q-menu fit anchor="bottom middle" self="top middle">
              <q-item clickable v-if="props.row.senderEmail != 'NA'">
                <q-item-section :href="'mailto:' + props.row.senderEmail"
                  >Email User</q-item-section
                >
              </q-item>
              <q-item clickable @click="redirectToApp(props.row.id)">
                <q-item-section>Open In Maily </q-item-section>
              </q-item>
            </q-menu>

            <div style="cursor: pointer">{{ props.value }}</div>
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
    
  </div>
</template>

<script>
import { exportFile, useQuasar } from "quasar";
import { ref } from "vue";

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
        {
          align: "center",

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
          name: "radiantIncapacityRate",
          align: "center",
          label: "Radiant Rate %",
          field: "radiantIncapacityRate",
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
    redirectToApp(id) {
      var link = "https://main.d1534lcmeg5n1i.amplifyapp.com/details/" + id;
      window.open(link, "_blank");
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
  props: {
    rows: {
      type: Array,
    },
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
