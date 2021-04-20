<template>
  <div class="svg-container" id="svgContainer">
    <!-- <SfLoader :loading="loading" class="loading-container" /> -->
    <div v-show="!loading" :id="`svgTemplate_${svgId}`" />
  </div>
</template>
<script>
import Vue from 'vue/dist/vue.esm.js';
import { SfLoader } from '@storefront-ui/vue';
import { mapGetters } from 'vuex';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xmlserializer = require('xmlserializer');

export default {
  name: 'SvgViewerElement',
  components: {
    SfLoader
  },
  props: {
    imageCode: {
      type: String,
      default: '43'
    },
    imageId: {
      type: String,
      default: '713500110101',
      required: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    svgId: {
      type: Number
    },
    isFullImage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Svgdom: null, // obtained SVG element,
      loading: false,
      loadingMessage: 'Loading image...'
    };
  },
  watch: {
    imageCode: {
      immediate: true,
      handler () {
        this.loading = true;
        this.$nextTick(() => {
          this.getSvg();
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      getSavedSvg: 'vehicles/getSavedSvg'
    })
  },
  methods: {
    // Initialize svg
    getSvg () {
      /* Create XHR object */
      const imageId = this.imageId.split('.')[0];
      const isLoadedSvg = this.getSavedSvg(imageId);
      if (isLoadedSvg) {
        this.svgOperation(isLoadedSvg, imageId);
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open(
          'GET',
          'http://localhost:3000/assets/svg/' + imageId + '.svg',
          true
        );
        xhr.send();
        /* Listening to XHR objects */
        xhr.addEventListener('load', () => {
          this.svgOperation(xhr.responseText, imageId);
        });
      }
    },
    svgOperation (svgText, imageId) {
      /** Get SVG DOM */
      const parser = new DOMParser();
      const resXML = parser.parseFromString(svgText, 'application/xml');
      this.svgDom = resXML.documentElement;

      /** Modify SVG DOM */
      if (!this.svgDom) {
        this.loading = false;
        this.loadingMessage = 'Loading image failed.';
        return;
      }
      let g_container = this.svgDom.getElementById(imageId);
      // g_container.setAttribute('v-on:click', 'this.handleClick()');
      for (let i = 0; i < g_container.childNodes.length; i++) {
        let g = g_container.childNodes[i];
        if (g.nodeName === 'g') {
          if (this.isFullImage) {
            g.childNodes.forEach((child_g) => {
              if (child_g.nodeName === 'g') {
                child_g.removeAttribute('onclick');
                child_g.removeAttribute('onmouseover');
                child_g.removeAttribute('onmouseout');
                child_g.removeAttribute('transform');
              }
            });

            if (Number(this.imageCode) === Number(g.getAttribute('id'))) {
              const all_path = g.querySelectorAll('path');
              const all_ellipse = g.querySelector('ellipse');
              const all_polygon = g.querySelector('polygon');

              // all_path.style.fill = 'green'
              for (let i = 0; i < all_path.length; i++) {
                all_path[i].setAttribute('fill', 'green');
                all_path[i].setAttribute('orgfill', 'green');
              }
              all_ellipse && all_ellipse.forEach(ellipse => {
                ellipse.style.fill = 'green'
              })
              all_polygon && all_polygon.length && all_polygon.forEach(polygon => {
                polygon.style.fill = 'green'
              })
            }
          } else {
            if (Number(this.imageCode) > 0) {
              g.setAttribute('v-if', `false`);
            }
            if (Number(this.imageCode) === Number(g.getAttribute('id'))) {
              if (Number(this.imageCode) > 0) g.setAttribute('v-if', `true`);
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
      }

      console.log(this.svgDom)
      this.renderSvg();

      /** Apply scale to svg */
      let svg_container = document
        .querySelector('#svgTemplate_' + this.svgId + ' svg')
        .getBBox();
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
      svg_container = document
        .querySelector('#svgTemplate_' + this.svgId + ' svg')
        .getBBox();
      let new_x = this.width / 2 - svg_container.x - svg_container.width / 2;
      let new_y = this.height / 2 - svg_container.y - svg_container.height / 2;

      g_container.setAttribute(
        'transform',
        'translate(' + new_x + ', ' + new_y + ') scale(' + scaleTransform + ')'
      );
      this.renderSvg();

      this.loadingMessage = 'Loading image...';
      this.loading = false;
      this.$store.commit('vehicles/addNewSvg', {
        key: imageId,
        value: svgText
      });
    },
    renderSvg () {
      let sXML = xmlserializer.serializeToString(this.svgDom);
      let SvgDom = Vue.extend({
        template: "<div id='svgTemplate_" + this.svgId + "'>" + sXML + '</div>'
      });
      new SvgDom().$mount('#svgTemplate_' + this.svgId);
    }
  },
  beforeDestroy () {
    this.svgDom = null;
  }
};
</script>
<style lang="scss">
.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 200px;
  min-height: 200px;

  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      min-width: 200px;
      min-height: 100px;
    }
  }

  #svgTemplate {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
