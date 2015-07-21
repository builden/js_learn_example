### 自动生成目录TOC，不是所有都支持
[TOC]

# 标题1
## 标题2
### 标题3

### 分隔符
***

### 无序列表 (- / *)
- 1
  - 1.1
  + 1.2
    - 1.2.1
* 2
- 3

### 有序列表
1. 行1
  1. 行1.1
1. 行2
1. 行3

### 引用
> 引用过来的文字

[Google]: http://www.google.com.hk "google title"
### 链接
[Baidu](http://www.baidu.com "title")

[Google Link][Google]

[Google]

### 图片
![loading](images/180.jpg "Optional title")

### 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### 指定编码语言的代码块
```js
// comments
var canvas = document.getElementById("canvas"); 
var context = canvas.getContext("2d"); 
```
```json
{
  num: 12,
  str: "string",
  arr: [1, 2, 3]
}
```

### Code
inner 'printf()' code

### Code Blocks
    if (true) {
      c = a + b;
    }

### 斜体
*single asterisks*

_single underscores_

### 粗体
**double asterisks**

__double underscores__

### 删除线
~~delete~~

### 注脚
这是一个注脚测试[^footer1]。
[^footer1]: 这是一个测试，用来阐释注脚。