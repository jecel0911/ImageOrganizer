
$(document).ready(function(){
	//action Filter on button.
	$('#btnFilter').on('click',function(){
		renderListitems($('#inputFilter').val());
	});
	//action filter on change input
	$('#inputFilter').keyup(function(){
		renderListitems($('#inputFilter').val());
	});
});


//render the list filtered
function renderListitems(queryString){
	var result = findListItem(queryString);
	for(i=0;i<result.list.length;i++){
		var r = _.template(window.templates.T_itemList,result.list[i]);
		$('.panelIzquierdo .contenido ul').append(r);
	}
}

//render the detail of the item
function renderDetailedItem(){
	console.log('working...');
}


/****************************************************/

//find the list of items in db
function findListItem(queryString){
	// in proces... read from mongo the list of items.
	var list = {
		"detail": "detailed",
		"list":[
			{"id":1,"text":'Question 1'} /*,
			{"id":2,"text":'Question 2'},
			{"id":3,"text":'Question 3'},
			{"id":4,"text":'Question 4'} */
		]
	}
	return list;
}