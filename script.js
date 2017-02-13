window.Event = new Vue();


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

Vue.component('nav-div', {
		props: ['header','isSelected'],
		data() {
			return {
				isActive: '',
			};
		},
		created() {
			this.isActive = this.isSelected;
		},
		methods: {
			setState() {
				this.isActive = true;
				this.$emit('toggleSubNavPanel');
				Event.$emit('openSubNavPanel', this.header);
			}
		},
		template: `
			<div class="container" :class="{'container-selected': isActive}">
				<div class="nav-panel-section">
					<i class="fa fa-lg fa-fw" :class="header.icon"></i>
					{{header.title}}
				</div>
				<div
				class="nav-panel-section nav-panel-has-sub"
				v-if="header.subtitle"
				@click="setState">
					<svg width="11px" height="14px" viewBox="278 94 14 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<desc>open</desc>
					<defs></defs>
					<polyline id="Line-Copy-4" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none" transform="translate(285.053479, 105.298896) rotate(-180.000000) translate(-285.053479, -105.298896) " points="289.106958 97 281 105.298896 289.106958 113.597793"></polyline>
					</svg>
				</div>
			</div>
		`
});

Vue.component('subnav-div', {
	props: ['subtitle', 'header', 'index'],
	data() {
		return {
			isVisible: false
		};
	},
	computed: {
		hasSstitle() {
			return (this.header.subsubtitle && this.header.subsubtitle[this.index]);
		}
	},
	template: `
		<div>
		<div class="container" :key="subtitle">
			<div class="subnav-panel-section">{{subtitle}}</div>
			<div class="subnav-panel-section subnav-panel-has-sub"
			@click="isVisible=!isVisible"
			v-if="hasSstitle"
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
		<div class="sub-subnav-heading"
		v-show="isVisible"
		v-if="hasSstitle"
		>
			<div class="sub-subnav-section" v-for="subsubtitle of header.subsubtitle[this.index]">{{subsubtitle}}</div>
		</div>
		</div>
	`
});

Vue.component('sub-subnav-div', {
	template: `

		<div class="sub-subnav-heading" key="2346"
		v-show="sub_subnav_isVisible"
		:class="{'slide-enter-active':sub_subnav_isVisible}"
		>
			<slot></slot>
		</div>
		<div class="sub-subnav-section"></div>
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
	props: ['nav_isVisible'],
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
			<slot name="headers"></slot>
		</aside>
		</transition>
	`
});

Vue.component('subnav-panel', {
		props: [
			'subnav_isVisible',
			'sub_subnav_isVisible',
		],
		data() {
			return {
				header: {}
			};
		},
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
		created() {
		Event.$on('openSubNavPanel', (headerData) => {
			this.header = headerData;
		});
		},
		template: `
<!--
		<transition
				@before-leave="beforeLeave"
				@before-enter="beforeEnter"
				@enter="enter"
				@leave="leave"
				:css="false"
			>
-->
		<aside class="subnav-panel" v-if="subnav_isVisible">
			<div class="container subnav-panel-header" :key="header.title">
				<div>{{header.title}}</div>
				<div @click="$emit('toggleSubNavPanel')">
					<svg
					width="13px"
					height="13px"
					viewBox="232 102 22 22"
					version="1.1" xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<desc>close saftey navigation</desc>
						<defs></defs>
						<path d="M235,105 L250.587909,121.597793" id="Line" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
						<path d="M250.9221,105 L235,121.263456" id="Line-Copy" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" fill="none"></path>
					</svg>
				</div>
			</div>
			<subnav-div v-for="(subtitle, i) of header.subtitle" :subtitle="subtitle" :header=header :index="i"></subnav-div>
		</aside>
<!--		</transition>-->
	`
});



new Vue({
	el: '#root',
	data: {
		nav_isVisible: false,
		subnav_isVisible: false,
		sub_subnav_isVisible: false,
		sub_subnav_isVisible: false,
		sub_subnav_isVisible: false,
		nav_title: 'Hello Donovan Beck',
		nav_subheader: 'Section > Page Title',
		text: 'Fidelissimae sint veniam singulis o varias litteris nulla ubi quis nam nostrud quamquam fugiat e lorem quem domesticarum eram concursionibus varias lorem eu legam aliqua.',
		isSelected: false,
		nav_header: [
			{
				title: 'my schedule & bidding',
				icon: 'fa-calendar',
				subtitle: [
					'non elit',
					'et iudicem aliqua',
					'expetendis doctrina'
				]
			},
			{
				title: 'safety',
				icon: 'fa-life-ring',
				subtitle: [
					'reporting',
					'agriculture & Customs',
					'known crewmember',
					'product safety data search'
				],
				subsubtitle: [
					[
						'i-21 injury reporting',
						'ASAP reporting',
						'general ASAP information',
						'flight attendant incident report'
					],
					[
						'enim cillum elit',
						'labore vidisse',
						'transferrem multos offendit'
					],
					'',
					''
				]
			},
			{
				title: 'training',
				icon: 'fa-plane'
			},
			{
				title: 'administration',
				icon: 'fa-university',
				subtitle: [
					'OJI & leaves',
					'pay & benefits',
					'performance',
					'inflight resource directory',
					'mobile & web',
					'AFA'
				],
				subsubtitle: [
					[
						'eiusmod duis',
						'laborum ex',
						'eruditionem officia'
					],
					[
						'eiusmod duis',
						'laborum ex',
						'eruditionem officia'
					],
					[
						'eiusmod duis',
						'laborum ex',
						'eruditionem officia'
					],
					'',
					[
						'eiusmod duis',
						'laborum ex',
						'eruditionem officia'
					]
				]
			},
			{
				title: 'catering & brand',
				icon: 'fa-globe',
				subtitle: [
					'eiusmod fugiat',
					'proident eiusmod',
					'tempor firmissimum'
				]
			},
			{
				title: 'hotels',
				icon: 'fa-bed'
			},
			{
				title: 'my base',
				icon: 'fa-map-marker'
			},
			{
				title: 'regognition',
				icon: 'fa-trophy'
			},
			{
				title: 'my leadership team',
				icon: 'fa-users'
			}
		]
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
				<p>{{nav_subheader}}</p>
			</site-nav>
			<nav-panel :nav_isVisible="nav_isVisible">
				{{nav_title}}
				<div slot="headers">
					<nav-div
					v-for="header of nav_header"
					:header="header"
					:isSelected="isSelected"
					@toggleSubNavPanel="subnav_isVisible=!subnav_isVisible"
					>
					</nav-div>
				</div>
			</nav-panel>
			<subnav-panel
			:subnav_isVisible="subnav_isVisible" @toggleSubNavPanel="subnav_isVisible=!subnav_isVisible"
			:sub_subnav_isVisible="sub_subnav_isVisible"
			@toggleSubSubNavPanel="sub_subnav_isVisible=!sub_subnav_isVisible"
			>safety</subnav-panel>
			<site-main>{{text}}</site-main>
		</div>
	`
});
