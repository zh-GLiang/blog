# SpringBoot

[spring](https://spring.io/)发展到今天已经形成了一种开发生态圈，Spring提供了若干个子项目，每个项目用于完成特定的功能。而我们在项目开发时，一般会偏向于选择这一套spring家族的技术，来解决对应领域的问题，那我们称这一套技术为spring全家桶。Spring家族旗下这么多的技术，最基础、最核心的是 SpringFramework，其他的spring家族的技术，都是基于SpringFramework的。

通过springboot可以快速的帮我们构建应用程序

## 一、项目创建

**需求**：基于SpringBoot的方式开发一个web应用，浏览器发起请求/hello后，给浏览器返回字符串“Hello World ~”

### 1.1 自动创建

**开发步骤**

1. 创建SpringBoot工程项目

   ![](./images/03-1.png)

2. 定义HelloController类，添加方法hello，并添加注解

   ![](./images/03-2.png)

3. 测试运行

​	点击运行，浏览器输入`http://localhost:8080/hello`

### 1.2 手动创建

## 二、配置文件

properties 是传统的配置格式，而 YAML是更简洁的结构化配置格式，两者核心功能一致，spring Boot 默认识别`src/main/resources/application.yml`（核心配置文件），优先级高于`application.properties`（若同时存在，YAML 会覆盖 properties 同键配置）。

### 2.1 properties配置文件

文件地址：`src/main/resources/application.properties`

[官方配置文档地址](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#appendix.application-properties)

**场景案例：**

- #### 配置 Spring Boot 核心参数

  Spring Boot 内置了大量自动配置（AutoConfiguration），而 properties 文件可以覆盖 / 定制这些默认行为

  ```sh
  # 服务器端口（默认8080）
  server.port=8081
  # 应用上下文路径
  server.servlet.context-path=/demo
  # 编码格式
  server.tomcat.uri-encoding=UTF-8
  # 日志级别
  logging.level.org.springframework=INFO
  logging.level.com.example.demo=DEBUG
  ```

- #### 自定义业务配置

  开发者可以在配置文件中定义业务相关的参数，比如接口地址、超时时间、开关等，代码中通过注解读取

- #### 环境差异化配置

  支持多环境配置（通过`spring.profiles.active`指定激活环境）开发环境、生产环境

- #### 配置第三方组件

  整合的所有第三方组件（数据库、Redis、MQ、MyBatis 等），都可以通过 properties 配置

### 2.2 yaml配置文件

文件地址：`src/main/resources/application.yaml`

备注：文件结尾为.yaml或.yml

YAML 的核心是**缩进 + 键值对 + 结构化**

**场景案例：**

- 配置 Spring Boot 核心参数

  ```yaml
  # 服务器配置
  server:
    port: 8081  # 端口（对应properties：server.port=8081）
    servlet:
      context-path: /demo  # 上下文路径（对应server.servlet.context-path=/demo）
    tomcat:
      uri-encoding: UTF-8  # 编码
  
  # 日志配置
  logging:
    level:
      org.springframework: INFO  # Spring框架日志级别
      com.example.demo: DEBUG   # 自定义包日志级别
  ```

- 配置第三方组件（数据库、Redis 等）

  ```yaml
  # 数据源配置（MySQL）
  spring:
    datasource:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/test?useSSL=false&serverTimezone=UTC
      username: root
      password: 123456
  
  # Redis配置
    redis:
      host: localhost
      port: 6379
      password:  # 空密码
      database: 0
      timeout: 5000ms  # 超时时间（支持单位：ms/s/m/h/d）
  ```

- 配置数组 / 集合（YAML 天然支持)

- 多环境差异化配置（激活指定环境)

  ##### 拆分多个 YAML 文件

  开发环境：`application-dev.yml`

  测试环境：`application-test.yml`

  生产环境：`application-prod.yml`

  在主配置`application.yml`中指定激活的环境：

  ```yaml
  spring:
    profiles:
      active: prod  # 激活生产环境（改为dev则用开发环境配置）
  ```

- 代码中读取 YAML 配置（和 properties 一致）

  ```java
  // @Value 读取单个配置
  public class AppConfig {
      // 读取简单配置
      @Value("${server.port}")
      private Integer port;
  
      // 读取数组（需用逗号分隔，YAML数组会自动转为逗号分隔的字符串）
      @Value("${app.allowed-ips}")
      private String[] allowedIps;
  
      // 读取带默认值的配置（配置不存在时用默认值）
      @Value("${app.retry-count:3}")
      private Integer retryCount;
  }
  
  // @ConfigurationProperties 批量绑定
  // 开启配置绑定（prefix指定YAML中的前缀）
  @ConfigurationProperties(prefix = "server")
  public class AppConfig {
      private Integer port;
  }
  ```

### 2.3 整合mybatis

## HTTP协议

### 2.1 概述

HTTP：Hyper Text Transfer Protocol(超文本传输协议)，规定了浏览器与服务器之间数据传输的规则。

特点：

- 基于TCP协议
- 基于请求-响应模型
- HTTP协议是无状态协议

### 2.2 请求协议

请求协议：浏览器将数据以请求格式发送到服务器包括：**请求行**、**请求头** 、**请求体**

**请求行**

请求方式 资源路径 版本

**常用请求头**

| 参数            |                             示意                             |
| :-------------- | :----------------------------------------------------------: |
| Host            |                       表示请求的主机名                       |
| User-Agent      |                          浏览器版本                          |
| Accept          | 表示浏览器能接收的资源类型，如text/*，image/*或者*/*表示所有 |
| Accept-Language |    表示浏览器偏好的语言，服务器可以据此返回不同语言的网页    |
| Accept-Encoding |      表示浏览器可以支持的压缩类型，例如gzip, deflate等       |
| Content-Type    |                      请求主体的数据类型                      |
| Content-Length  |                 数据主体的大小（单位：字节）                 |

**请求体**

存放请求参数

### 2.3 响应协议

响应的数据也分为3部分：**响应行**、**响应头** 、**响应体**

**响应行**：响应数据的第一行。响应行由 协议及版本 、 响应状态码 、 状态码描述 组成

常见状态码

| 状态码 |                             描述                             |
| ------ | :----------------------------------------------------------: |
| 1XX    | **响应中** --- 临时状态码。表示请求已经接受，告诉客户端应该继续请求或者如果已经完成则忽略 |
| 2XX    |       **成功** --- 表示请求已经被成功接收，处理已完成        |
| 3XX    | **重定向** --- 重定向到其它地方，让客户端再发起一个请求以完成整个处理 |
| 4XX    | **客户端错误** --- 处理发生错误，责任在客户端，如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等 |
| 5XX    | **服务器端错误** --- 处理发生错误，责任在服务端，如：服务端抛出异常，路由出错，HTTP版本不支持等 |

![](./images/03-3.png)

**响应头**：响应数据的第二行开始。格式为key：value形式

常见响应头

| key              |                            示意                            |
| ---------------- | :--------------------------------------------------------: |
| Content-Type     |      表示该响应内容的类型，例如text/html，image/jpeg       |
| Content-Length   |               表示该响应内容的长度（字节数）               |
| Content-Encoding |                表示该响应压缩算法，例如gzip                |
| Cache-Control    | 指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒 |
| Set-Cookie       |           告诉浏览器为当前页面所在的域设置cookie           |

**响应体**： 响应数据的最后一部分。存储响应的数据

### 2.4 协议解析

## 请求响应

### 3.1 请求

**简单参数**

接收

```java
@RestController
public class RequestControl {
    @RequestMapping("/simpleParam")
    public String simpleParam(String name, Integer age) {
        System.out.println(name + ":" + age);
        return "ok";
    }
}
```

参数映射

```java
@RestController
public class RequestControl {
    @RequestMapping("/simpleParam")
    //请求参数名和形参名不相同
    //@RequestParam中的required属性默认为true（默认值也是true），代表该请求参数必须传递，如果不传递将报错
    public String simpleParam(@RequestParam("name") String username, Integer age) {
        System.out.println(username + ":" + age);
        return "ok";
    }
}
```

**实体参数**

- 创建实体类

  ```Java
  // 创建实体类
  public class User {
      private String name;
      private Integer age;
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public Integer getAge() {
          return age;
      }
  
      public void setAge(Integer age) {
          this.age = age;
      }
  
      @Override
      public String toString() {
          return "User{" +
                  "name='" + name + '\'' +
                  ", age=" + age +
                  '}';
      }
  }
  ```

- 接收

  ```java
  @RequestMapping("/simplePojo")
      public String Pojo(User user){
          System.out.println(user);
          return "ok";
      }
  ```

**数组集合参数**

数组

```java
@RequestMapping("/arrParam")
    public String ArrParam(String [] hobby){
        System.out.println(Arrays.toString(hobby));
        return "ok";
    }
```

集合

```Java
@RequestMapping("/arrParam")
    public String ArrParam(@RequestParam List<String> hobby){
        System.out.println(hobby);
        return "ok";
    }
```

**日期参数**

```Java
@RequestMapping("/dataParam")
    public String dataParam(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime){
        System.out.println(updateTime);
        return "ok";
    }
```

**JSON参数**

```Java
// 要使用@RequestBody标识
@RequestMapping("/jsonParam")
    public String jsonParam(@RequestBody User user){
        System.out.println(user);
        return "ok";
    }
```

**路径参数**

通过请求URL直接传递参数，使用`{...}`来标识该路径参数，需使用 `@PathVariable` 获取路径参数，可传递多个路径参数

```java
@RequestMapping("/path/{id}")
    public String path(@PathVariable Integer id){
        System.out.println(id);
        return "ok";
    }
```

### 3.2 统一响应结果

统一响应结果封装类：

```java
public class Result {
    private Integer code ;//1 成功 , 0 失败
    private String msg; //提示信息
    private Object data; //数据 date

    public Result() {
    }
    public Result(Integer code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }

    public static Result success(Object data){
        return new Result(1, "success", data);
    }
    public static Result success(){
        return new Result(1, "success", null);
    }
    public static Result error(String msg){
        return new Result(0, msg, null);
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }
}
```

使用：

```java
@RequestMapping("/hello")
    public Result hello(){
        System.out.println("hello world~");
        return Result.success("hello world~");
    }
```

### 3.3 分层解耦