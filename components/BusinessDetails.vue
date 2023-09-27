
<script setup>
// const router = useRouter();
// const { title, slug} = useCommon();
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
  if (index < images.value.length - 1) {
    sliderCurrentIndex.value = index + 1;
  }
};

// console.log(props.propsObj.data)
</script>

<template>
<section>
      <span class="is-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li>
              <nuxt-link to="/">{{ props.propsObj.title(props.propsObj.city) }}</nuxt-link>
            </li>
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
            <!-- <img
              :src="images[sliderCurrentIndex ?? 0]"
              style="max-height: 300px; min-width: 100%"
              alt="Image"
            /> -->
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
              <p><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
              <p>
                {{ props.propsObj.contents?.business_address }}, {{ props.propsObj.contents?.business_locality }},
                {{ props.propsObj.contents?.business_city }},{{ props.propsObj.contents?.business_state }},{{
                    props.propsObj.contents?.business_pin
                }}
              </p>
            </div>
            <div class="custom-container">
              <p><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
              <a
                :href="'tel: ' + props.propsObj.contents?.business_phone"
                target="_blank"
                rel="noopener"
              >
                {{ props.propsObj.contents?.business_phone }}</a
              >
            </div>
            <div class="custom-container">
              <p><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
              <p>{{ props.propsObj.contents?.business_category }}</p>
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

        <!-- <Map :lat="businessFormData.business_latitude" :long="businessFormData.business_longitude"  
                    style="border:0; height:320px" allowfullscreen=false  loading="lazy"/> -->
      </div>

      <div class="columns mt-4" v-else>
        <div class="column is-half">
          <div class="content-section">
            <div class="custom-container">
              <p><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
              <p>
                {{ props.propsObj.contents?.business_address }}, {{ props.propsObj.contents?.business_locality }},
                {{ props.propsObj.contents?.business_city }},{{ props.propsObj.contents?.business_state }},{{
                    props.propsObj.contents?.business_pin
                }}
              </p>
            </div>
            <div class="custom-container">
              <p><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
              <p>
                <a
                  :href="'tel: ' + props.propsObj.contents?.business_phone"
                  target="_blank"
                  rel="noopener"
                >
                  {{ props.propsObj.contents?.business_phone }}</a
                >
              </p>
            </div>
            <div class="custom-container">
              <p><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
              <p>{{ props.propsObj.contents?.business_category }}</p>
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
              <p><i class="fa fa-envelope" aria-hidden="true"></i> Email</p>
              <a
                :href="'mailto: ' + props.propsObj.contents?.business_email"
                target="_blank"
                rel="noopener"
              >
                {{ props.propsObj.contents?.business_email }}</a
              >
            </div>
            <div class="custom-container">
              <p><i class="fa fa-globe" aria-hidden="true"></i> Website</p>
              <a :href="props.propsObj.contents?.business_website" target="_blank" rel="noopener">
                Visit Website</a
              >
            </div>

            <div class="custom-container">
              <p><i class="fa fa-share-alt" aria-hidden="true"></i> Social</p>
              <p>
                <a
                  :href="props.propsObj.contents?.business_social?.facebook"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook <i class="fa-brands fa-facebook-f"></i
                ></a>
              </p>
              <p>
                <a
                  :href="props.propsObj.contents?.business_social?.instagram"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram <i class="fa-brands fa-instagram" aria-hidden="true"></i
                ></a>
              </p>
              <p>
                <a
                  :href="props.propsObj.contents?.business_social?.youtube"
                  target="_blank"
                  rel="noopener"
                >
                  Youtube <i class="fa-brands fa-youtube" aria-hidden="true"></i
                ></a>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="custom-container">
              <p><i class="fa fa-clock" aria-hidden="true"></i> Business Timing</p>
              <p>
                Monday:
                {{ props.propsObj.contents?.business_timing?.monday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.monday.end }}
                <span class="icon" v-if="day == 'Monday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Tuesday:
                {{ props.propsObj.contents?.business_timing?.tuesday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.tuesday.end }}
                <span class="icon" v-if="day == 'Tuesday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Wednesday:
                {{ props.propsObj.contents?.business_timing?.wednesday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.wednesday.end }}
                <span class="icon" v-if="day == 'Wednesday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Thrusday:
                {{ props.propsObj.contents?.business_timing?.thrusday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.thrusday.end }}
                <span class="icon" v-if="day == 'Thrusday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Friday:
                {{ props.propsObj.contents?.business_timing?.friday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.friday.end }}
                <span class="icon" v-if="day == 'Friday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Saturday:
                {{ props.propsObj.contents?.business_timing?.saturday.start }}
                -
                {{ props.propsObj.contents?.business_timing?.saturday.end }}
                <span class="icon" v-if="day == 'Saturday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
              <p>
                Sunday:
                {{
                  contents?.business_timing?.sunday.start == ""
                    ? "Closed"
                    : "-" + props.propsObj.contents?.business_timing?.sunday.start
                }}
                {{ props.propsObj.contents?.business_timing?.sunday.end }}

                <span class="icon" v-if="day == 'Sunday'"
                  ><i class="fas fa-dot-circle"></i
                ></span>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="custom-container">
              <p><i class="fa fa-wrench" aria-hidden="true"></i> Services</p>

              <div class="block">
                <span
                  class="tag is-primary is-medium ml-1 is-size-7"
                  v-for="service in props.propsObj.contents?.business_services"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="inner" v-if="props.propsObj.contents.business_description != ''">
        <h4 class="title">
          <i class="fa fa-info-circle" aria-hidden="true"></i>

          About
        </h4>
        <p>{{ props.propsObj.contents?.business_description }}</p>
      </div>

      <div class="inner mt-4 mb-6" v-if="contents?.business_faq">
        <h4 class="title">
          <i class="fa fa-question-circle" aria-hidden="true"></i> FAQs
        </h4>
        <p>{{ props.propsObj.contents?.business_faq }}</p>
        <br />
      </div>
    </section>

</template>