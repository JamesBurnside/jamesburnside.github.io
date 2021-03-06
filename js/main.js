$(document).ready(function () {

  'use strict';

  /* =======================
  // Simple Search Settings
  ======================= */

  SimpleJekyllSearch({
    searchInput: document.getElementById('js-search-input'),
    resultsContainer: document.getElementById('js-results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    noResultsText: '<li>No results found</li>'
  })

  /* =======================
  // Responsive videos
  ======================= */

  $('.c-wrap-content').fitVids({
    'customSelector': ['iframe[src*="ted.com"]']
  });

  /* =======================================
  // Switching between posts and categories
  ======================================= */

  $('.c-nav__list > .c-nav__item').click(function() {
    $('.c-nav__list > .c-nav__item').removeClass('is-active');
    $(this).addClass('is-active');
    if ($('.c-nav__item:last-child').hasClass('is-active')) {
      $('.c-posts').css('display', 'none').removeClass('o-opacity');
      $('.c-load-more').css('display', 'none')
      $('.c-categories').css('display', '').addClass('o-opacity');
    } else {
      $('.c-posts').css('display', '').addClass('o-opacity');
      $('.c-load-more').css('display', '')
      $('.c-categories').css('display', 'none').removeClass('o-opacity');
    }
  });

  /* =======================
  // Adding ajax pagination
  ======================= */

  $(".c-load-more").click(loadMorePosts);

  function loadMorePosts() {
    var _this = this;
    var $postsContainer = $('.c-posts');
    var nextPage = parseInt($postsContainer.attr('data-page')) + 1;
    var totalPages = parseInt($postsContainer.attr('data-totalPages'));

    $(this).addClass('is-loading').text("Loading...");

    $.get('/page/' + nextPage, function (data) {
      var htmlData = $.parseHTML(data);
      var $articles = $(htmlData).find('article');

      $postsContainer.attr('data-page', nextPage).append($articles);

      if ($postsContainer.attr('data-totalPages') == nextPage) {
        $('.c-load-more').remove();
      }

      $(_this).removeClass('is-loading');
    });
  }

  /* ==============================
  // Smooth scroll to the tags page
  ============================== */

  $('.c-tag__list a').on('click', function (e) {
    e.preventDefault();

    var currentTag = $(this).attr('href'),
      currentTagOffset = $(currentTag).offset().top;

    $('html, body').animate({
      scrollTop: currentTagOffset - 10
    }, 400);

  });

  /* =======================
  // Scroll to top
  ======================= */

  $('.c-top').click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $('.c-top').addClass("c-top--active");
    } else {
      $('.c-top').removeClass("c-top--active");
    };
  });

  /* =======================
  // Copy link to clipboard
  ======================= */

  $('.link-btn').click(function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
  });

  /* =======================
  // Copy code to clipboard
  ======================= */

  // construct code button html element
  let $copyCodeBtn = $('<div class="code-header"><i class="copy-code-button fas fa-clipboard" aria-label="Copy code to clipboard"></i></div>');
  $copyCodeBtn.click(function() {
    const btn = $(this);

    // Copy code block contents to clipboard
    const codeBlock = btn.parent();
    const code = codeBlock.text().trim();
    window.navigator.clipboard.writeText(code);

    // Update icon to indicate click was successful
    const icon = $(this).children('i');
    icon.removeClass('fa-clipboard');
    icon.addClass('fa-check');
    setTimeout(() => {
      icon.addClass('fa-clipboard');
      icon.removeClass('fa-check');
    }, 1000);
  });

  // Add copy buttons onto all code blocks
  $copyCodeBtn.insertBefore($('pre > code').parent().parent());

  /* =======================
  // Extra code snippet formatting
  ======================= */

  // Add a class to all inline code snippets for better formatting:
  $('p > code').addClass('inline-code');
  $('a > code').addClass('inline-code');
});
