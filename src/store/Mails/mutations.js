export const SET_UPDATED_MAILS = (state, Mails) => {
  state.updatedMails = Mails;
};
export const SET_CREATED_MAILS= (state, Mails) => {
  state.createdMails = Mails;
};
export const SET_TO_SEE_DOCTOR_MAILS= (state, Mails) => {
  state.toSeeDoctorMails = Mails;
};
export const SET_TRANSACTION_MAILS= (state, Mails) => {
  state.transactionMails = Mails;
};
export const SET_ALL_MAILS= (state, Mails) => {
  state.mails = Mails;
};
export const SET_LAST_UPDATED= (state, lastUpdated) => {
  state.lastUpdated = lastUpdated;
};
