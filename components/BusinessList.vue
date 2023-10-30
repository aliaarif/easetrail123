
<script setup>
import { useAuthDataStore } from "@/stores/auth-data";
const { title } = useCommon();
const { onlyNumber } = useValidation()
const universalErrors = ref(true)
const authDataStore = useAuthDataStore();
const message = ref('')
const showMessage = ref(false)
const showMessageForSuccessClass = ref(false)
const showMessageForErrorClass = ref(true)
const successMessage = (res) => {
    if (res.data.value.message == 'Already Submitted') {
        universalErrors.value = true
    } else {
        universalErrors.value = false
        showMessageForSuccessClass.value = true
        showMessageForErrorClass.value = false
    }
    message.value = res.data.value.message
    showMessage.value = true
    setTimeout(() => {
        showMessage.value = false
    }, 3000);
}
const errorMessage = (msg) => {
    message.value = msg
    showMessage.value = true
    showMessageForSuccessClass.value = false
    showMessageForErrorClass.value = true
}
const props = defineProps({
    propsObj: { type: Object }
})
const leadsFormData = ref({
  subcategory: props.propsObj.data.split("-in-")[0],
  city: props.propsObj.city,
  name: authDataStore.authData.name ?? "",
  phone: "",
  email: authDataStore.authData.email ?? "",
  query: props.propsObj.data,
  status: "Pending",
});
const leadErrors = ref({
  name: false,
  phone: false
})
const leadErrorsCheck = () => {
    if (!leadErrors.value.name && !leadErrors.value.phone ) {
        universalErrors.value = false
    } else {
        universalErrors.value = true
    }
}

const generateLead = async () => {
    leadErrors.value.name = !leadsFormData.value.name ? true : false
    leadErrors.value.phone = !leadsFormData.value.phone  ? true : false
    leadErrorsCheck()
    useFetch("/api/save/lead", { method: 'post', body: leadsFormData, watch:false}).then((res) => {
        !universalErrors.value ? successMessage(res) : errorMessage('Please fill the required fields')
        if (!universalErrors.value) {  } else { universalErrors.value  = true }
    })
}
</script>

<template>

<div>
  <div class="breadcrumb-top mt-4 mb-4">

    <span class="is-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></li>
            <li><a href="/">{{ props.propsObj.title(props.propsObj.city) }} </a></li>
            <li><a :href="props.propsObj.data">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</a></li>
            <li class="is-active"> <a href="javascript:;" aria-current="page">{{ props.propsObj.contents.length }}</a></li>
          </ul>
        </nav>
       
      </span>

            <!-- <span>
              <span>
                <a href="#">Home</a>
              </span> » <span>
                <a href="#">Marketing</a>
              </span> » <span class="breadcrumb_last" aria-current="page">3 Cs of Marketing: Company, Customers, and Competition</span>
            </span> -->
          </div>
          <section class="et-heading mt-4 mb-4">
            <h2 class="title">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h2>
            <p class="des" v-html="props.propsObj.meta?.page_content?.replace(new RegExp('cityName', 'g'), props.propsObj.title(props.propsObj.city))"></p>

          </section>
          <div class="columns">
            <div class="column is-9">
              <!-- 80% width on larger screens -->
              <!-- <div class="box"> -->
                <div class="box media" v-for="(b, index) in props.propsObj.contents" :key="index">
                  <div class="media-left">
                    <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-biz-${b?._id.substr(16)}`" >
                      <figure class="image custom-image">
                        <img :src="`${b?.business_images[0] ?? '../Image_not_available.png'}`" alt="Business Image" />
                      </figure>
                    </a>     

                    <!-- <figure class="image ct-thumb-image">
                      <img :src="'/'+`${b?.business_images[0] ?? '../Image_not_available.png'}`" alt="">
                    </figure> -->
                  </div>
                  <div class="media-content">
                    <h3 class="title is-3">

                      <a class="media-content-title"
                      :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-biz-${b?._id.substr(16)}`"
                      :title="`${b.business_name}`">
                        {{ b.business_name }}
                      </a>     
                    </h3>
                    <div class="meta-info">
                      <div class="location-info mb-2">
                        <i class="fa fa-map-marker mr-2"></i> 
                        <span>{{ b.business_address }}</span><span v-if="b.business_address">, </span>
                        <span>{{ b.business_locality }}</span><span v-if="b.business_locality">, </span>
                        <span>{{ b.business_city }}</span><span v-if="b.business_city">, </span>
                        <span>{{ b.business_state }}</span><span v-if="b.business_state">, </span>
                        <span>{{ b.business_pin }}</span>
                      </div>
                      <div class="contact-info">
                        <span class="media-content-phone" v-if="b.business_phone">
                          <i class="fas fa-phone mr-2"></i> 
                            <a
                          :href="'tel: ' + b.business_phone"
                          target="_blank"
                          rel="noopener"
                        >{{ b.business_phone }}</a>
                        </span> 
                      </div>
                    </div>
                  </div>
                </div>
              <!-- </div> -->
              <!-- <div class="box"> -->
                <!-- <div class="box media">
                  <div class="media-left">
                    <figure class="image ct-thumb-image">
                      <img src="https://demo.themesberg.com/spaces/assets/img/meeting-office.jpg" alt="">
                    </figure>
                  </div>
                  <div class="media-content">
                    <h3 class="title is-3">
                      <a href="#" title="Windows 10 LTSC bloatware-free promise challenged by recent security updates">Windows 10 LTSC bloatware-free promise challenged by recent security updates</a>
                    </h3>
                    <div class="meta-info">
                      <div class="location-info mb-2">
                        <i class="fa fa-map-marker mr-2"></i> 92/12, Sector 15 Part 1, Gurugram, Haryana: 122001
                      </div>
                      <div class="contact-info">
                        <i class="fas fa-phone mr-2"></i> 7947125176
                      </div>
                    </div>
                  </div>
                </div> -->
              <!-- </div>
              <div class="box"> -->
                <!-- <div class="box media">
                  <div class="media-left">
                    <figure class="image ct-thumb-image">
                      <img src="https://demo.themesberg.com/spaces/assets/img/meeting-office.jpg" alt="">
                    </figure>
                  </div>
                  <div class="media-content">
                    <h3 class="title is-3">
                      <a href="#" title="Windows 10 LTSC bloatware-free promise challenged by recent security updates">Windows 10 LTSC bloatware-free promise challenged by recent security updates</a>
                    </h3>
                    <div class="meta-info">
                      <div class="location-info mb-2">
                        <i class="fa fa-map-marker mr-2"></i> 92/12, Sector 15 Part 1, Gurugram, Haryana: 122001
                      </div>
                      <div class="contact-info">
                        <i class="fas fa-phone mr-2"></i> 7947125176
                      </div>
                    </div>
                  </div>
                </div> -->
              <!-- </div> -->
            </div>
            <div class="column is-3">
              <form @submit.prevent="generateLead">
              <h1 class="title is-3 is-size-5">Query Form</h1>
              <button type="link" class="button is-light is-small" :class="{'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors)}" v-show="showMessage"> {{ message }}</button>
              <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.name}" 
                v-model="leadsFormData.name"  
                placeholder="Your Name"/>
                
                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.phone}" 
                v-model="leadsFormData.phone"  
                placeholder="Your Phone Number"
                @input="onlyIndianMobile"
                />

                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.email}" 
                v-model="leadsFormData.email"  
                placeholder="Your Email"/>
                <button type="submit" class="button is-primary is-small mt-4">Get Best Deal</button> 
            </form>
            </div>
          </div>
</div>

<!-- <section>
      <span class="is-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></li>
            <li><a href="/">{{ props.propsObj.title(props.propsObj.city) }} </a></li>
            <li><a :href="props.propsObj.data">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</a></li>
            <li class="is-active"> <a href="javascript:;" aria-current="page">{{ props.propsObj.contents.length }}</a></li>
          </ul>
        </nav>
        <h1 class="title is-1">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h1>
        <p class="mt-4" v-html="props.propsObj.meta?.page_content?.replace(new RegExp('cityName', 'g'), props.propsObj.title(props.propsObj.city))"></p>
      </span>
      <div class="blog-section">
        <div class="blog-content">
        <div v-for="(b, index) in props.propsObj.contents" :key="index">
            <di class="media mt-4">
              <div class="media-left">
                <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-biz-${b?._id.substr(16)}`" >
                  <figure class="image custom-image">
                  <img :src="'/'+`${b?.business_images[0] ?? '../Image_not_available.png'}`" alt="Business Image" />
                </figure>
                </a>            
              </div>
              <div class="media-content">
                <a class="media-content-title" :href="`/${props.propsObj.slug(props.propsObj.city)}/${b?.business_slug}-biz-${b?._id.substr(16)}`" >
                  <h1 class="title is-4">{{ b.business_name }}</h1>
                </a>              
              <div>
                <div class="media-content-address">
                  <i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;
                  <span>{{ b.business_address }}</span><span v-if="b.business_address">, </span>
                  <span>{{ b.business_locality }}</span><span v-if="b.business_locality">, </span>
                  <span>{{ b.business_city }}</span><span v-if="b.business_city">, </span>
                  <span>{{ b.business_state }}</span><span v-if="b.business_state">, </span>
                  <span>{{ b.business_pin }}</span>
                </div>
                </div>
                <div>
                <span class="media-content-phone" v-if="b.business_phone">
                  <i class="fa fa-phone" aria-hidden="true"></i> &nbsp; 
                  <a
                :href="'tel: ' + b.business_phone"
                target="_blank"
                rel="noopener"
              >{{ b.business_phone }}</a>
              </span>
                
                </div>
              
              </div>
            </di>
          </div>
        </div>
        <aside class="sidebar mt-4">
          <div class="form-box">
            <form @submit.prevent="generateLead">
              <h1 class="title is-3 is-size-5">Query Form</h1>
              <button type="link" class="button is-light is-small" :class="{'is-primary': (showMessageForSuccessClass && !universalErrors), 'is-danger': (showMessageForErrorClass && universalErrors)}" v-show="showMessage"> {{ message }}</button>
              <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.name}" 
                v-model="leadsFormData.name"  
                placeholder="Your Name"/>
                
                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.phone}" 
                v-model="leadsFormData.phone"  
                placeholder="Your Phone Number"
                @input="onlyIndianMobile"
                />

                <input type="text" class="input is-small" 
                :class="{'mt-4 form-field': true, 'dirty': leadErrors.email}" 
                v-model="leadsFormData.email"  
                placeholder="Your Email"/>
                <button type="submit" class="button is-primary is-small mt-4">Get Best Deal</button> 
            </form>
          </div>
        </aside>
      </div>
    </section> -->
</template>
<style scoped>
  .ct-thumb-image {
    height: auto;
    width: 320px;
  }

  @media only screen and (max-width: 600px) {
    .box .media {
      display: inline-block;
    }

    /* Apply align-items and text-align to a specific element or container inside .media */
    .media {
      align-items: inherit;
      text-align: inherit;
    }

    .ct-thumb-image {
      text-align: center;
      display: inline;
    }

    .media-content {
      margin-top: 20px;
    }
  }



.media:hover {
  background-color: #e0e0e0;
}

.breadcrumb i.fa.fa-home {
    margin-top: 4px;
}

.title.is-4 {
    line-height: 33px;
    margin-bottom: 11px;
}
</style>