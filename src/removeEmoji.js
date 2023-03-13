const removeEmoji = function (str) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/removeEmoji

  if (typeof str === 'string') {
    return str.replace(/(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/ugm, '');
  } else {
    console.log('Warning - removeEmoji - no string passed');
    return '';
  }
};

export default removeEmoji;