import { NavigationScroll } from './navigation-scroll.js';

export class HeaderScroll {
  static introNode = document.querySelector('.intro');
  static headerNode = document.querySelector('.header');
  #lastRectWindowY = null;

  static get headerFixedCssClass() {
    return 'header--fixed';
  }

  static get headerFixedCssClassActive() {
    return 'header--fixed_active';
  }


  constructor() {
    this.#addEventListenerScrollWindow();
  }

  #addEventListenerScrollWindow() {
    window.addEventListener('scroll', (event) => {
      const rectWindowY = NavigationScroll.getRectWindowY();
      const visibleIntroNode = NavigationScroll.nodeInVisible(HeaderScroll.introNode);
    
      if (visibleIntroNode) {
        HeaderScroll.headerNode.classList.remove(HeaderScroll.headerFixedCssClass);
      } else {
        HeaderScroll.headerNode.classList.add(HeaderScroll.headerFixedCssClass);
      }
    
    
      if (this.#lastRectWindowY !== null) {
        const direction = (rectWindowY.top < this.#lastRectWindowY.top) ? 'top' : 'bottom';
        
        if (direction === 'bottom' || direction === 'top' && visibleIntroNode) {
          HeaderScroll.headerNode.classList.remove(HeaderScroll.headerFixedCssClassActive);
        } else if (direction === 'top' && !visibleIntroNode) {
          HeaderScroll.headerNode.classList.add(HeaderScroll.headerFixedCssClassActive);
        }
    
      }
    
      this.#lastRectWindowY = rectWindowY;
    });
    
  }
}

