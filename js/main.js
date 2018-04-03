/* Global vars */
var galleryCycleInterval,
    $projects = $('section'),
    $portfolioNav = $('#portfolio')

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
$('.portfolio-nav').click(function (event) {
  window.location.hash = $(this).attr('data-section')
})

$('.portfolio-close').click(function() {
  window.location.hash = ''
})

function openPortfolioSection(section) {
  var $projectSection = $projects.filter('.' + section)

  $portfolioNav.find('li').removeClass('selected')
  $projects.addClass('hidden')

  $portfolioNav.find('li.' + section).addClass('selected')
  $portfolioNav.addClass('disabled')
  setTimeout(function() {
    $portfolioNav.removeClass('disabled')
  }, 400)

  $projectSection.removeClass('hidden')

  $portfolioNav.addClass('minimized')

  // reset gallery and start cycle
  var $gallery = $projectSection.find('.gallery')
  updateGallery($gallery, 1)
  resetGalleryTimer($gallery)
}

function closePortfolio() {
  $projects.addClass('hidden')
  $('#bio').removeClass('hidden')
  $portfolioNav.find('li').removeClass('selected')
  $portfolioNav.removeClass('minimized')

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
var $galleries = $('.gallery')
$galleries.append('<nav class="back"></nav>')
$galleries.append('<nav class="next"></nav>')

$galleries.find('.next').click(function() {
  cycleGalleryImage($(this).parent(), true)
})
$galleries.find('.back').click(function() {
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
  resetGalleryTimer($gallery)
}

function updateGallery($gallery, idx) {
  $gallery.find('img').removeClass('selected')
  $gallery.find('img:nth-of-type(' + idx + ')').addClass('selected')
  $gallery.attr('data-idx', idx)
}

function resetGalleryTimer($gallery) {
  clearInterval(galleryCycleInterval)
  galleryCycleInterval = setInterval(function() {
    cycleGalleryImage($gallery, true)
  }, 3000)
}

/* start with certain page open */
// $('li.hyperflora a').click()
