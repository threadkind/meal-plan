let page = {
	nav : document.querySelector('nav'),
	recipeMenu : document.getElementById('recipeMenu'),
	recipe : document.getElementById('recipe')
}

let handlers = {
	nav : page.nav.addEventListener('click', navClick),
	recipeMenu : page.recipeMenu.addEventListener('click', recipeMenuClick)
}

let s = {
	day : ``,
	rm : ``,
	r : ``
}

function navClick(e) {
	s.day = e.target.id
	let day = eval(s.day)

	page.recipeMenu.innerHTML = ``
	page.recipe.innerHTML = ``
	s.r = ``
	s.rm = ``

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

function recipeMenuClick(e) {
	let recipe = e.target.parentElement.id
	let day = eval(s.day)

	s.r = `<h1>${day[recipe].title}</h1>`

	if(day[recipe].modFrom != ``){

		s.r += `
		<p>Modified from <a href="${day[recipe].modFrom}" target="_blank">here</p>`
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

}


