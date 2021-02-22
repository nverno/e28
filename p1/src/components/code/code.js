const createSpan = (txt, cls) => {
  let span = document.createElement('span');
  span.innerHTML = txt;
  span.className = cls;
  return span;
};

/* distribute classnames from parent elements to each individual letter,
 * wrapping each letter in a span */
export const parseElement = (ele, cname) => {
  if (ele.nodeName === 'SPAN') {
    cname = cname + ' ' + ele.className;
    return Array.from(ele.childNodes).reduce(
      (acc, e) =>
        acc.concat(
          parseElement(e, cname + (e.className ? ' ' + e.className : '')),
        ),
      [],
    );
  }

  /* debugger; */
  let nl = false;
  return Array.from(ele.textContent.split('')).map(l => {
    let cn;
    if (nl && l.match(/\s/)) {
      cn = 'skip';
    } else if (l === '\n') {
      nl = true;
      cn = 'return pending';
    } else {
      nl = false;
      cn = `${cname} pending`;
    }
    return createSpan(l, cn);
  });
};

const markSpaceAfterComments = nodes => {
  let comment = false;
  nodes.forEach(node => {
    if (comment && node.textContent.match(/\s/)) {
      node.classList.add('skip');
    } else if (node.classList.contains('hljs-comment')) {
      comment = true;
    } else {
      comment = false;
    }
  });
};

// Parse highlighted pre-highlighted code nodes
// Wraps individual characters in spans and adds special classes
// to mark returns, pending, and skips
export const parseCode = code => {
  let res = [];

  for (const node of code.childNodes) {
    if (node.className === 'hljs-comment') {
      node.classList.add('skip');
      res.push(node);
    } else {
      res = res.concat(parseElement(node, ''));
    }
  }

  markSpaceAfterComments(res);
  return res;
};
