js-keyboard
===========

A javascript virtual keyboard derived from http://www.greywyvern.com/code/javascript/keyboard, with a number of additions:
* Keyboard support,
* Many phonetic layouts (See note below for phonetic layouts),
* Tooltips/hints for keys in all Indian languages (using html title attribute when user hovers over a key),
* Audio pronunciation for devanagari phonetic layouts (This makes it a speaking keyboard. Works only on Chrome though).
* Configurable list of keyboard names in the dropdown instead of default all 92 keyboard layout names.

NOTE: Using phonetic layouts, you can easily type in any language on standard english keyboards. Coupled with tooltips, you can type in languages you don't even know. A live demo can be seen on https://apps.facebook.com/mothertounge/

Quick start: Take a look at the file web/test_keyboard.html for a sample usage. All you need to do is include the keyboard.css, and keyboard.js in your html. Then for any text field (input type=text) or textarea, just set the class attribute to "keyboardInput": class="keyboardInput". For a restricted list of language options in the dropdown, just set the field VKI_LANGUAGES to a list of keyboard layout names before including the keyboard.js. The usage is depicted in test_keyboard.html.

Advanced usage: Look at the index.html which allows you to update facebook status, and comments in one of the 92 languages available in the keyboard.js including some special unicode symbols.
