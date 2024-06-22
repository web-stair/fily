/*
 * jquery.fullscreen v0.6.0
 * https://github.com/private-face/jquery.fullscreen
 *
 * Copyright (c) 2012–2016 Vladimir Zhuravlev
 * Released under the MIT license
 * https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: 2016-08-25
 **/
(function(global, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], function (jQuery) {
			return factory(jQuery);
		});
	} else if (typeof exports === 'object') {
		// CommonJS/Browserify
		factory(require('jquery'));
	} else {
		// Global
		factory(global.jQuery);
	}
}(this, function($) {

function defined(a){return"undefined"!=typeof a}function extend(a,b,c){var d=function(){};d.prototype=b.prototype,a.prototype=new d,a.prototype.constructor=a,b.prototype.constructor=b,a._super=b.prototype,c&&$.extend(a.prototype,c)}function native(a,b){var c;"string"==typeof a&&(b=a,a=document);for(var d=0;d<SUBST.length;++d){b=b.replace(SUBST[d][0],SUBST[d][1]);for(var e=0;e<VENDOR_PREFIXES.length;++e)if(c=VENDOR_PREFIXES[e],c+=0===e?b:b.charAt(0).toUpperCase()+b.substr(1),defined(a[c]))return a[c]}}var SUBST=[["",""],["exit","cancel"],["screen","Screen"]],VENDOR_PREFIXES=["","o","ms","moz","webkit","webkitCurrent"],ua=navigator.userAgent,fsEnabled=native("fullscreenEnabled"),parsedChromeUA=ua.match(/Android.*Chrome\/(\d+)\./),IS_ANDROID_CHROME=!!parsedChromeUA,CHROME_VERSION,ANDROID_CHROME_VERSION;IS_ANDROID_CHROME&&(ANDROID_CHROME_VERSION=parseInt(parsedChromeUA[1]));var IS_NATIVELY_SUPPORTED=(!IS_ANDROID_CHROME||ANDROID_CHROME_VERSION>37)&&defined(native("fullscreenElement"))&&(!defined(fsEnabled)||fsEnabled===!0),version=$.fn.jquery.split("."),JQ_LT_17=parseInt(version[0])<2&&parseInt(version[1])<7,FullScreenAbstract=function(){this.__options=null,this._fullScreenElement=null,this.__savedStyles={}};FullScreenAbstract.prototype={native:native,_DEFAULT_OPTIONS:{styles:{boxSizing:"border-box",MozBoxSizing:"border-box",WebkitBoxSizing:"border-box"},toggleClass:null},__documentOverflow:"",__htmlOverflow:"",_preventDocumentScroll:function(){this.__documentOverflow=document.body.style.overflow,this.__htmlOverflow=document.documentElement.style.overflow,$(this._fullScreenElement).is("body, html")||$("body, html").css("overflow","hidden")},_allowDocumentScroll:function(){document.body.style.overflow=this.__documentOverflow,document.documentElement.style.overflow=this.__htmlOverflow},_fullScreenChange:function(){this.__options&&(this.isFullScreen()?(this._preventDocumentScroll(),this._triggerEvents()):(this._allowDocumentScroll(),this._revertStyles(),this._triggerEvents(),this._fullScreenElement=null))},_fullScreenError:function(a){this.__options&&(this._revertStyles(),this._fullScreenElement=null,a&&$(document).trigger("fscreenerror",[a]))},_triggerEvents:function(){$(this._fullScreenElement).trigger(this.isFullScreen()?"fscreenopen":"fscreenclose"),$(document).trigger("fscreenchange",[this.isFullScreen(),this._fullScreenElement])},_saveAndApplyStyles:function(){var a=$(this._fullScreenElement);this.__savedStyles={};for(var b in this.__options.styles)this.__savedStyles[b]=this._fullScreenElement.style[b],this._fullScreenElement.style[b]=this.__options.styles[b];a.is("body")&&(document.documentElement.style.overflow=this.__options.styles.overflow),this.__options.toggleClass&&a.addClass(this.__options.toggleClass)},_revertStyles:function(){var a=$(this._fullScreenElement);for(var b in this.__options.styles)this._fullScreenElement.style[b]=this.__savedStyles[b];a.is("body")&&(document.documentElement.style.overflow=this.__savedStyles.overflow),this.__options.toggleClass&&a.removeClass(this.__options.toggleClass)},open:function(a,b){a!==this._fullScreenElement&&(this.isFullScreen()&&this.exit(),this._fullScreenElement=a,this.__options=$.extend(!0,{},this._DEFAULT_OPTIONS,b),this._saveAndApplyStyles())},exit:null,isFullScreen:null,isNativelySupported:function(){return IS_NATIVELY_SUPPORTED}};var FullScreenNative=function(){FullScreenNative._super.constructor.apply(this,arguments),this.exit=$.proxy(native("exitFullscreen"),document),this._DEFAULT_OPTIONS=$.extend(!0,{},this._DEFAULT_OPTIONS,{styles:{width:"100%",height:"100%"}}),$(document).bind(this._prefixedString("fullscreenchange")+" MSFullscreenChange",$.proxy(this._fullScreenChange,this)).bind(this._prefixedString("fullscreenerror")+" MSFullscreenError",$.proxy(this._fullScreenError,this))};extend(FullScreenNative,FullScreenAbstract,{VENDOR_PREFIXES:["","o","moz","webkit"],_prefixedString:function(a){return $.map(this.VENDOR_PREFIXES,function(b){return b+a}).join(" ")},open:function(a,b){FullScreenNative._super.open.apply(this,arguments);var c=native(a,"requestFullscreen");c.call(a)},exit:$.noop,isFullScreen:function(){return null!==native("fullscreenElement")},element:function(){return native("fullscreenElement")}});var FullScreenFallback=function(){FullScreenFallback._super.constructor.apply(this,arguments),this._DEFAULT_OPTIONS=$.extend({},this._DEFAULT_OPTIONS,{styles:{position:"fixed",zIndex:"2147483647",left:0,top:0,bottom:0,right:0}}),this.__delegateKeydownHandler()};extend(FullScreenFallback,FullScreenAbstract,{__isFullScreen:!1,__delegateKeydownHandler:function(){var a=$(document);a.delegate("*","keydown.fullscreen",$.proxy(this.__keydownHandler,this));var b=JQ_LT_17?a.data("events"):$._data(document).events,c=b.keydown;JQ_LT_17?b.live.unshift(b.live.pop()):c.splice(0,0,c.splice(c.delegateCount-1,1)[0])},__keydownHandler:function(a){return!this.isFullScreen()||27!==a.which||(this.exit(),!1)},_revertStyles:function(){FullScreenFallback._super._revertStyles.apply(this,arguments),this._fullScreenElement.offsetHeight},open:function(a){FullScreenFallback._super.open.apply(this,arguments),this.__isFullScreen=!0,this._fullScreenChange()},exit:function(){this.__isFullScreen&&(this.__isFullScreen=!1,this._fullScreenChange())},isFullScreen:function(){return this.__isFullScreen},element:function(){return this.__isFullScreen?this._fullScreenElement:null}}),$.fullscreen=IS_NATIVELY_SUPPORTED?new FullScreenNative:new FullScreenFallback,$.fn.fullscreen=function(a){var b=this[0];return a=$.extend({toggleClass:null,overflow:"hidden"},a),a.styles={overflow:a.overflow},delete a.overflow,b&&$.fullscreen.open(b,a),this};
//# sourceMappingURL=jquery.fullscreen.min.js.mapreturn $.fullscreen;
}));

/*
 * Plugin name: jQuery Fily plugin
 * Plugin Version: 1.0
 * Pluign URI: https://web-stair.com/fily
 * Author: Web Stair
 * Author Email: web-stair@main.com
 * Author URI: https://web-stair.com
 */
const toggleFullscreen = (el = '.fily-preview') =>
  $.fullscreen.isFullScreen() ? $.fullscreen.exit() : $(el).fullscreen();

(function($, window, document, undefined) {
  "use strict";
  var options;
  $.fn.fily = function(args){

    // Default options
    var defaults = {
        fullscreen      : true,
        fileTypes       : ['jpg', 'jpeg', 'png', 'webp', 'jfif', 'svg', 'pdf', 'mp4', 'mp3']
    };

    options = $.extend(defaults, args);

    var errors = false;

    return this.each(function() {
        var $this           = $(this),
            filyId          = makeid(5),
            url;

        $this.attr('data-fily-id', filyId);

        $this.change(function(e) {

            generatePreviewWrapper(filyId, this);
			var $preview = $(`.fily-preview[data-fily-id="${filyId}"]`);
			$preview.html('');

			$.each(this.files, function(index) {
        		var extension = this.name.split('.').pop().toLowerCase(),
        			isSuccess = options.fileTypes.indexOf(extension) > -1;

                if( isSuccess ) {

			        var reader = new FileReader();
        			reader.onload = (file) => {
                        var $itemPrev = $(`<div class="d-flex bg-light p-2 mb-2 border-bottom align-items-center fily-item" data-id="${index}"></div>`);
                        $itemPrev.append($('<div class="thumb"></div>'));
                        $itemPrev.append($(`<div class="name"><p class="text-start mb-1">${this.name}</p><p class="text-start mb-0 pb-0"><span class="file-size">Size: ${humanFileSize(this.size)}</span></p></div>`));
                        $itemPrev.append($(`<span class="del ms-auto" data-id="${index}">X</span>`));
        				if( extension === 'pdf' ) {
        					let json = JSON.stringify({ dataURL: reader.result });
        					// View the file
        					let fileURL = JSON.parse(json).dataURL;
        					var $pdfPrev = $('<div></div>');
        					$('.thumb', $itemPrev).append($pdfPrev);
        					$preview.append( $itemPrev );
        					$pdfPrev.append(`<object data="${fileURL}" data-file-name="${this.name}"
        					type="application/pdf" width="57" height="76" style="overflow: auto; width:57px;height:76px;" align="middle">
        					</object>`);
        				}
        
        				else if( extension === 'mp4' || extension === 'srt' ) {
        					var fileContent = file.target.result;
                            var video = document.createElement("video");
                            video.src = fileContent;
                            video.width = 57;
                            video.height = 76;
                            video.onloadedmetadata = function() {
                              var duration = video.duration;
                              $('.name .file-size', $itemPrev).after( $(`<span> - Duration: ${convertTime(duration)}</span>`) );
                            };

        					$('.thumb', $itemPrev).append(video);
        					$preview.append( $itemPrev );
        				}
        
        				else if( extension === 'mp3' || extension === 'wav' || extension === 'aac' ) {
                            url = file.target.result;
                            var sound = document.createElement("audio");
                            var link = document.createElement("source");
                            sound.id = `audio-player-${filyId}-${index}`;
                            sound.controls = "controls";
                            link.src = url;
                            sound.type = "audio/mpeg";
                            sound.appendChild(link);

                            sound.onloadedmetadata = function() {
                              var duration = sound.duration;
                              $('.name .file-size', $itemPrev).after( $(`<span> - Duration: ${convertTime(duration)}</span>`) );
                            };

                            $('.thumb', $itemPrev).append(sound);
                            $('.thumb', $itemPrev).append($(`<span class="audio-play" data-target="#audio-player-${filyId}-${index}">▶</span>`));
                            // $itemPrev.addClass('flex-column');
                            $preview.append($itemPrev);
        				}
        				else if( ['png', 'jpg', 'jpeg', 'webp', 'svg', 'jfif'].indexOf(extension) > -1 ) {
        				    url = file.target.result;
        				    // let url = URL.createObjectURL(file);
        				    let $img = new Image();
        				    $img.src = url;
        				    $img.width = 57;
        				    $img.classList.add("img-fluid");
        					$('.thumb', $itemPrev).append($img);
        					$preview.append( $itemPrev );
        				}
        			};


			        reader.readAsDataURL(this);
        		} else {
                    $preview.append($(`<div class="d-flex bg-light p-2 mb-2 border-bottom align-items-center fily-item" data-id="${index}">
                      <span class="fiv-viv fiv-icon-${extension} fiv-size-xl me-2"></span> 
                      <div class="name"><p class="text-start mb-1">${this.name}</p><p class="text-start mb-0 pb-0"><span class="file-size">Size: ${humanFileSize(this.size)}</span></p></div> 
                      <span class="del ms-auto" data-id="${index}">X</span></div>`));
        		}

			});

        });

      $(document).on('click', '.fily-preview .del', function(e) {
        e.preventDefault();
        var filyId    = $(this).parents('.fily-preview').data('fily-id'),
            input     = $(`input[type="file"][data-fily-id="${filyId}"]`)[0],
            $wrapper  = $(`.fily-preview[data-fily-id="${filyId}"]`),
            index     = $(this).data('id');

        console.log( filyId, index );

        $(this).parents('.fily-item').remove();
        const dt = new DataTransfer();
        for (let file of input.files) {
          if (file !== input.files[index]) {
            dt.items.add(file);
          }
        }

        $.each( $wrapper.find('.fily-item'), function(i, element) {
          $(element).attr('data-id', i);
          $('.del', element).attr('data-id', i);
        });

        input.files = dt.files // this will trigger a change event
      });

      $(document).on('click', '.fily-preview .audio-play', function(e) {
        console.log('test');
        var audioID = $(this).data('target'),
            audio = $(audioID)[0];
        if( $(audio).is('.playing') ) {

          $(audio).removeClass('playing');
          $(this).text('▶');
          audio.pause();
          audio.currentTime = 0;

        } else {

          var playingAudio = $('.fily-item audio.playing')[0];

          if( $(playingAudio).length ) {
            $(playingAudio).siblings('.audio-play').click();
          }

          $(audio).addClass('playing');
          $(this).text('⏹');
          audio.play();

        }
        return false;
      });

		$(document).on('click', '.fily-preview .thumb:has(object), .fily-preview .thumb:has(img), .fily-preview .thumb:has(video)', function(e) {
		    e.preventDefault();

            var playingAudio = $('.fily-item audio.playing')[0];
            
            if( $(playingAudio).length ) {
                $(playingAudio).siblings('.audio-play').click();
            }

		    if( $('object', this).length ) {
		        var buffer = $('object', this).attr('data'),
		            fileName = $('object', this).data('file-name');

                let pdfWindow = window.open("", fileName);
                pdfWindow.document.write(
                    "<iframe width='100%' height='100%' src='" + buffer + "'></iframe>"
                );

		    } else {
		        toggleFullscreen($(this).find(':first'));
		    }
		});

		$(document).on('click', '.fullscreen-toggle', function() {
			var $parent = $(this).parent(),
			    id = $parent.data('fily-id');
			toggleFullscreen(`.fily-preview[data-fily-id="${id}"]`);
		});

    	$(document).bind('fscreenchange', function(e, state, elem) {
    		// if we currently in fullscreen mode
    		if ($.fullscreen.isFullScreen()) {
    			$('.fullscreen-toggle img').attr('src', 'js/minimize.svg');
    			$('.fily-preview').addClass('fullscreen');
    		} else {
                setTimeout(function() {
        		    $('.fily-preview video').each(function(index, video) {
    		            video.pause();
    		            video.currentTime = 0;
        		    });
                }, 50);
    			$('.fullscreen-toggle img').attr('src', 'js/maximize.svg');
    			$('.fily-preview').removeClass('fullscreen');
    		}
    	});

    });

    function generatePreviewWrapper(id, inpt) {

		if( $(`.fily-preview[data-fily-id="${id}"]`).length === 0 ) {
			$(inpt).after( $(`<div class="fily-preview m-auto mt-4" style="width: 450px;max-height:300px;overflow:scroll;max-width: calc(100vw - 60px);" data-fily-id="${id}"></div>`) );
		}
    }

	function playSound(arraybuffer) {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var context = new window.AudioContext();
		var source;
	    context.decodeAudioData(arraybuffer, function (buf) {
	        source = context.createBufferSource();
	        source.connect(context.destination);
	        source.buffer = buf;
	        source.start(0);
	    });
	}

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function convertTime(time) {
        var mins = Math.floor(time / 60);
        if (mins < 10) {
          mins = '0' + String(mins);
        }
        var secs = Math.floor(time % 60);
        if (secs < 10) {
          secs = '0' + String(secs);
        }

        return mins + ':' + secs;
    }

    /**
     * Format bytes as human-readable text.
     * 
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use 
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     * 
     * @return Formatted string.
     */
    function humanFileSize(bytes, si=false, dp=1) {
      const thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
      }

      const units = si 
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      const r = 10**dp;

      do {
        bytes /= thresh;
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


      return bytes.toFixed(dp) + ' ' + units[u];
    }

  };

  $(document).ready(function() {
    if( $("input[type='file']").length ) {
      $("input[type='file']").each(function() {
        $(this).fily();
      });
    }
  });


}(jQuery, window, document));
