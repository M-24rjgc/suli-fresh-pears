# 宁陵酥梨农文旅融合网站技术规格

## 项目定位

本项目是基于 React + TypeScript + Vite 构建的单页官网，围绕“宁陵酥梨”实现品牌展示、产品销售引导、农文旅内容传播与用户咨询转化。

## 技术栈

### 前端框架
- React 19
- TypeScript 5
- Vite 7

### 样式与动效
- Tailwind CSS 3
- Framer Motion
- lucide-react 图标库

### 组件能力
- Radix UI（按需能力）
- 业务自定义组件（`src/sections` + `src/components`）

## 页面与模块结构

### 页面骨架
- `Navbar`：顶部导航 + 购物车入口
- `HeroSection`：首屏轮播与核心 CTA
- `Announcement`：滚动公告
- `AboutSection`：产地与品牌介绍
- `FreshPearsSection`：鲜果商品展示
- `ProcessedProductsSection`：深加工产品展示
- `AIRecommendationSection`：问卷式智能推荐
- `TourismSection`：景点与文旅弹窗
- `PromotionsSection`：限时活动与倒计时
- `NewsSection`：品牌资讯
- `ContactSection`：联系方式与地图跳转
- `Footer`：底部链接与版权

### 交互组件
- `CartDrawer`：购物车抽屉
- `ScrollToTop`：返回顶部

## 数据与状态策略

- 当前版本采用前端静态数据驱动（本地数组）。
- `App.tsx` 统一维护购物车状态：
  - 新增商品：按 `id` 合并数量
  - 更新数量：数量小于等于 0 时移除
  - 汇总：实时计算件数

## 关键实现说明

### AI 推荐模块
- 通过问卷组合键匹配推荐结果。
- 推荐商品包含唯一 `id`，保证加入购物车不会串单。

### 限时特惠模块
- 倒计时基于真实截止时间戳（非硬编码初始值）。
- 秒杀库存展示采用“已售件数 + 占比”双表达，语义一致。

## 目录结构（当前）

```text
app/
├── src/
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ui/
│   ├── lib/
│   │   └── utils.ts
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Announcement.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FreshPearsSection.tsx
│   │   ├── ProcessedProductsSection.tsx
│   │   ├── AIRecommendationSection.tsx
│   │   ├── TourismSection.tsx
│   │   ├── PromotionsSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
└── public/
    └── images/
```

## 构建与运行

- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview`
- 代码检查：`npm run lint`

## 后续扩展建议

- 将产品/资讯迁移为 CMS 或后端 API 驱动。
- 增加下单流程（地址、支付、订单追踪）。
- 为 AI 推荐模块增加埋点与转化分析。
