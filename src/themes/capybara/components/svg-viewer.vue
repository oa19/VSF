<template>
  <div>
    <div id="svgTemplate" ref="svgContainer" />
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const jsdom = require('jsdom');

export default {
  name: 'SvgViewer',
  data () {
    return {
      /* Overall situation */
      Svgurl: '', // url of SVG
      Svgdom: null, // obtained SVG element
      /* Svg variables */
      photoResult: {
        Resultval: 0, // test result value
        Resultmsg: 'not detected', // test result field
        Resultcolor: 'ාdcdee2' // test result - field background color
      },
      objectId: 121
    };
  },
  // computed: {
  //   showPart() {
  //     return this.objectId ===
  //   }
  // },
  mounted () {
    // Bind the takephoto method to the window and provide it for external call
    window['handleClick'] = () => {
      console.log('hey');
    };
  },
  created () {
    this.getSvg();
  },
  methods: {
    // Initialize svg
    getSvg () {
      /* Create XHR object */
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'http://localhost:3000/assets/svg/713500110101.svg',
        true
      );
      xhr.send();

      /* Listening to XHR objects */
      xhr.addEventListener('load', () => {
        /* 1. Get dom */
        const parser = new DOMParser();
        const resXML = parser.parseFromString(
          xhr.responseText,
          'application/xml'
        );
        const svgContainer = {
          width: this.$refs['svgContainer'].clientWidth + 'px',
          height: this.$refs['svgContainer'].clientHeight + 'px'
        };

        this.svgDom = resXML.documentElement;
        this.svgDom.setAttribute('width', '900px');
        this.svgDom.setAttribute('height', '900px');
        this.svgDom.setAttribute('viewBox', '0 0 900 900');
        // this.svgDom.dispatchEvent(new Event("show"));
        // this.$refs["svgContainer"].dispatchEvent(new Event("show"));
        /* 2. Modify SVG Object */

        let first_g = this.svgDom.getElementById('713500110101');
        first_g.setAttribute('transform', 'scale(0.6)');
        // first_g.dispatchEvent(new Event("show"));
        // first_g.style.transform = `scale(20.2) translate(529px, 221px)`;
        // first_g.style.transformOrigin = `center`;
        first_g.setAttribute('v-on:click', 'this.handleClick()');
        for (let i = 0; i < first_g.childNodes.length; i++) {
          let g = first_g.childNodes[i];
          if (g.nodeName === 'g') {
            // g.setAttribute('v-if', `false`);
            // if (this.objectId == g.getAttribute('id')) {
            // g.setAttribute('v-if', `true`);
            g.childNodes.forEach((child_g) => {
              if (child_g.nodeName === 'g') {
                child_g.removeAttribute('onclick');
                child_g.removeAttribute('onmouseover');
                child_g.removeAttribute('onmouseout');
                child_g.removeAttribute('transform');
              }
            });
            // }
          }
        }

        console.log(first_g.getBBox(), 'hey')

        /* 3. Modify dom */
        // this.svgDom.getElementById("713500110101").childNodes[0].nodeValue = ...;
        // this.svgDom.getElementById("...").setAttribute("style",
        //   `....; fill:${this.photoResult.resultColor}; ...`);

        /* 4. Convert svgdom object into virtual dom of Vue */
        var oSerializer = new XMLSerializer();
        var sXML = oSerializer.serializeToString(this.svgDom);
        var Profile = Vue.extend({
          template: "<div id='svgTemplate'>" + sXML + '</div>'
        });
        // Create an instance and mount it to the element
        new Profile().$mount('#svgTemplate');

        console.log(first_g.getBBox())
      });
    }
  },
  beforeDestroy () {
    this.svgDom = null;
  },
  watch: {
    photoResult: {
      handler (newVal, oldVal) {
        this.getSvg();
      },
      deep: true
    }
  }
};
</script>
