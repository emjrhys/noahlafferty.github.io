/* Manage browser history */
$(window).hashchange(function() {
  var hash = window.location.hash.substring(1);

  if (hash != '') {
    openPortfolioSection(hash)
  } else {
    closePortfolio()
  }
})

$(window).hashchange()

/* Portfolio navigation */
$('a.portfolio-nav').click(function (event) {
  event.preventDefault()

  if ($(this).hasClass('selected')) {
    window.location.hash = ''
  } else {
    window.location.hash = $(this).attr('data-section')
  }
})

function openPortfolioSection(section) {
  $('a').removeClass('selected')
  $('section').addClass('hidden')

  $('li.' + section + ' a').addClass('selected')
  $('.' + section).removeClass('hidden')

  $('#portfolio').addClass('minimized')
}

function closePortfolio() {
  $('section').addClass('hidden')
  $('#bio').removeClass('hidden')
  $('#portfolio a').removeClass('selected')
  $('#portfolio').removeClass('minimized')
}

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

/* Image galleries */
$('.gallery').append('<nav class="back"></nav>')
$('.gallery').append('<nav class="next"></nav>')
$('.gallery img:first-of-type').addClass('selected')
$('.gallery').attr('data-idx', 1)
$('.gallery .next').click(function() {
  var $gallery = $(this).parent(),
      idx = parseInt($gallery.attr('data-idx')) + 1,
      size = $gallery.find('img').length

  if (idx > size) idx = 1

  updateGallery($gallery, idx)
})
$('.gallery .back').click(function() {
  var $gallery = $(this).parent(),
      idx = parseInt($gallery.attr('data-idx')) - 1,
      size = $gallery.find('img').length

  if (idx <= 0) idx = size

  updateGallery($gallery, idx)
})

function updateGallery($gallery, idx) {
  $gallery.find('img').removeClass('selected')
  $gallery.find('img:nth-of-type(' + idx + ')').addClass('selected')
  $gallery.attr('data-idx', idx)
}

/* start with certain page open */
// $('li.hyperflora a').click()
