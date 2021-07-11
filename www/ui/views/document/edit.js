{
    data: function() {
        return {
            view: { title: '' },
            item: {
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

            ////$('#edit-html').keydown(function (e) {
            ////    // trap the return key being pressed                
            ////    if (e.keyCode === 13) {
            ////        //document.execCommand('insertHTML', false, '<br/>');
            ////        var id = new Date().getTime();
            ////        document.execCommand('insertHTML', false, '<p id="' + id + '" onclick="' + view_id + '.lineSelectChanged(' + id + ')" />');
            ////        self.lineSelectChanged(id);
            ////        // prevent the default behaviour of return key pressed
            ////        return false;
            ////    }
            ////});

            ////$('#' + view_id + ' .ui.dropdown').dropdown({
            ////    on: __ismobi ? 'click' : 'hover',
            ////    //forceSelection: false,
            ////    //autoFocus: false,
            ////    showOnFocus: false
            ////});

            ////$('*[data-content]').popup();



        },
        editor_toolbarCreateButton: function (title, eventClick) {
            var btn = document.createElement('button');
            btn.innerHTML = title;
            btn.className = 'ck ck-button';
            if (typeof eventClick == 'function') btn.addEventListener('click', eventClick);
            return btn;
        },
        editor_toolbarBtnEditHTMLClick: function () {
            var html = __editor.getData();
            html = html.split('{{').join('\n{{').split('}}').join('}}\n');
            $('#popupHTML textarea').html(html);
            __modalShow('popupHTML');
        },

        formatArticleByCode: function() {
            var self = this, view_id = self.view.id, item = self.item;
            var html = '';
            console.log('formatArticle = ' + self.mode);

            var s = item.content || '';
            var a = s.trim().split('\n'), ta = [];
            a = _.filter(a, x => x.trim().length > 0);
            var id = new Date().getTime(), cid = Number((id / 99).toString().split('.')[0]);
            for (var i = 0; i < a.length; i++) {
                id++;
                cid++;
                var line = a[i].trim(), code = '',
                    r_empty = '<p id="' + id + '" cmd-i="' + i + '" cmd-type="empty" onclick="' + view_id + '.lineSelectChanged(' + id + ')" class="__line __empty __empty-' + i + '"></p>';

                switch (i) {
                    case 0:
                        html += '<h1>' + line + '</h1>';
                        var numCols = window.innerWidth < 500 ? 'two' : 'five';
                        var mnHeight = window.innerHeight < 500 ? 200 : 350;
                        html += '<div id="tag-select" data-content="Change tags" data-position="bottom left"'
                            + 'class="ui dropdown multiple ' + numCols + ' column scrolling w-100">' //error disabled
                            + '<input type="hidden" name="filters"><i class="tags icon"></i>'
                            + '<span class="text"></span>'
                            + '<div class="menu hidden" style="max-height: ' + mnHeight + 'px !important;"></div></div>';
                        html += r_empty;
                        continue;
                        break;
                }

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
                html += r_empty;
            }

            setTimeout(function () {
                $('#tag-select').dropdown({
                    //action: function (value, text) {
                    //    console.log(value, text)
                    //}
                });

                var its = ''
                    //+ '<div class="header"><i class="tags icon"></i>Filter by tag</div>'
                    //+ '<div class="divider"></div>'
                    + '<div class="ui icon search input w-100"><i class="search icon"></i><input type="text" placeholder="Search tags..."></div>'
                //+ '<div class="ui error message"><div class="header">Error</div><p>You must log-in to see all categories</p></div>'
                //+ '<div class="item">Danish</div><div class="item">Dutch</div><div class="item">English</div><div class="item">French</div><div class="item">German</div><div class="item">Greek</div><div class="item">Hungarian</div><div class="item">Italian</div><div class="item">Japanese</div><div class="item">Korean</div><div class="item">Lithuanian</div><div class="item">Persian</div><div class="item">Polish</div><div class="item">Portuguese</div><div class="item">Russian</div><div class="item">Spanish</div><div class="item">Swedish</div><div class="item">Turkish</div><div class="item">Vietnamese</div>';
                for (var i = 1; i < 1000; i++) its += '<div class="item">Item ' + i + '</div>';
                $('#tag-select .menu').html(its);

                $('*[data-content]').popup();
            }, 500);

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

                switch (i) {
                    case 0:
                        html += '<h1>' + line + '</h1>';
                        continue;
                        break;
                }

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
            if (line[line.length - 1] == ':' || (line[0] == '"' && line[line.length - 1] == '"')) return true;

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
        changeTags: function(line_id) {
            var self = this;
            self.lineSelectChanged(line_id);
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
        formatAutoAllLines: function() {
            var self = this;
            console.log('formatArticle = ' + self.mode);

            var s = self.article.data || '';
            var a = s
                .split('<BR>').join('\n')
                .split('<br>').join('\n')
                .split('<br/>').join('\n')
                .split('<br />').join('\n')
                .split('\n'), ta = [];
            a = _.filter(a, x => x.trim().length > 0);
            for (var i = 0; i < a.length; i++) {
                var line = a[i].trim();
                if (line[0] == '{') continue;

                if (self.lineCheckIsHeading(line)) {
                    ta = _.filter(line.split(':'), x => x.trim().length > 0);
                    if (ta.length > 1) {
                        a[i] = '{H}' + ta[0] + '\n\n' +
                            line.substr(ta[0].length, line.length - ta[0].length).trim().substr(1).trim();
                    } else a[i] = '{H}' + line;
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
        domVirtualBuild: function() {
            var edit = document.getElementById('edit-html');
            if (edit) {
                var htmlString = edit.innerHTML;
                htmlString = htmlString
                    .split('<p ').join('^<p ')
                    .split('<br ').join('^<br ')
                    .split('>').join('>^');

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlString, "text/html");

                var tag = doc.getElementById('tag-select');
                tag.parentElement.removeChild(tag);

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