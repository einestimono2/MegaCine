import 'package:flutter/material.dart';

import '../../core/utils/utils.dart';

class InputField extends StatelessWidget {
  const InputField({
    super.key,
    this.paddingVertical,
    this.paddingHorizontal,
    this.title,
    this.hintText,
    this.controller,
    this.focusNode,
    this.textInputType = TextInputType.text,
    this.validator,
    this.suffixIcon,
    this.prefixIcon,
    this.obscureText = false,
    this.border = true,
    this.textInputAction,
    this.onFieldSubmitted,
    this.autovalidateMode,
    this.onChanged,
    this.onTap,
  });

  final double? paddingVertical;
  final double? paddingHorizontal;
  final String? title;
  final bool obscureText;
  final String? hintText;
  final FocusNode? focusNode;
  final TextInputType textInputType;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final bool border;
  final TextInputAction? textInputAction;
  final Function(String)? onFieldSubmitted;
  final AutovalidateMode? autovalidateMode;
  final Function(String)? onChanged;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onTap: onTap,
      onChanged: onChanged,
      onTapOutside: (event) => focusNode?.unfocus(),
      autovalidateMode: autovalidateMode ?? AutovalidateMode.onUserInteraction,
      textInputAction: textInputAction ?? TextInputAction.done,
      // initialValue: controller?.text ?? "",
      focusNode: focusNode,
      obscureText: obscureText,
      controller: controller,
      validator: validator,
      keyboardType: textInputType,
      onFieldSubmitted: onFieldSubmitted,
      decoration: InputDecoration(
        isDense: false,
        alignLabelWithHint: true,
        contentPadding: EdgeInsets.symmetric(
          vertical: paddingVertical ?? 16,
          horizontal: paddingHorizontal ?? 14,
        ),
        labelText: title,
        labelStyle: hintText == null ? const TextStyle(fontSize: 13.5) : null,
        hintText: hintText,
        enabledBorder: inputBorder(border),
        focusedBorder: inputBorder(border, Colors.green),
        border: inputBorder(border),
        suffixIcon: suffixIcon,
        prefixIcon: prefixIcon,
      ),
      style: Theme.of(context).textTheme.titleLarge!.copyWith(fontSize: 16),
    );
  }
}

class InputFieldShadow extends StatefulWidget {
  const InputFieldShadow({
    super.key,
    this.paddingVertical,
    this.paddingHorizontal,
    this.title,
    this.hintText,
    this.controller,
    this.focusNode,
    this.textInputType = TextInputType.text,
    this.validator,
    this.suffixIcon,
    this.prefixIcon,
    this.obscureText = false,
    this.border = true,
    this.textInputAction,
    this.onFieldSubmitted,
    this.autovalidateMode,
    this.onTap,
    this.onTapOutSide,
  });

  final double? paddingVertical;
  final double? paddingHorizontal;
  final String? title;
  final bool obscureText;
  final String? hintText;
  final FocusNode? focusNode;
  final TextInputType textInputType;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;
  final Widget? prefixIcon;
  final bool border;
  final TextInputAction? textInputAction;
  final Function(String)? onFieldSubmitted;
  final AutovalidateMode? autovalidateMode;
  final VoidCallback? onTap;
  final Function(PointerDownEvent)? onTapOutSide;

  @override
  State<InputFieldShadow> createState() => InputFieldShadowState();
}

class InputFieldShadowState extends State<InputFieldShadow> {
  String? _errorText;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Material(
          elevation: 3,
          borderRadius: widget.border ? BorderRadius.circular(8) : null,
          borderOnForeground: false,
          child: TextFormField(
            onTap: widget.onTap ?? () => widget.focusNode?.requestFocus(),
            onTapOutside:
                widget.onTapOutSide ?? (event) => widget.focusNode?.unfocus(),
            // initialValue: widget.controller?.text ?? "",
            autovalidateMode:
                widget.autovalidateMode ?? AutovalidateMode.onUserInteraction,
            textInputAction: widget.textInputAction ?? TextInputAction.done,
            focusNode: widget.focusNode,
            obscureText: widget.obscureText,
            controller: widget.controller,
            validator: widget.validator != null
                ? (value) {
                    //!! the Future delayed is to avoid calling [setState] during [build]
                    Future.delayed(
                      Duration.zero,
                      () => setState(() {
                        _errorText = widget.validator!(value);
                      }),
                    );
                    return _errorText;
                  }
                : null,
            keyboardType: widget.textInputType,
            onFieldSubmitted: widget.onFieldSubmitted,
            decoration: InputDecoration(
              //!
              errorStyle: const TextStyle(fontSize: 0, height: 1),
              isDense: false,
              alignLabelWithHint: true,
              contentPadding: EdgeInsets.symmetric(
                vertical: widget.paddingVertical ?? 16,
                horizontal: widget.paddingHorizontal ?? 14,
              ),
              labelText: widget.title,
              labelStyle: widget.hintText == null
                  ? const TextStyle(fontSize: 13.5)
                  : null,
              hintText: widget.hintText,
              enabledBorder: inputBorder(widget.border),
              focusedBorder: inputBorder(widget.border, Colors.green),
              border: inputBorder(widget.border),
              suffixIcon: widget.suffixIcon,
              prefixIcon: widget.prefixIcon,
            ),
            style:
                Theme.of(context).textTheme.titleLarge!.copyWith(fontSize: 16),
          ),
        ),
        if (_errorText != null)
          Padding(
            padding:
                const EdgeInsets.only(left: 16, right: 16, top: 6, bottom: 1),
            child: Text(
              _errorText!,
              style: TextStyle(
                fontSize: 12,
                color: Colors.red[600],
                letterSpacing: -0.1,
              ),
            ),
          )
      ],
    );
  }
}
