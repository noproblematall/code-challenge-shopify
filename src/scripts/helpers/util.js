export const debounce = (...args) => {
  const [func, wait, immediate] = args;
  let timeout;

  return function exec() {
    const context = this;
    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/** 
  This handles a weird edge case caused by the theme editor.
  When customizing a theme, for some reason HTML comments are injected
  into templates, breaking the response data. This means we need to
  remove the comments and parse it back into JSON format, allowing for
  the data to load properly when the theme editor is open.

  @param data The response to check.
*/
export const parseDataForEditor = (data) => {
  if (typeof data === 'string') {
    const parsed = data.replace(/<!--[\s\S]*?-->/g, '');

    try {
      return JSON.parse(parsed);
    } catch (error) {
      return false;
    }
  }

  return data;
};
