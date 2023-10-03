import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class FullScreenLoading extends StatelessWidget {
  const FullScreenLoading({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      color: Colors.transparent,
      alignment: Alignment.center,
      child: Container(
        width: 125,
        // height: 125.w,
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.5),
          borderRadius: BorderRadius.circular(6),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              blurRadius: 8,
              spreadRadius: 4,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        // alignment: Alignment.center,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Lottie.asset(
              'assets/lotties/loading_1.json',
              fit: BoxFit.fill,
            ),
            const Text(
              "Đang tải ...",
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }
}
