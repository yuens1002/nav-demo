Vue.component('svg-logo', {
	template: `
		<svg
		height="35px"
		viewBox="65 20 231 66"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<desc>site wide company logo</desc>
			<defs></defs>
			<text id="Alasca" stroke="none" fill="none" font-family="AvenirNext-DemiBoldItalic, Avenir Next" font-size="48" font-style="italic" font-weight="500">
				<tspan x="127.763709" y="68" fill="#F3F8F7">Alasca</tspan>
			</text>
			<ellipse id="Oval" stroke="#FFFFFF" stroke-width="5" fill="none" cx="95.0145722" cy="52.7030293" rx="19.0145722" ry="19.7030293"></ellipse>
			<ellipse id="Oval-2" stroke="#FFFFFF" stroke-width="2" fill="none" cx="80.7891117" cy="45.3245784" rx="14.7891117" ry="15.3245784"></ellipse>
		</svg>
	`
});

Vue.component('svg-navToggle', {
	props: ['nav_isVisible'],
	template: `
			<transition name="fade" mode="out-in">
				<svg
					width="28px"
					height="25px"
					viewBox="186 83 28 25"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					@click="$emit('toggleNavPanel')"
					v-if="!nav_isVisible"
					key="openNavPanel"
				>
					<desc>open site navigation panel</desc>
					<defs></defs>
					<path d="M188.192067,104.5 L211.444035,104.5" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
					<path d="M188.192067,95.5 L211.444035,95.5" id="Line-Copy" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
					<path d="M188.192067,86.5 L211.444035,86.5" id="Line-Copy-2" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
			</svg>
			<svg
			width="25px"
			height="25px"
			viewBox="232 102 22 22"
			version="1.1" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			@click="$emit('toggleNavPanel')"
			key="closeNavPanel"
			v-else
			>
				<desc>close site navigation panel</desc>
				<defs></defs>
				<path d="M235,105 L250.587909,121.597793" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
				<path d="M250.9221,105 L235,121.263456" id="Line-Copy" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
			</svg>
		</transition>
	`
});

Vue.component('site-nav', {
	template: `
		<nav>
			<header class="container site-nav">
				<slot name="logo"></slot>
				<slot name="ham"></slot>
			</header>
			<section class="nav-breadcrumb text-sm">
				<slot></slot>
			</section>
		</nav>
	`
});

Vue.component('site-main', {
	template: `
		<section>
			<slot></slot>
		</section>
	`
});

Vue.component('nav-panel', {
	props: {
		nav_isVisible: {
			default: false
		}
		//subnav_isVisible: {
			//default: false
		//}
	},
	methods: {
		beforeEnter(el) {
			el.style.opacity = 0;
		},
		enter(el, done) {
			Velocity(el, {left: 0, opacity: 1}, {duration: 300}, {complete: done});
		},
		leave(el, done) {
			Velocity(el, {left: '-100%'}, {duration: 300}, {complete: done});
		}
	},
	template: `
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@leave="leave"
			:css="false"
		>
		<aside v-if='nav_isVisible' class="nav-panel">
			<div class="nav-panel-header"><slot></slot></div>
			<div class="container" @click="$emit('toggleSubNavPanel')">
					<div class="nav-panel-section">
						<i class="fa fa-calendar fa-lg fa-fw"></i>my schedule & bidding
					</div>
					<div class="nav-panel-section nav-panel-has-sub">
						<svg width="11px" height="14px" viewBox="278 94 14 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<desc>open</desc>
						<defs></defs>
						<polyline id="Line-Copy-4" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none" transform="translate(285.053479, 105.298896) rotate(-180.000000) translate(-285.053479, -105.298896) " points="289.106958 97 281 105.298896 289.106958 113.597793"></polyline>
						</svg>
					</div>
			</div>
			<div class="container">
					<div class="nav-panel-section">
						<i class="fa fa-life-ring fa-lg fa-fw"></i>saftety
					</div>
					<div class="nav-panel-section nav-panel-has-sub"> > </div>
			</div>
		</aside>
		</transition>
	`
});

Vue.component('subnav-panel', {
		props: ['subnav_isVisible', 'sub_subnav_isVisible'],
		methods: {
			beforeEnter(el) {
				el.style.display = 'none';
			},
			beforeLeave(el) {
				el.style.display = 'none';
			},
			enter(el, done) {
				Velocity(el, {right: 47}, {duration: 500}, {complete: done});
			},
			leave(el, done) {
				Velocity(el, {right: '-100%'}, {duration: 500}, {complete: done});
			}
		},
		template: `
		<aside class="subnav-panel" v-if="subnav_isVisible">
			<transition-group
				@before-leave="beforeLeave"
				@before-enter="beforeEnter"
				@enter="enter"
				@leave="leave"
				:css="false"
			>
			<div class="container subnav-panel-header" key="123">
				<div>saftey</div>
				<div @click="$emit('toggleSubNavPanel')">
					<svg width="13px"
						height="13px"
						viewBox="232 102 22 22"
						version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<desc>close saftey navigation</desc>
							<defs></defs>
							<path d="M235,105 L250.587909,121.597793" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
							<path d="M250.9221,105 L235,121.263456" id="Line-Copy" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
					</svg>
				</div>
			</div>
			<div class="container" key="124">
				<div class="subnav-panel-section">reporting</div>
				<div class="subnav-panel-section
				subnav-panel-has-sub"
				@click="$emit('toggleSubSubNavPanel')"
				>
					<svg width="9px"
					height="12px"
					viewBox="278 94 14 22"
					version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					>
    			<desc>open</desc>
    			<defs></defs>
    			<polyline id="Line-Copy-4" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none" transform="translate(285.053479, 105.298896) rotate(-180.000000) translate(-285.053479, -105.298896) " points="289.106958 97 281 105.298896 289.106958 113.597793"></polyline>
					</svg>
				</div>
			</div>
			<div class="sub-subnav-heading slide-enter" key="2346"
				v-show="sub_subnav_isVisible"
				:class="{'slide-enter-active':sub_subnav_isVisible}"
				>
					<div class="sub-subnav-section">I-21 injury reporting</div>
					<div class="sub-subnav-section">ASAP Reporting</div>
					<div class="sub-subnav-section">General ASAP Information</div>
					<div class="sub-subnav-section">Fight Attendant Incident Report</div>
			</div>
			<div class="container" key="125">
				<div class="subnav-panel-section">Agriculture and Customs</div>
				<div class="subnav-panel-section subnav-panel-has-sub">
					<svg width="9px" height="12px" viewBox="278 94 14 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    			<desc>open</desc>
    			<defs></defs>
    			<polyline id="Line-Copy-4" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none" transform="translate(285.053479, 105.298896) rotate(-180.000000) translate(-285.053479, -105.298896) " points="289.106958 97 281 105.298896 289.106958 113.597793"></polyline>
						</svg>
					</div>
			</div>
			<div class="container" key="13289">
				<div class="subnav-panel-section">Known Crewmember</div>
			</div>
			</transition-group>
		</aside>
	`
});

Vue.component('sub-subnav-panel',{
	template: `
		<aside class="sub-subnav-panel">
			<div><slot></slot></div>
		</aside>
	`
});

new Vue({
	el: '#root',
	data: {
		nav_isVisible: false,
		subnav_isVisible: false,
		sub_subnav_isVisible: false
	},
	methods: {
		toggleAllPanels() {
			this.nav_isVisible = !this.nav_isVisible;
			this.subnav_isVisible && (this.subnav_isVisible = false);
		}
	},
 	template: `
		<div class="relative">
			<site-nav>
				<div slot="logo"><svg-logo></svg-logo></div>
				<div slot="ham">
					<svg-navToggle
						:nav_isVisible="nav_isVisible"
						@toggleNavPanel="toggleAllPanels"
					>
					</svg-navToggle>
				</div>
				<p>Section > Page Title</p>
			</site-nav>
			<nav-panel
				:nav_isVisible="nav_isVisible"
				@toggleSubNavPanel="subnav_isVisible=!subnav_isVisible">
					Hello Donovan Beck
			</nav-panel>
			<subnav-panel
			:subnav_isVisible="subnav_isVisible" @toggleSubNavPanel="subnav_isVisible=!subnav_isVisible"
			:sub_subnav_isVisible="sub_subnav_isVisible"
			@toggleSubSubNavPanel="sub_subnav_isVisible=!sub_subnav_isVisible"
			>safety</subnav-panel>
			<site-main>asdfadf</site-main>
		</div>
	`
});
