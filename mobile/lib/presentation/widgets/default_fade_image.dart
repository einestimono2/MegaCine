import 'package:flutter/material.dart';

import '../../core/utils/utils.dart';


class DefaultFadeImage extends StatelessWidget {
  const DefaultFadeImage({
    Key? key,
    this.width,
    this.height,
    required this.url,
    this.radius,
  }) : super(key: key);

  final double? width;
  final double? height;
  final String url;
  final double? radius;

  @override
  Widget build(BuildContext context) {
    return radius != null
        ? ClipRRect(
            borderRadius: BorderRadius.circular(radius!),
            child: _buildFadeInImage(),
          )
        : _buildFadeInImage();
  }

  FadeInImage _buildFadeInImage() {
    return FadeInImage.assetNetwork(
      placeholder: placeHolderImage,
      image: url,
      placeholderFit: BoxFit.fill,
      fit: BoxFit.fill,
      width: width,
      height: height,
    );
  }
}
