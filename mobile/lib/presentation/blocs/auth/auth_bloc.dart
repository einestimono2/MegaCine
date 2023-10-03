import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../domain/entities/entities.dart';
// import '../../../core/constants/variables.dart';
// import '../../../core/usecase/usecase.dart';
// import '../../../domain/usecases/usecases.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  // final VerifyTokenUC verifyToken;
  final SharedPreferences sharedPreferences;

  AuthBloc({
    // required this.verifyToken,
    required this.sharedPreferences,
  }) : super(const AuthState.unknown()) {
    on<AppStarted>(_onAppStarted);
    on<LoggedIn>(_onLoggedIn);
    on<LoggedOut>(_onLoggedOut);
  }

  FutureOr<void> _onAppStarted(
    AppStarted event,
    Emitter<AuthState> emit,
  ) async {
    await Future.delayed(const Duration(seconds: 1));

    emit(const AuthState.unauthenticated());
    // try {
    //   if (sharedPreferences.getString(cachedUserKey) == null) {
    //     emit(const AuthState.unauthenticated());
    //     return;
    //   }

    //   final result = await verifyToken(NoParams());

    //   result.fold(
    //     (failure) => emit(const AuthState.unauthenticated()),
    //     (success) {
    //       print("TOKEN: ${success.token}");
    //       print("TOKEN PHP: ${success.tokenPhp}");
    //       emit(AuthState.authenticated(user: success));
    //     },
    //   );
    // } catch (e) {
    //   print(e.toString());
    //   emit(const AuthState.unauthenticated());
    // }
  }

  FutureOr<void> _onLoggedIn(LoggedIn event, Emitter<AuthState> emit) {
    emit(AuthState.authenticated(user: event.user));
    print(state.status.toString());
  }

  FutureOr<void> _onLoggedOut(LoggedOut event, Emitter<AuthState> emit) {
    emit(const AuthState.unauthenticated());
    print(state.status.toString());
  }
}
