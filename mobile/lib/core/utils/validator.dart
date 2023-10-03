// Error
final RegExp emailValidatorRegExp =
    RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");

const String kEmailNullError = "Email không được để trống";
const String kInvalidEmailError = "Email không hợp lệ";

const String kPassNullError = "Mật khẩu không được để trống";
const String kShortPassError = "Password is too short";
const String kMatchPassError = "Passwords don't match";

const String kNamelNullError = "Please Enter your name";

const String kPhoneNumberNullError = "Please Enter your phone number";

const String kAddressNullError = "Please Enter your address";

const String kDateOfBirthNullError = "Please Enter your date of birth";

String? emailValidator(String? value) {
  if (value!.isEmpty) {
    return kEmailNullError;
  } else if (!emailValidatorRegExp.hasMatch(value)) {
    return kInvalidEmailError;
  }
  return null;
}

String? passwordValidator(String? value) {
  if (value!.isEmpty) {
    return kPassNullError;
  }
  // else if (value.length < 6) {
  //   return kShortPassError;
  // }
  return null;
}

String? confirmationPasswordValidator(String? value, String? password) {
  if (value!.isEmpty) {
    return kPassNullError;
  } else if (password != value) {
    return kMatchPassError;
  }
  return null;
}
