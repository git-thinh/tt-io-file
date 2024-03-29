﻿var __pop_current;
var __vmix = {
    computed: {
        scope_current: function () {
            var it = _.find(__vdata.scopes, x => x.code == __scope) || {};
            return it;
        },
    },
    methods: {
        __alert: function (title, message, callbackOpen, callbackClose) {
            var self = this, el = self.$el, id = el.getAttribute('id');
            __vcp({
                code: 'form',
                base: true,
                fields: [
                    {
                        type: 'alert',
                        value: message
                    },
                ],
                scope: __scope,
                popup: true,
                view_ref: id,
                title: title,
                class: 'bg-transparent position-absolute top-0 start-0 w-100 h-100 d-flex'
            }, null, callbackOpen, callbackClose);
        },
        __popupClose: function () {
            var self = this,
                el = self.$el,
                pa = el.parentElement,
                id = el.getAttribute('id'),
                view = self.view || {},
                data,
                callbackClose = window[id + '.close'];
            //console.log('id = ', id, view);

            if (callbackClose) data = JSON.parse(JSON.stringify(self.$data));

            self.$destroy();
            if (pa.childNodes.length == 1) {
                pa.style.removeProperty("display");
                $(pa).removeClass('visible').removeClass('active').removeClass('transition').addClass('hidden');

                $(document.body).removeClass('dimmable').removeClass('dimmed');

                document.body.removeChild(pa);
            } else {
                pa.removeChild(el);
            }

            if (view.view_ref)
                $('#' + view.view_ref + ' .dimmer').first().dimmer('hide');

            if (callbackClose) callbackClose(data);
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

function __vcp(vcf, template, callbackOpen, callbackClose) {
    var code = vcf.code || '';
    if (template == null || template.length == 0) template = code;
    var no_css = vcf.no_css || false;
    var no_js = vcf.no_js || false;
    if (code.length == 0) return callbackOpen(null);
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
                    if (ok) __vcp(vcf, template, callbackOpen, callbackClose);
                    else callbackOpen(null);
                });

            });
        } catch (e) {
            window['___vc_' + code] = {};
            __vcp(vcf, template, callbackOpen, callbackClose);
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
    var id = code.split('-').join('_') + '_' + (new Date().getTime());
    vcf.id = id;

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
                        //var elLeft = document.getElementById('main-left');
                        //if (elLeft) {
                        //    var wmain = window.innerWidth - elLeft.getBoundingClientRect().width;
                        //    console.log(wmain);
                        //    el.style.width = wmain + 'px';
                        //}

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
        if (vcf.class != null && vcf.class.length > 0) $(self.$el).addClass(vcf.class);

        if (!self.$el.hasAttribute('id')) self.$el.setAttribute('id', id);

        if (is_popup) {

            ////$(self.$el).modal({
            ////    //autofocus: false,
            ////    inverted: false,
            ////    closable: false,
            ////    centered: true,
            ////    allowMultiple: true
            ////}).modal('show');

            ////console.log(vcf.view_ref);
            ////if (vcf.view_ref) {
            ////    //$('#' + vcf.view_ref + ' .dimmer').addClass('active');
            ////    $('#' + vcf.view_ref + ' .dimmer').first().dimmer({
            ////        closable: false,
            ////        transition: 'fade up',
            ////        //on: 'hover'
            ////    }).addClass('opacity-50').dimmer('show');
            ////}

        }

        if (typeof self.__init == 'function') self.__init();

        console.log('__vcp = ' + code);
        self.$data.view = vcf;

        if (is_popup) {
            __pop_current = self;
            self.$el.parentElement.childNodes.forEach((el, i_) => { el.style.zIndex = i_; });
            //console.log(self.view);
            //setTimeout(function () { $('.ui.popup').popup('hide all'); }, 150);


        }

        if (vcf.style) $(self.$el).css(vcf.style);

        window[id] = self;
        if (callbackClose) window[id + '.close'] = callbackClose;
        if (callbackOpen) callbackOpen(self);
    }).catch(function () {
        if (callbackOpen) callbackOpen(null);
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
    //debugger;
    //__vg('import-files');
    //__vg('crawle-url');
}
