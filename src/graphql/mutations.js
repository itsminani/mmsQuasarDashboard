/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReportingTable = /* GraphQL */ `
  mutation CreateReportingTable(
    $input: CreateReportingTableInput!
    $condition: ModelReportingTableConditionInput
  ) {
    createReportingTable(input: $input, condition: $condition) {
      id
      last_updated
      total_mails
      mailsBody
      createdAt
      updatedAt
    }
  }
`;
export const updateReportingTable = /* GraphQL */ `
  mutation UpdateReportingTable(
    $input: UpdateReportingTableInput!
    $condition: ModelReportingTableConditionInput
  ) {
    updateReportingTable(input: $input, condition: $condition) {
      id
      last_updated
      total_mails
      mailsBody
      createdAt
      updatedAt
    }
  }
`;
export const deleteReportingTable = /* GraphQL */ `
  mutation DeleteReportingTable(
    $input: DeleteReportingTableInput!
    $condition: ModelReportingTableConditionInput
  ) {
    deleteReportingTable(input: $input, condition: $condition) {
      id
      last_updated
      total_mails
      mailsBody
      createdAt
      updatedAt
    }
  }
`;
