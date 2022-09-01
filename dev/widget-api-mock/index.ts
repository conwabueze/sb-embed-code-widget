import { WidgetApi } from "@staffbase/widget-sdk";
import getLegacyAppTheme from "./legacyTheme";
import {
  getUserInformation,
  getUserList,
  getUserInformationByExternalId,
} from "./user";

const apiMock: WidgetApi = {
  getLegacyAppTheme,
  getUserInformation,
  getUserList,
  getUserInformationByExternalId,
};

export default apiMock;
