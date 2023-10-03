import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../core/utils/utils.dart';

class SimpleButton extends StatelessWidget {
  final String title;
  final VoidCallback? onPressed;
  final double? height;
  final double? width;
  final bool shadow;
  final BorderRadiusGeometry? borderRadius;

  const SimpleButton({
    Key? key,
    required this.title,
    this.onPressed,
    this.height,
    this.width,
    this.shadow = true,
    this.borderRadius,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      onPressed: onPressed,
      padding: const EdgeInsets.all(0),
      minSize: height ?? 35,
      child: Container(
        width: width ?? double.infinity,
        height: height ?? 35,
        alignment: FractionalOffset.center,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [grad1Color, grad2Color],
            stops: [0, 1],
          ),
          // color: backgroundColor ?? primaryColor,
          borderRadius:
              borderRadius ?? const BorderRadius.all(Radius.circular(8)),
          boxShadow: shadow
              ? [
                  BoxShadow(
                    color: grad1Color.withOpacity(0.5),
                    blurRadius: 6,
                    offset: const Offset(1, 5),
                  ),
                ]
              : null,
        ),
        child: Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: whiteColor,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.4,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}

class AnimatedButton extends StatelessWidget {
  final String title;
  final AnimationController btnCntrl;
  final Animation btnAnim;
  final VoidCallback onPressed;
  final double? height;
  final double? endAnimationValue;

  const AnimatedButton({
    Key? key,
    required this.title,
    required this.btnCntrl,
    required this.btnAnim,
    required this.onPressed,
    this.height,
    this.endAnimationValue,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      builder: _buildBtnAnimation,
      animation: btnCntrl,
    );
  }

  Widget _buildBtnAnimation(BuildContext context, Widget? child) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      alignment: Alignment.bottomCenter,
      onPressed: onPressed,
      child: Container(
        width: btnAnim.value,
        height: height ?? 45,
        alignment: FractionalOffset.center,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [grad1Color, grad2Color],
            stops: [0, 1],
          ),
          borderRadius: const BorderRadius.all(
            Radius.circular(8),
          ),
          boxShadow: [
            BoxShadow(
              color: grad1Color.withOpacity(0.5),
              blurRadius: 6,
              offset: const Offset(1, 5),
            ),
          ],
        ),
        child: btnAnim.value > (endAnimationValue ?? 75)
            ? Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: whiteColor,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.4,
                  fontSize: 16,
                ),
              )
            // ignore: prefer_const_constructors
            // : DotsLoading(),
            : const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(whiteColor),
              ),
      ),
    );
  }
}

class AppButtonNoAniamtion extends StatelessWidget {
  final String title;
  final VoidCallback onPressed;
  final double width;
  final double height;

  const AppButtonNoAniamtion({
    Key? key,
    required this.title,
    required this.onPressed,
    required this.width,
    required this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      onPressed: onPressed,
      child: Container(
        width: width,
        height: height,
        alignment: Alignment.center,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [grad1Color, grad2Color],
            stops: [0, 1],
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(8),
          ),
        ),
        child: Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: whiteColor,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.4,
            fontSize: 14,
          ),
        ),
      ),
    );
  }
}
