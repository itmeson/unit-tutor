A web app calculator to show unit conversion "picket-fence" calculations.

Depends on MathQuill, jQuery, Muuri, web-animations, nerdamer, and decimal.js.

Demo page hosted at https://itmeson.github.io/unit-tutor/

On loading a page, quantities and conversions can be preset on the page using commands like this:

```
addAConversion("100 \\frac{cm}{m}");
addAConversion("2.54 \\frac{cm}{in}");
addAConversion("12 \\frac{in}{ft}");
addAConversion("5280 \\frac{ft}{mi}");
addAConversion("3600 \\frac{s}{hr}");
addAQuantity("30 \\frac{m}{s}");
```

Insert new conversion factors and quantities using the + marks.
Edit conversion factors using the Edit function.
Delete using the delete button.
Switch to the reciprocal of the factor using "Shift-Click".

Put a row of factors into the picket, then calculate to get the result.


Bugs to fix:
 * Parsing to and from latex sometimes unpredictable (loses slashes, adds slashes, spaces mess it up, \cdot messes it up)
 * ~~Setting and clearing focus on edit is unreliable~~
 * ~~Muuri sort settings cleaned up so layout works correctly~~
 * ~~Why do the tiles sit on top of the header? Why can't I get them to float below the header?~~
 * Make an SVG equals button for the picket
 * Prevent drag from putting focus on the mathquill item

Features to add:
 * Display cancelling unit factors
 * Add quantity type labels
 * Results automatically identified by quantity type if a known type exists
 * Adding conversion factors draws from a specified list of known conversions
 * Disable editing of known conversion factors
 * Tutorial mode, quiz mode, open calculator mode
 * Embed with graphs and other widgets
 * Use Desmos, use in Desmos
 * Ability to add new picket rows
 * Ability to duplicate a card
 * Mobile friendly editing

Desirable refactoring?
 * Learn how packaging is supposed to work so you don't have to distribute decimal, nerdamer, and mathquill
 * Reduce number of dependencies
 * Abstract the functions better (less repetition)
 * Put more of the card in the template, reduce boilerplate JS required to build new card
 * How best to arrange for someone who wants to build their own pages?
 * Nicer looking








