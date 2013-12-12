js-keyboard
===========

A javascript virtual keyboard derived from http://www.greywyvern.com/code/javascript/keyboard, with a number of additions:
* keyboard support,
* many phonetic layouts (See note below for phonetic layouts),
* tooltips/hints for keys in all Indian languages,
* audio hints for devanagari phonetic layouts.
* Can configure list of keyboards in the dropdown instead of default all

NOTE: Using phonetic layouts, you can easily type in any language on standard english keyboards. Coupled with tooltips, you can even type in languages you don't even know. A live demo can be seen on https://apps.facebook.com/mothertounge/

Quick start: Take a look at the file web/test_keyboard.html for a sample usage. All you need to do is include the keyboard.css, keyboard.js in your html. For any text field (input type=text) or textarea, just set the class attribute to keyboardInput: class="keyboardInput". For a restricted list of language options in the dropdown, just set the field VKI_LANGUAGES to a list of keyboard layout names before including the keyboard.js. The usage is depicted in test_keyboard.html.

Advanced usage: Look at the index.html which allows you to update facebook status, and comments in many languages.
