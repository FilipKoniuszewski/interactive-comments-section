import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

let isLocaleRegistered = false;

export function ensureTimeAgoLocale(): void {
  if (!isLocaleRegistered) {
    TimeAgo.addLocale(en as Parameters<typeof TimeAgo.addLocale>[0]);
    isLocaleRegistered = true;
  }
}
