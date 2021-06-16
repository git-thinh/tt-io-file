﻿var __views = [
    { scope: '', type: '', code: 'icon-svg', base: true, title: "Icon SVG", selector: 'body', no_css: true, no_js: true },
    { scope: '', type: '', code: 'alert', base: true, title: "Alert", popup: true },
    { scope: '', type: '', code: 'login', base: true, title: "Login", popup: true },
    { scope: '', type: '', code: 'nav', base: true, title: "Sidebar", selector: '#main-left', replace: true },

    { scope: 'document', type: 'action', code: 'import-files', title: "Import files", click: "__vg", popup: true },

    { scope: 'document', type: 'nav', code: 'advance-search', title: "Advance search", icon: "filter", click: "__vg", popup: true },
    { scope: 'document', type: 'nav', code: "hr" },
    { scope: 'document', type: 'nav', code: 'home', title: "Home", icon: "home", click: "__vg", active: true },
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