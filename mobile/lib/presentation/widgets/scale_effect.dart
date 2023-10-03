import 'package:flutter/material.dart';

class ScaleEffect extends StatefulWidget {
  const ScaleEffect({
    super.key,
    required this.child,
    this.onTap,
  });

  final Widget child;
  final VoidCallback? onTap;

  @override
  State<ScaleEffect> createState() => _ScaleEffectState();
}

class _ScaleEffectState extends State<ScaleEffect>
    with TickerProviderStateMixin {
  late AnimationController _animController;
  late Animation<double> _anim;

  bool _isPlaying = false;

  @override
  void initState() {
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );

    _anim = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animController,
      curve: Curves.easeIn,
      reverseCurve: Curves.easeOut,
    ));

    super.initState();
  }

  @override
  dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      splashColor: Colors.transparent,
      highlightColor: Colors.transparent,
      onTap: _isPlaying ? null : _onTap,
      child: ScaleTransition(
        scale: _anim,
        child: widget.child,
      ),
    );
  }

  void _onTap() {
    setState(() {
      _isPlaying = true;
    });

    _animController.forward().then(
          (_) => _animController.reverse().then(
            (_) {
              setState(() {
                _isPlaying = false;
              });

              widget.onTap?.call();
            },
          ),
        );
  }
}
