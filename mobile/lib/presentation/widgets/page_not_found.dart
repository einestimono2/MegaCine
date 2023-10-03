import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../core/utils/utils.dart';

class PageNotFound extends StatelessWidget {
  const PageNotFound({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            pageNotFoundImage,
            fit: BoxFit.cover,
          ),
          Positioned(
            bottom: 0.1,
            left: 0.15,
            right: 0.15,
            child: CupertinoButton(
              color: primaryColor,
              borderRadius: BorderRadius.circular(50),
              onPressed: () => {
                // context.goNamed(homeRouter)
              },
              child: Text(
                "Go Home".toUpperCase(),
                style: const TextStyle(
                  color: whiteColor,
                  fontWeight: FontWeight.w400,
                  letterSpacing: -0.4,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
