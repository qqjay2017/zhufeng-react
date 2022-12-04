import React from "react";

/**
 * 一般来说,内置的属性都是不可枚举的,自定义的属性都是可枚举的
 * Object.defineProperty()可以设定可枚举性
 */

/**
 * 封装一个对象迭代方法
 * 基于传统的for/in循环,会存在一些弊端
 * 1. 性能较差,既可以迭代私有的,也可以迭代公有(原型链上的)的
 * 只能迭代可枚举,非symbol类型的属性
 * 
 * 解决思路: 获取对象所有的私有属性,不论是否可枚举,不论类型
 * 
 * Object.getOwnPropertyNames(arr) -> 获取对象非Symbol类型的私有属性,无论是否可枚举
 * Object.getOwnPropertySymbols(arr) ->  获取对象Symbol类型的私有属性,无论是否可枚举
 * 两个拼在一起
 * 或者基于es6中的Reflect.ownKeys代替上述操作,不兼容ie
 * Reflect.ownKeys(arr)  就可以搞定
 */


const each = function (obj,callback){
  if(obj === null|| typeof obj !=="object"){
    throw new TypeError('obj is not a object')
  }
  if(typeof callback !=='function'){
    throw new TypeError('callback is not a function')
  }
  let keys = Reflect.ownKeys(obj)
  keys.forEach(key=>{
    let value = obj[key]
    callback(value,key)
  })
}
Array.prototype.BB = 200
let arr = [10,20]
arr[Symbol('AA')]=100


each(arr,(value,key)=>{
  console.log(value,key);
})



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


export function render(virtualDom,container){
  console.log(virtualDom,'virtualDom');
  let {type,props} = virtualDom
  if(typeof type ==='string'){ // 标签名,动态创建标签
    let ele = document.createElement(type)
    each(props,(value,key)=>{
      if(key ==='className'){
        ele.className = value
        return  
      }
      if(key ==='style'){
       each(value,(val,attr)=>{
        ele.style[attr] = val;
       })
       return
      }
      if(key==='children'){
        let children = value
        if(children.length ===1){
          children = [children]
        }
        children.forEach(child=>{
          // 子节点是文本节点,直接插入
          if( /^(string|number)$/.test(typeof child ) ){
            ele.appendChild(document.createTextNode(child))
            return  
          }
          render(child,ele)
        })

        return 
      }
      
      ele.setAttribute(key,value)
      // ele[key] = value
    })
    container.appendChild(ele)
  }
}