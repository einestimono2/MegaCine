import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      extendBody: true,
      bottomNavigationBar: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(24),
          margin: const EdgeInsets.symmetric(horizontal: 24),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.black.withOpacity(0.5),
          ),
          child: const Row(
            children: [],
          ),
        ),
      ),
      body: const HomeBody(),
    );
  }
}

class HomeBody extends StatelessWidget {
  const HomeBody({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.red,
                ),
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.blue,
                ),
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.green,
                ),
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.orange,
                ),
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.pink,
                ),
                Container(
                  width: 1,
                  height: 0.2,
                  color: Colors.yellowAccent,
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
