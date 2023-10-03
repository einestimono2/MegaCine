//! App Title
import 'package:flutter/material.dart';

const String appTitle = "Car Tracking";

//! Routers
const String splashRouter = "splash";
const String loginRouter = "login";
const String homeRouter = "home";

//! Lotties
const String splashLottie = "assets/lotties/car-tracking.json";
const String loadingLottie = "assets/lotties/loading.json";

//! Images
const String placeHolderImage = "assets/placeholder.png";
const String pageNotFoundImage = "assets/404_Page.png";
const String appLogoImage = "assets/app-logo.png";
const String appLogo2Image = "assets/app-logo2.png";

//! Colors
final Color shimmerBase = Colors.grey[400]!;
final Color shimmerHigh = Colors.grey[50]!;

const Color primaryColor = Color.fromRGBO(202, 13, 15, 1);
const Color secondaryColor = Color(0xffFDC994);

const Color transparentColor = Colors.transparent;
const Color whiteColor = Colors.white;
const Color blackColor = Colors.black;

const Color grad1Color = Color.fromRGBO(202, 13, 15, 0.75);
const Color grad2Color = Color.fromRGBO(225, 51, 51, 0.9);

//! TextStyle
TextStyle headerStyle([double? size]) => TextStyle(
      fontSize: size ?? 18,
      fontFamily: "Montserrat",
      color: blackColor,
      letterSpacing: -0.3,
      fontWeight: FontWeight.w600,
    );

//! Styles
dynamic inputBorder(bool border, [Color? color]) => border
    ? OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: color ?? Colors.grey,
          width: color == null ? 0.75 : 1.5,
        ),
        gapPadding: 4,
      )
    : UnderlineInputBorder(
        borderSide: BorderSide(
          color: color ?? Colors.grey,
          width: color == null ? 0.75 : 1.5,
        ),
      );

//! API
Map<String, String> getHeaders({required String? token}) => <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      if (token != null) 'Authorization': 'Bearer $token',
    };

//! Error
const String noConnection = 'Không có kết nối Internet, vui lòng thử lại!';
const String defaultErrorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
const String signInError =
    'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!';
