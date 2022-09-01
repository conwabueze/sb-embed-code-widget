import {
  SBUserProfile,
  UserListRequestQuery,
  UserListResponse,
} from "@staffbase/widget-sdk";

const user: SBUserProfile = {
  firstName: "Lucy",
  lastName: "Liu",
};

export const getUserInformation = async (
  _userId?: string
): Promise<SBUserProfile> => user;

export const getUserInformationByExternalId = async (
  _externalId: string
): Promise<SBUserProfile> => user;

export const getUserList = async (
  _query: UserListRequestQuery
): Promise<UserListResponse> => ({
  data: [{ id: "5c35e4feea2d15e6ffa8251d", ...user }],
  offset: 0,
  limit: 1,
  total: 1,
});
