const API = `https://www.thecocktaildb.com/api/json/v1/1/`

const API_LIST = `${API}filter.php?c=Cocktail`
const API_SEARCH = `${API}search.php?s=` // + name
const API_GET_DETAIL = `${API}lookup.php?i=` // + idCoctail 

const getCocktailsByName = async (e) => {
  let name = e.target.value
  if (name.length > 1) {
    const res = await fetch(API_SEARCH + name)
    const req = await res.json()
    console.log(req.drinks)
    renderCocktails(req.drinks)
  } else {
    getAllCocktails()
  }
}

const getAllCocktails = async () => {
  const res = await fetch(API_LIST)
  const req = await res.json()
  console.log(req.drinks)
  renderCocktails(req.drinks)
}
getAllCocktails()


let output = document.getElementById('output')

const renderCocktails = (drinks) => {
  output.innerHTML = ''
  drinks.map((drink) => {
    let div = document.createElement('div')
    div.addEventListener('click', ()=>getCocktailById(drink.idDrink))
    let img = document.createElement('img')
    let name = document.createElement('h3')
    name.textContent = drink.strDrink
    img.src = drink.strDrinkThumb
    div.append(img, name)
    output.append(div)
  })
}

const getCocktailById= async (id)=>{
  const res = await fetch(API_GET_DETAIL + id)
  const req = await res.json()
  console.log(req.drinks[0])
  renderOneCocktail(req.drinks[0])
}

const renderOneCocktail=(cocktail)=>{
  output.innerHTML = ''
  let btn = document.createElement('button')
  btn.textContent='Go back'
  btn.addEventListener('click', ()=>getAllCocktails())
  let img =  document.createElement('img')
  let name =  document.createElement('h1')
  let descr = document.createElement('h4')
  let glass = document.createElement('b')
  img.src = cocktail.strDrinkThumb
  name.textContent= 'Name: '+ cocktail.strDrink
  descr.textContent = 'Instruction: '+cocktail.strInstructions
  glass.textContent = 'Glass: '+cocktail.strGlass
  let ul = document.createElement('ul')
  let li_1 = document.createElement('li')
  let li_2= document.createElement('li')
  let li_3 = document.createElement('li')
  let li_4 = document.createElement('li')
  li_1.textContent=`${cocktail.strIngredient1} / ${cocktail.strMeasure1}`
  li_2.textContent=`${cocktail.strIngredient2} / ${cocktail.strMeasure2}`
  li_3.textContent=`${cocktail.strIngredient3} / ${cocktail.strMeasure3}`
  li_4.textContent=`${cocktail.strIngredient4} / ${cocktail.strMeasure4}`
  ul.append(li_1, li_2, li_3, li_4)
  output.append(btn, img, name , descr, glass, ul)
}
// 1- перерисовать output
// 2 - отобразить кнопку назад которая просто вызовет функцию getAllCocktails
// 3- отобразить данные картинку название описание стакан ингредиенты и пропорции
// 4 - сдалать максимально красиво
// 5 - создать отдельную ветку и в нее запушить
