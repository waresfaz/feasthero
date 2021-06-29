import { GET_SCHEDULE } from "../schedule/scheduleType";

export function getSchedule(value) {
  return {
    type: GET_SCHEDULE,
    values: value,
  };
}
