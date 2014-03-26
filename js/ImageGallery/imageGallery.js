
/*
$(document).ready(function(){

	$.ajax
    ({
        type: "POST",
        url: 'http://localhost:3000/ImageGallery',
        data: 'json=' + JSON.stringify({ "Description": "Probando insercion desde JQuery"}),
        success: function () {

        alert("Thanks!"); 
        }
    });

});
*/

$(document).ready(function(){
	//action Filter on button.
	$('#btnFilter').on('click',function(){
		renderListitems($('#inputFilter').val());
	});
	//action filter on change input
	$('#inputFilter').keyup(function(){
		renderListitems($('#inputFilter').val());
	});
	//action show Panel for adding new Item
	$('#btnShowAddNewItem').on('click',function(e){
		e.preventDefault();
		$('#frmAddItem').show('toggle');
		$('#frmFind').hide();
		$('#txtItem').val('').focus();
	});
	//action hide panel for adding new Item
	$('#btnHideAddNewItem').on('click',function(e){
		e.preventDefault();
		$('#frmFind').show('toggle');
		$('#frmAddItem').hide();
		$('#inputText').val('').focus();
	});
	//action for save new item
	$('#btnAddItem').on('click',function(){
		var text = $('#txtItem').val();
		if(text == ''){
			alert('Description is required');
			$('#txtItem').focus();
		}else{
			saveNewItem(text);
		}
	});
});


//render the list filtered
function renderListitems(queryString){
	$.ajax({
        type: "GET",
        url: 'http://localhost:3000/ImageGallery',
        data: 'json=' + JSON.stringify({ "queryString": queryString}),
        success: function (result,msg) {
        	$('.panelIzquierdo .contenido ul').html('');
        	for(i=0;i<result.length;i++){
				//var r = _.template(window.templates.T_itemList,JSON.stringify(result[i]));
				var r = "<li id='item_"+result[i]._id+"'>"+result[i].Description+"</li>";
				$('.panelIzquierdo .contenido ul').append(r);
				$('#item_'+result[i]._id).show('toggle');
			}
        }
    });
}

//save the new Item in BD
function saveNewItem(description){
	$.ajax({
	        type: "POST",
	        url: 'http://localhost:3000/ImageGallery',
	        data: 'json=' + JSON.stringify({ "Description": description}),
	        success: function (result,msg) {
				//var r = _.template(window.templates.T_itemList,JSON.stringify(result[i]));
				var r = "<li id='"+result._id+"'>"+result.Description+"</li>";
				$('.panelIzquierdo .contenido ul').append(r);
	        	$('#btnHideAddNewItem').click();
	        }
	    });
}

//render the detail of the item
function renderDetailedItem(){
	console.log('working...');
}


/****************************************************/