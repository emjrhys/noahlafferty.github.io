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

$('.portfolio-close').click(function() {
  window.location.hash = ''
})

var galleryCycleInterval

function openPortfolioSection(section) {
  $('a').removeClass('selected')
  $('section').addClass('hidden')

  $('li.' + section + ' a').addClass('selected')
  $('.' + section).removeClass('hidden')

  $('#portfolio').addClass('minimized')

  // reset gallery and start cycle
  var $gallery = $('.' + section + ' .gallery')
  updateGallery($gallery, 1)

  clearInterval(galleryCycleInterval)
  galleryCycleInterval = setInterval(function() {
    cycleGalleryImage($gallery, true)
  }, 3000)
}

function closePortfolio() {
  $('section').addClass('hidden')
  $('#bio').removeClass('hidden')
  $('#portfolio a').removeClass('selected')
  $('#portfolio').removeClass('minimized')

  // stop gallery cycle
  clearInterval(galleryCycleInterval)
}

/* Copy email to clipboard */
$('.copy-email').click(function() {
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

$('.gallery .next').click(function() {
  cycleGalleryImage($(this).parent(), true)
})
$('.gallery .back').click(function() {
  cycleGalleryImage($(this).parent(), false)
})

function cycleGalleryImage($gallery, forward) {
  var size = $gallery.find('img').length,
      idx = parseInt($gallery.attr('data-idx'))

  if (forward) {
    idx = idx + 1
  } else {
    idx - 1
  }

  if (idx > size) {
    idx = 1
  } else if (idx <= 0) {
    idx = size
  }

  updateGallery($gallery, idx)
}

function updateGallery($gallery, idx) {
  $gallery.find('img').removeClass('selected')
  $gallery.find('img:nth-of-type(' + idx + ')').addClass('selected')
  $gallery.attr('data-idx', idx)
}

/* start with certain page open */
// $('li.hyperflora a').click()
