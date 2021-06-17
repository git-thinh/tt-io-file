{
    data: function() {
        return {
            view: { title: '' },
            links: [],
            //url: 'https://vnexpress.net/',
            url: 'https://zingnews.vn/',
            loading: false,
            error: ''
        };
    },
    watch: {
        'url': function (val) {
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
            fetch('/curl?url=' + link.href).then(r => r.text()).then(htmlString => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlString, "text/html");
                var s = '';
                doc.querySelectorAll('h1').forEach(el => {
                    if (el.textContent == link.title) {
                        s = '';
                        el.parentElement.childNodes.forEach(li => {
                            var si = li.innerText || '';
                            if (s.length > 0) s += '\n' + si;
                            if (si == link.title) s = ' ';
                        });
                        console.log(s);
                        return true;
                    }
                })
            });
        },
        getSourceUrl: function () {
            var self = this, error = self.error;
            if (error.length > 0) {
                alert(error);
                return;
            }
            self.loading = true;

            fetch('/curl?url=' + self.url).then(r => r.text()).then(htmlString => {
                var uri = new URL(self.url);
                var host = uri.protocol + '//' + uri.host + '/';

                //console.log(host, uri);
                //console.log(htmlString);

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlString, "text/html");

                var links = doc.querySelectorAll('a');
                var ls1 = [];
                for (var i = 0; i < links.length; i++) {
                    var el = links[i],
                        s = el.innerHTML,
                        text = el.innerText || '',
                        href = el.getAttribute('href') || '';
                    if (href.length == 0 || href.indexOf('javascript') == 0
                        || href[href.length - 1] == '/') continue;

                    text = text.split('\n').join(' ').trim();

                    //if ((s.indexOf('picture') != -1 || (s.indexOf('img') != -1))
                    //    && (s.indexOf('src') != -1 || s.indexOf('data-src') != -1 || s.indexOf('srcset') != -1)) {
                    //    //console.log(s);
                    //    //var a = s.split('"');
                    //    //a = _.filter(x, x => x.indexOf)
                    //}

                    if (text.length > 0) {
                        if (href.indexOf('http') != 0) {
                            if (href[0] == '/') href = href.substr(1);
                            href = host + href;
                        }

                        //var si = '';
                        //el.querySelectorAll('*').forEach(eli => {
                        //    si += ' ' + (eli.innerText || '');
                        //    eli.parentNode.removeChild(eli);
                        //});
                        //si = (si + ' ' + (el.innerText || '').trim()).trim();
                        //if (text != si) text = si;

                        ls1.push({ text: text, href: href });
                    }
                }
                //ls1 = _.uniqBy(ls1, 'href');
                //ls1 = _.sortBy(ls1, x => x.href);

                var gs = _.groupBy(ls1, x => x.href);
                ls1 = [];
                for (gi in gs) {
                    var lks = _.uniqBy(gs[gi], 'text');
                    if (lks.length == 1) ls1.push({ title: lks[0].text, text: '', href: lks[0].href, active: false });
                    else {
                        var s_ = '';
                        for (var i = 1; i < lks.length; i++) s_ += ' \n' + lks[i].text;
                        ls1.push({ title: lks[0].text, text: s_.trim(), href: gi, active: false });
                    }
                };

                ls1 = _.filter(ls1, x => x.title.split(' ').length > 3 || x.text.split(' ').length > 3);
                console.log(ls1);

                ls1.forEach((lk, i) => {
                    if (i > 0) return false;
                    console.log(lk);
                    self.fetchArticle(lk);
                });

                self.links = ls1;
                self.loading = false;
                self.uiSetup();
            });
        }
    }
}