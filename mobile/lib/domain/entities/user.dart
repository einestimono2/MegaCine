import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String? userName;
  final String? displayName;
  final String? email;
  final bool isSystemAccount;
  final String? avatar;
  final String? companyTel1;
  final String? companyTel2;
  final String? employeeId;
  final String? token;
  final String? tokenPhp;

  const User({
    this.userName,
    this.displayName,
    this.email,
    this.isSystemAccount = false,
    this.avatar,
    this.companyTel1,
    this.companyTel2,
    this.employeeId,
    this.token,
    this.tokenPhp,
  });

  @override
  List<Object?> get props => [
        userName,
        displayName,
        email,
        isSystemAccount,
        avatar,
        companyTel1,
        companyTel2,
        employeeId,
        token,
        tokenPhp,
      ];
}
