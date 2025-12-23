import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  lang: "zh-Hans",
  // 站点的标题
  title: "浪淘沙的个人博客",
  // 站点的描述。
  description: "浪淘沙的编程学习之旅",
  // 在页面 HTML 的 <head> 标签中呈现的其他元素
  head: [
    // 站点图标
    ["link", { rel: "icon", href: "./favicon.ico" }]
  ],
  lastUpdated: true,
  // 主体配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: "前端", link: "/frontEnd/01-html" },
      { text: "后端", link: "/backEnd/01-java" },
      { text: "需求实现", link: "/进阶/需求实现" },
      { text: "官方网站", link: "/进阶/官方网站" },
      // {
      //   text: "xmind",
      //   link: "/components/test"
      //   // items: [{ text: "html", link: "http://localhost:5173/blog/test.html" }]
      // },
      {
        text: "css工具集",
        items: [
          { text: "抖动特效", link: "https://elrumordelaluz.github.io/csshake/" },
          { text: "css动画可编辑", link: "https://animista.net/play" },
          { text: "鼠标悬浮动画", link: "https://ianlunn.github.io/Hover/" },
          { text: "布条背景图生成器", link: "https://stripesgenerator.com/" },
          { text: "磨砂透明效果", link: "https://glassgenerator.netlify.app/" },
          { text: "波浪生成器1", link: "https://svgwave.in/" },
          { text: "波浪生成器2", link: "https://getwaves.io/" },
          { text: "圆角生成器", link: "https://9elements.github.io/fancy-border-radius/" },
          { text: "css三角形", link: "https://www.dute.org/css-arrow" },
          { text: "盒子阴影", link: "https://getcssscan.com/css-box-shadow-examples" },
          { text: "盒子阴影生成器", link: "http://cssbud.com/css-generator/css-box-shadow-generator/" },
          { text: "盒子发光发生器", link: "http://cssbud.com/css-generator/css-glow-generator/" },
          { text: "文本发光生成器", link: "http://cssbud.com/css-generator/css-text-glow-generator/" },
          { text: "文本下划线生成器", link: "http://cssbud.com/css-generator/css-underline-generator/" },
          { text: "文本阴影生成器", link: "http://cssbud.com/css-generator/css-text-shadow-generator/" },
          { text: "Css功能生成器", link: "https://www.cssportal.com/css-ribbon-generator/" }
        ]
      },
      {
        text: "在线工具",
        items: [
          { text: "favicon图标制作", link: "https://www.bitbug.net/" },
          { text: "正则表达式验证", link: "http://www.jsons.cn/reg/" },
          { text: "gsap动画库", link: "https://gsap.com/" },
          { text: "渐变颜色按钮", link: "https://gradientbuttons.colorion.co/" },
          { text: "元标签生成器", link: "https://webcode.tools/generators/meta-tags" },
          { text: "视频转gif", link: "https://ezgif.com/" },
          { text: "在线代码编辑器", link: "https://codesandbox.io/" },
          { text: "在线代码编辑器", link: "https://jsbin.com/" }
        ]
      }
    ],
    // 侧边栏配置
    sidebar: {
      "/frontEnd/": [
        {
          text: "目录",
          items: [
            { text: "HTML", link: "/frontEnd/01-html" },
            { text: "CSS", link: "/frontEnd/02-css" },
            { text: "JavaScript", link: "/frontEnd/03-JavaScript" },
            { text: "jQuery", link: "/frontEnd/04-jQuery" },
            { text: "Git", link: "/frontEnd/07-git" },
            { text: "Echarts", link: "/frontEnd/05-echarts" },
            { text: "Three", link: "/frontEnd/06-threeJs" },
            { text: "高德地图", link: "/frontEnd/08-高德地图" }
          ]
        }
      ],
      "/backEnd/": [
        {
          text: "目录",
          items: [
            { text: "Java", link: "/backEnd/01-java" },
            { text: "maven", link: "/backEnd/02-maven" },
            { text: "springBoot", link: "/backEnd/03-spring" }
          ]
        }
      ]
    },
    logo: "./logo.svg",
    siteTitle: "学无止境！！！",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            displayDetails: "显示详细列表",
            footer: {
              navigateText: "切换",
              selectText: "选择",
              closeText: "关闭"
            }
          }
        }
      }
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    outline: {
      level: [2, 3],
      label: "页面导航"
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      }
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2023-${new Date().getFullYear()} 浪淘沙`
    },
    socialLinks: [{ icon: "github", link: "https://github.com/123liangge/blog" }]
    // socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }]
  },
  markdown: {
    // 开启代码块的行号
    lineNumbers: true
  }
});
