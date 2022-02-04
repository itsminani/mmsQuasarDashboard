/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReportingTable = /* GraphQL */ `
  query GetReportingTable($id: ID!) {
    getReportingTable(id: $id) {
      id
      archived_mails
      criticalDelays
      last_updated
      total_mails
      createdAt
      updatedAt
    }
  }
`;
export const listReportingTables = /* GraphQL */ `
  query ListReportingTables(
    $filter: ModelReportingTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportingTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        archived_mails
        criticalDelays
        last_updated
        total_mails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
