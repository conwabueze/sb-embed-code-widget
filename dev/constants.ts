export const ON_CARD_ATTR = "on-card";
export const WIDGET_TITLE_ATTR = "widget-title";
export const TITLE_LINK_ATTR = "title-link";
export const DEVICE_VISIBILITY_ATTR = "device-visibility";
export const GROUP_VISIBILITY_ONLYIF_ATTR = "group-visibility-onlyif";
export const GROUP_VISIBILITY_UNLESS_ATTR = "group-visibility-unless";

export const visibilityAttributes = [
  DEVICE_VISIBILITY_ATTR,
  GROUP_VISIBILITY_ONLYIF_ATTR,
  GROUP_VISIBILITY_UNLESS_ATTR,
];

export const baseAttributes = [
  ON_CARD_ATTR,
  TITLE_LINK_ATTR,
  WIDGET_TITLE_ATTR,
  ...visibilityAttributes,
];
