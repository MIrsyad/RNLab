Simple list Movie with Carousel

![Untitled-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/752efa2b-2d95-4553-a9ac-8c71f7c7d1b3)

I wanted to create a simple horizontal carousel to show a list of movies with some basic animations. The goal was to make the movie cards interactive, so when you focus on a card, it gets slightly bigger, and when you click on a card, it expands to show more details about the movie. I used a common movie data structure so that the same component could display different movie info.

For the animations, I made the movie card grow a bit larger when it's focused, to give some feedback to the user. When a card is clicked, it expands to show more details. I used React Native Reanimated because it made the animations smoother and easier to handle compared to the default React Native Animated API. It helped make the transitions less choppy and more fluid.

One problem I ran into was animating the expanded card. At first, I used React Native’s default Animated library, but I had trouble animating the width and height of the card. After some research, I learned that you can't easily animate layout changes with the Animated API. So, I switched to Reanimated, which made it much easier to animate the size changes and made the whole animation process smoother.

