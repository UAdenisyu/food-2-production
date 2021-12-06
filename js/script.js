document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    function slider(wrapper, field, slide, bindingItems, sliderDescription, menuItemdescription){

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


    const menuItems = d.querySelectorAll(bindingItems),
          descriptionField = d.querySelector(sliderDescription),
          descriptionInner = d.querySelector(menuItemdescription);
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            menuItems.forEach((i) => {
                i.classList.remove('active');
            });
            descriptionField.classList.remove('active');
            item.classList.add('active');
            setSlide(item.classList[1].match(/\d+/)[0] - 1);
            if(document.documentElement.clientWidth < 1024){
                sliderWrapper.parentNode.scrollIntoView({block: "start", behavior: "smooth"});
            }
            else{
                sliderWrapper.parentNode.scrollIntoView({block: "center", behavior: "smooth"});
            }
            descriptionField.firstChild.data = descriptionInner.textContent;

            descriptionField.classList.add('active');
        });
    });

    descriptionField.classList.add('active');

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

slider(".wrapper", ".inner", ".slide", ".menu .item", "#fifthSection .description", "#forthSection .description");




;
    function addMenuNavigation () {
    if(document.documentElement.clientWidth >= 1024){
        const navBar = document.querySelectorAll('header .navigation div'),
              footer = Array.prototype.slice.call(document.querySelectorAll('footer'));
        let sections = Array.prototype.slice.call(document.querySelectorAll('section'));
        console.log(navBar);
        sections.push.apply(sections, footer);
        //удаление лишних секций
        let newSections = [];
        sections.forEach(section => {
            if(section.id !== 'thirdSection' && section.id !== 'fifthSection'){
                newSections.push(section);
            }
        });
        sections = newSections;
        console.log(sections);
        //навешиваю функционал
        navBar.forEach((a, i) => {
            a.addEventListener('click', () => {
                sections[i].scrollIntoView({block: "start", behavior: "smooth"});
                console.log(sections[i])
            })
        });
    }
}

addMenuNavigation();;
});