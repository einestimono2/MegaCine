import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'presentation/blocs/blocs.dart';

// import 'core/networks/network_info.dart';
// import 'data/datasources/datasources.dart';
// import 'data/repositories/repositories_impl.dart';
// import 'domain/repositories/repositories.dart';
// import 'domain/usecases/usecases.dart';
// import 'presentation/blocs/blocs.dart';

final sl = GetIt.instance;

///* registerFactory: Mỗi khi gọi sẽ có một instance mới được tạo ra và trả về
///* registerSingleton: Chỉ tạo ra 1 instance duy nhất, ngay khi khởi động app
///* registerLazySingleton: Khởi tạo vào lần gọi lấy instance đầu tiên, chứ không phải khi app khởi động

Future<void> init() async {
  //! External
  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
  sl.registerLazySingleton(() => Connectivity());

  //! Blocs
  sl.registerLazySingleton(() => AuthBloc(
        // verifyToken: sl(),
        sharedPreferences: sl(),
      ));
//   //* Do AuthBloc sử dụng SignInBloc.stream.listen nên sử dụng: registerSingleton hoặc registerLazySingleton
//   sl.registerLazySingleton(() => SignInBloc(
//         signInUsecase: sl(),
//         authBloc: sl(),
//       ));
//   sl.registerLazySingleton(() => SignOutBloc(
//         signOutUsecase: sl(),
//         authBloc: sl(),
//         sharedPreferences: sl(),
//       ));
//   sl.registerLazySingleton(() => NotificationBloc(
//         getAllNotifications: sl(),
//         getUnreadNotifications: sl(),
//         updateIsReadNotification: sl(),
//       ));
//   sl.registerLazySingleton(() => HomeSlidesBloc(
//         getSlideImagesUC: sl(),
//       ));
//   sl.registerLazySingleton(() => RevenueBloc(
//         getRevenueUC: sl(),
//       ));
//   sl.registerLazySingleton(() => PromoBloc(
//         getAllPromoUC: sl(),
//       ));
//   sl.registerLazySingleton(() => ListLocationsBloc(
//         getListLocationsUC: sl(),
//       ));

//   //! Use cases
//   sl.registerLazySingleton(() => SignInUC(repository: sl()));
//   sl.registerLazySingleton(() => SignOutUC(repository: sl()));
//   sl.registerLazySingleton(() => VerifyTokenUC(repository: sl()));
//   sl.registerLazySingleton(() => GetAllNotificationsUC(repository: sl()));
//   sl.registerLazySingleton(() => GetUnreadNotificationsUC(repository: sl()));
//   sl.registerLazySingleton(() => UpdateIsReadNotificationUC(repository: sl()));
//   sl.registerLazySingleton(() => GetSlideImagesUC(repository: sl()));
//   sl.registerLazySingleton(() => GetRevenueUC(repository: sl()));
//   sl.registerLazySingleton(() => GetAllPromoUC(repository: sl()));
//   sl.registerLazySingleton(() => GetListLocationsUC(repository: sl()));

//   //! Repositories
//   sl.registerLazySingleton<SignInRepository>(
//     () => SignInRepositoryImpl(
//       signInLocalDataSource: sl(),
//       signInRemoteDataSource: sl(),
//       networkInfo: sl(),
//     ),
//   );
//   sl.registerLazySingleton<SignOutRepository>(
//     () => SignOutRepositoryImpl(
//       signOutLocalDataSource: sl(),
//       signOutRemoteDataSource: sl(),
//       networkInfo: sl(),
//     ),
//   );
//   sl.registerLazySingleton<AuthRepository>(
//     () => AuthRepositoryImpl(
//       authRemoteDataSource: sl(),
//       networkInfo: sl(),
//     ),
//   );
//   sl.registerLazySingleton<NotificationRepository>(
//     () => NotificationRepositoryImpl(
//       networkInfo: sl(),
//       notificationRemoteDataSource: sl(),
//     ),
//   );
//   sl.registerLazySingleton<ListImagesRepository>(
//     () => ListImagesRepositoryImpl(
//       networkInfo: sl(),
//       listImagesRemoteDataSource: sl(),
//     ),
//   );
//   sl.registerLazySingleton<RevenueRepository>(
//     () => RevenueRepositoryImpl(
//       networkInfo: sl(),
//       revenueRemoteDataSource: sl(),
//     ),
//   );
//   sl.registerLazySingleton<PromoRepository>(
//     () => PromoRepositoryImpl(
//       networkInfo: sl(),
//       promoRemoteDataSource: sl(),
//     ),
//   );
//   sl.registerLazySingleton<LocationRepository>(
//     () => LocationRepositoryImpl(
//       networkInfo: sl(),
//       locationRemoteDataSource: sl(),
//     ),
//   );

//   //! Data sources
//   sl.registerLazySingleton<SignInRemoteDataSource>(
//     () => SignInRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<SignInLocalDataSource>(
//     () => SignInLocalDataSourceImpl(sharedPreferences: sl()),
//   );
//   sl.registerLazySingleton<SignOutRemoteDataSource>(
//     () => SignOutRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<SignOutLocalDataSource>(
//     () => SignOutLocalDataSourceImpl(sharedPreferences: sl()),
//   );
//   sl.registerLazySingleton<AuthRemoteDataSource>(
//     () => AuthRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<NotificationRemoteDataSource>(
//     () => NotificationRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<ListImagesRemoteDataSource>(
//     () => ListImagesRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<RevenueRemoteDataSource>(
//     () => RevenueRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<PromoRemoteDataSource>(
//     () => PromoRemoteDataSourceImpl(),
//   );
//   sl.registerLazySingleton<LocationRemoteDataSource>(
//     () => LocationRemoteDataSourceImpl(),
//   );

//   //! Core
//   sl.registerLazySingleton<NetworkInfo>(
//     () => NetworkInfoImpl(sl()),
//   );
}
