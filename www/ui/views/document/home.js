{
    data: function() {
        return {
            nav_visible: !__ismobi,
            items: []
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this;
            self.doc_getFilter(function (items) {
                //console.log(items);
                self.items = items;
                Vue.nextTick(function () {
                    self.uiSetup();
                    //self.doc_editClick(items[0]);
                });
            });
        },
        uiSetup: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');
            setTimeout(function () {
                var masonryContainer = '#' + id + ' .ui-masonry-grid';
                $(masonryContainer).masonry();
                $(masonryContainer).masonry('destroy');
                $(masonryContainer).removeData('masonry');
                $(masonryContainer).masonry({ gutter: 10 });

                $(masonryContainer).css({ opacity: 1 });
            }, 250);

            //var self = this, el = self.$el, id = el.getAttribute('id');
            //var elMasonry = document.querySelector('#' + id + ' .ui-masonry-grid');
            //if (elMasonry) {
            //    setTimeout(function () {
            //        var msr = new Masonry(elMasonry, {
            //            itemSelector: '.ui-masonry-item',
            //            gutter: 15
            //        });
            //        elMasonry.style.opacity = 1;
            //    }, 150);
            //}

            //var sitem = _.map(['Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'French', 'German', 'Greek', 'Hungarian', 'Italian',
            //    'Japanese', 'Korean', 'Lithuanian', 'Persian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'Vietnamese']
            //    , x => '<div class="item">' + x + '</div>').join('');
            //$('.ui-dropdown-MultipleSearchSelection .menu').html(sitem);
            //$('.ui-dropdown-MultipleSearchSelection').dropdown({
            //    //ignoreDiacritics: true,
            //    sortSelect: true,
            //    //fullTextSearch: 'exact',
            //    allowAdditions: true
            //});
        },

        doc_getDescription: function(text) {
            text = text || '';
            var s = '', a = _.filter(text.split('\n'), x => x.trim().length > 0);
            //if (text.length > 100) s = text.substr(0, 99) + '...';
            if (a.length > 1) s = a[1];
            return s;
        },
        doc_getFilter: async function(callback) {
            var self = this, arr = [], result = [];

            var apiImages = await __fetchAsync('api/image/get_filter?site=' + __site, 'json');
            if (apiImages && apiImages.ok && apiImages.items) {
                apiImages.items.forEach(it => {
                    it.image = '/static/images/' + it.site + '/' + it.key;
                    it.select = false;
                    it.loading = false;
                });
                arr.push(apiImages.items);
            }

            var apiDoc = await __fetchAsync('api/document/get_filter?site=' + __site, 'json');
            //console.log(apiDoc);
            if (apiDoc && apiDoc.ok && apiDoc.items) {
                apiDoc.items.forEach(it => {
                    it.select = false;
                    it.loading = false;
                });
                arr.push(apiDoc.items);
            }

            //var themes = self.theme_getCollection();
            //console.log(themes);
            //arr.push(themes);



            const fn = _.spread(_.union);
            result = fn(arr);
            result.forEach(x => {
                switch (x.type) {
                    case 'book':
                        x.icon = 'book';
                        break;
                    case 'article':
                        x.icon = 'file alternate outline';
                        break;
                    case 'theme':
                        x.icon = 'dice d6';
                        break;
                    case 'image':
                        var fix_width = 290;
                        if (x.width < fix_width) {
                            x.width2 = x.width;
                            x.height2 = Number(((x.width * x.height) / x.width).toString().split('.')[0]);
                        } else {
                            x.width2 = fix_width;
                            x.height2 = Number(((fix_width * x.height) / x.width).toString().split('.')[0]);
                        }
                        //console.log(x.orientation, x.width, x.height, '-', x.width2, x.height2, x.key);
                        break;
                }

                var lm = x.last_modified || '';
                if (lm.length > 0) {
                    lm = lm.split('T').join('').split('-').join('').split(':').join('').split('.')[0];
                    lm = Number(lm);
                    x.last_modified = lm;
                } else x.last_modified = 0;
            });

            result = _.sortBy(result, ['last_modified']);
            result = result.reverse();
            result = _.filter(result, (x, i) => i < 20);

            //console.log(result);

            if (callback) callback(result);
        },
        doc_editClick: function(article) {
            __vcp({
                code: 'edit',
                scope: __scope,
                popup: true,
                title: 'Update: ' + article.title,
                class: 'ui overlay fullscreen modal'
            }, null, function (v) {
                v.$data.article = JSON.parse(JSON.stringify(article));
            });
        },
        doc_getTags: function(d) {
            if (d && d.tag != null && d.tag.length > 0) {
                var a = d.tag.split(',');
                a = _.filter(a, x => x.length > 0);
                return a;
            }
            return [];
        },

        buttonClick: function(v) {
            var self = this, code = v.code, selected = v.selected, cmd = selected;
            if (selected && selected.code) cmd = selected.code;

            console.log('item click = ' + code + ' > ' + cmd);
            switch (cmd) {
                case 'upload_image':
                    self.image_uploadClick();
                    break;
            }


            //__vopen(cmd, null, function (v) {

            //}, function () {

            //});
        },

        type_getMenuFilter: function() {
            var a = _.map(__vdata.tags, (x, i) => {
                return { code: 'filter_type', name: x, text: x, counter: i, icon_svg_name: 'tag-' + x, cla_icon: '' };
            });
            a = _.filter(a, x => x.name != 'domain');
            //console.log(a);
            return a;
        },
        domain_getAll: function() {
            var a = _.map(__vdata.domains, (x, i) => {
                return { code: 'filter_domain', name: x, text: x, counter: i, icon_svg_name: 'icon-link', cla_icon: '' };
            });
            //console.log(a);
            return a;
        },
        document_menuMore: function() {
            var a = [
                { code: 'upload_image', text: 'Upload image' },
                { code: 'hr' },
                { code: 'manage_domain', text: 'Manage domain' },
                { code: 'manage_tag', text: 'Manage tag' },
                { code: 'manage_user', text: 'Manage user' },
                { code: 'manage_language', text: 'Manage language' },
                { code: 'hr' },
            ];
            _.forEach(__vdata.tags, (x, i) => {
                if (x != 'image'
                    && x != 'domain'
                    && x != 'kit'
                    && x != 'task'
                    && x != 'promotion'
                    && x != 'job'
                    && x != 'english') {
                    a.push({ code: 'create_new_tag', name: x, text: 'Create new ' + x, counter: i, icon_svg_name: 'tag-' + x, cla_icon: '' });
                }
            });
            a.push({ code: 'hr' });
            a.push({ code: 'crawle_url', text: 'Crawle content from Url' });
            return a;
        },

        image_uploadClick: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('onchange', view_id + '.image_uploadFileOnChange(this)');
            input.style.display.opacity = 0;
            document.body.appendChild(input);
            $(input).trigger('click');
        },
        image_uploadFileOnChange: function(input) {
            var self = this;
            var files = input.files;
            console.log(files);
            if (files.length == 0) return;
            var file = files[0], type = file.type;
            if (type == "image/gif" || type == "image/png" || type == "image/jpeg" || type == "image/jpg") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = {
                        key: file.name,
                        publish: false,
                        site: __site,
                        tag: '',
                        title: file.name.split('.')[0],
                        type: 'image',
                        loading: true,
                        select: false,
                        image: e.target.result
                    };
                    //console.log(img);
                    self.items.unshift(img);
                    self.$forceUpdate();
                    setTimeout(function () { self.uiSetup(); }, 150);

                    self.image_uploadFileToServer(file);
                }
                reader.readAsDataURL(file);
            }

            document.body.removeChild(input);
        },
        image_uploadFileToServer: function(file) {
            var self = this;
            const f = new FormData();
            f.append('file', file);
            fetch('/images?site=' + __site, { method: 'POST', body: f }).then(r => r.json()).then(j => {
                console.log(j);
                self.__init();
            });
        },
        image_openView: function(item) {
            __vopen('image-view', '', function (v) {
                v.image = item.image;
                v.title = item.key;
                v.width = item.width;
                v.height = item.height;
            }, function () {

            });
        },

        doc_removeConfirm: function(item) {
            var self = this, s = '';
            switch (item.type) {
                case 'image':
                    s = 'Are you sure remove image: ' + item.key
                        + '<br><br><center><img class="w-auto" src="' + item.image + '" style="max-height:250px;"></center>';
                    __alert(s, 'Delete image',
                        function (v) {
                            //console.log('open = ', v);
                        }, function (v) {
                            console.log('close = ', v.command, item.key);
                            if (v.command == 'ok') {
                                fetch('/images?site=' + item.site + '&file=' + item.key, { method: 'DELETE' }).then(r => r.json()).then(j => {
                                    console.log(j);
                                    self.__init();
                                });
                            }
                        });
                    break;
            }
        },
    }
}