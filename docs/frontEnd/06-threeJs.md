# Three.js

## 一、初识

1、three.js官网

[three](https://threejs.org/)

[three中文网](http://webgl3d.cn/)

[其他](https://www.three3d.cn/)

[仓库地址](https://github.com/mrdoob/three.js)

2、简介

Three.js 是一个开源的应用级 3D JavaScript 库，可以让开发者在网页上创建 3D 体验。Three.js 屏蔽了 WebGL的底层调用细节，让开发者能更快速的进行3D场景效果的开发。

3、应用场景

游戏开发、产品展示、物联网、数字孪生、智慧城市园区、机械仿真、建筑可视化、全景看房、地理信息系统

## 二、起步

### 2.1 安装

```
npm install --save three
```

### 2.2 创建一个场景

概念：场景（scene）、相机（camera）和渲染器（renderer）

```js
// 导入
import * as THREE from 'three'
// 创建3D场景对象Scene
const scene = new THREE.Scene()
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(
  45, // FOV视角：在显示器上看到的场景的范围，单位是角度
  window.innerWidth / window.innerHeight, // aspect ratio宽高比
  0.1, // near近截面：最近看到的距离
  1000 // far远截面：最远看到的距离
)
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer()
// 定义threejs输出画布的尺寸(单位:像素px)
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染到dom元素里
document.body.appendChild(renderer.domElement)
```

### 2.3 创建几何体

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
// 将网格添加到场景中
scene.add(cube)
```

### 2.4 渲染

```js
// 设置相机位置
camera.position.z = 5
// 目标观察点
camera.lookAt(0, 0, 0)
// 渲染场景
function animate() {
  //  渲染下一帧的时候就会调用animate函数
  requestAnimationFrame(animate)
  // 旋转
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  // 渲染
  renderer.render(scene, camera)
}
animate()
```

## 三、基础

### 3.1 坐标辅助器与轨道控制器

① 坐标辅助器，红色为x轴，绿色为y轴，蓝色为z轴,[详见](https://threejs.org/docs/index.html#api/zh/helpers/ArrowHelper)

```js
// AxesHelper：辅助观察的坐标系，参数为坐标长度
const axesHelper = new THREE.AxesHelper(150)
scene.add(axesHelper)
```

② 轨道控制器，[详见](https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls)

```js
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼的惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 设置转动速度
controls.autoRotate = true
// 更新控制器。必须在摄像机的变换发生任何手动改变后调用
controls.update()
```

### 3.2 几何体基本操作

[详见](https://threejs.org/docs/index.html#api/zh/core/Object3D)

① 物体位移与缩放

```js
// 创建网格
const cube = new THREE.Mesh(geometry, material)
// 几何体的位移
// cube.position.y = 2
cube.position.set(2, 0, 0)
// 缩放
cube.scale.set(2,2,2)
```

② 父子元素

```js
// 创建父元素
const faCube = new THREE.Mesh(geometry, material)
// 创建子元素
const cube = new THREE.Mesh(geometry, material)
// 将子元素添加到父元素中
faCube.add(cube)
// 将网格添加到场景中
scene.add(faCube)
```

注意：子元素的坐标相对于父元素的坐标

③ 物体旋转

```js
//直接设置旋转属性，例如围绕x轴旋转90度
cube.rotation.x = -Math.PI/2
//围绕x轴旋转45度
cube.rotation.set(-Math.PI / 4, 0, 0, "XZY");
```

### 3.3 屏幕自适应

① 自适应屏幕大小

```js
// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
```

②  控制场景全屏

```js
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //   双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //   退出全屏，使用document对象
    document.exitFullscreen();
  }
});
```

### 3.4 调试器与编辑器

① 调试器 -gui：可以快速创建控制三维场景的UI交互界面，[详见](https://lil-gui.georgealways.com)

② 编辑器 https://threejs.org/editor/

## 四、相机

## 五、灯光

## 六、几何体

### 4.1 创建几何体

**缓冲类型几何体`BufferGeometry`**：矩形平面`PlaneGeometry`、长方体`BoxGeometry`、球体`SphereGeometry`都是基于[BufferGeometry (opens new window)](https://threejs.org/docs/index.html?q=BufferGeometry#api/zh/core/BufferGeometry)类构建的。

1. 创建一个空的几何体

   ```js
   const geometry = new THREE.BufferGeometry()
   ```

2. 创建几何体顶点并设置顶点属性

   ```js
   // 创建顶点数据32位浮点数数组,tips:顶点是有顺序的，逆时针为正面
   const vertices = new Float32Array([
     -1.0,-1.0,0.0, // 第一个点的xyz轴位置
     1.0,-1.0,0.0, // 第二个点的xyz轴位置
     1.0,1.0,0.0, // 第三个点的xyz轴位置
     -1.0,1.0,0.0 // 第四个点的xyz轴位置
   ])
   // 设置顶点属性
   geometry.attributes.position = new THREE.BufferAttribute(vertices, 3)
   ```

3. 创建索引(顶点位置)数组--用于顶点复用(合并)

   ```js
   const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
   geometry.setIndex(new THREE.BufferAttribute(indices, 1))
   ```

### 4.2 模型渲染

- 点模型

  ```js
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 0.1, //点对象像素尺寸
  })
  const points = new THREE.Points(geometry, pointsMaterial) //点模型对象
  ```

- 线模型

  ```js
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }) //线模型材质
  const line = new THREE.Line(geometry, lineMaterial) //线模型对象
  // const line = new THREE.LineLoop(geometry, lineMaterial) // 闭合线条
  // const line = new THREE.LineSegments(geometry, lineMaterial)// 非连续的线条
  ```

- 网格模型

  ```js
  const meshMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // side: THREE.FrontSide, //默认只有正面可见
    side: THREE.DoubleSide, // 双面显示
    // side: THREE.BackSide, //设置只有背面可见
    wireframe: true, // 线框模式
  })
  const mesh = new THREE.Mesh(geometry, meshMaterial)
  ```

### [4.3 常见几何体](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry)

## 七、材质

## 八、贴图