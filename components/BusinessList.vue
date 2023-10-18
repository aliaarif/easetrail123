
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
<section>
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
                <!-- <div v-if="b.business_services.length > 0" class="mt-2">
                  <div class="buttons">
                    <button class="button is-primary is-ligh is-small"
                      v-for="service in b.business_services" :key="service">
                      {{ service }}
                    </button>
                  </div>
                </div> -->
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
    </section>
</template>
<style scoped>
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