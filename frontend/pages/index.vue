<template>
  <div>
    <headerComponent />
    <div class="page-wrapper">
      <progressStepper :step-active="stepActive" />
      <div>
        <asideComponent />
        <form>
          <h1>
            <strong>Step One:</strong>&nbsp;User information
          </h1>

          <div class="wrapper">
            <div class="image-upload-wrapper camera-wrapper">
              <div style="background: yellow; height: 200px; width: 200px">
                <vue-croppie
                  ref="croppieRef"
                  :enableResize="false"
                  :enableOrientation="true"
                  :viewport="{ width: 200, height: 200, type: 'circle' }"
                  @result="result"
                  @update="update">
                </vue-croppie>
              </div>


              <img v-bind:src="cropped">

              <input type="file"
                     accept=".jpeg, .jpg, .png, .gif, .jp2, .jpx, .jpm, .tiff, .tiff-fx, .bmp, .x-bmp, .webp, .heif, .heic"
                     @change="updateCanvasImage"
                     ref="fileInput"
                     name="media">

              <div>
                <fn1-button type="button" @click.native="$refs.fileInput.click()" class="image-input">Upload Photo</fn1-button>
                <!-- <fn1-button type="button" @click.native="rotate(-90)">Rotate Left</fn1-button>
                <fn1-button type="button" @click.native="rotate(90)">Rotate Right</fn1-button> -->
                <fn1-button type="button" @click.native="crop()">Crop</fn1-button>
                <fn1-button type="button" @click.native="clearImage()">Reset</fn1-button>
                <!-- <fn1-button type="button" @click.native="cropViaEvent()">Crop Via Event</fn1-button> -->
              </div>


            </div>

            <div class="fields-wrapper">
              <fn1-input v-model="first"
                       label="First Name *"
                       placeholder="First name"
                       name="first-name"
                       id="first-name" />

              <fn1-input v-model="middle"
                         label="Middle Name"
                         placeholder="Middle name"
                         name="middle-name"
                         id="middle-name" />

              <fn1-input v-model="last"
                         label="Last Name *"
                         placeholder="Last name"
                         name="last-name"
                         id="last-name" />

              <fn1-input v-model="nickname"
                         label="Nickname"
                         placeholder="Nickname"
                         name="nickname"
                         id="nickname" />

              <exampleSelect v-model="suffix"
                            label="Suffix"
                            name="suffix"
                            id="suffix"
                            :options="suffixOptions" />
            </div>
          </div>

          <div class="button-wrapper">
            <button @click.prevent="resetForm"
                    class="reset-form">reset form</button>

            <nuxt-link class="button"
                       :to="{ name: 'two'}">Next</nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions }          from 'vuex'
import {
  mapFields }           from 'vuex-map-fields'

import axios            from 'axios'

import headerComponent  from '~/components/headerComponent'
import progressStepper  from '~/components/progressStepper'
import asideComponent   from '~/components/asideComponent'
import exampleSelect    from '~/components/exampleSelect'

export default {
  middleware: 'authenticated',
  components: {
    headerComponent,
    progressStepper,
    asideComponent,
    exampleSelect
  },
  mounted() {},
  data() {
    return {
      stepActive: 1,
      suffixOptions: [
        { value: 'Jr.', text: 'Jr.' },
        { value: 'Sr.', text: 'Sr.' },
        { value: '2nd', text: '2nd' },
        { value: '3rd', text: '3rd' },
        { value: 'II',  text: 'II' },
        { value: 'III', text: 'III' },
        { value: 'IV',  text: 'IV' },
        { value: 'V',   text: 'V' },
        { value: 'VI',  text: 'VI' }
      ],
      imgOrientation: '',
      cropped: null,
      image: '/butcherad.jpg',
      imageTwo: '/test.png'
    }
  },
  computed: {
    ...mapFields([
      'authUser',
      'totalSteps',
      'endpoints',
      'createUser.name.first',
      'createUser.name.middle',
      'createUser.name.last',
      'createUser.name.suffix',
      'createUser.name.nickname',
      'createUser.profileImage',
    ]),
  },
  methods: {
    crop() {
      // Here we are getting the result via callback function
      // and set the result to this.cropped which is being
      // used to display the result above.
      let options = {
        format: 'jpeg',
        circle: true
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output;
      });
    },
    clearImage() {
      this.cropped      = null;
      this.profileImage = "";
      this.$refs.croppieRef.bind({
        url: "",
      });
      let canvas = this.$el.querySelector('.cr-image');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    result(output) {
      this.cropped = output;
    },
    update(val) {
      //console.log(val);
    },
    rotate(rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle);
    },
    removeImage(){
      let canvas = this.$refs.imageCanvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 1200, 1000)
      // this.captures.splice(this.captures.indexOf(c), 1);
      this.$refs.fileInput.value = '';
    },
    updateCanvasImage(e) {
      // let self      = this;
      let files     = e.target.files;
      let reader    = new FileReader();

      reader.onload = (e) => {
        // console.log(e);
        let img = new Image();
        // img.onload = function() {
        //   self.drawCanvasImage(img);
        // }
        this.profileImage = e.target.result;
        this.$refs.croppieRef.bind({
          url: this.profileImage,
        });
        // img.src = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    drawCanvasImage(img) {
      var self      = this;
      var canvas    = self.$refs.imageCanvas;
      const EXIF    = require('exif-js');

      EXIF.getData(img, function() {
        self.imgOrientation = this.exifdata.Orientation;
      });

      var max_width = 1000;
      var max_height = 1000;
      var width     = img.width;
      var height    = img.height;
      var ctx       = canvas.getContext("2d");

      if (4 < self.imgOrientation && self.imgOrientation < 9) {
        if (width > height) {
          if (width > max_width) {
            img.height *= max_width / img.width;
            img.width   = max_width;

            height  = img.height;
            width   = img.width;

            canvas.width = img.height;
            canvas.height = img.width;
          }
        } else {
          // console.log('this here 1');
        }
      } else {
        if (height > max_height) {
          // console.log('this here 2');
          img.height *= max_height / img.width;
          img.width   = max_width;

          height  = img.height;
          width   = img.width;

          canvas.width = img.height;
          canvas.height = img.width;
        }

        canvas.width = width;
        canvas.height = height;
      }

      switch (self.imgOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // if(self.captures.length < 1) {
      //   self.captures.push(canvas.toDataURL());
      // } else {
      //   alert(self.singleImgMessage);
      // }
      // this.exifData();
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  form {
    background-color: orange;

    div {
      background-color: green;
      display: flex;
      flex-wrap: wrap;
    }
  }

  div {
    &:nth-of-type(2) {

      background-color: pink;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .wrapper {
    background-color: purple;
  }

  .image-upload-wrapper {
    align-items: flex-start;
    width: 300px;
    background-color: red;
  }

  .fields-wrapper {
    width: 400px;

    &:first-of-type {
      .field-group {

        &:last-of-type {
          margin: 0;

          /deep/ label {
            margin-bottom: 0;
          }
        }
      }
    }

    &:nth-of-type(2) {
      width: 492px;
    }
  }

  .camera-wrapper {
    canvas {
      width: 200px;
      height: 200px;
      background-color: grey;
      border-radius: 50%;
    }

    img {
      max-width: 100%;
    }

    input {
      &[type=file] {
        @include visuallyHidden;
      }
    }

    button {
      display: inline-flex;
      flex-direction: row;
      color: grey;
      background: gainsboro;
      margin: 0 20px 0 0;
      padding: 5px 10px;
      font-weight: $weight-normal;
      font-size: 18px;
      line-height: 18px;

      &:hover {
        background: darken(gainsboro, 5%);
      }

      &.image-input {
        position: relative;
        padding: 5px 10px 5px 40px;

        &:before {
          position: absolute;
          content: '';
          left: 10px;
          top: 6px;
          width: 20px;
          height: 15px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 335.25 257.4373'%3E%3Ctitle%3EAsset 1%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Ccircle cx='167.625' cy='142.37726' r='67.71762' fill='none' stroke='%231a3464' stroke-miterlimit='10' stroke-width='15'/%3E%3Cpath d='M317.794,249.9373H17.456c-5.47578,0-9.956-3.81411-9.956-8.47579V55.34736c0-4.66169,4.48018-8.47579,9.956-8.47579H83.575a17.40057,17.40057,0,0,0,14.13532-6.72763L108.914,16.37682a14.40256,14.40256,0,0,1,5.20835-6.06182,18.57288,18.57288,0,0,1,9.9401-2.815h87.30608a18.59964,18.59964,0,0,1,9.80785,2.73165,14.4177,14.4177,0,0,1,5.22238,5.90892l10.23946,20.762a17.57146,17.57146,0,0,0,14.62648,9.94025q.52673.02862,1.059.02872H317.794c5.47578,0,9.956,3.8141,9.956,8.47579V241.46151C327.75,246.12319,323.26982,249.9373,317.794,249.9373Z' fill='none' stroke='%231a3464' stroke-miterlimit='10' stroke-width='15'/%3E%3Crect x='24.84969' y='19.88012' width='54.83301' height='7.5' fill='%231a3464'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
          background-position: contain;
          background-repeat: no-repeat;
        }
      }

      &.take {
        span {
          @include visuallyHidden;
        }

        position: absolute;
        left: 50%;
        bottom: 80px;
        transform: translateX(-50%);
        width: 60px;
        height: 60px;
        background-color: transparent;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("data:image/svg+xml,%3Csvg id='capture-picture-icon' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='40px' height='40px' viewBox='0 0 40 40' enable-background='new 0 0 40 40' xml:space='preserve'%3E%3Ccircle opacity='0.65' fill='%23FFFFFF' cx='20' cy='20' r='16.0050011'/%3E%3Cpath opacity='0.65' fill='%23FFFFFF' d='M20,40C8.9718189,40,0,31.0277157,0,20C0,8.9718189,8.9718189,0,20,0s20,8.9718189,20,20 C40,31.0277157,31.0281811,40,20,40z M20,1.9047619C10.0223217,1.9047619,1.9047619,10.0223217,1.9047619,20 S10.0223217,38.0952377,20,38.0952377S38.0952377,29.9776783,38.0952377,20S29.9776783,1.9047619,20,1.9047619z'/%3E%3C/svg%3E");

        &:hover {
          background-image: url("data:image/svg+xml,%3Csvg id='capture-picture-icon' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='40px' height='40px' viewBox='0 0 40 40' enable-background='new 0 0 40 40' xml:space='preserve'%3E%3Ccircle opacity='0.85' fill='%23FFFFFF' cx='20' cy='20' r='16.0050011'/%3E%3Cpath opacity='0.85' fill='%23FFFFFF' d='M20,40C8.9718189,40,0,31.0277157,0,20C0,8.9718189,8.9718189,0,20,0s20,8.9718189,20,20 C40,31.0277157,31.0281811,40,20,40z M20,1.9047619C10.0223217,1.9047619,1.9047619,10.0223217,1.9047619,20 S10.0223217,38.0952377,20,38.0952377S38.0952377,29.9776783,38.0952377,20S29.9776783,1.9047619,20,1.9047619z'/%3E%3C/svg%3E");
        }
      }

      &.close {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        color: white;
        letter-spacing: 1px;
        background: rgba(0,0,0,0.55);
      }
    }

    ul {
      display: block;
      margin: 10px 0;
      padding: 10px;
      border-radius: 4px;
      background-color: rgba(225,225,225,0.1);

      li {
        display: inline-block;
        margin: 0;

        img {
          cursor: pointer;
          margin: 0 0 5px 0;
          // transform: scaleX(-1);
          // width: 100px;
          // height: 75px;
        }

        button {
          text-align: center;
          margin: 0 auto !important;
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>