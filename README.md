---
typora-root-url: ./
---

# Guru Plugin

It's a **Angular Admin Panel UI Kit** consisting of multiple base components and utilities to enhance [ng-zoro-antd](https://ng.ant.design/docs/introduce/en "ng-zoro-antd")

## Why Guru Plugin

If you have decided to use an **admin template** for creating the back-end of your website and don't want to spend money then **Guru Plugin** is good choice to build admin panel on your own with minimal angular knowledge.

**Ready made admin template** is **bundled with large size of assets** and different **ready to use app's** which are all **not used in real time** but it occupy a major size in application production bundle.

This Kind of ready made **admin template not compatible with angular UI Kits** Like [ng-zoro-antd](https://ng.ant.design/docs/introduce/en "ng-zoro-antd"). So we have to **customize both admin template and UI Kits** even you are using admin template. So Guru Plugin comes with minimal bundle using [ng-zoro-antd](https://ng.ant.design/docs/introduce/en "ng-zoro-antd") UI Kits to overcome this issues by doing some minimal customization.

## Available Plugins

#### **1. Guru Card**

It's an extensive card plugin to create admin layout with minimal angular knowledge, bellow images are show what kind of layouts you can create using this plugin.

##### Layout 1 : Header & Footer Above

```html
<guru-card>
  <guru-sidebar-left></guru-sidebar-left>
  <guru-header position="above-fixed"> </guru-header>
  <guru-content> </guru-content>
  <guru-footer position="above-fixed"> </guru-footer>
  <guru-sidebar-right></guru-sidebar-right>
</guru-card>
```

![](/docs/screenshots/type-1.JPG)

##### Layout 2 : Header Above & Footer Below

```html
<guru-card>
  <guru-sidebar-left></guru-sidebar-left>
  <guru-header position="above-fixed"> </guru-header>
  <guru-content> </guru-content>
  <guru-footer position="below-fixed"> </guru-footer>
  <guru-sidebar-right></guru-sidebar-right>
</guru-card>
```

![](/docs/screenshots/type-2.JPG)

##### Layout 3 : Header Below & Footer Above

```html
<guru-card>
  <guru-sidebar-left></guru-sidebar-left>
  <guru-header position="below-fixed"> </guru-header>
  <guru-content> </guru-content>
  <guru-footer position="above-fixed"> </guru-footer>
  <guru-sidebar-right></guru-sidebar-right>
</guru-card>
```

![](/docs/screenshots/type-3.JPG)

##### Layout 4 : Header & Footer Below

```html
<guru-card>
  <guru-sidebar-left></guru-sidebar-left>
  <guru-header position="below-fixed"> </guru-header>
  <guru-content> </guru-content>
  <guru-footer position="below-fixed"> </guru-footer>
  <guru-sidebar-right></guru-sidebar-right>
</guru-card>
```

![](/docs/screenshots/type-4.JPG)
