var __domclick_outside_close = [];
window.addEventListener('click', function (e) { __domclick_outside_close.forEach(f => f(e)); });

var __mx_coms = {
    props: {
        cla_: String,
        cla_sub_: String,
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
            code: self.code_ || '',
            active: self.active_ || false,
            disable: self.disable_ || false,
            title: self.title_ || '',
            tooltip: self.tooltip_ || '',
            items: self.items_ || [],
            total: self.total_ || 0,
            view_id: self.__getGuid(),
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
        }
    }
};

Vue.component('ui-button', {
    mixins: [__mx_coms],
    watch: {
        active: function (val) {
        }
    },
    mounted: function () {
        var self = this;
    },
    methods: {
    },
    template: `
<a :class="['btn', cla]">
    <svg :class="['p-0 m-0',cla_sub]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <slot name="SVG_PATH"></slot>
    </svg>
</a>
`});

Vue.component('ui-nav-item', {
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
        if (self.has_sub)
            __domclick_outside_close.push(this.__domclick_outside_close);
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
    template: `
<li :id="view_id" @click="click(code,false,event)" :class="['__vicom nav-item cursor-pointer',cla, has_sub ? '__domclick_outside_close':'' , !active_disbale_ && active ? 'theme--active' : '']">
    <a :class="['nav-link p-0 rounded-0 text-center']"
        :title="title_">
        <svg :class="[active ? 'theme--color-1' : 'theme--color-2']" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <slot name="SVG_PATH"></slot>
        </svg>
    </a>
    <ul :id="sub_id" v-if="has_sub" :class="['dropdown-menu text-small shadow',cla_sub]">
        <li v-for="it in items"><a @click="click(it,true,event)" class="dropdown-item">{{it}}</a></li>
    </ul>
</li>
`});