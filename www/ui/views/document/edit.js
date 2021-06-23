{
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
            mode: 'code',
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
                    document.execCommand('insertHTML', false, '<p id="' + id + '" onclick="' + view_id + '.lineSelectChanged(' + id + ')" />');
                    self.lineSelectChanged(id);
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            });

            $('*[data-content]').popup();
        },
        updateArticle: function() {

        },
        modeChanged: function(mode) {
            var self = this;
            console.log(self.mode + ' -> ' + mode);
            self.mode = mode;
            self.$forceUpdate();
        },
        formatArticle: function(view_id, article) {
            var self = this;
            console.log('formatArticle = ' + self.mode);

            var s = article.data || '';
            var html = '';
            var a = s.split('\n'), ta = [];
            a = _.filter(a, x => x.trim().length > 0);
            var id = new Date().getTime(), cid = Number((id / 99).toString().split('.')[0]);
            for (var i = 0; i < a.length; i++) {
                id++;
                cid++;
                var line = a[i].trim(), code = '';
                if (line.indexOf('{H}') == 0) {
                    code = 'H';
                    line = line.substr(3);
                }

                switch (code) {
                    case 'H':
                        html += '<h3 cmd-text="{H}" id="' + cid + '" onclick="' + view_id + '.lineSelectChanged(' + cid + ')" class="__line">' + line + '</h3>';
                        break;
                    default:
                        if (line.endsWith('.jpg') || line.endsWith('.jpeg') || line.endsWith('.png') || line.endsWith('.gif') || line.endsWith('.svg')) {
                            ta = _.map(line.split('|'), x => x.trim());
                            if (self.mode == 'view') {
                                html += '<div id="' + cid + '" class="__img __line">';
                                html += '<img src="' + ta.join('"><img src="') + '">';
                                html += '</div>';
                                continue;
                            }
                        }
                        html += '<div id="' + cid + '" onclick="' + view_id + '.lineSelectChanged(' + cid + ')" class="__line">' + line + '</div>';
                        break;
                }
                html += '<p id="' + id + '" onclick="' + view_id + '.lineSelectChanged(' + id + ')" class="__line"></p>';
            }
            return html;
        },
        lineSelectChanged: function(pid) {
            console.log(pid);
            this.lineId_selected = pid;
            $('.__line').removeClass('active');
            $('#' + pid).addClass('active');
        },
        updateHeading: function() {

        },
        insertImageDialog: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');

            if (self.lineId_selected.length == 0) {
                self.__alert('Message', 'Please choose a line to insert image at there');
                return;
            }

            __vcp({
                code: 'image-select',
                scope: __scope,
                popup: true,
                view_ref: view_id,
                title: 'Insert Image: ' + self.article.title,
                class: 'ui overlay fullscreen modal',
                multi_select: true
            }, null, function (v) {

            }, function (data) {
                var imgs = _.map(_.filter(data.images, x => x.select), x => x.src);
                console.log('close = ', view_id, imgs);

                if (imgs.length > 0) {
                    imgs.forEach(x => {
                        self.article.images.push(x);
                    });

                    var edit = document.getElementById('edit-html');
                    if (edit) {
                        var htmlString = edit.innerHTML;
                        htmlString = htmlString
                            .split('<p ').join('^<p ')
                            .split('<br ').join('^<br ')
                            .split('>').join('>^');

                        var parser = new DOMParser();
                        var doc = parser.parseFromString(htmlString, "text/html");

                        var cms = doc.body.querySelectorAll('.__line[cmd-text]');
                        console.log(cms);
                        cms.forEach(li => {
                            var cmd_text = li.getAttribute('cmd-text');
                            var lit = li.innerText || '';
                            lit = lit.trim();
                            if (lit.length > 0 && lit[0] == '^') lit = lit.substr(1);
                            li.innerHTML = '^' + cmd_text + lit;
                        });

                        var line = doc.getElementById(self.lineId_selected);
                        if (line) line.innerHTML = imgs.join('| ');

                        var out = doc.body.innerText.split('^').join('\n');
                        var a = _.filter(out.split('\n'), x => x.trim().length > 0);
                        //console.log(a);

                        self.article.data = a.join('\n');
                    }


                    //var line = document.getElementById(self.lineId_selected);
                    //if (line) line.style.backgroundColor = 'red';
                    //document.execCommand('insertHTML', false, imgs.join('<br>'));

                    //debugger;
                    //var line = document.getElementById(self.lineId_selected);
                    //if (line) line.innerHTML = imgs.join('<br>');
                }

                //$('#' + view_id).modal('show');
                //$('#' + view_id + ' .dimmer').removeClass('active');
            });

        },
        openPopupBrowserImage: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');

            __vcp({
                code: 'image-select',
                scope: __scope,
                popup: true,
                view_ref: view_id,
                title: 'Images: ' + self.article.title,
                class: 'ui overlay fullscreen modal',
                multi_select: false
            }, null, function (v) {

            }, function (data) {
                var imgs = _.map(_.filter(data.images, x => x.select), x => x.src);
                console.log('close = ', view_id, imgs, self.article);

                if (imgs.length > 0) {
                    imgs.forEach(x => {
                        if (self.article.images.length == 0) self.article.images.push(x);
                        else self.article.images.unshift(x);
                    });
                }

                //$('#' + view_id).modal('show');
                //$('#' + view_id + ' .dimmer').removeClass('active');
            });

        }
    }
}