﻿var __site = 'thinh.iot.vn';
var __scope = 'document';
var __path = '/ui/views/';
var __ismobi = window.innerWidth < 700;
var __views = [
    { scope: '', type: '', code: 'icon-svg', base: true, title: "Icon SVG", selector: 'body', no_css: true, no_js: true },
    { scope: '', type: '', code: 'alert', base: true, title: "Alert", popup: true },
    { scope: '', type: '', code: 'login', base: true, title: "Login", popup: true },
    { scope: '', type: '', code: 'nav', base: true, title: "Sidebar", selector: '#main-left', replace: true },

    { scope: 'document', type: 'action', code: 'import-files', title: "Import Files", click: "__vg", popup: true },
    { scope: 'document', type: 'action', code: 'crawle-url', title: "Crawle Url", click: "__vg", class: 'ui overlay fullscreen modal', popup: true },

    { scope: 'document', type: 'nav', code: 'home', title: "Home", icon: "home", click: "__vg", active: true },
    { scope: 'document', type: 'nav', code: "hr" },
    { scope: 'document', type: 'nav', code: 'advance-search', title: "Advance search", icon: "filter", click: "__vg", popup: true },
    { scope: 'document', type: 'nav', code: 'message', base: true, title: "Message", icon: "notify", click: "__vg", count: 99 },
    { scope: 'document', type: 'nav', code: 'category', base: true, title: "Category", icon: "folder", click: "__vg" },
    { scope: 'document', type: 'nav', code: 'tag', base: true, title: "Tag", icon: "tag", click: "__vg", popup: true },
    { scope: 'document', type: 'nav', code: 'group', base: true, title: "Group", icon: "folder", click: "__vg", popup: true },
    { scope: 'document', type: 'nav', code: 'history', base: true, title: "History", icon: "history", click: "__vg" },
    { scope: 'document', type: 'nav', code: "hr" },
    { scope: 'document', type: 'nav', code: 'library', title: "My Library", icon: "library", click: "__vg", login: true },
    { scope: 'document', type: 'nav', code: 'bookmark', title: "Bookmark", icon: "bookmark", click: "__vg" },
    { scope: 'document', type: 'nav', code: 'order', title: "Order", icon: "cart", click: "__vg", login: true },
    { scope: 'document', type: 'nav', code: 'price', title: "Price", icon: "dolar", click: "__vg" },
    { scope: 'document', type: 'nav', code: 'feedback', base: true, title: "Feedback", icon: "heart", click: "__vg" },
    //{ scope: 'document', type: 'nav', code: 'about-us', title: "About Us", icon: "heart", click: "__vg" },

    { scope: 'user_panel', type: 'nav', code: 'setting', title: "Setting", icon: "setting", click: "__vg", popup: true },
    { scope: 'user_panel', type: 'nav', title: "Profile", icon: "cart", click: "__vg" },
    { scope: 'user_panel', type: 'nav', code: "hr" },
    { scope: 'user_panel', type: 'nav', title: "Sign out", icon: "", click: "__userLogout()", popup: true },
];
var __vdata = new Vue({
    data: function () {
        return {
            login: (localStorage['token'] == null || localStorage['token'] == ''),
            domains: ['iot.vn', 'thinh.iot.vn', 'baove.info', 'baovethienphong.com', 'baovektd.iot.vn', 'ketoankimthuy.com'],
            tags: ['domain', 'layout', 'buddha', 'article', 'image', 'book', 'youtube', 'audio'],
            views_def: [
                { code: 'nav', template: 'nav-1', base: true, selector: '#main-left' },
                { code: 'home' },
                //{ code: 'login', base: true, popup: true },
            ],

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
                { code: 'document', title: 'Document', icon: 'article' },
                { code: 'task', title: 'Task', icon: 'check-list' },
                { code: 'chat', title: 'Chat', icon: 'chat' },
                { code: 'email', title: 'Email', icon: 'email' },
                { code: 'order', title: 'Order', icon: 'cart' },
                { code: 'product', title: 'Product', icon: 'product' },
                { code: 'promotion', title: 'Promotion', icon: 'gift' },
                { code: 'landing', title: 'Landing', icon: 'landing' },
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
var __mx_coms = {
    props: {
        cla_: String,
        cla_sub_: String,
        cla_icon_: String,
        cla_input_: String,
        cla_image_: String,
        code_: String,
        active_: Boolean,
        disable_: Boolean,
        active_disbale_: Boolean,
        title_: String,
        items_: Array,
        tooltip_: String,
        total_: Number,
        //author: Object
    },
    data: function () {
        var self = this;
        var dt = {
            cla: self.cla_ || '',
            cla_sub: self.cla_sub_ || '',
            cla_icon: self.cla_icon_ || '',
            cla_image: self.cla_image_ || '',
            cla_input: self.cla_input_ || '',
            code: self.code_ || '',
            active: self.active_ || false,
            disable: self.disable_ || false,
            title: self.title_ || '',
            tooltip: self.tooltip_ || '',
            items: self.items_ || [],
            total: self.total_ || 0,
            view_id: self.__getGuid(),
            input_id: self.__getGuid(),
            sub_id: self.__getGuid(),
            sub_open: false,
            has_sub: (self.items_ != null && self.items_.length > 0),
            selected: null
        };
        return dt;
    },
    methods: {
        __getGuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
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
var __pop_current;