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
function __fetchAsync(url, type, options) {
    type = type || 'json';
    options = options || {};
    options.method = options.method || 'GET';

    return new Promise((resolve, reject) => {
        fetch(url, options).then(function (r) {
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
function __isViewBase(code) {
    return _.findIndex(__vdata.views_base, x => x == code) != -1;
}
function __vopen(vcf, template, callbackOpen, callbackClose) {
    var code = '';
    if (vcf == null) return;
    if (typeof vcf == 'string') {
        code = vcf.toLowerCase().trim();
        var vitem = _.find(__vdata.views, x => x.code == code);
        if (vitem == null) {
            vitem = { code: vcf, popup: true, base: __isViewBase(code) };
            console.log('!!!!!!ERROR: Cannot find setting at __vdata.views["' + code + '"]', vitem);
            vcf = vitem;
        }
        else vcf = vitem;
    }

    code = vcf.code || '';
    if (template == null || template.length == 0) template = code;
    var no_css = vcf.no_css || false;
    var no_js = vcf.no_js || false;
    if (code.length == 0) return callbackOpen(null);
    var is_popup = vcf.popup || false;
    var root_ = __path;
    if (vcf.base != true) root_ += __scope + '/';
    /*console.log('__vopen: code = ' + code);*/

    if (!no_js && window['___vc_' + code] == null) {
        try {
            var jsUrl = root_ + code + '.js';
            __fetchAsync(jsUrl, 'text').then((jsString) => {
                if (jsString.length == 0) jsString = '{}';
                jsString = 'window["___vc_' + code + '"] = ' + jsString;
                var blob = new Blob([jsString], { scope: "application/javascript;charset=utf-8" });
                const blobURL = URL.createObjectURL(blob);
                //console.log(code, blobURL);
                __jsi('___vc_' + code, blobURL, function (ok) {
                    if (ok) __vopen(vcf, template, callbackOpen, callbackClose);
                    else callbackOpen(null);
                });

            });
        } catch (e) {
            window['___vc_' + code] = {};
            __vopen(vcf, template, callbackOpen, callbackClose);
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

    __fetchAsync(urlTemp, 'text').then(function (htmlString) {
        //console.log('htmlString = ', htmlString);
        if (htmlString.length == 0 && is_popup)
            htmlString = '<div class="modal"><div class="modal-dialog"><div class="modal-content">'
                + '<div class="modal-header">' + code + ' - ' + template + '</div>'
                + '<div class="modal-footer"><button type="button" class="btn btn-primary" @click="__popupClose">Exit</button></div>'
                + '</div></div></div>';
        //htmlString = '<div class="p-5 bg-white"><h1>' + code + ' - ' + template + '</h1><hr><div v-on:click="__popupClose" class="ui black button">Close</div></div>';

        var vop = window['___vc_' + code] || {};
        var vueComponent, self, elComponent;
        var selector = vcf.selector || '';

        vop.mixins = [__mx_coms];

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
                elComponent = self.$el;
            }
        } else {
            //htmlString = '<div ui-view="' + code + '" class="ui-view ' + __scope + ' ' + code + '">' + htmlString + '</div>';
            //htmlString = '<div ui-view="' + code + '">' + htmlString + '</div>';
            vop.template = htmlString;

            vueComponent = new Vue(vop);
            vueComponent.$view = vcf;
            self = vueComponent.$mount();
            elComponent = self.$el;

            if (is_popup) {
                document.body.appendChild(elComponent);
                var bg = document.createElement('div');
                bg.className = 'modal-bg';
                elComponent.appendChild(bg);
            } else {
                if (selector.length > 0) {
                    el = document.querySelector(selector);
                    el.appendChild(elComponent);
                }
                else {
                    el = document.getElementById('main-body');
                    if (el) {
                        el.innerHTML = '';
                        el.appendChild(elComponent);
                    }
                }
            }
        }

        elComponent.setAttribute('ui-view', code);

        if (vcf.style) $(elComponent).css(vcf.style);
        $(elComponent).addClass('ui-view').addClass(code);
        if (vcf.base == true) $(elComponent).addClass('base');
        else $(elComponent).addClass(__scope);
        if (vcf.class != null && vcf.class.length > 0) $(elComponent).addClass(vcf.class);

        if (!elComponent.hasAttribute('id')) elComponent.setAttribute('id', id);

        self.$data.view = vcf;
        console.log('__vopen: code = ' + code);

        window[id] = self;
        if (is_popup) {
            __pop_current = self;
            $(elComponent).addClass('fade').addClass('show');
            //elComponent.parentElement.childNodes.forEach((el, i_) => { el.style.zIndex = i_; });
        }
        //debugger;
        if (typeof self.__init == 'function') self.__init();
        if (callbackClose) window[id + '.close'] = callbackClose;
        if (callbackOpen) callbackOpen(self);
    }).catch(function () {
        if (callbackOpen) callbackOpen(null);
    });
}
var __domclick_outside_close = [];
window.addEventListener('click', function (e) { __domclick_outside_close.forEach(f => f(e)); });
async function __init() {
    __userLoginCheck(function (ok) {
        if (ok) {
            var r1 = __fetchAsync('/api/view/get_base');
            var r2 = __fetchAsync('/ui/views/icon-svg.html', 'text');
            var r3 = __fetchAsync('/ui/views/_shared/ui-button.html', 'text');
            Promise.all([r1, r2, r3]).then(arr => {
                //console.log(arr);
                if (arr[0].ok && arr[0].items) __vdata.views_base = arr[0].items;
                var htmlSvg = arr[1];
                __shared['ui-button'] = arr[2];
                __coms();

                var parser = new DOMParser();
                var doc = parser.parseFromString(htmlSvg, "text/html");
                var svgs = doc.body.firstElementChild;
                document.body.appendChild(svgs);

                __vdata.views_def.forEach(function (vi, index) {
                    __vopen(vi, vi.template, function (self) {
                        if (index == 0) document.body.style.opacity = 1;
                    });
                });
            })
        } else {
            __vopen({ code: 'login', base: true, popup: true }, '', function (v) {
                document.body.style.opacity = 1;
            });
        }
    });
}
window.addEventListener('DOMContentLoaded', __init);
function __userLoginCheck(callback) {
    __fetchAsync('/api/user/check_token?token=' + localStorage['token']).then((val) => {
        console.log(val);
        //console.log('logout = ', val);
        //localStorage['token'] = '';
        //location.reload();
        if (callback) callback(val.ok);
    });

    //var token = localStorage['token'] || '';
    //var ok = token.length > 0;
    //if (callback) callback(ok);
}
function __userLoginSuccess(token, callback) {
    localStorage['token'] = token;
    if (callback) callback();
}
function __logout() {
    __fetchAsync('/api/user/logout?token=' + localStorage['token']).then((val) => {
        console.log('logout = ', val);
        localStorage['token'] = '';
        location.reload();
    });
}
function __alert(message, title, callbackOpen, callbackClose) {
    __vopen({ code: 'alert', base: true, popup: true }, null, function (v) {
        if (title && title.length > 0) v.title = title;
        v.text = message;
        if (callbackOpen) callbackOpen(v);
    }, callbackClose);
}
function __coms() {
    Vue.component('ui-button', {
        mixins: [__mx_coms],
        watch: {
            active: function (val) {
                var self = this, childs = self.$parent.$children;
                if (val) {
                    if (self.active_disbale_ == false) {
                        childs.forEach(v => { if (v.view_id != self.view_id && v.active) v.active = false; });
                    }
                }
            }
        },
        mounted: function () {
            var self = this;
            if (self.has_sub) __domclick_outside_close.push(this.__domclick_outside_close);
        },
        methods: {
            __domclick_outside_close: function (e) {
                var self = this;
                var el = e.target.closest('.__vicom');
                if (el == null || (el.__vue__ && el.__vue__.view_id != self.view_id)) {
                    self.subHide();
                }
            },
            click: function (value, isSub, e) {
                var self = this;
                if (isSub) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.updateChange(value, isSub);
                } else {
                    if (self.has_sub) {
                        var state = !self.sub_open;
                        self.sub_open = state;
                        $('#' + self.sub_id).toggleClass('show');
                        //self.$forceUpdate();
                    }
                    else self.updateChange(value, isSub);
                }
            },
            updateChange: function (value, isSub) {
                var self = this;
                self.selected = value;
                self.$emit(isSub ? 'clicksub' : 'click', self);
                if (isSub) self.subHide();
            },
            subHide: function (e) {
                var self = this;
                Vue.nextTick(function () {
                    self.sub_open = false;
                    $('#' + self.sub_id).removeClass('show');
                });
            }
        },
        template: __shared['ui-button']
    });

    Vue.component('ui-input', {
        mixins: [__mx_coms],
        watch: {
            active: function (val) {
                var self = this, childs = self.$parent.$children;
                if (val) {
                    if (self.active_disbale_ == false) {
                        childs.forEach(v => { if (v.view_id != self.view_id && v.active) v.active = false; });
                    }
                }
            }
        },
        mounted: function () {
            var self = this;
            if (self.has_sub) __domclick_outside_close.push(this.__domclick_outside_close);
        },
        methods: {
            __domclick_outside_close: function (e) {
            },
            click: function (value, isSub, e) {
            },
            updateChange: function (value, isSub) {
            },
            subHide: function (e) {
            }
        },
        template: `
<div :id="view_id" @click="click(code,false,event)" :class="['__vicom ui-input cursor-pointer',cla, has_sub ? '__domclick_outside_close':'']">
    <div>
        <label v-if="title.length > 0" :for="input_id" class="form-label">{{title}}</label>
        <div class="input-group">
            <span class="input-group-text bg-transparent border-0 ms-0 ps-1 rounded-2">
                <svg :class="['bg-transparent border-0 opacity-50',cla_icon]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <slot name="SVG_PATH"></slot>
                </svg>
            </span>
            <input :id="input_id" type="text" :class="['ui-input-item form-control form-control-sm bg-transparent border-0 rounded-2', cla_input]" placeholder="search..." autocomplete="off">
        </div>        
    </div>
    <ul :id="sub_id" v-if="has_sub" :class="['dropdown-menu text-small shadow',cla_sub]">
        <li v-for="it in items"><a @click="click(it,true,event)" class="dropdown-item">{{ typeof it == 'string' ? it : it.text }}</a></li>
    </ul>
</div>
`});
}