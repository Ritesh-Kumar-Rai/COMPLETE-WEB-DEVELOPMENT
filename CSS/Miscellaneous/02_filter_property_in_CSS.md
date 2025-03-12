# Filter Property in CSS3

CSS filters are a set of graphical effects that can be applied to HTML elements to modify their appearance. Filters can alter properties like color, brightness, contrast, and more. 

## Commonly Used Filter Functions:

  ### 1. ``grayscale()``: Converts the element to grayscale. A value of 1 (or 100%) means fully grayscale.

  ```css
  filter: grayscale(0.5); /* 50% grayscale */
  ``` 

  ### 2. ``blur()``: Applies a blur effect to the element. The value determines the amount of blur.

  ```css
  filter: blur(5px); /* 5 pixels of blur */
  ```

  ### 3. ``brightness()``: Adjusts the brightness of the element. Values greater than 1 increase brightness, and values less than 1 decrease it.

  ```css
  filter: brightness(1.5); /* 150% brightness */
  ```

  ### 4. ``contrast()``: Adjusts the contrast of the element. Similar to brightness(), values greater than 1 increase contrast, and values less than 1 decrease it. 

  ```css
  filter: contrast(0.8); /* 80% contrast */
  ```

  ### 5. ``saturate()``: Increases or decreases the saturation of the element. Values greater than 1 increase saturation, and values less than 1 desaturate it.

  ```css
  filter: saturate(2); /* Double saturation */
  ```

  ### 6. ``hue-rotate()``: Rotates the hues of the element. Values are in degrees.

  ```css
  filter: hue-rotate(90deg); /* 90-degree hue rotation */
  ```

  ### 7. ``invert()``: Inverts the colors of the element. A value of 1 (or 100%) inverts completely. 

  ```css
  filter: invert(0.7); /* 70% color inversion */
  ```

  ### 8. ``opacity()``: Adjusts the opacity (transparency) of the element. Values range from 0 (completely transparent) to 1 (completely opaque).

  ```css
  filter: opacity(0.5); /* 50% opacity */
  ```

  ### 9. ``sepia()``: Applies a sepia tone effect to the element. A value of 1 (or 100%) is full sepia. 

  ```css
  filter: sepia(0.7); /* 70% sepia effect */ 
  ```

  ### 10. ``drop-shadow(offset-x offset-y blur-radius color)``: Adds a shadow to the element.

  ```css 
  filter: drop-shadow(10px 20px 50px violet);
  ```


## IMPORTANT TIPS - FILTERS - CSS3:


***CSS filters can be combined by separating them with spaces.***

***Filters can be applied to images, backgrounds, and even entire sections of a webpage.***

***Experiment with filter values to create unique visual effects.***

***Be cautious with excessive use of filters, as they can significantly alter the appearance of elements.***


## INTERVIEW QUESTIONS


  ### 1: What are CSS filters, and why are they used?
  
  `CSS filters are visual effects applied to HTML elements to modify their appearance. They are used to change properties like color, brightness, contrast, etc., without altering the underlying content.`

  ### 2: How can you create a blur effect on an element using CSS filters?

  `The blur() filter function is used for blurring. You can specify the blur amount in pixels, like filter: blur(5px);`

  ### 3: How can you combine multiple filters to create complex effects?
 
  `You can apply multiple filter functions to an element, separating them with spaces. For example: filter: blur(3px) grayscale(0.5) contrast(1.2).` 