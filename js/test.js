(function($) {
    var createGraph;
    var chart;
    
	$(document).ready(function() {
		setupFade();
		setupClickToScroll();
		setupPostAnimation();
		setupScrollToTop();
        enableScrollAbortion();

		// Trigger window.scroll, this will initiate some of the scripts
		$(window).scroll();
        
         Highcharts.theme = {
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: '#ffffff00',
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '2vw'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                        fontSize: '1vw'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                        fontSize: '1vh'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
           plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },
            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },
            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },
            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        };
        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
        
        createGraph = function(el, index) {
            if($(el).children().length) {
               // $('.graph').not(el).empty();
                return;
            }
            
            var maxNum = Math.max.apply(null, votes[index].data2);
            var minNum = Math.min.apply(null, votes[index].data2);
            
            var reqNum = parseInt((10 -(maxNum - minNum + 1)) / 2);
            var reqn = (10 -(maxNum - minNum + 1)) % 2;
            
            chart = Highcharts.chart(el, { 
                chart: {
                    width: $('.graph').width(),
                    height: $('.graph').height(),
                    zoomType: 'xy'
                },
                title: false,
                xAxis: [{
                    categories: ['12/24', '12/25', '12/26', '12/28', '12/29', '12/30'],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}위',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '순위',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    min: minNum - reqNum - reqn < 1 ? 1 : minNum - reqNum - reqn,
                    max: minNum - reqNum - reqn < 1 ? 10 : maxNum + reqNum,
                    tickAmount: 10,
                    reversed: true                    
                }, { // Secondary yAxis
                    title: {
                        text: '총 득표수',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} 표',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    tickAmount: 10,
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || // theme
                        'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: '득표수',
                    type: 'column',
                    yAxis: 1,
                    data: votes[index].data1,
                    tooltip: {
                        valueSuffix: ' 표'
                    }

                }, {
                    name: '순위',
                    type: 'line',
                    max: 1,
                    data: votes[index].data2,
                    tooltip: {
                        valueSuffix: '위'
                    }
                }]
            });

        };

        
    
       $('.post-title').each(function(i, el) {
            $(el).text(votes[i].title); 
       });

        $('.mov').each(function(i, el) {
            votes[i].img 
       });
        
        videojs('my-video');
  });
  
  
  // Allow user to cancel scroll animation by manually scrolling
  function enableScrollAbortion() {
    var $viewport = $('html, body');
    $viewport.on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
        if ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel') {
             $viewport.stop();
        }
    });
  }

	function setupScrollToTop() {
		var scrollSpeed = 750;
		$('.trigger-scroll-to-top').click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, scrollSpeed);
		});
	}

var videoTemp;
	function setupPostAnimation() {
		var posts = $('.post-wrapper .post');
		$(window).on('scroll resize', function() {

			var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
				windowHeight = $(window).height(), // Needs to be here because window can resize
				overScroll = Math.ceil(windowHeight*.20),
				treshhold = (currScroll + windowHeight) - overScroll;

			posts.each(function(i) {

				var post = $(this),
					postScroll = post.offset().top

				if(postScroll > treshhold) {
					post.addClass('hidden');
                    post.find('.graph').empty();
				} else {
                    if(createGraph) {
                        createGraph(post.find('.graph')[0], i);
                        if(votes[i].mov && !post.find('.mov').children().length){
                            $('<div><i class="fas fa-play-circle"></i></div>').on('click', function() {
                                $('<div>').addClass('overlay').on('click', function(e) {
                                    if($(e.target).hasClass('overlay')) {
                                        videoTemp.dispose();
                                        $('.overlay').remove();
                                    }
                                }).appendTo('body');
                                $('<video id="my-video1" class="video-js vjs-theme-forest" controls><source src="' + votes[i].mov + '" type="application/x-mpegURL" >/></video>').appendTo($('.overlay'));
                                videoTemp = videojs('my-video1');
                            }).appendTo(post.find('.mov'));
                        } 
                        
                        post.find('.mov').css('background-image', 'url(' + votes[i].img + ')');
                    }
					post.removeClass('hidden');
				}

			});

		});
	}

	function setupFade() {

		var posts = $('.post-wrapper .post').reverse(),
			stemWrapper = $('.stem-wrapper'),
			halfScreen = $(window).height() / 2;

		$(window).on('scroll resize', function() {

			delay(function() {

				var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
					scrollSplit = currScroll + halfScreen;

				posts.removeClass('active').each(function(i, el) {

					var post = $(this),
						postOffset = post.offset().top;

					if(scrollSplit > postOffset) {
                        // Add active class to fade in
						post.addClass('active')
                        
						// Get post color
						var color = post.data('stem-color') ? post.data('stem-color') : null,
							allColors = 'color-green color-yellow color-white color-pink color-orange'

						stemWrapper.removeClass(allColors);

						if(color !== null) {
							stemWrapper.addClass('color-' + color);
						}
                        
						return false;
					}

				});
			}, 20);

		});

	}


	function setupClickToScroll(post) {

		var scrollSpeed = 750;

		$('.post-wrapper .post .stem-overlay .icon').click(function(e) {
			e.preventDefault();

			var icon = $(this),
				post = icon.closest('.post'),
				postTopOffset = post.offset().top,
				postHeight = post.height(),
				halfScreen = $(window).height() / 2,
				scrollTo = postTopOffset - halfScreen + (postHeight/2);

			$('html, body').animate({
				scrollTop: scrollTo
			}, scrollSpeed);
		});

	}

})(jQuery);




/*==========  Helpers  ==========*/


// Timeout function
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

$.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};



$(document).ready(function() {
  $(".title").lettering();
  $(".button").lettering();
});

$(document).ready(function() {
  var title1 = new TimelineMax();
  title1.to(".scroll-button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".scroll-button", 0.2, {visibility: 'visible' ,opacity: 1})
}, 1000);
