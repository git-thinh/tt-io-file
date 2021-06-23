﻿{
    data: function() {
        return {
            view: { title: '' },
            article: {
                title: '',
                path: '',
                data: '',
                tags: [],
                images: [],
                html: ''
            },
            lineId_selected: '',
            loading: false,
            error: ''
        };
    },
    watch: {
        article: function (val) {
            var self = this;
            //console.log('CHANGE ARTICLE: ', val);
            //self.openPopupBrowserImage();
        }
    },
    methods: {
        __init: function () {
            var self = this, el = self.$el, view_id = el.getAttribute('id');
            //var sitem = _.map(['Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'French', 'German', 'Greek', 'Hungarian', 'Italian',
            //    'Japanese', 'Korean', 'Lithuanian', 'Persian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'Vietnamese']
            //    , x => '<div class="item">' + x + '</div>').join('');
            //$('.ui-dropdown-MultipleSearchSelection--edit .menu').html(sitem);
            //$('.ui-dropdown-MultipleSearchSelection--edit').dropdown({
            //    //ignoreDiacritics: true,
            //    sortSelect: true,
            //    //fullTextSearch: 'exact',
            //    allowAdditions: true
            //});
            //setTimeout(function () {
            //    $('.ui-dropdown-MultipleSearchSelection--edit').dropdown({ action: 'hide' });
            //    $('.ui-dropdown-MultipleSearchSelection--edit').css({ opacity: 1 });
            //}, 1000);

            var elEdit = document.getElementById('edit-html');
            if (elEdit) {
                var rec = elEdit.getBoundingClientRect();
                var h = window.innerHeight - rec.top - 32;
                h = h.toString().split('.')[0];
                //console.log(window.innerHeight, rec.top, h);
                elEdit.parentElement.style.height = h + 'px';
                elEdit.style.padding = '10px';
            }

            $('#edit-html').keydown(function (e) {
                // trap the return key being pressed                
                if (e.keyCode === 13) {
                    //document.execCommand('insertHTML', false, '<br/>');
                    var id = new Date().getTime();
                    document.execCommand('insertHTML', false, '<p id="' + id + '" onclick="' + view_id + '.selectLineEmpty(' + id + ')" />');
                    self.selectLineEmpty(id);
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            });

                $('*[data-content]').popup();
        },
        updateArticle: function() {

        },
        formatArticle: function(view_id, article) {
            //console.log(view_id);
            var s = article.data || '';
            var html = '';
            var a = s.split('\n');
            a = _.filter(a, x => x.trim().length > 0);
            var id = new Date().getTime();
            for (var i = 0; i < a.length; i++)
                html += a[i] + '<p id="' + (id + i) + '" onclick="' + view_id + '.selectLineEmpty(' + (id + i) + ')"></p>';
            return html;
        },
        selectLineEmpty: function(pid) {
            console.log(pid);
            this.lineId_selected = pid;
        },
        openPopupBrowserImage: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');

            __vcp({
                code: 'image-select',
                scope: __scope,
                popup: true,
                view_ref: id,
                title: 'Images: ' + self.article.title,
                class: 'ui overlay fullscreen modal',
                multi_select: false
            }, null, function (v) {

            }, function (data) {
                var imgs = _.map(_.filter(data.images, x => x.select), x => x.src);
                console.log('close = ', id, imgs, self.article);

                if (imgs.length > 0) {
                    imgs.forEach(x => {
                        if (self.article.images.length == 0) self.article.images.push(x);
                        else self.article.images.unshift(x);
                    });
                }

                //$('#' + id).modal('show');
                //$('#' + id + ' .dimmer').removeClass('active');
            });

        }
    }
}