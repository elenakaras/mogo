class InitAccordion extends HTMLElement {

  #infoItems = null;

  get infoItems() {
    return this.#infoItems;
  }

  /**
   * Класс создаёт объект infoItems, запускает shadowDOM и рендерит infoItems в shadowDOM
   * Элемент создан
   * @constructor
   */
  constructor() {
    super();
    this.#initShadowDom();
  }
  
  /**
    * запуск shadowDOM
    */
  #initShadowDom() {
    this.attachShadow({ mode: "open" }); // создадим Shadow DOM
  
    this.#infoItems = this.#createInfoItems();
    this.#renderInfoItems(this.#infoItems);
  }

  /**
    * Создание infoItems объекта 
    */
  #createInfoItems() {
    const itemNodes = Array.from(this.querySelectorAll('item'));

    const infoItems = itemNodes.map((item, i) => {

      const itemImgNode = item.querySelector('item__img');
      const itemTitleNode = item.querySelector('item__title');
      const itemTextNode = item.querySelector('item__text');

      return {
        id: i,
        templateNodes: {
          item: item,
          item__img: itemImgNode,
          item__title: itemTitleNode,
          item__text: itemTextNode
        },
        info: {
          title: itemTitleNode.innerHTML,
          text: itemTextNode.innerHTML,
          imgSrc: itemImgNode.getAttribute('src')
        },
        active: item.getAttribute('active') !== null
      };
    });

    return infoItems;
  }

  /**
    * рендеринг на основе объекта infoItems
    */
  #renderInfoItems(infoItems) {
    const accordionItemNodes = infoItems.map((item, i) => {

      const accordionItemNode = document.createElement('div');
      accordionItemNode.classList.add('accordion__item');

      if (item.active === true) {
        accordionItemNode.classList.add('accordion__item_active');
      }

      accordionItemNode.innerHTML = `
        <div class="accordion__header">
          <img class="accordion__icon" src="${item.info.imgSrc}" alt="">
          <div class="accordion__title">${item.info.title}</div>
        </div>
        <div class="accordion__content">
          <div class="accordion__content-padding">
            <p>${item.info.text}</p>
          </div>
        </div>
      `;

      const accordionHeaderNode = accordionItemNode.querySelector('.accordion__header');
      const accordionContentNode = accordionItemNode.querySelector('.accordion__content');
      const accordionTitleNode = accordionItemNode.querySelector('.accordion__title');

      infoItems[i].shadowNodes = {
        accordionHeaderNode,
        accordionContentNode,
        accordionItemNode,
        accordionTitleNode
      };

      return accordionItemNode;
    });

    this.#addStyles();
    this.shadowRoot.append(...accordionItemNodes);
  }

  /**
    * Добавление CSS-стилей для accordion'a
    */
  #addStyles() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      .accordion__item {
        margin-bottom: 10px;
        border: 1px solid #e5e5e5;
      }

      .accordion__item_active 
      .accordion__header {
        border-bottom-color: #e5e5e5;
      
      }
      
      .accordion__header {
        padding: 15px 20px 15px 65px;
        position: relative;
      
        border-bottom: 1px solid transparent;
        cursor: pointer;
        user-select: none;
      }
      
      
      .accordion__header::after {
        content: "";
        display: block;
        width: 16px;
        height: 16px;
      
      
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
      
        position: absolute;
        top: 50%;
        right: 20px;
        z-index: 1;
        transform: translateY(-50%) rotate(135deg);
        transition: transform 0.2s linear,
                    border-color 0.2s linear;
      }

      .accordion__item_active .accordion__header::after {
        transform: translateY(-50%) rotate(-45deg);
        border-color: black;
      }
      
      .accordion__icon {
        position: absolute;
        top: 50%;
        left: 20px;
        z-index: 1;
      
        transform: translateY(-50%);
      }
      
      .accordion__content {
        display: none;
        overflow: hidden;
        font-size: 15px;
        color: #999;
        font-style: italic;
        font-weight: 300;
        transition: height 0.2s linear;
      }

      .accordion__item_active .accordion__content {
        display: block;
      }

      .accordion__content-padding {
        padding: 15px 20px;
      }
      
      .accordion__title {
        font-size: 14px;
        color: #333;
        text-transform: uppercase;
        user-select: text;
        display: inline-block;
        cursor: text;
      }
    `);
    this.shadowRoot.adoptedStyleSheets = [ sheet ];
  }
  
}

export class Accordion extends InitAccordion {

  /**
   * Класс добавляет слушатели событий в ShadowDom узлы accordion'a
   * @constructor
   */
  constructor() {
    super();
    const infoItems = this.infoItems;
    this.#initEventListeners(infoItems);
  }

  #initEventListeners(infoItems) {
    for (let i = 0; i < infoItems.length; i++) {
      const accordionHeaderNode = infoItems[i].shadowNodes.accordionHeaderNode;
      accordionHeaderNode.addEventListener('click', (event) => this.#eventHandlerClickOnHeader(event, infoItems[i]));
    }
  }

  #eventHandlerClickOnHeader(event, infoItem) {
    const accordionItemNode = infoItem.shadowNodes.accordionItemNode;
    const accordionTitleNode = infoItem.shadowNodes.accordionTitleNode;

    if (event.srcElement === accordionTitleNode) { // если кликнули по titleNode, то не делать ничего (завершить функцию)
      return false;
    }

    
    infoItem.active = !infoItem.active;
    
    if (infoItem.active === true) {
      accordionItemNode.classList.add('accordion__item_active');
    } else {
      accordionItemNode.classList.remove('accordion__item_active');
    }

    // console.log(accordionContentNode.scrollHeight);

  }
}
