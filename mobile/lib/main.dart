import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

// import 'config/app_router.dart';
import 'core/utils/utils.dart';
import 'injection_container.dart' as di;
import 'simple_bloc_observer.dart'; //Dependency injector

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  //Inject all the dependencies and wait for it is done (i.e. UI won't built until all the dependencies are injected)
  await di.init();

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent, // status bar color
  ));

  HttpOverrides.global = MyHttpOverrides();

  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  Bloc.observer = SimpleBlocObserver();

  runApp(const MegaCineApp());
}

class MegaCineApp extends StatelessWidget {
  const MegaCineApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [Locale('vi')],
      locale: const Locale('vi'),
      theme: ThemeData(
        fontFamily: 'Lato',
      ),
      title: appTitle,
      // routerConfig: router,
    );
  }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
