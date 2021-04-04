import { GET_SCHEDULE } from "./scheduleType";

export function getSchedule(value) {
  return {
    type: GET_SCHEDULE,
    values: value,
  };
}
