// export const host = "http://localhost:3001";
export const host = "https://doctorai-392406.uw.r.appspot.com/";

export const userLoginRoute = `${host}/login`;
export const userSignupRoute = `${host}/signup`;
export const chatAiRoute = `${host}/completion`;

export const getUserDataRoute = (id) => `${host}/user/${id}`
export const putUserDataRoute = (id) => `${host}/user/${id}`

export const appointmentRoute = `${host}/appointment`;
export const appointmentDetails = (id) => `${host}/appointment/${id}`;
export const deleteAppointmentRoute = (id) => `${host}/appointment/delete/${id}`

export const doctorDetailsRoute = `${host}/doctor/details`
export const getDoctorDetailsRoute = (id) => `${host}/doctor/details/${id}`

export const postUserReview = `${host}/user/review`

export const doctorSignupRoute = `${host}/doctor/signup`
export const doctorLoginRoute = `${host}/doctor/login`
