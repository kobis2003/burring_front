<template>
  <div >
      <div class="blurring-main-div">
          <h3>Here is a JSON example you can you use: <a v-bind:href="'./input-lenna-bee-voiture.json'" download>example file</a> </h3>
          <div class="main-processing-part">
              <div>
                <label for="blurring-input-file">Chose your JSON file: </label>
                <input type="file" id="blurring-input-file" accept=".json" @change="onFileChange" class="blurring-input">
              </div>
              <div>
                  <input type="button" @click="startProcess()" :disabled="jsonContent == '' || loading || currentRun" value="Let's blur it!" class="process-button">
              </div>
              <div>
                  <input type="button" @click="reInit()" v-if="currentProcessResult" value="Clear" class="process-button">
              </div>
              <div class="blurring-progress">
                  <RadialProgressBar v-if="currentRun && loading"
                                     :diameter="200"
                                     :completed-steps="currentRun!.nb_of_completed_process"
                                     :total-steps="currentRun!.nb_of_total_process">
                      {{shareInPercent}}%
                  </RadialProgressBar>
              </div>
              <div v-if="errorMessage != ''" class="blurring-error">
                  <p>
                      {{errorMessage}}
                  </p>
              </div>

          </div>
      </div>
      <div class="blurring-results" v-if="currentProcessResult" >
          <div class="blurring-result">
              <div class="initial_image">
                  <h2>Original images</h2>
              </div>
              <div class="blurring-carousel">
                  <h2>Blurred images</h2>
              </div>
          </div>
          <div class="blurring-result"  v-for="initial_image  in currentProcessResult!.initial_images" :key="initial_image.name">
              <div class="initial_image">
                  <img :src="'data:image/png;base64, ' + initial_image.data" >
                  <div class="text">
                      {{ initial_image.name }}
                  </div>
              </div>
              <carousel :items-to-show="1" class="blurring-carousel">
                  <slide class="blurring-slide" v-for="(result_image, index) in currentProcessResult.image_results.filter(x => x.image_result.name == initial_image.name)" :key="result_image.image_result.name">
                    <div>
                        <div class="slide-number-text">{{index + 1}} / {{currentProcessResult.image_results.filter(x => x.image_result.name == initial_image.name).length}}</div>
                    </div>
                    <div>
                        <img :src="'data:image/png;base64, ' + result_image.image_result.data" >
                    </div>

                    <div class="text">
                        {{ initial_image.name + ' filter : ' + JSON.stringify(result_image.image_filter)  }}
                    </div>
                  </slide>
                  <template #addons>
                      <navigation />
                      <pagination />
                  </template>
              </carousel>
          </div>
      </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlurringRunService from "@/services/BlurringRunService";
import {BlurringRun} from "@/models/Run";
import {ProcessOutput} from "@/models/ProccessData";
import RadialProgressBar from "vue3-radial-progress";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default defineComponent({
  name: "BlurringPage",
  data() {
    return {
      loading: false,
      errorMessage: "",
      jsonContent: "",
      currentRun: null as BlurringRun | null,
      currentProcessResult: null as ProcessOutput | null,
      shareInPercent: 0 as number
    };
  },
  components: {
      RadialProgressBar,
      Carousel,
      Slide,
      Pagination,
      Navigation
  },
  created () {
      setInterval(this.readCurrentProcess, 500);
  },
  methods: {
      reInit() {
          this.currentRun = null
          this.currentProcessResult = null
          this.loading = false
          this.shareInPercent = 0
          this.errorMessage = ""
      },
      async onFileChange(e: any) {
          // re initialization of the attribute
          this.reInit()
          const files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          const file: File = files[0]
          this.jsonContent = await file.text()
          console.log(this.jsonContent)
      },
      refresh_share_in_percent() {
          if(this.currentRun) {
              this.shareInPercent = Math.trunc((this.currentRun.nb_of_completed_process / this.currentRun.nb_of_total_process) * 100)
          }
      },
      tryProcessResult() {
          if(this.currentRun && this.currentRun.result){
              this.currentProcessResult = BlurringRunService.get_result_from_str(this.currentRun.result)
              this.loading = false;
          }
      },
      startProcess() {
          this.loading = true
          BlurringRunService.start_process(this.jsonContent).then((response: any) => {
              console.log("currentRun data type => " + typeof response.data);
              this.currentRun = response.data
              console.log("currentRun => " + JSON.stringify(this.currentRun));
              this.tryProcessResult()
          }).catch((e: any) => {
              console.error(e);
              this.reInit()
              if (e.response && e.response.data && e.response.data.detail) {
                  this.errorMessage = e.response.data.detail
              } else {
                  this.errorMessage = e.message
              }

          })
      },
      readCurrentProcess() {
          if(this.currentRun && this.currentRun.id && this.currentRun.status == 'RUNNING') {
              BlurringRunService.get_run(this.currentRun.id).then((response: any) => {
                  console.log("refreshing currentRun")
                  this.currentRun = response.data
                  this.tryProcessResult()
                  if(this.currentRun!.error_message) {
                      this.reInit()
                      this.errorMessage = this.currentRun!.error_message!
                  }
                  this.refresh_share_in_percent()
              })
          }
      }
  }

});
</script>

<style>
.main-processing-part{
    position: relative;
    margin: 60px auto auto;
    width: 30%;
}

.blurring-main-div{
    margin-top: 60px;
}

.blurring-input {
    margin-left: 5px;
}

.initial_image{
    width: 50%;
    text-align: center;
}

.process-button {
    margin-top: 25px;
    width: 100%;
    border: 1px solid #0066cc;
    background-color: #0099cc;
    color: #ffffff;
    padding: 5px 10px;
}

.process-button:hover {
    border: 1px solid #0099cc;
    background-color: #00aacc;
    color: #ffffff;
    padding: 5px 10px;
}

.process-button:disabled,
.process-button[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
}

.blurring-result{
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;

}

.blurring-results{
    flex-direction: column
}

.blurring-progress {
    margin-top: 30px;
    width: 100%;
}
.vrp__wrapper {
    margin: auto;
}

.blurring-error {
    color: red;
    font-size: 25px;
    font-weight: bold;
    width:100%;
}

.blurring-carousel {
    width: 50%;
    text-align: center;
}

.blurring-slide{
    flex-direction:column;
    width:100%;
}
img{
    max-width:60%;
}
li {
    list-style-type: none;
}
@keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
}
</style>
