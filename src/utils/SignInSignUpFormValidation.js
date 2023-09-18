export const CheckValidSignInFormData = (email, password) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isValidEmail) return "Email Is not Valid";
    if(!isValidPassword) return "Password Is not Valid";
    return null
}

export const CheckValidSignUPFormData = (fullName, email, password) => {
    const isValidFullName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(fullName);
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isValidFullName) return "Full Name Is not Valid";
    if(!isValidEmail) return "Email Is not Valid";
    if(!isValidPassword) return "Password Is not Valid";
    return null
}