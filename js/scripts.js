// PAGE ELEMENTS ------------------------------------
let page = {
	nav : document.querySelector('nav'),
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
	navClick : (e) => {
		//Check to see if navButton was clicked
		let nb = ``
		e.path.forEach((element) => {
			if(element.id == 'navButtons'){
				nb = true
			}
		})

		// If navButton div was not clicked then continue with function and set the current day to be able to access recipes from that day
		if(nb != true) {
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
		}

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
		}
	},
	howToUse : () => {
		console.log('how to use')
		f.toggleIntro()
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
	groceryList : () => {
		console.log('groceryList')
		f.checkMp()

		if(v.mpConfirm == true){
			f.resetRecipeBox()
			f.generatePlan()
		}
	},
	generatePlan : () => {
		v.slPlan = `<ul>`
		Object.keys(mp).forEach((key) => {
			let d = key.split('')
			d[0] = d[0].toUpperCase()
			let dUp = d.join('')

			if(mp[key].id == ``){
				v.slPlan += `<li>${dUp}day: No recipe selected</li>`
			}
			else{
				let r = eval(key)
				v.slPlan += `<li>${dUp}day: ${r[mp[key].id].title}`
			}
		})
	page.slPlan.innerHTML = v.slPlan
	},
	recipeMenuClick : (e) => {
		let recipe = e.target.parentElement.id
		v.recipe = recipe
		let day = eval(v.day)

		v.r = `<h1>${day[recipe].title}</h1><button id="addToPlan">Add to Meal Plan</button>`

		if(day[recipe].modFrom != ``){

			v.r += `
			<p>Modified from <a href="${day[recipe].modFrom}" target="_blank">here</a></p>`
		}

		v.r += `<p>Makes ${day[recipe].servings}</p>
			<img src="${day[recipe].photo}" alt="${day[recipe].title}">
		 	<h2>INGREDIENTS</h2>
		 	<ul>
		`

		day[recipe].ingredients.forEach((i) => {
			v.r += `<li>${i}</li>`
		})

		v.r += `<br>`

		if(day[recipe].toServe != ``){
			v.r += `To serve: `

			day[recipe].toServe.forEach((i) => {
				v.r += `${i}, `
		})
			v.r += `<br>`
		}

		v.r += `
			<br>
			</ul>
			<h2>DIRECTIONS</h2>
			<ul>
		`

		day[recipe].directions.forEach((d) => {
			v.r += `<li>${d}</li>`
		})
		v.r += `
			</ul>
			<br>
			<p>Enjoy!</p>
			`

		page.recipe.innerHTML = v.r
	},
	recipeClick : (e) => {
		if(e.target.id == `addToPlan`){
			mp[v.day].title = eval(v.day)[v.recipe].title
			mp[v.day].id = v.recipe
			f.updateMp()
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
		page.main.style.marginTop = `${page.nav.offsetHeight + 10}px`
	},
	toggleIntro : () => {
		page.intro.classList.toggle('hide')
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
	generateIngs : (day, recipeId) => {
		d = eval(day)
		ing = {}
		count = 1
		d[recipeId].ingredients.forEach((i) => {
			let food = i.split(',')[0].split(' ')
			if(Number.isNaN(Number(food[0])) == false){
				console.log()
				ing[count] = {}
				ing[count].amt = food[0]
				food.shift()
				ing[count].mmt = food[0]
				food.shift()
				ing[count].food = food.join(' ')

				count ++
			}

		})
		ingredients[recipeId] = ing

	},
}


// EVENT HANDLERS -------------------------------------
let handlers = {
	menuHeight : window.addEventListener("load", f.updateMainMargin),
	menuHeightResize : window.addEventListener("resize", f.updateMainMargin),
	nav : page.nav.addEventListener('click', f.navClick),
	navButtons : page.navButtons.addEventListener('click', f.navButtons),
	recipeMenu : page.recipeMenu.addEventListener('click', f.recipeMenuClick),
	recipe : page.recipe.addEventListener('click', f.recipeClick)
}



f.generateIngs('tues', 'southwestSoup')