// PAGE ELEMENTS ------------------------------------
let page = {
	nav : document.querySelector('nav'),
	navUl : document.getElementById('navUl'),
	main : document.querySelector('main'),
	intro : document.getElementById('intro'),
	recipeMenu : document.getElementById('recipeMenu'),
	recipe : document.getElementById('recipe'),
	mplMon : document.getElementById('mplMon'),
	mplTues : document.getElementById('mplTues'),
	mplWeds : document.getElementById('mplWeds'),
	mplThurs : document.getElementById('mplThurs'),
	mplFri : document.getElementById('mplFri'),
	navButtons : document.getElementById('navButtons'),
	howToUse : document.getElementById('howToUse'),
	resetMp :document.getElementById('resetMp'),
	groceryList : document.getElementById('groceryList'),
	slPlan : document.getElementById('slPlan'),
	slList : document.getElementById('slList')
}
// VARIABLES ---------------------------------------
let v = {
	day : ``,
	recipe : ``,
	rm : ``,
	r : ``,
	mpConfirm : ``,
	slPlan : ``,
	slList : ``
}

// Meal Plan object to hold chosen recipes
let mp = {
	mon : {
		title : `Choose a Recipe`,
		id : ``
	},
	tues : {
		title : `Choose a Recipe`,
		id : ``
	},
	weds : {
		title : `Choose a Recipe`,
		id : ``
	},
	thurs : {
		title : `Choose a Recipe`,
		id : ``
	},
	fri : {
		title : `Choose a Recipe`,
		id : ``
	},
}

// FUNCTIONS -----------------------------------------
let f = {
	resetPage : () => {
		f.resetRecipeBox()
		f.resetSl()
		f.showIntro()
	},
	navClick : (e) => {
		f.hideRecipe()
		f.resetSl()
		f.hideIntro()
		f.hideSlPlan()

		if(e.target.classList.contains("menuDay") || e.target.classList.contains("mplDay")){
		v.day = e.target.parentElement.id
		}
		else {
			v.day = e.target.id
		}

		let day = eval(v.day)

		// Reset and clear the menu
		page.recipeMenu.innerHTML = ``
		page.recipe.innerHTML = ``
		v.r = ``
		v.rm = ``

		// Display all of the recipes available in the object as picture tiles with the title on
		Object.keys(day).forEach((key) => {
			v.rm += `
				<div id="${day[key].id}" class="recipeTile">
					<img src="${day[key].photo}" alt="${day[key].title}">
					<p>${day[key].title}</p>
				</div>
			`
		page.recipeMenu.innerHTML = v.rm

		})
	},
	navButtons : (e) => {
		if(e.target.localName == 'button'){
			if(e.target.id == 'howToUse'){
				f.howToUse()
			}

			if(e.target.id == 'resetMp'){
				f.resetMp()
			}

			if(e.target.id == 'groceryList'){
				f.groceryList()
			}

			if(e.target.id == `randomList`){
				f.random()
			}
		}
	},
	howToUse : () => {
		f.hideRecipe()
		f.resetPage()
	},
	resetMp : () => {
		Object.keys(mp).forEach((key) => {
			mp[key].title = 'Choose a Recipe'
			mp[key].id = ''
		})
		f.updateMp()
	},
	resetRecipeBox : () => {
		page.recipeMenu.innerHTML = ``
		page.recipe.innerHTML = ``
	},
	resetSl : () => {
		page.slPlan.innerHTML = ``
		page.slList.innerHTML = ``
	},
	groceryList : () => {
		f.hideRecipe()
		f.checkMp()

		if(v.mpConfirm == true){
			f.resetSl()
			f.hideIntro()
			f.resetRecipeBox()
			f.generatePlan()
			f.resetIngredients()

			Object.keys(mp).forEach((key) => {
				if(mp[key].id != ``){
					f.generateIngs(key)
				}
			})

			f.generateShoppingList()
		}
	},
	generatePlan : () => {
		f.showSlPlan()
		v.slPlan = `<h2>Your meal plan for this week</h2><ul>`
		Object.keys(mp).forEach((key) => {
			let d = key.split('')
			d[0] = d[0].toUpperCase()
			let dUp = d.join('')

			if(dUp == `Weds`){
				dUp = `Wednes`
			}

			if(mp[key].id == ``){
				v.slPlan += `<li>${dUp}day: No recipe selected</li>`
			}
			else{
				let r = eval(key)
				v.slPlan += `<li>${dUp}day: ${r[mp[key].id].title}`
			}
			v.slPlan += `</ul>`
		})
		page.slPlan.innerHTML = v.slPlan
	},
	generateShoppingList : () => {
		v.slList = `<h2>Your grocery list for this week</h2>
		<ul>`
		Object.keys(ingredients).forEach((key) => {

			if(ingredients[key].amt > 0){
				console.log(key)
				v.slList += `<li>${ingredients[key].amt} ${ingredients[key].mmt} ${ingredients[key].name}</li>`
			}
			// Object.keys(ingredients[key]).forEach((k) => {
			// 	v.slList += `<li>${ingredients[key][k].amt} ${ingredients[key][k].mmt} ${ingredients[key][k].food}</li>`
			// })
		})

		page.slList.innerHTML = v.slList
	},
	resetIngredients : () => {
		Object.keys(ingredients).forEach((key) => {
			ingredients[key].amt = 0
		})
	},
	random : () => {
		Object.keys(mp).forEach((key) => {

			let x = Object.keys(eval(key))
			let rand = x[Math.floor(Math.random() * x.length)]

			mp[key].title = eval(key)[rand].title
			mp[key].id = eval(key)[rand].id
		})
		f.updateMp()
	},
	recipeMenuClick : (e) => {
		f.resetSl()
		f.showRecipe()
		let recipe = e.target.parentElement.id
		v.recipe = recipe
		let day = eval(v.day)

		v.r = `<h2>${day[recipe].title}</h2>`

		if(day[recipe].modFrom != ``){

			v.r += `
			<p id="modFrom">Modified from <a href="${day[recipe].modFrom}" target="_blank">here</a></p>`
		}

		v.r += `<div id="serveButton">
			<p>Makes ${day[recipe].servings}</p>
			<button id="addToPlan">Add to Meal Plan</button>
			</div>
			<figure id="recipePic">
				<img src="${day[recipe].photo}" alt="${day[recipe].title}">
			</figure>
			<div id="recipeIng">
		 	<h3>INGREDIENTS</h3>
		 	<ul>
		`

		day[recipe].ingredients.forEach((i) => {
			v.r += `<li>${i}</li>`
		})

		v.r += `<br>`

		if(day[recipe].toServe != ``){
			v.r += `(Optional) To serve: `

			day[recipe].toServe.forEach((i) => {
				v.r += `${i}, `
		})
			v.r += `<br>`
		}

		v.r += `
			<br>
			</ul>
			</div>
			<div id="recipeDirect">
			<h3>DIRECTIONS</h3>
			<ul>
		`

		day[recipe].directions.forEach((d) => {
			v.r += `<li>${d}</li>`
		})
		v.r += `
			</ul>
			</div>
			<br>
			<p id="enjoy">Enjoy!</p>
			`

		page.recipe.innerHTML = v.r
	},
	recipeClick : (e) => {
		if(e.target.id == `addToPlan`){
			mp[v.day].title = eval(v.day)[v.recipe].title
			mp[v.day].id = v.recipe
			f.updateMp()

			let d = v.day.split('')
			d[0] = d[0].toUpperCase()
			let dUp = d.join('')
			let chosen = `mpl${dUp}`

			page[chosen].classList.add('chosen')
		}
	},
	updateMp : () => {
		page.mplMon.innerHTML = mp.mon.title
		page.mplTues.innerHTML = mp.tues.title
		page.mplWeds.innerHTML = mp.weds.title
		page.mplThurs.innerHTML = mp.thurs.title
		page.mplFri.innerHTML = mp.fri.title
	},
	updateMainMargin : () => {
		page.main.style.marginTop = `${page.nav.offsetHeight + 30}px`
	},
	hideIntro : () => {
		page.intro.style.display = `none`
	},
	showIntro : () => {
		page.intro.style.display = `flex`
	},
	hideRecipe : () => {
		page.recipe.style.display = `none`
	},
	showRecipe : () => {
		page.recipe.style.display = `block`
	},
	hideSlPlan : () => {
		page.slPlan.style.display = `none`
	},
	showSlPlan : () => {
		page.slPlan.style.display = `block`
	},
	checkMp : () => {
		let recipeNum = 0
		Object.keys(mp).forEach((key) => {
			if(mp[key].id != ``){
				recipeNum ++
			}
		})

		if(recipeNum < 5){
			v.mpConfirm = confirm(`You only have ${recipeNum} of the 5 weekly recipes. Are you sure you want to continue to generate your grocery list?`)
		}
		else {
			v.mpConfirm = true;
		}
	},
	generateIngs : (day) => {
		d = eval(day)

		d[mp[day].id].ingredients.forEach((i) => {
			let food = i.split(',')[0].split(' ')
		 	if(Number.isNaN(Number(food[0])) == false){
				let ingrdt = {}
				ingrdt.amt = food[0]
				food.shift()
				food.shift()
				ingrdt.food = food.join('')
				ingredients[ingrdt.food].amt += Number(ingrdt.amt)
			}
		})
	},
}


// EVENT HANDLERS -------------------------------------
let handlers = {
	menuHeight : window.addEventListener("load", f.updateMainMargin),
	menuHeightResize : window.addEventListener("resize", f.updateMainMargin),
	navUl : page.navUl.addEventListener('click', f.navClick),
	navButtons : page.navButtons.addEventListener('click', f.navButtons),
	recipeMenu : page.recipeMenu.addEventListener('click', f.recipeMenuClick),
	recipe : page.recipe.addEventListener('click', f.recipeClick)
}



