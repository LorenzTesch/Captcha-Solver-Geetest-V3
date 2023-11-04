# Captcha-Solver-Geetest-V3

GeeTest provides captcha services. One of the captchas in V3 is a slide-puzzle like the one below:

![Example of a GeeTest captcha](https://github.com/LorenzTesch/Captcha-Solver-Geetest-V3/blob/main/img/original.png?raw=true)

This script tries to calculate the amount of pixels the slider must be moved in order to correctly solve the captcha.\
The solution is not applied automatically.\
\
You can try it on [https://www.geetest.com/en/demo](https://www.geetest.com/en/demo)

![Example of a solved GeeTest captcha](https://github.com/LorenzTesch/Captcha-Solver-Geetest-V3/blob/main/img/solved.png?raw=true)

Simply copy the inject.js file into the developer console.\
The green line marks the estimated column of the puzzle piece.\
You can check if the solution is correct, by sliding the button and then retrieving the actual offset from the style/transform attribute.

![Alert of solution](https://github.com/LorenzTesch/Captcha-Solver-Geetest-V3/blob/main/img/alert.png?raw=true)
![Check if solution was correct](https://github.com/LorenzTesch/Captcha-Solver-Geetest-V3/blob/main/img/check.png?raw=true)