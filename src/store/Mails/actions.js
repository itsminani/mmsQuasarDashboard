
import { API } from "aws-amplify";
import { listReportingTables } from "../../graphql/queries";
export const fetchAnalytics = async ({ commit }) => {
  try {
    const response = await API.graphql({
      query: listReportingTables,
    });
    var mails = response.data.listReportingTables.items;
    console.log(mails);
    var lastUpdated = mails[0].last_updated
    console.log(lastUpdated)
    
    for (let category of mails){
      console.log(category.id)
      if (category.id == "Updated Mails"){
        var updatedMails = category;
        updatedMails = JSON.parse(updatedMails.mailsBody);
        console.log(updatedMails)

      } else if(category.id== "Created Mails") {
        var createdMails = category
        createdMails = JSON.parse(createdMails.mailsBody);
        console.log(createdMails)
      
      } else if(category.id== "To See Doctor") {
        var toSeeDoctorMails = category
        toSeeDoctorMails = JSON.parse(toSeeDoctorMails.mailsBody);
        console.log(toSeeDoctorMails)

      } else if(category.id== "Transaction") {
        var transactionMails = category
        transactionMails = JSON.parse(transactionMails.mailsBody);
        console.log(transactionMails)

      }
    }
    commit("SET_UPDATED_MAILS", updatedMails);
    commit("SET_CREATED_MAILS", createdMails);
    commit("SET_TO_SEE_DOCTOR_MAILS", toSeeDoctorMails);
    commit("SET_TRANSACTION_MAILS", transactionMails);
    commit("SET_LAST_UPDATED", lastUpdated);
  } catch (error) {
    console.log(error);
  }
};
