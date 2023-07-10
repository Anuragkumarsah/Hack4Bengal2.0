export const host = "http://localhost:3001";

export const userLoginRoute = `${host}/login`;
export const userSignupRoute = `${host}/signup`;
export const chatAiRoute = `${host}/completion`;

export const getUserDataRoute = (id) => `${host}/user/${id}`
export const putUserDataRoute = (id) => `${host}/user/${id}`

export const appointmentRoute = `${host}/appointment`;
export const appointmentDetails = (id) => `${host}/appointment/${id}`;
export const deleteAppointmentRoute = (id) => `${host}/appointment/delete/${id}`

export const doctorDetailsRoute = `${host}/doctor/details`
export const getDoctorDetailsRoute = (id) => `${host}/doctor.details/${id}`
