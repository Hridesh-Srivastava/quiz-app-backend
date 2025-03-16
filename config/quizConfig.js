export const QUIZ_CONFIG = {
  DURATION_MINUTES: 30,
  get DURATION_SECONDS() {
    return this.DURATION_MINUTES * 60;
  },
};
