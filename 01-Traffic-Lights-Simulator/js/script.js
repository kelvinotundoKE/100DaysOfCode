const lights = document.querySelectorAll('.light');

let activeLight = 0;

const changeLight = () => {
    lights[activeLight].className="light";
    activeLight++;
    
    if(activeLight > 2) {
        activeLight = 0;
    }
    
    const currentLight = lights[activeLight];
    currentLight.classList.add(currentLight.getAttribute('color'));
}

setInterval(changeLight, 3000);

