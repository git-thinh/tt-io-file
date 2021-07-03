var __site = 'thinh.iot.vn';
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
            login: true,
            domains: ['iot.vn', 'thinh.iot.vn', 'baove.info', 'baovethienphong.com', 'baovektd.iot.vn', 'ketoankimthuy.com'],
            tags: ['domain', 'layout', 'buddha', 'article', 'image', 'book', 'youtube', 'audio'],
            scope_setting: {
                login: { code: 'login', base: true, template: 'login2', popup: true },
                document: {
                    admin: [
                        { code: 'nav', template: 'nav-1', base: true, selector: '#main-left' },
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