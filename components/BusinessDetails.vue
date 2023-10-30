<script setup>
// const { day } = useCommon();
const props = defineProps({
    propsObj: {
        type: Object
    }
})
const sliderCurrentIndex = ref(0);
const reduceImageIndex = (index) => {
  if (index > 0) {
    sliderCurrentIndex.value = index - 1;
  }
};
const increaseImageIndex = (index) => {
  if (index < props.propsObj.images.length - 1) {
    sliderCurrentIndex.value = index + 1;
  }
};
</script>

<template>
<div>
      <span class="is-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="https://easetrail.com/"><i class="fa fa-home" aria-hidden="true"></i></a></li>
            <li><a href ="/">{{ props.propsObj.title(props.propsObj.city) }}</a></li>
            <li>
              <a
                @click="$router.go(-1)"
                :href="`${props.propsObj.slug(props.propsObj.contents?.business_category)}-in-${props.propsObj.slug(props.propsObj.city)}`"
                >{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}
              </a>
            </li>
            <li>
              <nuxt-link :to="props.propsObj.data">{{ props.propsObj.contents?.business_name }} </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title is-1">{{ props.propsObj.contents?.business_name }}</h1>
      </span>

      <div class="columns mt-4" v-if="props.propsObj.images.length > 0">
        <div class="column is-two-fifths" v-if="props.propsObj.images.length > 0">
          <div
            class="image-section"
            style="border: 1px solid black; max-height: 350px; max-width: 90%"
          >
            <img
            :src="`${props.propsObj.images[sliderCurrentIndex]}`"
              style="max-height: 300px; min-width: 100%"
              alt="Image"
            />
            <span class="icon" style="position: absolute; top: 260px">
              <a
                class="has-text-white"
                @click="reduceImageIndex(sliderCurrentIndex)"
                href="javascript:;"
              >
                <i class="fas fa-angle-double-left"></i>
              </a>
            </span>
            <span class="icon" style="position: absolute; top: 260px; left: 455px">
              <a
                class="has-text-white"
                @click="increaseImageIndex(sliderCurrentIndex)"
                href="javascript:;"
              >
                <i class="fas fa-angle-double-right"></i>
              </a>
            </span>
          </div>
        </div>
        <div class="column">
          <div class="content-section">
            <div class="custom-container">
              <p class="media-for-address-part-1"><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
              <p class="media-for-address-part-2">
                {{ props.propsObj.contents?.business_address }}<span v-if="props.propsObj.contents?.business_address">,</span> 
                {{ props.propsObj.contents?.business_locality }}<span v-if="props.propsObj.contents?.business_locality">,</span>
                {{ props.propsObj.contents?.business_city }}<span v-if="props.propsObj.contents?.business_city">,</span>
                {{ props.propsObj.contents?.business_state }}<span v-if="props.propsObj.contents?.business_state">,</span>
                {{props.propsObj.contents?.business_pin}}
              </p>
            </div>
            <div class="custom-container">
              <p class="media-for-phone-part-1"><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
              <a 
                class="media-for-phone-part-2"
                :href="'tel: ' + props.propsObj.contents?.business_phone"
                target="_blank"
                rel="noopener"
                v-if="props.propsObj.contents?.business_phone">{{ props.propsObj.contents?.business_phone }}</a>
                <span   class="media-for-phone-part-2"  v-else>N/A</span>
            </div>
            <div class="custom-container">
              <p   class="media-for-category-part-1"><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
              <p   class="media-for-category-part-2">{{ props.propsObj.contents?.business_category }}</p>
            </div>
          </div>
        </div>
        <Map
          :lat="props.propsObj.contents?.business_latitude"
          :long="props.propsObj.contents?.business_longitude"
          class="column is-one-quarter"
          style="border: 0; width: 400px; height: 320px"
          allowfullscreen="false"
          loading="lazy"
        />
      </div>

      <div class="columns mt-4" v-else>
        <div class="column is-half">
          <div class="content-section">
            <div class="custom-container">
              <p class="media-for-address-part-1"><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
              <p class="media-for-address-part-2">
                {{ props.propsObj.contents?.business_address }}<span v-if="props.propsObj.contents?.business_address">,</span> 
                {{ props.propsObj.contents?.business_locality }}<span v-if="props.propsObj.contents?.business_locality">,</span>
                {{ props.propsObj.contents?.business_city }}<span v-if="props.propsObj.contents?.business_city">,</span>
                {{ props.propsObj.contents?.business_state }}<span v-if="props.propsObj.contents?.business_state">,</span>
                {{props.propsObj.contents?.business_pin}}
              </p>
            </div>
            <div class="custom-container">
              <p class="media-for-phone-part-1"><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
              <p class="media-for-phone-part-2">
                <a
                  :href="'tel: ' + props.propsObj.contents?.business_phone"
                  target="_blank"
                  rel="noopener"
                  v-if="props.propsObj.contents?.business_phone"> {{ props.propsObj.contents?.business_phone }}</a>
                  <span v-else>N/A</span>
              </p>
            </div>
            <div class="custom-container">
              <p class="media-for-category-part-1"><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
              <p class="media-for-category-part-2">{{ props.propsObj.contents?.business_category }}</p>
            </div>
          </div>
        </div>
        <Map
          :lat="props.propsObj.contents?.business_latitude"
          :long="props.propsObj.contents?.business_longitude"
          class="column is-one-quarter"
          style="border: 0; width: 400px; height: 320px"
          allowfullscreen="false"
          loading="lazy"
        />
      </div>
      <div class="container inner">
        <div class="columns three-layout">
          <div class="column">
            <div class="custom-container">
              <p class="media-for-email-part-1"><i class="fa fa-envelope" aria-hidden="true"></i> Email</p>
              <a 
              class="media-for-email-part-2"
                :href="'mailto: ' + props.propsObj.contents?.business_email"
                target="_blank"
                rel="noopener"
                v-if="props.propsObj.contents?.business_email"> {{ props.propsObj.contents?.business_email }}</a>
                <span v-else>N/A</span>
            </div>
            <div class="custom-container">
              <p class="media-for-website-part-1"><i class="fa fa-globe" aria-hidden="true"></i> Website</p>
              <a class="media-for-website-part-2" :href="props.propsObj.contents?.business_website" target="_blank" rel="noopener" v-if="props.propsObj.contents?.business_website">Visit Website</a>
              <span class="media-for-website-part-2" v-else>N/A</span>
            </div>

            <div class="custom-container">
              <p class="media-for-social-part-1"><i class="fa fa-share-alt" aria-hidden="true"></i> Social</p>
              <p class="media-for-social-part-2">
                <a
                  :href="props.propsObj.contents?.business_social?.facebook"
                  target="_blank"
                  rel="noopener"
                  v-if="props.propsObj.contents?.business_social?.facebook"
                >
                  Facebook <i class="fa-brands fa-facebook-f"></i
                ></a>
              </p>
              <p class="media-for-social-part-2">
                <a
                  :href="props.propsObj.contents?.business_social?.instagram"
                  target="_blank"
                  rel="noopener"
                  v-if="props.propsObj.contents?.business_social?.instagram"
                >
                  Instagram <i class="fa-brands fa-instagram" aria-hidden="true"></i
                ></a>
              </p>
              <p class="media-for-social-part-2">
                <a
                  :href="props.propsObj.contents?.business_social?.youtube"
                  target="_blank"
                  rel="noopener"
                  v-if="props.propsObj.contents?.business_social?.youtube"
                >
                  Youtube <i class="fa-brands fa-youtube" aria-hidden="true"></i
                ></a>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="custom-container">
              <p class="media-for-timing"><i class="fa fa-clock" aria-hidden="true"></i> Business Timing</p>
              <p class="media-for-address">
                Monday:
                <span v-if="(props.propsObj.contents?.business_timing?.monday?.start == '') || (props.propsObj.contents?.business_timing?.monday?.start == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.monday?.start }} - {{ props.propsObj.contents?.business_timing?.monday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Monday'"
                  ><i class="fas fa-dot-circle"></i></span>
              </p>
              <p class="media-for-address"> 
                Tuesday:
                <span v-if="(props.propsObj.contents?.business_timing?.tuesday?.start == '') || (props.propsObj.contents?.business_timing?.tuesday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.tuesday?.start }} - {{ props.propsObj.contents?.business_timing?.tuesday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Tuesday'">
                <i class="fas fa-dot-circle"></i></span>
              </p>
              <p class="media-for-address">
                Wednesday:
                <span v-if="(props.propsObj.contents?.business_timing?.wednesday?.start == '') || (props.propsObj.contents?.business_timing?.wednesday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.wednesday?.start }} - {{ props.propsObj.contents?.business_timing?.wednesday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Wednesday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p class="media-for-address">
                Thrusday:
                <span v-if="(props.propsObj.contents?.business_timing?.thrusday?.start == '') || (props.propsObj.contents?.business_timing?.thrusday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.thrusday?.start }} - {{ props.propsObj.contents?.business_timing?.thrusday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Thrusday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p class="media-for-address">
                Friday:
                
                <span v-if="(props.propsObj.contents?.business_timing?.friday?.start == '') || (props.propsObj.contents?.business_timing?.friday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.friday?.start }} - {{ props.propsObj.contents?.business_timing?.friday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Friday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p class="media-for-address">
                Saturday:
                <span v-if="(props.propsObj.contents?.business_timing?.saturday?.start == '') || (props.propsObj.contents?.business_timing?.saturday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.saturday?.start }} - {{ props.propsObj.contents?.business_timing?.saturday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Saturday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p class="media-for-address">
                Sunday:
                <span v-if="(props.propsObj.contents?.business_timing?.sunday?.start == '') || (props.propsObj.contents?.business_timing?.sunday?.end == '')"> Closed </span>
                <span v-else>{{ props.propsObj.contents?.business_timing?.sunday?.start }} - {{ props.propsObj.contents?.business_timing?.sunday?.end }}</span>
                <span class="icon" v-if="props.propsObj.day == 'Sunday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="inner" v-if="props.propsObj.contents?.business_description != '<p><br></p>'">
        <h4 class="title" >
          <i class="fa fa-info-circle" aria-hidden="true"></i> About</h4>
        <div class="mt-4" v-html="props.propsObj.contents?.business_description"></div>
      </div>

      <div class="inner mt-4 mb-6" v-if="props.propsObj.contents?.business_faqs.length > 0">
        <h4 class="title">
          <i class="fa fa-question-circle" aria-hidden="true"></i> FAQs
        </h4>
        <div v-for="(faq, index) in props.propsObj.contents?.business_faqs" :key="index" >
          <div class="box" v-if="faq.q != '' && faq.a != ''">
                <article class="media" >
                    <figure class="media-left">
                        <span class="icon has-text-info">
                            <i class="fas fa-question-circle"></i>
                        </span>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <strong>{{ faq.q }}</strong>
                            <p>{{ faq.a }}</p>
                        </div>
                    </div>
                </article>
            </div>
          </div>
        <br />
      </div>
    </div>
</template>

<style scoped>

.box {
  padding: 0px;
  margin-bottom: 20px;
}

 .column.is-half .content-section {
    padding-left: 10px;
}



.content {
    line-height: 30px;
} 

.columns.three-layout {
    margin-left: 0px;
}
</style>