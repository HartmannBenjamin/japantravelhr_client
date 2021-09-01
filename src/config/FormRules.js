import message from './Messages';

export default {
  nameRules: [
    (v) => !!v || message.nameRequired,
    (v) => (v && v.length < 21 && v.length > 3) || message.nameBetween,
  ],
  emailRules: [
    (v) => !!v || message.emailRequired,
    (v) => (v && v.length < 100 && v.length > 3) || message.emailBetween,
    (v) =>
      !v ||
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      message.emailValid,
  ],
  passwordRules: [
    (v) => !!v || message.passwordRequired,
    (v) => (v && v.length < 21 && v.length > 3) || message.passwordBetween,
  ],
  imageRules: [(v) => !v || v.size / 1024 / 1024 < 2 || message.imageSize],
  subjectRules: [
    (v) => !!v || message.subjectRequired,
    (v) => (v && v.length < 61 && v.length > 3) || message.subjectBetween,
  ],
  descriptionRules: [
    (v) => !!v || message.descriptionRequired,
    (v) => (v && v.length < 501 && v.length > 19) || message.descriptionBetween,
  ],
};
