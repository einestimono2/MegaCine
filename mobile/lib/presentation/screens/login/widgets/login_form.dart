import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../../../core/utils/utils.dart';
import '../../../widgets/widgets.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({
    super.key,
  });

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final FocusNode _emailNode = FocusNode();
  final FocusNode _passwordNode = FocusNode();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _obscure = true;

  @override
  void dispose() {
    _emailNode.dispose();
    _passwordNode.dispose();
    super.dispose();
  }

  void _nextRequest(FocusNode? next) {
    _emailNode.unfocus();
    _passwordNode.unfocus();

    if (next == null) {
      _handleSignIn();
    } else {
      next.requestFocus();
    }
  }

  void _handleSignIn() async {
    if (_formKey.currentState!.validate() &&
        _emailController.text.isNotEmpty &&
        _passwordController.text.isNotEmpty) {
      // context.read<SignInBloc>().add(
      //       SignInSubmit(
      //         tenantCode: _customerIdController.text,
      //         username: _userNameController.text,
      //         password: _passwordController.text,
      //       ),
      //     );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Column(
          children: [
            InputFieldShadow(
              onTap: () => setState(() => _emailNode.requestFocus()),
              onTapOutSide: (_) => _emailNode.hasFocus
                  ? setState(() => _emailNode.unfocus())
                  : null,
              textInputAction: TextInputAction.next,
              focusNode: _emailNode,
              paddingVertical: 18,
              border: true,
              title: "Email",
              controller: _emailController,
              validator: emailValidator,
              onFieldSubmitted: (_) => _nextRequest(_passwordNode),
              prefixIcon: Icon(
                FontAwesomeIcons.solidUser,
                size: 18,
                color: _emailNode.hasFocus ? Colors.green : blackColor,
              ),
            ),
            const SizedBox(height: 22),
            InputFieldShadow(
              onTap: () => setState(() => _passwordNode.requestFocus()),
              onTapOutSide: (_) => _passwordNode.hasFocus
                  ? setState(() => _passwordNode.unfocus())
                  : null,
              focusNode: _passwordNode,
              paddingVertical: 18,
              border: true,
              title: "Mật khẩu",
              obscureText: _obscure,
              controller: _passwordController,
              validator: passwordValidator,
              onFieldSubmitted: (_) => _nextRequest(null),
              prefixIcon: Icon(
                FontAwesomeIcons.lock,
                size: 18,
                color: _passwordNode.hasFocus ? Colors.green : blackColor,
              ),
              suffixIcon: IconButton(
                splashRadius: 16,
                onPressed: () => setState(() {
                  _obscure = !_obscure;
                }),
                icon: Icon(
                  _obscure ? FontAwesomeIcons.eye : FontAwesomeIcons.eyeSlash,
                  size: 16,
                ),
              ),
            ),
            const SizedBox(height: 0.085),
            ScaleEffect(
              onTap: _handleSignIn,
              child: const SimpleButton(
                height: 50,
                title: "Đăng nhập",
              ),
            ),
          ],
        ),
      ),
    );
  }
}
