{
    data: function() {
        return {
            view: { title: '' },
            articles: [],
            url: 'https://vnexpress.net/',
            //url: 'https://zingnews.vn/',
            loading: false,
            error: ''
        };
    },
    watch: {
        url: function (val) {
            var url;
            try { url = new URL(val); } catch (e) { }
            //console.log(url);
            if (url == null || val.length == 0)
                this.error = 'Please input url is http://... or https://...';
            else
                this.error = '';
        }
    },
    methods: {
        __init: function () {
            var self = this;
            this.getSourceUrl();
        },
        uiSetup: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');
            var elMasonry = document.querySelector('#' + id + ' .ui-masonry-grid');
            if (elMasonry) {
                setTimeout(function () {
                    var msr = new Masonry(elMasonry, {
                        itemSelector: '.ui-masonry-item',
                        gutter: 15
                    });
                    elMasonry.style.opacity = 1;
                }, 150);
            }
        },
        openLink: function(link) {
            window.open(link.href);
        },
        fetchArticle: function(link) {
            link.data = '';
            return new Promise((resolve, reject) => {
                __fetchAsync('/curl?url=' + link.href).then(htmlString => {
                    if (htmlString.length == 0) {
                        resolve(link);
                        return;
                    }

                    var parser = new DOMParser();
                    var doc = parser.parseFromString(htmlString, "text/html");
                    var s = '';
                    doc.querySelectorAll('h1').forEach(el => {
                        var h1Text = el.textContent || '';
                        if (h1Text.length > 0
                            && (h1Text == link.title || h1Text == link.text)) {
                            s = '';
                            el.parentElement.childNodes.forEach(li => {
                                var si = li.innerText || '';
                                if (s.length > 0) s += '\n' + si;
                                if (si == link.title) s = ' ';
                            });
                            //console.log(s);
                            link.data = s;
                            resolve(link);
                            return true;
                        }
                    });
                    resolve(link);
                });
            });
        },
        getSourceUrl: function () {
            var self = this, error = self.error;
            if (error.length > 0) {
                alert(error);
                return;
            }
            self.loading = true;

            __fetchAsync('/curl?url=' + self.url).then(htmlString => {
                var uri = new URL(self.url);
                var host = uri.protocol + '//' + uri.host + '/';

                //console.log(host, uri);
                //console.log(htmlString);

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlString, "text/html");

                var links = doc.querySelectorAll('a');
                var ls = [];
                for (var i = 0; i < links.length; i++) {
                    var el = links[i],
                        s = el.innerHTML,
                        text = el.innerText || '',
                        href = el.getAttribute('href') || '';
                    if (href.length == 0 || href.indexOf('javascript') == 0
                        || href[href.length - 1] == '/') continue;

                    text = text.split('\n').join(' ').trim();

                    if (text.length > 0) {
                        if (href.indexOf('http') != 0) {
                            if (href[0] == '/') href = href.substr(1);
                            href = host + href;
                        }

                        ls.push({ text: text, href: href });
                    }
                }
                //ls = _.uniqBy(ls, 'href');
                //ls = _.sortBy(ls, x => x.href);

                var gs = _.groupBy(ls, x => x.href);
                ls = [];
                for (gi in gs) {
                    var lks = _.uniqBy(gs[gi], 'text');
                    if (lks.length == 1) ls.push({ title: lks[0].text, text: '', href: lks[0].href, active: false });
                    else {
                        var s_ = '';
                        for (var i = 1; i < lks.length; i++) s_ += ' \n' + lks[i].text;
                        ls.push({ title: lks[0].text, text: s_.trim(), href: gi, active: false });
                    }
                };

                ls = _.filter(ls, x => localStorage[x.href] == null
                    && (x.title.split(' ').length > 3 || x.text.split(' ').length > 3));
                ls = _.filter(ls, (x, i) => i == 0);

                var fets = _.map(ls, x => self.fetchArticle(x));
                Promise.all(fets).then(results => {
                    var arr = _.filter(results, x => x.data.length > 0);
                    //console.log(arr);

                    self.articles = arr;
                    self.loading = false;
                    self.uiSetup();
                });
            });
        },
        openEditArticle: function(article) {
            __vcp({ code: 'edit', scope: __scope, popup: true, title: 'Update: ' + article.title }, null, function (v) {
                v.$data.article = JSON.parse(JSON.stringify(article));
            });
        }
    }
}