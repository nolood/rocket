const rocket = document.getElementById('rocket');
const planet = document.getElementById('planet');
const asteroid = document.getElementById('asteroid');

const selectbox = document.getElementById('asteroid-menu');


const openSelect = () => {
  const selectMenu = document.getElementById('selectmenu');
  if (selectMenu.className == 'asteroid__menu') {
    selectMenu.className = 'asteroid__menu active'
  } else {
    selectMenu.className = 'asteroid__menu'
  }
}

const setMass = (num) => {
  document.getElementById('asteroid-mass').value = num;
}



const startPos = () => {
  
  rocket.style.top = '670px';
  rocket.style.left = '675px';
  planet.style.bottom = '30px';
  planet.style.left = '600px';
  asteroid.style.top = '100px';
  asteroid.style.left = '1100px';
};

fst = rocket;
scnd = asteroid;

var dist = {
  value: 0
}


var loop;
const start = () => {
  var massR = document.getElementById('rocket-mass');
  var massA = document.getElementById('asteroid-mass');
  dist.value = Number(document.getElementById('distance').value);
  if (massA.value === '' || massR.value === '' || massA.value == '0' || massR.value == '0') {
    alert('Масса не может быть равно нулю')
  } else if (massR.value > 900 ) {
    alert('Максимальная масса ракеты 900 * 10³ кг')
  } else {
    startPos();
  
    fst.velocity = {
      x:0,
      y:-1
    }
      
    fst.weight = Number(massR.value);
      
    scnd.velocity = {
      x:0,
      y:0
    }

    scnd.weight = Number(massA.value);
    loop = setInterval(() => {
      move(fst, scnd)
    }, 10)  
  }
    
}



let move = (obj1,obj2) => {
  // F = ma, Fg = G(m1m2)/r**2
  var r = Math.abs(scnd.style.left.slice(0,-2) - fst.style.left.slice(0,-2)) + Math.abs(scnd.style.top.slice(0,-2) - fst.style.top.slice(0,-2))

  var Fg = {
      f: (obj1.weight*obj2.weight)/r**2
  }
  // if(Fg.f > 20) Fg.f = 20
  rocket.style.transform = `rotate(${fst.velocity.x * 4}deg)`
  
  
  fst.style.left = Number(fst.style.left.slice(0,-2)) + Number(fst.velocity.x) + 'px'
  if(Number(fst.style.left.slice(0,-2)) > Number(scnd.style.left.slice(0,-2)))
  {
      fst.velocity.x-=Fg.f
      if(Number(fst.velocity.x)<-20)
      {
          fst.velocity.x = -20
      } else if(fst.velocity.x>20)
      {
          fst.velocity.x = 20
      }
  } else {
      fst.velocity.x+=Fg.f
  if(Number(fst.velocity.x)<-20)
      {
          fst.velocity.x = -20
      } else if(fst.velocity.x>20)
      {
          fst.velocity.x = 20
      }
  }

  fst.style.top = Number(fst.style.top.slice(0,-2)) + Number(fst.velocity.y) + 'px'
  if(Number(fst.style.top.slice(0,-2)) > Number(scnd.style.top.slice(0,-2)))
  {
      fst.velocity.y-=Fg.f
      if(Number(fst.velocity.y)<-10)
      {
          fst.velocity.y = -10
      } else if(fst.velocity.y>10)
      {
          fst.velocity.y = 10
      }
  } else {
      fst.velocity.y+=Fg.f
      if(Number(fst.velocity.y)<-10)
      {
          fst.velocity.y = -10
      } else if(fst.velocity.y>10)
      {
          fst.velocity.y = 10
      }
  }

  
  if ( Number(dist.value) <= 1000 ){
    dist.value -= 6
  } else if (Number(dist.value) <= 5000) {
    dist.value -= 40
  } else if (Number(dist.value) <= 10000) {
    dist.value -= 300
  } else {
    dist.value -= 500
  }

  document.getElementById('stat').innerHTML = 


  `</br>6.6743 * 10⁻¹¹ * (${fst.weight}³ * ${scnd.weight}¹⁸) <br/>------------------------------------ = ${Math.abs(Fg.f.toFixed(4))}<br/> ${dist.value}²`

                      
  if (Number(fst.style.top.slice(0,-2)) < 50 || Number(fst.style.left.slice(0,-2)) > 1200){
    clearInterval(loop)
  }

  if (Math.abs(Fg.f) >= 10){
    clearInterval(loop)
    console.log('nice')
  }
}

startPos();

