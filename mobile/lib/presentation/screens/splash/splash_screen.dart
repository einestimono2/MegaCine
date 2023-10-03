import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:lottie/lottie.dart';
import 'package:shimmer/shimmer.dart';

import '../../../core/utils/utils.dart';
import '../../blocs/blocs.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    _controller = AnimationController(vsync: this);

    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: BlocListener<AuthBloc, AuthState>(
          listenWhen: (previous, current) => previous != current,
          listener: (previous, current) {
            if (current.status == AuthStatus.unknown) return;

            if (current.status == AuthStatus.authenticated) {
              // context.goNamed(homeRouter);
            } else {
              // context.goNamed(loginRouter);
            }
          },
          child: Column(
            children: [
              const SizedBox(height: 0.1),
              _buildLogoAnimation(context),
              const SizedBox(height: 0.01),
              _buildShimmerLogoText(),
              const Spacer(flex: 2),
              _buildLoading(),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }

  LottieBuilder _buildLoading() {
    return Lottie.asset(
      loadingLottie,
      repeat: true,
      fit: BoxFit.cover,
      width: 125,
      height: 125,
    );
  }

  Shimmer _buildShimmerLogoText() {
    return Shimmer.fromColors(
      baseColor: blackColor,
      highlightColor: Colors.white.withOpacity(0.75),
      child: Text(
        appTitle,
        style: headerStyle(24),
      ),
    );
  }

  Center _buildLogoAnimation(BuildContext context) {
    return Center(
      child: Lottie.asset(
        splashLottie,
        repeat: true,
        fit: BoxFit.fill,
        width: 0.6,
        height: 0.35,
        onLoaded: (composition) {
          _controller
            ..duration = composition.duration
            ..forward().whenComplete(() {
              print("Starting Authentication");
              BlocProvider.of<AuthBloc>(context).add(AppStarted());
            });
        },
      ),
    );
  }
}
