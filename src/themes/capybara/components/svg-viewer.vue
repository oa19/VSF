<template>
  <div>
    <div id="svgTemplate" />
  </div>
</template>
<script>
import Vue from 'vue/dist/vue.esm.js';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xmlserializer = require('xmlserializer');

export default {
  name: 'SvgViewer',
  props: {
    objectId: {
      type: Number,
      default: 43
    }
  },
  data () {
    return {
      /* Overall situation */
      Svgurl: '', // url of SVG
      Svgdom: null // obtained SVG element
      /* Svg variables */
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getSvg();
    })
    window['handleClick'] = () => {
      console.log('hey');
    };
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

        const resXML = parser.parseFromString(xhr.responseText, 'application/xml');
        this.svgDom = resXML.documentElement;

        let first_g = this.svgDom.getElementById('713500110101');
        first_g.setAttribute('v-on:click', 'this.handleClick()');
        for (let i = 0; i < first_g.childNodes.length; i++) {
          let g = first_g.childNodes[i];
          if (g.nodeName === 'g') {
            g.setAttribute('v-if', `false`);
            if (this.objectId == g.getAttribute('id')) {
              g.setAttribute('v-if', `true`);
              g.childNodes.forEach((child_g) => {
                if (child_g.nodeName === 'g') {
                  child_g.removeAttribute('onclick');
                  child_g.removeAttribute('onmouseover');
                  child_g.removeAttribute('onmouseout');
                  child_g.removeAttribute('transform');
                }
              })
            }
          }
        }

        this.renderSvg();
        let bbox = document.querySelector('#svgTemplate svg').getBBox();
        let bbox_width = bbox.x + bbox.width;
        this.svgDom.setAttribute('viewBox', '0 0 500 500');
        this.svgDom.setAttribute('width', '500px');
        this.svgDom.setAttribute('height', '500px');
        let scaleTransform = 1;
        if (bbox.width < 50) {
          if (bbox.height < 50) {
            scaleTransform = 5;
          } else if (bbox.height < 100) {
            scaleTransform = 4;
          } else if (bbox.height < 150) {
            scaleTransform = 3;
          } else if (bbox.height < 250) {
            scaleTransform = 2;
          }
        } else if (bbox.width < 110) {
          if (bbox.height < 50) {
            scaleTransform = 5;
          } else if (bbox.height < 100) {
            scaleTransform = 4;
          } else if (bbox.height < 150) {
            scaleTransform = 3;
          } else if (bbox.height < 250) {
            scaleTransform = 2;
          }
        } else if (bbox.width < 190) {
          if (bbox.height < 100) {
            scaleTransform = 3;
          } else if (bbox.height < 250) {
            scaleTransform = 2;
          }
        } else if (bbox.width < 300) {
          if (bbox.height < 250) {
            scaleTransform = 2;
          }
        }

        first_g.setAttribute('transform', `scale(` + scaleTransform + ')');
        this.renderSvg();
        const bboxNew = document.querySelector('#svgTemplate svg').getBBox();
        let bbox_x = bboxNew.x;
        let bbox_y = bboxNew.y;
        bbox_width = bboxNew.width / 2;
        let bbox_height = bboxNew.height / 2;
        let new_x = 250 - bbox_x - bbox_width;
        let new_y = 250 - bbox_y - bbox_height;

        first_g.setAttribute(
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
      let Profile = Vue.extend({
        template: "<div id='svgTemplate'>" + sXML + '</div>'
      });
      // Create an instance and mount it to the element
      new Profile().$mount('#svgTemplate');
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
<style lang="scss">
#svgTemplate {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
