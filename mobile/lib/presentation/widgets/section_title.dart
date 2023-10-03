import 'package:flutter/material.dart';

import '../../core/utils/utils.dart';

class SectionTitle extends StatelessWidget {
  const SectionTitle({
    super.key,
    required this.title,
    this.paddingBottom,
    this.paddingTop,
    this.action,
  });

  final String title;
  final double? paddingTop;
  final double? paddingBottom;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        top: paddingTop ?? 22,
        bottom: paddingBottom ?? 16,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: headerStyle(16),
          ),
          action ?? const SizedBox.shrink()
        ],
      ),
    );
  }
}
