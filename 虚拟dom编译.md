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