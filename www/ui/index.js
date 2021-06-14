var __scope = 'article'; var __path = '/ui/views/';
var __vdata = new Vue({
    data: function () {
        return {
            login: true,
            scope_setting: {
                login: { code: 'login', base: true, template: 'login2', popup: true },
                article: {
                    admin: [
                        { code: 'nav', base: true, selector: '#main-left' },
                        { code: 'home' },
                    ]
                },
                theme: {
                    admin: [
                        { code: 'nav', base: true, selector: '#main-left' },
                        { code: 'message' },
                    ]
                },
                book: {
                    admin: [
                        { code: 'nav', base: true, selector: '#main-left' },
                        { code: 'home' },
                    ]
                },
                crawle: {
                    admin: [
                        { code: 'nav', base: true, selector: '#main-left' },
                        { code: 'home' },
                    ]
                }
            },
            user: {
                user_name: 'admin',
                avatar: ''
            },
            message: {
                items: [
                    { title: 'Mẹ U60 đưa con đi phượt giải tỏa áp lực học hành', text: 'Bà Bích Vân (57 tuổi) cùng con trai đã chiêm ngưỡng cảnh đẹp ở hầu hết các tỉnh thành Nam - Bắc và quốc gia lân cận Campuchia.', user: 'Thinh Nguyễn', img_thumbnail: 'https://i1-dulich.vnecdn.net/2021/06/11/IMG6088JPG-1623410422-4611-1623410449.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=bVQbaBiL_eMaMKjrUfM8vA' },
                    { title: 'Tranh cãi nồi chiên không dầu gây nguy cơ ung thư', text: 'Ít ra hiệp hội người tiêu dùng nhà người ta còn làm việc có ích', user: 'Cẩm Tú' },
                ],
                unread: 99,
                total: 12345
            },
            scopes: [
                { code: 'task', title: 'Task', icon: 'check-list' },
                { code: 'chat', title: 'Chat', icon: 'chat' },
                { code: 'email', title: 'Email', icon: 'email' },
                { code: 'order', title: 'Order', icon: 'cart' },
                { code: 'product', title: 'Product', icon: 'product' },
                { code: 'promotion', title: 'Promotion', icon: 'gift' },
                { code: 'landing', title: 'Landing', icon: 'landing' },
                { code: 'article', title: 'Article', icon: 'article' },
                { code: 'job', title: 'Job', icon: 'job' },
                { code: 'book', title: 'Find Book', icon: 'find-book' },
                { code: 'english', title: 'English', icon: 'lightning' },
                { code: 'image', title: 'Images', icon: 'image' },
                { code: 'icon', title: 'Icon', icon: 'flower' },
                { code: 'help', title: 'Help', icon: 'help' },
                { code: 'lang', title: 'Language', icon: 'language' },
                { code: 'tool', title: 'Tool', icon: 'tool' },
                { code: 'ship', title: 'Shipping', icon: 'ship' },
                { code: 'buddha', title: 'Buddha', icon: 'heart' },
                { code: 'report', title: 'Report', icon: 'dashboard' },
                { code: 'theme', title: 'Theme', icon: 'layout' },
                { code: 'crawle', title: 'Crawler', icon: 'link' },
                { code: 'share', title: 'Share', icon: 'share' },
                { code: 'seo', title: 'SEO', icon: 'light' },
                { code: 'user', title: 'User', icon: 'user' },
                { code: 'media', title: 'Media', icon: 'video' },
                { code: 'site', title: 'Site', icon: 'global' },
                { code: 'database', title: 'Database', icon: 'database' },
            ],
            views: __views,

            theme: {
                group: {
                    home: 4,
                    article: 2,
                    grid: 1,
                    price: 1,
                    checkout: 1
                }
            }
        }
    }
});

var __vmix = {
    computed: {
        scope_current: function () {
            var it = _.find(__vdata.scopes, x => x.code == __scope) || {};
            return it;
        },
    },
    methods: {
        __popupClose: function () {
            var self = this, el = self.$el, pa = el.parentElement,
                id = el.getAttribute('id'),
                view = self.$view;
            //console.log('id = ', id, view);

            $(pa).removeClass('visible').removeClass('active')
                .removeClass('transition').addClass('hidden');
            pa.style.removeProperty("display");

            self.$destroy();
            //pa.removeChild(el);
            if (pa) document.body.removeChild(pa);
            $(document.body).removeClass('dimmable').removeClass('dimmed');
        }
    }
};

function __jsi(id, url, callback) {
    if (id != null && id.length > 0) {
        var el = document.getElementById(id);
        if (el) return callback(true);
    }
    var script = document.createElement('script');
    script.onload = function () {
        if (callback) callback(true);
    };
    script.onerror = function () {
        if (callback) callback(false);
    };
    script.setAttribute('src', url);
    if (id) script.setAttribute('id', id);
    document.head.appendChild(script);
}

function __fetchAsync(url, type) {
    type = type || 'text';
    return new Promise((resolve, reject) => {
        fetch(url).then(function (r) {
            if (r.ok) {
                if (type == 'json') resolve(r.json()); else resolve(r.text());
            } else {
                if (type == 'json') resolve(null); else resolve('');
            }
        }).catch(() => {
            if (type == 'json') resolve(null); else resolve('');
        });
    });
}

function __vcp(vcf, template, callback) {
    var code = vcf.code || '';
    if (template == null || template.length == 0) template = code;
    var no_css = vcf.no_css || false;
    var no_js = vcf.no_js || false;
    if (code.length == 0) return callback(null);
    var is_popup = vcf.popup || false;
    var root_ = __path;
    if (vcf.base != true) root_ += __scope + '/';
    //console.log('__vcp: code = ' + code);

    if (!no_js && window['___vc_' + code] == null) {
        try {
            var jsUrl = root_ + code + '.js';
            __fetchAsync(jsUrl).then((jsString) => {
                if (jsString.length == 0) jsString = '{}';
                jsString = 'window["___vc_' + code + '"] = ' + jsString;
                var blob = new Blob([jsString], { scope: "application/javascript;charset=utf-8" });
                const blobURL = URL.createObjectURL(blob);
                //console.log(code, blobURL);
                __jsi('___vc_' + code, blobURL, function (ok) {
                    if (ok) __vcp(vcf, template, callback);
                    else callback(null);
                });

            });
        } catch (e) {
            window['___vc_' + code] = {};
            __vcp(vcf, template, callback);
        }
        return;
    }

    var noyExistCss = document.querySelector('*[ui-view="' + code + '"]') == null;
    if (!no_css && noyExistCss) {
        var link = document.createElement('link');
        link.setAttribute('href', root_ + code + '.css');
        link.setAttribute('rel', 'stylesheet');
        document.head.appendChild(link);
    }

    var urlTemp = root_ + template + '.html';
    __fetchAsync(urlTemp).then(function (htmlString) {
        //console.log('htmlString = ', htmlString);
        if (htmlString.length == 0 && is_popup)
            htmlString = '<div class="p-5 bg-white"><h1>' + code + ' - ' + template + '</h1><hr><div v-on:click="__popupClose" class="ui black button">Close</div></div>';

        var vop = window['___vc_' + code] || {};
        var vueComponent, self, el;
        var selector = vcf.selector || '';

        vop.mixins = [__vmix];

        if (vcf.replace == true && selector.length > 0) {
            var tor = document.querySelector(selector);
            if (tor) {
                tor.innerHTML = '';

                var i = 0, atr;
                for (i = 0, atts = tor.attributes, n = atts.length; i < n; i++) {
                    atr = atts[i].nodeName;
                    if (atr == 'ui-view') {
                        var uiv = tor.getAttribute('ui-view') || '';
                        $(selector).removeClass(uiv);
                    }
                    if (atr != 'id' && atr != 'class') tor.removeAttribute(atr);
                }

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlString, "text/html");
                el = doc.body.firstElementChild;
                tor.innerHTML = el.innerHTML;

                for (i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                    atr = atts[i].nodeName;
                    if (atr != 'id') tor.setAttribute(atr, el.getAttribute(atr));
                }

                $(selector).addClass('ui-view').addClass(code);
                vop.el = selector;

                vueComponent = new Vue(vop);
                vueComponent.$view = vcf;
                self = vueComponent.$mount();
            }
        } else {
            //htmlString = '<div ui-view="' + code + '" class="ui-view ' + __scope + ' ' + code + '">' + htmlString + '</div>';
            htmlString = '<div ui-view="' + code + '">' + htmlString + '</div>';
            vop.template = htmlString;

            vueComponent = new Vue(vop);
            vueComponent.$view = vcf;
            self = vueComponent.$mount();

            if (is_popup) {
                document.body.appendChild(self.$el);
            } else {
                if (selector.length > 0) {
                    el = document.querySelector(selector);
                    el.appendChild(self.$el);
                }
                else {
                    el = document.getElementById('main-body');
                    if (el) {
                        el.innerHTML = '';
                        el.appendChild(self.$el);
                    }
                }
            }
        }

        //console.log(vop);

        self.$el.setAttribute('ui-view', code);

        $(self.$el).addClass('ui-view').addClass(code);
        if (vcf.base == true) $(self.$el).addClass('base');
        else $(self.$el).addClass(__scope);

        var id = code + '-' + (new Date().getTime());
        if (!self.$el.hasAttribute('id')) self.$el.setAttribute('id', id);

        if (is_popup) {
            $(self.$el).modal({ closable: false, centered: true, }).modal('show');
        } if (typeof self.__init == 'function') self.__init();

        if (callback) callback(self);
    }).catch(function () {
        if (callback) callback(null);
    });
}

function __vg(code, template, callback) {
    var vcf = _.find(__vdata.views, x => x.code == code && (x.scope == __scope || x.scope.length == 0));
    if (vcf == null) return console.error('ERROR: Cannot find setting at __vdata.views["' + code + '"]');
    if (code == null || code.length == 0) return;

    __vcp(vcf, template, function (self) {
        if (typeof callback == 'function') callback(self);
    });
}

function __init() {
    __vg('icon-svg', null, function (el) {
        var page = location.pathname.substr(1);
        if (page.endsWith('.html')) page = page.substr(0, page.length - 5);
        if (page.length == 0) page = 'home';
        if (page == 'login') {
            $(document.body).addClass('uib-' + page);
            var vc = __vdata.scope_setting[page];
            __vcp(vc, vc.template, function (self) {
                document.body.style.opacity = 1;
            });
            return;
        }

        if (__vdata.scope_setting[__scope] == null
            || __vdata.scope_setting[__scope][page] == null)
            console.error('!!!ERROR Cannot find setting page: ' + page);
        else {
            $(document.body).addClass('uib-' + page);
            var vcs = __vdata.scope_setting[__scope][page];
            vcs.forEach(function (vc, index) {
                var vi = _.find(__vdata.views, x => x.code == vc.code && x.scope == __scope) || vc;
                vi.template = vc.template;
                __vcp(vi, vi.template, function (self) {
                    if (index == 0) document.body.style.opacity = 1;
                });
            });
            __test_Stub();
        }
    });
}
window.addEventListener('DOMContentLoaded', __init);

function __test_Stub() {
    __vg('import-files');
}
