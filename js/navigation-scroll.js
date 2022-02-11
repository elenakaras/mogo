import { HeaderMenu } from './header-menu.js';

export class NavigationScroll {

  static get navLinkCssClassActive() {
    return 'active';
  }

  constructor(navLinkNodes) {
    // создаём навигационные объекты
    const navigationObjects = this.#createNavigationObjects(navLinkNodes);

    // при первом запуске странице проверям навигационные объекты
    this.#checkNavigationObjects(navigationObjects, navLinkNodes);

    window.addEventListener('scroll', (event) => {

      // при скролле странице проверям навигационные объекты
      this.#checkNavigationObjects(navigationObjects, navLinkNodes);
    });

  }

  #addActiveClassOnlyNavLinkNode(onlyNavLinkNode, navLinkNodes, cssClassActive) {
    for (const navLinkNode of navLinkNodes) {
      navLinkNode.classList.remove(cssClassActive);
    }
    onlyNavLinkNode.classList.add(cssClassActive);
  }

  #checkNavigationObjects(navigationObjects, navLinkNodes) {
    for (const navigationObj of navigationObjects) {

      const {navLinkNode, sectionNode} = navigationObj;
  
      if (NavigationScroll.nodeInVisible(sectionNode)) { // если секция находится в области видимости экрана
        this.#addActiveClassOnlyNavLinkNode(navLinkNode, navLinkNodes, NavigationScroll.navLinkCssClassActive);
      }
    }
  }

  static getRectWindowY() {
    const heightWindow = document.documentElement.clientHeight;
    const rectWindowY = {
    top: window.pageYOffset,
    bottom: window.pageYOffset + heightWindow,
    height: document.documentElement.clientHeight
    }; // верхний/нижний край экрана
    return rectWindowY;
  }

  static nodeInVisible(node) {
    const rectWindowY = NavigationScroll.getRectWindowY(); // верхний/нижний край экрана
    const rectNode = node.getBoundingClientRect();
    const rectNodeY = {
      bottom: rectNode.bottom + window.pageYOffset,
      top: rectNode.top + window.pageYOffset
    }; // верхний/нижний край проверяемого элемента на экране

    const boolBottom = rectNodeY.top < rectWindowY.bottom; // элемент находится ниже нижнего края окна
    const boolTop = rectNodeY.bottom > rectWindowY.top;

    return boolBottom && boolTop;
  }

  #createNavigationObjects(navLinkNodes) {
    const navigationObjects = [];

    for (let i = 0; i < navLinkNodes.length; i++) {
      const navLinkAndSection = this.#getNavLinkAndSection(navLinkNodes[i], 'data-href');
      navigationObjects.push(navLinkAndSection);
    }

    return navigationObjects;
  }

  #getNavLinkAndSection(navLinkNode, dataHrefAttr) {
    const dataHrefSelector = navLinkNode.getAttribute(dataHrefAttr);
    const sectionNode = document.querySelector(dataHrefSelector);
    
    return {
      navLinkNode: navLinkNode,
      sectionNode: sectionNode
    };
  
  }

}

