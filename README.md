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

It's an extensive card plugin to create admin layout with minimal angular knowledge, below images are show what kind of layouts you can create using this plugin.

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

## API

#### guru-header & guru-footer `[Component]`

| Position   | Description                                                  | Type                                             | Default     |      |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------ | ----------- | ---- |
| [position] | position for header & footer; **above-fixed** => fixed header/footer on top/bottom of content & sidebar; **below-fixed** => fixed header/footer on top/bottom of content; **below-static** => static header/footer  on top/bottom of content | 'above-fixed' \| 'below-fixed' \| 'below-static' | above-fixed |      |

#### guru-content `[Component]`

| Position         | Description                                  | Type    | Default |      |
| ---------------- | -------------------------------------------- | ------- | ------- | ---- |
| [enableScroller] | Enable Perfect Scrollbar plugin for scroller | boolean | true    |      |

#### guru-sidebar-left & guru-sidebar-right `[Component]`

| Position       | Description                                                  | Type                                                  | Default                      |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------- | ---------------------------- |
| [width]        | Width of sidebar                                             | string                                                | 200px                        |
| [autoFocus]    | Whether the sidebar should focus the first focusable element automatically when opened | boolean                                               | false                        |
| [disableClose] | Whether the sidebar can be closed with the escape key or by clicking on the backdrop. | boolean                                               | false                        |
| [mode]         | Mode of sidebar; one 'over', 'push' or 'side'.               | 'over' \| 'push' \| 'side'                            | side                         |
| [opened]       | Whether the sidebar is opened. We overload this because we trigger an event when it starts or end. | boolean                                               | true                         |
| [guruXs]       | Screen-size max-width equals 599.99px                        | { mode: 'over' \| 'push' \| 'side', opened: boolean } | undefined                    |
| [guruSm]       | Screen-size min-width equals 600px and max-width equals 959.99px | { mode: 'over' \| 'push' \| 'side', opened: boolean } | undefined                    |
| [guruMd]       | Screen-size min-width equals 960px and max-width equals 1279.99px | { mode: 'over' \| 'push' \| 'side', opened: boolean } | undefined                    |
| [guruLg]       | Screen-size min-width equals 1280px and max-width equals 1919.99px | { mode: 'over' \| 'push' \| 'side', opened: boolean } | {mode: 'side', opened: true} |
| [guruXl]       | Screen-size min-width equals 1920px                          | { mode: 'over' \| 'push' \| 'side', opened: boolean } | undefined                    |
| (openedChange) | Event emitted when the sidebar open state is changed.        | EventEmitter<boolean>                                 |                              |
| (openedStart)  | Event emitted when the sidebar has started opening.          | EventEmitter<void>                                    |                              |
| (closedStart)  | Event emitted when the sidebar has started closing.          | EventEmitter<void>                                    |                              |
| open()         | Open the sidebar.                                            | void                                                  |                              |
| close()        | Close the sidebar.                                           | void                                                  |                              |
| toggle()       | Toggle this sidebar.                                         | void                                                  |                              |

