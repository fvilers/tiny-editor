# tiny-editor

A tiny HTML rich text editor written in vanilla JavaScript

## Goal

Create a less than 5 Kb (compressed) library that enables a HTML element to be used as a rich text editor in plain old vanilla JavaScript.

## Support

If you use and like this library, feel free to support my Open Source projects.

[![donate](https://www.paypalobjects.com/en_US/BE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JZ26X897M9V9L&currency_code=EUR)

## How to install

```
npm install tiny-editor
```

or load the bundle file directly at the end of your HTML document.

```
<script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
```

## How to use

1. Reference the editor library in your HTML document
2. Add a `data-tiny-editor` attribute to the HTML element you want to transform into an editor

## How to dynamically create an editor

Use the exported function `window.__tinyEditor.transformToEditor()` which take as the first argument the DOM element (usually a `<div>`) that you want to transform to an editor. Refer to the `/public/index.html` for an example.

## How to extract the formatted text

Listen for the `input` event on the editor HTML element.

```
document
  .querySelectorAll('[data-tiny-editor]')
  .forEach(editor =>
    editor.addEventListener('input', e => console.log(e.target.innerHTML)
  )
);
```

## How to customize

There are various options that can be used to customize how the Tiny Editor will be rendered. By default, every options are enabled. You can disable an option using data attributes.

For example, you can remove the bold format button using the following attribute:

```
<div data-tiny-editor data-bold="no"></div>
```

### Options

- `data-formatblock="no"`: remove the styles drop down list
- `data-bold="no"`: remove the bold button
- `data-italic="no"`: : remove the italic button
- `data-underline="no"`: remove the underline button
- `data-fontname="no"`: remove the font drop down list
- `data-forecolor="no"`: : remove the text color button
- `data-justifyleft="no"`: remove the left align button
- `data-justifycenter="no"`: remove the center align button
- `data-justifyright="no"`: remove the right align button
- `data-insertorderedlist="no"`: remove the numbered list button
- `data-insertunorderedlist="no"`: remove the bulleted list button
- `data-outdent="no"`: remove the decrease indent button
- `data-indent="no"`: remove the increase indent button
- `data-remove-format="no"`: remove the clear formatting button
- `data-autofocus="no"`: remove autofocus from the editor

## Supported browsers

Modern browser (Chrome, Firefox, Edge,...) are supported. Tiny Editor doesn't work on Internet Explorer.
