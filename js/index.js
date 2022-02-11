import { HeaderMenu } from './header-menu.js';
import { NavigationScroll } from './navigation-scroll.js'
import { HeaderScroll } from './header-scroll.js';
import { Accordion } from './accordion.js';

const headerMenu = new HeaderMenu();
const navigationScroll = new NavigationScroll(HeaderMenu.navLinkNodes);
const headerScroll = new HeaderScroll();
window.customElements.define("accordion-master", Accordion);