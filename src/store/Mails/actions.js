
import { API } from "aws-amplify";
import { listReportingTables } from "../../graphql/queries";
export const fetchAnalytics = async ({ commit }) => {
  try {
    const response = await API.graphql({
      query: listReportingTables,
    });
    var mails = response.data.listReportingTables.items;
    console.log(mails);

    
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

      }
    }
    commit("SET_UPDATED_MAILS", updatedMails);
    commit("SET_CREATED_MAILS", createdMails);
    commit("SET_ALL_MAILS", mails);
  } catch (error) {
    console.log(error);
  }
};
