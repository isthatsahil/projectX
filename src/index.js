/**
 * setState并不是单纯异步或者是同步的，它的表现会因为调用场景的不同而不同：
  ### 异步

  - 在react钩子函数中也就是我们说的生命周期函数里是setState异步的
  - 还有合成事件也就是我们定义的函数，setState也是异步的。

  ### 同步

  - 而在setTimeout、setInterval等函数中，包括在DOM原生事件中，setState都是同步的。
  （ setTimeout 破坏批量更新 ）

  导致这种差异的原因，是因为react的事务机制和更新机制的工作方式决定的。

  根据事务机制，在源码中这个变量为`isBatchingUpdates`，在执行`react`钩子函数和合成事件之前，这个变量都会被`react`修改成`true`,当这个变量为`true`时，`setState`就不会生效，当钩子函数或者合成事件执行完毕之后，这个变量会被设置为`false`,此时`setState`才会生效，

  `isBatchingUpdates`就好像一把锁，在`isBatchingUpdates`的约束下`setState`只能是异步的。
  但是当遇到`setTimeout`时，事情就会有点不同，`isBatchingUpdates`的约束对`setTimeout`内部的执行逻辑完全没有约束能力,这是因为`setTimeout`就是异步的，当异步函数开始执行的时候，同步任务早就结束了，`isBatchingUpdates`早就被设置为了`false`。
  批量更新，每来一个`setState`，就会把他塞进一个队列里面，最后再合并相同任务，最后只针对需要更新的`state`进行操作
 */

import React from "react";
import ReactDOM from "react-dom";

// 类式组件
class ClassCount extends React.Component {
  constructor(props) {
    super(props);
    // 使用了类的方式保有状态
    // 假如是函数呢?
    this.state = {
      number: 0
    };
  }
  handlerClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        // 在类式组件里，setTimeout 里面 setState都是同步的
        this.setState({ number: this.state.number + 1 });
      });
    }
    // 每次点击加 5
    console.log(this.state.number);
  };
  render() {
    return (
      <div>
        {this.state.number}
        <button onClick={this.handlerClick}>num++</button>
      </div>
    );
  }
}

// 函数式组件
function FunctionCount() {
  // 无状态
  const [num, setNumber] = React.useState(0);
  const handlerClick = () => {
    for (let i = 0; i < 5; i++) {
      // setTimeout(() => {
      //   setNumber(num + 1);
      // 一直会打印 0
      //   console.log(num);
      // }, 500);
      setTimeout(() => {
        setNumber((num) => num + 1);
      });
    }
    // 每次点击加 5
    console.log(num);
  };
  return (
    <div>
      {num}
      <button onClick={handlerClick}>num++</button>;
    </div>
  );
}

const App = () => {
  return (
    <>
      类式组件
      <ClassCount />
      函数式组件
      <FunctionCount />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// const elementVNode = h('div', null, h('span'))
