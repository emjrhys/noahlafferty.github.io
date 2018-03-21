/* Portfolio navigation */
$('#portfolio a').click(function () {
  $('section').addClass('hidden')

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected')
    $('#bio').removeClass('hidden')
    $('#portfolio').removeClass('minimized')
  }
  else {
    $('a').removeClass('selected')
    $(this).addClass('selected')
    $('.' + $(this).attr('data-section')).removeClass('hidden')
    $('#portfolio').addClass('minimized')
  }
})

/* Copy email to clipboard */
$('.copy-email').click(function() {
  console.log('it worked')
  var $temp = $("<input>")
  $("body").append($temp)
  $temp.val($(this).text()).select()
  document.execCommand("copy")
  $temp.remove()
  $(this).next().text('Copied!')
})

$('.copy-email').mouseleave(function() {
  $(this).next().text('Click to copy to clipboard')
})
