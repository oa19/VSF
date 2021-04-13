<template>
  <div>
    <div v-if="loading" id="svgTemplate" />
    <div v-else>
      Loading image...
    </div>
  </div>
</template>
<script>
import Vue from 'vue/dist/vue.esm.js';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xmlserializer = require('xmlserializer');

export default {
  name: 'SvgViewer',
  props: {
    imageCode: {
      type: Number,
      default: 43
    },
    imageId: {
      type: Number,
      default: 7135001101022,
      required: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      Svgdom: null, // obtained SVG element,
      loading: false
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.loading = true;
      this.getSvg();
      this.loading = false;
    });
    /** Svg click event */
    // window['handleClick'] = () => {
    //   console.log('hey');
    // };
  },
  methods: {
    // Initialize svg
    getSvg () {
      /* Create XHR object */
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'http://localhost:3000/assets/svg/' + this.imageId + '.svg',
        true
      );
      xhr.send();
      /* Listening to XHR objects */
      xhr.addEventListener('load', () => {
        /** Get SVG DOM */
        const parser = new DOMParser();
        const resXML = parser.parseFromString(
          xhr.responseText,
          'application/xml'
        );
        this.svgDom = resXML.documentElement;

        /** Modify SVG DOM */
        let g_container = this.svgDom.getElementById(this.imageId);
        // g_container.setAttribute('v-on:click', 'this.handleClick()');
        for (let i = 0; i < g_container.childNodes.length; i++) {
          let g = g_container.childNodes[i];
          if (g.nodeName === 'g') {
            if (this.imageCode > 0) {
              g.setAttribute('v-if', `false`);
            }
            if (this.imageCode === Number(g.getAttribute('id'))) {
              if (this.imageCode > 0) g.setAttribute('v-if', `true`);
              g.childNodes.forEach((child_g) => {
                if (child_g.nodeName === 'g') {
                  child_g.removeAttribute('onclick');
                  child_g.removeAttribute('onmouseover');
                  child_g.removeAttribute('onmouseout');
                  child_g.removeAttribute('transform');
                }
              });
            }
          }
        }
        this.renderSvg();

        /** Apply scale to svg */
        let svg_container = document
          .querySelector('#svgTemplate svg')
          .getBBox();
        let bbox_width = svg_container.x + svg_container.width;
        this.svgDom.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
        this.svgDom.setAttribute('width', this.width + 'px');
        this.svgDom.setAttribute('height', this.height + 'px');
        let scaleTransform = 1;

        if (svg_container.width > svg_container.height) {
          if (this.width / svg_container.width < 1) {
            scaleTransform = this.width / svg_container.width;
          } else {
            scaleTransform = this.width / svg_container.width - 0.5;
          }
        } else {
          if (this.height / svg_container.height < 1) {
            scaleTransform = this.height / svg_container.height;
          } else {
            scaleTransform = this.height / svg_container.height - 0.5;
          }
        }
        g_container.setAttribute('transform', `scale(` + scaleTransform + ')');
        this.renderSvg();

        /** Apply scale & translate to svg */
        svg_container = document.querySelector('#svgTemplate svg').getBBox();
        let new_x = this.width / 2 - svg_container.x - svg_container.width / 2;
        let new_y = this.height / 2 - svg_container.y - svg_container.height / 2;

        g_container.setAttribute(
          'transform',
          'translate(' +
            new_x +
            ', ' +
            new_y +
            ') scale(' +
            scaleTransform +
            ')'
        );
        this.renderSvg();
      });
    },
    renderSvg () {
      let sXML = xmlserializer.serializeToString(this.svgDom);
      let SvgDom = Vue.extend({
        template: "<div id='svgTemplate'>" + sXML + '</div>'
      });
      new SvgDom().$mount('#svgTemplate');
    }
  },
  beforeDestroy () {
    this.svgDom = null;
  }
};
</script>
<style lang="scss">
#svgTemplate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  min-width: 500px;
}
</style>
