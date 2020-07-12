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
	groceryList :document.getElementById('groceryList')
}
// VARIABLES ---------------------------------------
// Source
let s = {
	day : ``,
	recipe : ``,
	rm : ``,
	r : ``
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
			s.day = e.target.parentElement.id
			}
			else {
				s.day = e.target.id
			}

			let day = eval(s.day)

			// Reset and clear the menu
			page.recipeMenu.innerHTML = ``
			page.recipe.innerHTML = ``
			s.r = ``
			s.rm = ``

			// Display all of the recipes available in the object as picture tiles with the title on
			Object.keys(day).forEach((key) => {
				s.rm += `
					<div id="${day[key].id}" class="recipeTile">
						<img src="${day[key].photo}" alt="${day[key].title}">
						<p>${day[key].title}</p>
					</div>
				`
			page.recipeMenu.innerHTML = s.rm

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
	groceryList : () => {
		console.log('groceryList')
	},
	recipeMenuClick : (e) => {
		let recipe = e.target.parentElement.id
		s.recipe = recipe
		let day = eval(s.day)

		s.r = `<h1>${day[recipe].title}</h1><button id="addToPlan">Add to Meal Plan</button>`

		if(day[recipe].modFrom != ``){

			s.r += `
			<p>Modified from <a href="${day[recipe].modFrom}" target="_blank">here</a></p>`
		}

		s.r += `<p>Makes ${day[recipe].servings}</p>
			<img src="${day[recipe].photo}" alt="${day[recipe].title}">
		 	<h2>INGREDIENTS</h2>
		 	<ul>
		`

		day[recipe].ingredients.forEach((i) => {
			s.r += `<li>${i}</li>`
		})

		s.r += `<br>`

		if(day[recipe].toServe != ``){
			s.r += `To serve: `

			day[recipe].toServe.forEach((i) => {
				s.r += `${i}, `
		})
			s.r += `<br>`
		}

		s.r += `
			<br>
			</ul>
			<h2>DIRECTIONS</h2>
			<ul>
		`

		day[recipe].directions.forEach((d) => {
			s.r += `<li>${d}</li>`
		})
		s.r += `
			</ul>
			<br>
			<p>Enjoy!</p>
			`

		page.recipe.innerHTML = s.r
	},
	recipeClick : (e) => {
		if(e.target.id == `addToPlan`){
			mp[s.day].title = eval(s.day)[s.recipe].title
			mp[s.day].id = s.recipe
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
	}
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