import "@babel/polyfill"
import sum from '@/A'
import average from '@/B'

import '@/assets/reset.min.css'
import '@/index.less'

console.log(sum(10, 20, 30, 40));
console.log(average(10, 20, 30, 40));



new Promise(()=>{})


// js中处理静态图片, 需要先基于Es6Module规范导入进来,这样webpack才会对此图片进行打包

import infoImg from '@/assets/images/inforec-20221127.jpg'

let img = new Image()
img.src = infoImg
console.log(img,infoImg);
