## 创建虚拟dom

```jsx
<div>
  <h1>123</h1>
</div>
```

经过babel编译成

```jsx
"use strict";

/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "123"));
```

##### createElement

第一个参数,componentType,第二个参数props ,第三个参数 children

createElement() 返回一个对象,就是虚拟dom对象,(JSX元素,JSX对象)

```
$$typeof
type
props
  children 数组或者对象,没有子节点就没有这个属性
ref
key


```

## 创建真实dom