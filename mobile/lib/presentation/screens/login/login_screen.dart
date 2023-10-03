import 'package:flutter/material.dart';

import '../../../core/utils/utils.dart';
import './widgets/widgets.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        children: [
          const SizedBox(height: 0.03),
          _buildAppLogo(),
          const LoginForm(),
          const Spacer(flex: 4),
          _buildFooter(),
          const Spacer(),
        ],
      ),
    );
  }

  Text _buildFooter() {
    return Text(
      "Copyright 2023",
      style: headerStyle(16),
    );
  }

  Center _buildAppLogo() {
    return Center(
      child: Image.asset(
        appLogo2Image,
        fit: BoxFit.contain,
        width: 0.8,
        height: 0.7,
      ),
    );
  }
}
