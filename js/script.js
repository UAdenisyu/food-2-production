document.addEventListener("DOMContentLoaded", function(event) {
    function slider(wrapper, field, slide, menuWrapper, bindingItems, sliderDescription){

        const d = document;
    
        let sliderSlides, sliderWrapper, sliderField, width;
    
        let slideIndex;
        let offset;
    
    
        
    
        function setAdaptiveSettings() {
            sliderSlides = d.querySelectorAll(slide),
            sliderWrapper = d.querySelector(wrapper),
            sliderField = d.querySelector(field),
            width = window.getComputedStyle(sliderWrapper).width;
    
            slideIndex = 0;
            offset = 0; 
    
            sliderField.style.width = 100 * sliderSlides.length + '%';
    
            sliderSlides.forEach((slide) => {
                slide.style.width = width; 
            });
        }
    
        setAdaptiveSettings();
    
        const totalSlideAmount = sliderSlides.length;
    
        sliderField.style.display = 'flex';
        sliderField.style.transition = '1s all';
        sliderWrapper.style.overflow = 'hidden';
    
    
        const menu = d.querySelector(menuWrapper),
              menuItems = d.querySelectorAll(bindingItems),
              descriptionField = d.querySelector(sliderDescription);
    
        menu.addEventListener('click', e => {
            let menuItem = null;
            if (e.target && e.target.classList.contains('item')) {
                menuItem = e.target;
            }
            if (e.target && e.target.parentNode.classList.contains('item')) {
                menuItem = e.target.parentNode;
            }
            menuItem.addEventListener('click', () => {
                menuItems.forEach((i) => {
                    i.classList.remove('active');
                });
    
                descriptionField.classList.remove('active');
                menuItem.classList.add('active');
                setSlide(menuItem.classList[1].match(/\d+/)[0] - 1);
                if(document.documentElement.clientWidth < 1024){
                    sliderWrapper.parentNode.scrollIntoView({block: "start", behavior: "smooth"});
                }
                else{
                    sliderWrapper.parentNode.scrollIntoView({block: "center", behavior: "smooth"});
                }
    
                descriptionField.firstChild.data = menuItem.querySelector('.description').textContent;
                descriptionField.classList.add('active');
            });
        });
    
        // console.log(descriptionField.textContent);
        //добавление автоматического перелистывания слайдера
        let switchInterval,
            autoSlidesSwitching = false;//для отключения автоперелистывания поставить false
        
        function resetAutoSwitch(ms = 3000){
            clearInterval(switchInterval);
            switchInterval = setInterval(setSlide, ms, slideIndex+1);
        }
    
        function setSlide(i){
    
            if (i < 0){
                slideIndex = sliderSlides.length - 1;
            }
            else {
                if (i >= sliderSlides.length){
                    slideIndex = 0;
                }
                else {
                    slideIndex = i;
                }
            }
            offset = slideIndex * +width.slice(0, -2);
            sliderField.style.transform = `translateX(-${offset}px)`;
            //сбиваем таймер автоперелистывания
            if (autoSlidesSwitching == true){
                resetAutoSwitch();
            }
        }
        setSlide(0);
        
        function resizeWidthOnly(a,b) {  
            var c = [window.innerWidth];
            return onresize = function() {
                var d = window.innerWidth,
                    e = c.length;
                c.push(d);
                if(c[e]!==c[e-1]){
                    clearTimeout(b);
                    b = setTimeout(a, 50);
                } 
            }, a;
        }
    
        resizeWidthOnly(function() {    
            setAdaptiveSettings();
            setSlide(0);
        });
    }
    
    
    slider(".wrapper", ".inner", ".slide", ".menu", ".menu .item", "#fifthSection .description");
    // document.querySelector("#fifthSection .description").firstChild.data = document.querySelector("#forthSection .menu").firstChild.querySelector(".description");
});
;
document.addEventListener("DOMContentLoaded", function(event) {
    function createBurger(){
        //создание бургер-меню
        const d = document;
        const navbar = d.getElementsByTagName('header')[0].querySelector('.navigation'),
            icon = d.querySelector('.menu-icon');
        icon.addEventListener('click', e => {
            navbar.classList.toggle('menu-burger-open');
            navbar.classList.toggle('menu-burger-close');
        });
        //создание бургер-меню - end
    }

    function addMenuNavigation() {
        // navbar = d.getElementsByTagName('header')[0].querySelector('.navigation');
        const navBar = document.querySelectorAll('header .navigation div'),
            footer = Array.prototype.slice.call(document.querySelectorAll('footer'));
        let sections = Array.prototype.slice.call(document.querySelectorAll('section'));
        sections.push.apply(sections, footer);
        //удаление лишних секций

        let newSections = [];
        sections.forEach(section => {
            if(section.id !== 'thirdSection' && section.id !== 'fifthSection'){
                newSections.push(section);
            }
        });
        sections = newSections;
        //навешиваю функционал
        navBar.forEach((a, i) => {
            a.addEventListener('click', () => {
                sections[i].scrollIntoView({block: "start", behavior: "smooth"});
                navBar[0].parentNode.classList.toggle('menu-burger-open');
                navBar[0].parentNode.classList.toggle('menu-burger-close');
            })
        });
    }

    createBurger();
    addMenuNavigation();
});;
document.addEventListener("DOMContentLoaded", function(event) {
    const d = document;

    const menuPositions = d.querySelector('.menu'),
          sliderImages = d.querySelector('.wrapper').querySelector('.inner'),
          sliderDescription = d.querySelector('#fifthSection .description');
    
    options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com',
            'X-RapidAPI-Key': 'd8a73e0ba6msh310b1602bacdd2bp137548jsnfb4425edc652'
        }
    };
    
    async function getResources (offset = 1) {
        await fetch(`https://random-recipes.p.rapidapi.com/ai-quotes/${offset}`, options)
        .then(response => response.json())
        .then(response => {
            this.mealsList = response;
        })
        .catch(err => console.error(err));
        return this.mealsList;
    }
    
    async function renderMenu(amount = 8) {
        let mealsMenu = "";
        let mealsImg = "";
        let ingredients = "";
        await getResources(amount).then(array => {
            for (let i = 0;  i < array.length; i++) {
                let ingredientList = array[i].ingredients[0];
                mealsMenu += `
                    <div class="item menu__item_${i+1}">
                        <div class="name">${array[i].title}</div>
                        <div class="price">${array[i].id/10}$</div>
                        <div class="description">${ingredientList}</div>
                    </div>
                `;
                mealsImg += `
                    <div  class="slide">
                        <img src=${array[i].image} alt="${i+1}">
                    </div>
                `; 
            }
            ingredients = array[0].ingredients[0];
        })
        return [mealsMenu, mealsImg, ingredients];
    }
    
    
    renderMenu().then(code => {
        menuPositions.innerHTML = code[0];
        sliderImages.innerHTML = code[1];
        sliderDescription.textContent = code[2];
    });
});
;
