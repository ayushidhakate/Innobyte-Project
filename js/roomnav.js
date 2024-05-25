(function (window) {
    let HorizontalNav = function (selector) {
        this.header = window.document.querySelector(selector);
        this.options = {
            items: { attribute: "data-page" },
            submenu: {
                selector: ".nav-horizontal-scroll-onhover-items",
                show: "nav-show"
            },
            page: { header: "nav-active", show: "page-active" }
        };
        this.init();
        return this;
    };

    HorizontalNav.prototype = {
        active: undefined,
        mouseLeaveEvent: undefined,
        init: function () {
            let self = this;
            this.mouseLeaveEvent = self.mouseLeave.bind(self);
            if ("ontouchstart" in window) {
                this.header.addEventListener("touchstart", self.hoverEvent.bind(self));
            } else {
                this.header.addEventListener("mouseover", self.hoverEvent.bind(self));
            }
            this.header.addEventListener("click", function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                let item = self.item(evt.target);
                self.showPage(item);
            });
        },
        item: function (target) {
            let self = this;
            if (self.options.items.attribute) {
                while (
                    target.getAttribute(self.options.items.attribute) == undefined ||
                    target == self.nav
                )
                    target = target.parentNode;
            }
            return target == self.nav ? undefined : target;
        },
        hideSubNavs: function () {
            let self = this;
            (
                this.header.querySelectorAll("." + self.options.submenu.show) || []
            ).forEach(function (n) {
                n.classList.remove(self.options.submenu.show);
            });
        },
        showSubNav: function (item) {
            let self = this;
            console.dir(item);
            let submenu = item.querySelector(self.options.submenu.selector);
            if (submenu) {
                submenu.classList.add(self.options.submenu.show);
                submenu.style.top = item.scrollHeight + 10 + "px";
                submenu.style.left =
                    item.offsetLeft - item.parentNode.scrollLeft + "px";
                submenu.removeEventListener("mouseleave", self.mouseLeaveEvent);
                submenu.addEventListener("mouseleave", self.mouseLeaveEvent);
            }
        },
        hoverEvent: function (evt) {
            let self = this;
            let item = self.item(evt.target);
            if (self.active) {
                if (self.active == item) return;
                else if (self.active.contains(item)) return;
                else self.hideSubNavs();
            }
            self.active = item;
            self.showSubNav(item);
        },
        mouseLeave: function (evt) {
            let self = this;
            if (self.active)
                self.active
                    .querySelector(self.options.submenu.selector)
                    .classList.remove(self.options.submenu.show);
            self.active = undefined;
        },
        showPage: function (item) {
            let self = this;
            let page = item.getAttribute(self.options.items.attribute);
            (
                document.querySelectorAll("." + self.options.page.show) || []
            ).forEach((n) => n.classList.remove(self.options.page.show));
            (
                document.querySelectorAll("." + self.options.page.header) || []
            ).forEach((n) => n.classList.remove(self.options.page.header));
            document.querySelector("#" + page).classList.add(self.options.page.show);
            if (self.active) self.active.classList.add(self.options.page.header);
            if (item != self.active) item.classList.add(self.options.page.header);
            self.hideSubNavs();
        }
    };
    new HorizontalNav("header");
})(window);