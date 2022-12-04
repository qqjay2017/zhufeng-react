import React from "react";

/**
 * 创建虚拟dom对象
 * @param ele
 * @param props
 * @param children
 */
export function createElement(ele, props, ...children) {
  let virtualDom = {
    $$typeof: Symbol("react.element"),
    type: null,
    ref: null,
    key: null,
    props: {},
  };
  let len = children.length;
  virtualDom.type = ele;
  if (props !== null) {
    virtualDom.props = {
      ...props,
    };
  }
  if (len === 1) {
    virtualDom.props.children = children[0];
  }
  if (len > 1) {
    virtualDom.props.children = children;
  }

  return virtualDom;
}

function JsxHandle() {
  const element =  createElement(
    "div",
    {},
    createElement("h1", {}, '1'),
    createElement("h1", {}, '2')
  );

    console.log(element,'element');
  return element
}


export default JsxHandle;
