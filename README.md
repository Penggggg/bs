# iteam-web
My personal Graduation Project -- iTeam. 我的个人项目-毕业设计之 iTeam

> iTeam是一个产品开发的团队协作工具。它具有项目管理、分享管理、实时通讯、账号管理等一些实用功能模块，能让我们在产品开发过程中增添消息传递的效率。项目的每名成员每天的任务、日程都非常清晰、详细地展现在面板中，并让数据进行实时更新，这让每个人都清晰地知道自己任务，各司其职。同时，我们能观察到项目的实时进度与问题，督促组员、组长尽快商讨并及时解决。这一切，都会让产品开发过程变得更好。

## 一、技术架构
iTeam将采用数据层+渲染层进行信息展示，并由web socket进行按需的、实时的、全量的信息推送，以确保信息的实时和有效性。

![前端数据流图](http://images2015.cnblogs.com/blog/896425/201701/896425-20170119233304375-1211886898.png)

### 为什么这样设计
#### 1. 分层
项目是以功能为维度进行架构分层的，具有**服务层、数据层、数据注入层、渲染层**。其中，数据层可以根据业务模块，进行再次更细颗粒度的划分。分层的好处在于：1. 能很大程度上增强某一功能、数据集的拓展性与维护度，易于应付需求变更和拓展；2. 层次之间依赖方向明显；3. 渲染层(此项目采用React组件)，能够对数据获取方式进行解耦，减低渲染组件对业务代码的糅合度，能在一定程度上提高组件的复用率。
#### 2. 数据层
把整个应用的数据集独立出来，并根据不同业务模块的细粒度划分，并提供**可订阅性**，是很有好处的。1. 能让数据进行共享，让View保持数据同步；2. 减轻组件逻辑，不掺杂数据获取方式的代码（此功能划分到数据注入层，见下文），以decorate的方式，提高组件的复用性；3. 减少组件冗余请求，即对单个数据集的多次不必要、重复的请求；4. 适合大量细粒度的数据更新。
#### 3. 数据注入层
数据注入层在功能上需要完成：1. 可订阅数据集的订阅；2. 提供数据变更接口。数据注入层是以decorate的方式实现的。该层意义在于，封装数据获取的逻辑，以高阶函数装饰器的形式，提高组件的复用率，并减轻渲染组件的逻辑。
##### /**注入首页图片的渐变轮播图 */
##### export let HocGradientBgHome = InjectImage( GradientBackground )('home')
##### /**注入其他图片的渐变轮播图 */
##### export let HocGradientBgOther = InjectImage( GradientBackground )('other')
#### 4. 数据接口触发
方式一、通过往View添加事件监听，在回调触发数据接口（如点击/输入）。方式二、通过react-router的onEnter进行数据层接口的调用。
***

## 二、语言\框架\库\工具选择

iTeam在语言上将采用TypeScript编写。以发挥强类型、泛型、开发提示的强大功能，尽可能减低代码的**运行出错率**，并使代码的复用性更好。

框架选择上将采用ReactJS。希望使项目轻便、响应迅速、减少不必要的渲染更新；

同时将采用RxJS进行**数据层**和全局状态的管理，和Http模块的封装。以达到**数据共享、数据同步、减少组件冗余请求**的效果，同时它的可订阅性与热数据也适合大量细粒度的数据更新；

**为什么不使用redux**
1. 单次调用dispatch都使所有connected的组件的mapStateToProps函数进行调用
2. 单次调用dispatch都是所有connected的组件shouldComponenent函数进行调用
这些由redux的机制而产生的‘缺点’，个人认为主要是大量无意义计算带来的性能消耗。因此吸收mobx的精髓，本项目是以按需、细粒度为原则进行数据订阅和优化的。

模块化方面采用webpack进行处理；

根据以上架构，iTeam在前端部分的采用框架/库/工具，将是以下列表的最新版。
* ReactJS (13.X)
* RxJS    (5.X)
* webpack (2.X)

***

## 三、其他（待定）

项目进入中后期会进行更细致的性能调优，如引入react-addon-Pref、chrome Timeline等，同时将学习并在项目使用基于webpack项目构建优化
