 // Code for Haptic Feedback
 function HapticOn(isLongEffect = false) {

  if ('vibrate' in navigator) {
    navigator.vibrate(100);

    if (isLongEffect) {
      navigator.vibrate([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]); // tick-tick-tick effect
    }

  }

}