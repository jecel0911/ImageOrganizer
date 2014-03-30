
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
		renderListitems($('#frmFind #inputText').val());
	});
	//action filter on change input
	$('#frmFind #inputText').keyup(function(){
		renderListitems($('#frmFind #inputText').val());
	});
	//action show Panel for adding new Item
	$('#btnShowAddNewItem').on('click',function(e){
		e.preventDefault();
		$('#frmAddItem').show('toggle');
		$('#frmFind').hide();
		$('#txtItem').val('').focus();
		$('.panelDerecho #idQuestion').val('');
		$('.panelDerecho #file').val('');
		$('.panelDerecho').css('display','none');
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

	$('#idFormUpload').submit(uploadFile);
});

//render the list filtered
function renderListitems(queryString){
	$.ajax({
        type: "GET",
        url: 'http://localhost:3000/ImageGallery?queryString='+queryString,
        success: function (result,msg) {
        	$('.panelIzquierdo .contenido ul').html('');
        	for(i=0;i<result.length;i++){
				//var r = _.template(window.templates.T_itemList,JSON.stringify(result[i]));
				var r = "<li id='item_"+result[i]._id+"' onClick='renderDetailedItem("+'"'+result[i]._id+'"'+");'>"+result[i].Description+"</li>";
				$('.panelIzquierdo .contenido ul').append(r);
				$('#item_'+result[i]._id).show('toggle');
				if(i == 0 && result.length == 1){
					$('#item_'+result[i]._id).click(); 
				}
			}
			if(result.length == 0){
				$('.panelDerecho').hide();
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
				$('#btnHideAddNewItem').click();
				$('#frmFind #inputText').val(description);
				$('#btnFilter').click();
	        }
	    });
}


function uploadFile(){
	debugger;
	var archivo = $('#idFormUpload #file').val();
	if(!archivo){
		alert('Select a valid file for uploading...');
		return false;
	}
	$(this).ajaxSubmit({                                                                                                                 
        error: function(xhr) {
			console.log('Error: ' + xhr);
        },
        success: function(response) {
        	if(response.err){
        		alert('Handdled Error:' + response.err);
        	}else{

        	}
			var path = response.path;
			renderImage(path);
        }
	});
 	return false;
}

//render the detail of the item
function renderDetailedItem(idQuestion){
	$('.panelDerecho').css('display','block');
	$('#idFormUpload #idQuestion').val(idQuestion);
	$.ajax({
        type: "GET",
        url: 'http://localhost:3000/ImageGallery/'+idQuestion,
        data: {"id": idQuestion},
        success: function (result,msg) {
        	$('.panelDerecho .contenido .detailItem #descripcion').html(result.Description);
        	$('.panelDerecho .contenido .detailItem #imagesDetail').html('');
        	for(i=0;i<result.Images.length;i++){
        		renderImage(result.Images[i].path);
        	}
        }
    });
}

function renderImage(path){
	var c = $('.panelDerecho .contenido .detailItem');
	var img = new Image();
	img.setAttribute('src',path);
	c.find('#imagesDetail').append($('<li class="ItemListImage"/>').html(img));
}

/****************************************************/