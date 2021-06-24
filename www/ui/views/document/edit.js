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
            lineIndex_selected: 0,
            loading: false,
            error: ''
        };
    },
    watch: {
        article: function (val) {
            var self = this;
            console.log('CHANGE ARTICLE ... ');
            self.formatAutoAllLines();

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
        changeImageDefault: function() {
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
                //console.log('close = ', view_id, imgs, self.article);

                if (imgs.length > 0) {
                    imgs.forEach(x => {
                        if (self.article.images.length == 0) self.article.images.push(x);
                        else self.article.images.unshift(x);
                    });
                }

                //$('#' + view_id).modal('show');
                //$('#' + view_id + ' .dimmer').removeClass('active');
            });

        },
        updateArticle: function() {

        },
        formatArticleByCode: function() {
            var self = this, view_id = self.view.id, article = self.article;
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
                        html += '<div cmd-text="{H}" cmd-i="' + i + '" id="' + cid + '" cmd-type="text" onclick="' + view_id + '.lineSelectChanged(' + cid + ')" class="__line h3 __text-' + i + '">' + line + '</div>';
                        break;
                    default:
                        if (line.endsWith('.jpg') || line.endsWith('.jpeg') || line.endsWith('.png') || line.endsWith('.gif') || line.endsWith('.svg')) {
                            ta = _.map(line.split('|'), x => x.trim());
                            if (self.mode == 'view') {
                                html += '<div id="' + cid + '" cmd-i="' + i + '" cmd-type="image" class="__img __line __image-' + i + '">';
                                html += '<img src="' + ta.join('"><img src="') + '">';
                                html += '</div>';
                                continue;
                            }
                        }
                        html += '<div id="' + cid + '" cmd-i="' + i + '" cmd-type="text" onclick="' + view_id + '.lineSelectChanged(' + cid + ')" class="__line __text-' + i + '">' + line + '</div>';
                        break;
                }
                html += '<p id="' + id + '" cmd-i="' + i + '" cmd-type="empty" onclick="' + view_id + '.lineSelectChanged(' + id + ')" class="__line __empty __empty-' + i + '"></p>';
            }
            return html;
        },
        formatArticleByView: function() {
            var self = this, view_id = self.view.id, article = self.article;
            console.log('formatArticle = ' + self.mode);

            var s = article.data || '';
            var html = '';
            var a = s.split('\n'), ta = [];
            a = _.filter(a, x => x.trim().length > 0);

            for (var i = 0; i < a.length; i++) {
                var line = a[i].trim(), code = '';
                if (line.indexOf('{H}') == 0) {
                    code = 'H';
                    line = line.substr(3);
                }

                switch (code) {
                    case 'H':
                        html += '<h3>' + line + '</h3>';
                        break;
                    default:
                        if (line.endsWith('.jpg') || line.endsWith('.jpeg') || line.endsWith('.png') || line.endsWith('.gif') || line.endsWith('.svg')) {
                            ta = _.map(line.split('|'), x => x.trim());
                            if (self.mode == 'view') {
                                html += '<div class="__img">';
                                html += '<img src="' + ta.join('"><img src="') + '">';
                                html += '</div>';
                                continue;
                            }
                        }
                        html += '<p>' + line + '</p>';
                        break;
                }
            }
            return html;
        },
        lineCheckIsHeading: function (line) {
            line = (line || '').trim();
            if (line[line.length - 1] == ':') return true;

            var a = line.toLowerCase().split(/[\s,.]+/), s = a[0];
            var ix = Number(s);
            if (isNaN(ix) == false
                || s == 'i'
                || s == 'ii'
                || s == 'iii'
                || s == 'iv'
                || s == 'v'
                || s == 'vi'
                || s == 'vii'
                || s == 'viii'
                || s == 'ix'
                || s == 'x'
                || s == 'xi'
                || s == 'xii'
                || s == 'xiii'
                || s == 'xiv'
                || s == 'xv'
            ) return true;
            return false
        },
        formatAutoAllLines: function() {
            var self = this;
            console.log('formatArticle = ' + self.mode);

            var s = self.article.data || '';
            var a = s.split('\n'), ta = [];
            a = _.filter(a, x => x.trim().length > 0);
            for (var i = 0; i < a.length; i++) {
                var line = a[i].trim();
                if (line[0] == '{') continue;

                if (self.lineCheckIsHeading(line)) {
                    ta = _.filter(line.split(':'), x => x.trim().length > 0);
                    if (ta.length > 1) {
                        a[i] = '{H}' + ta[0] + '\n\n' +
                            line.substr(ta[0].length, line.length - ta[0].length).trim().substr(1).trim();
                    }else a[i] = '{H}' + line;
                } else if (line.endsWith('.jpg') || line.endsWith('.jpeg') || line.endsWith('.png') || line.endsWith('.gif') || line.endsWith('.svg')) {
                    
                }
            }
            self.article.data = a.join('\n');
        },
        lineSelectChanged: function(line_id) {
            this.lineId_selected = line_id;
            var line = document.getElementById(line_id);
            if (line) {
                var index = Number(line.getAttribute('cmd-i') || '');
                this.lineIndex_selected = index;
                console.log(line_id, index);
            }
            $('.__line').removeClass('active');
            $('#' + line_id).addClass('active');
        },
        domVirtualBuild: function(funcProcess) {
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
                //console.log(cms);
                cms.forEach(li => {
                    var cmd_text = li.getAttribute('cmd-text');
                    var lit = li.innerText || '';
                    lit = lit.trim();
                    if (lit.length > 0 && lit[0] == '^') lit = lit.substr(1);
                    li.innerHTML = '^' + cmd_text + lit;
                });
                return doc;
            }
            return null;
        },
        domGetText: function(doc) {
            var out = doc.body.innerText.split('^').join('\n');
            var a = _.filter(out.split('\n'), x => x.trim().length > 0);
            out = a.join('\n');
            //console.log(a);
            return out;
        },
        cmdCall: function(cmd) {
            var self = this;
            switch (cmd) {
                case 'CODE':
                case 'VIEW':
                    console.log(self.mode + ' -> ' + cmd);
                    self.mode = cmd.toLowerCase();
                    self.$forceUpdate();
                    break;
                case 'HEADING':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    self.cmd_editHeading();
                    break;
                case 'BOLD':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    break;
                case 'REMOVE':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    break;
                case 'INSERT_IMAGE':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    self.cmd_insertImage();
                    break;
                case 'INSERT_VIDEO':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    break;
                case 'INSERT_LINK':
                    if (self.mode != 'code') return;
                    if (self.lineId_selected.length == 0) {
                        self.__alert('Message', 'Please choose a line to insert image at there');
                        return;
                    }
                    break;
            }
        },
        cmd_editHeading: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');
            var doc = self.domVirtualBuild();
            if (doc) {
                var line = doc.getElementById(self.lineId_selected);
                if (line) {
                    var isHeading = line.className.indexOf('h3') != -1;
                    var s = (line.innerText || '').trim();
                    //console.log('?????=', s);
                    if (s.indexOf('^{H}') == 0) s = '^' + s.substr(4).trim();
                    else if (s.indexOf('^') == 0) s = '^{H}' + s.substr(1).trim();
                    line.innerText = s;

                    var out = self.domGetText(doc);
                    self.article.data = out;
                    //self.$forceUpdate();

                    setTimeout(function () {
                        line = document.querySelector('.__text-' + self.lineIndex_selected);
                        if (line) {
                            self.lineId_selected = line.getAttribute('id');
                            $('#' + self.lineId_selected).addClass('active');
                            $('#' + self.lineId_selected).focus();
                        }
                    }, 350);
                }
            }
        },
        cmd_insertImage: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');
            __vcp({
                code: 'image-select',
                scope: __scope,
                popup: true,
                view_ref: view_id,
                title: 'Insert Image: ' + self.article.title,
                class: 'ui overlay fullscreen modal',
                multi_select: true
            }, null, null, function (data) {
                var imgs = _.map(_.filter(data.images, x => x.select), x => x.src);
                //console.log('close = ', view_id, imgs);

                if (imgs.length > 0) {
                    imgs.forEach(x => {
                        self.article.images.push(x);
                    });

                    var doc = self.domVirtualBuild();
                    if (doc) {
                        var line = doc.getElementById(self.lineId_selected);
                        if (line) line.innerHTML = imgs.join(' | ');
                        var out = self.domGetText(doc);
                        self.article.data = out;
                        self.$forceUpdate();
                    }
                }
            });
        },
    }
}