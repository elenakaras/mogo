export class HeaderMenu {

  static navLinkNodes = document.querySelectorAll(".nav__link");
  static navToggleNode = document.querySelector(".nav-toggle");
  static navNode = document.querySelector(".nav");

  static get navToggleCssClassActive() {
    return 'nav-toggle_active';
  }

  static get navOpenCssClassActive() {
    return 'nav_open';
  }

  static get noScrollCssClass() {
    return 'no-scroll';
  }



  constructor() {
    HeaderMenu.navToggleNode.addEventListener("click", (event) => {
      if (this.#isActiveMenu(HeaderMenu.navToggleNode)) {
        // если есть класс
        this.#closeMenu(HeaderMenu.navToggleNode, HeaderMenu.navNode);
      } else {
        // иначе такого класса нету
        this.#openMenu(HeaderMenu.navToggleNode, HeaderMenu.navNode);
      }
    });

    for (const navLinkNode of HeaderMenu.navLinkNodes) {
      navLinkNode.addEventListener("click", (event) => {
        if (this.#isActiveMenu(HeaderMenu.navToggleNode)) {
          this.#closeMenu(HeaderMenu.navToggleNode, HeaderMenu.navNode);
        }
      });
    }
  }

  #openMenu(navToggleNode, navNode) {
    navToggleNode.classList.add(HeaderMenu.navToggleCssClassActive);
    navNode.classList.add(HeaderMenu.navOpenCssClassActive);
    document.body.classList.add(HeaderMenu.noScrollCssClass);
  }

  #closeMenu(navToggleNode, navNode) {
    navToggleNode.classList.remove(HeaderMenu.navToggleCssClassActive);
    navNode.classList.remove(HeaderMenu.navOpenCssClassActive);
    document.body.classList.remove(HeaderMenu.noScrollCssClass);
  }

  #isActiveMenu(navToggleNode) {
    return navToggleNode.classList.contains(HeaderMenu.navToggleCssClassActive);
  }

}
