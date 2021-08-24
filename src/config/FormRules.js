export default {
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length < 21 && v.length > 3) || 'Name must be between 4 and 20 characters',
    ],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => (v && v.length < 100 && v.length > 3) || 'Email must be between 4 and 20 characters',
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length < 21 && v.length > 3) || 'Password must be between 4 and 20 characters',
    ],
    imageRules: [
        v => !v || (v.size / 1024 / 1024) < 2 || 'Avatar size should be less than 2 Mb.'
    ],
    subjectRules: [
        v => !!v || 'Subject is required',
        v => (v && v.length < 101 && v.length > 3) || 'Subject must be between 4 and 100 characters',
    ],
    descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length < 301 && v.length > 19) || 'Description must be between 20 and 301 characters',
    ]
};
