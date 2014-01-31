
function checkRegister()
{
	var error = '';
	if($('input[name="username"]').val().length < 6)
	{
		error += 'Username must be at least 6 symbols. ';
	}
	if($('input[name="password"]').val().length < 6)
	{
		error += 'Password must be at least 6 symbols.';
	}
	if(error.length)
	{
		$('.error').text(error);
		return false;
	}
	
}

function delNews()
{
	$(this).parent().remove();
}
function addNews()
{
	$('<div class="adminNewsContainer"><textarea name="news[]"></textarea><p class="delNews">x</p></div>').insertBefore($(this));
}

function checkChangePass()
{
	if($('#pass1').val() !== $('#pass2').val())
	{
		$('.error').text("Passwords don't match");
		return false;
	}
}

$(function(){
	$('#registerBtn').click(checkRegister);
	$(document).delegate(".delNews", "click", delNews);
	$('.addNews').click(addNews);
	$('#changePassBtn').click(checkChangePass);
});
