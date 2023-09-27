<script setup>
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";

// import fetch from 'node-fetch';
// import { writeFile } from 'fs/promises'; 

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();

const { slug, title, auth, setAuth, module, edit, fields, item, subcategories, profileTab, setProfileTab } = useCommon()
const adminModules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'scripts'])
const qcModules = ref(['QC Done', 'Approoved', 'Pending', 'Rejected'])
const staffModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])
const userModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])
const message = ref('')
const services = ref('')
const showMessage = ref(false)
const scats = subcategories.value.map(item => item.name);
const cnt = ref(1)



const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
}


const callShowMessage = (res) => {
    console.log(res.data.value.message)
    message.value = res.data.value.message
    showMessage.value = true
    setTimeout(() => {
        showMessage.value = false
    }, 2000);
}

const changeServicesAdd = (event) => {
    businessFormData.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}

if (edit) {
    useFetch(`/api/services?name=${item?.value?.business_category}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}

const changeServicesSave = (event) => {
    item.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}

const changeOwnershipAdd = (event) => {
    businessFormData.value.business_ownership = event.target.value
}

const changeOwnershipSave = (event) => {
    item.value.business_ownership = event.target.value
}

const addBusinessServices1 = (service) => {
    if (!businessFormData.value.business_services.includes(service)) {
        businessFormData.value.business_services.push(service)
    }
}

const addBusinessServices2 = (service) => {
    if (!item.value.business_services.includes(service)) {
        item.value.business_services.push(service)
    }
}

const removeBusinessServices1 = (service) => {
    businessFormData.value.business_services.pop(service)
}

const removeBusinessServices2 = (service) => {
    item.value.business_services.pop(service)
}

const removeImageFromBusinessAdd = (image) => {
    businessFormData.value.business_images.pop(image)
    showFilesNo.value = (businessFormData.value.business_images.length > 0) ? businessFormData.value.business_images.length + ' Files Selected' : ''
}

const removeImageFromBusinessSave = (image) => {
    item.value.business_images.pop(image)
    showFilesNo.value = (item.value.business_images.length > 0) ? item.value.business_images.length + ' Files Selected' : ''
}

const makeSlugForSlugOnlyAdd = (event) => {
    businessFormData.value.business_slug = event.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').trim()
}

const makeSlugForSlugOnlySave = (event) => {
    item.value.business_slug = event.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').trim()
}

// States Modules
const stateFormData = ref({
    name: '',
    status: 'Active'
})

const addState = async () => {
    useFetch("/api/save/state", {
        method: 'post',
        body: stateFormData
    }).then((res) => {
        callShowMessage(res)
    })
}

const editState = async () => {
    useFetch("/api/save/state", {
        method: 'post',
        body: item.value
    }).then((res) => {
        callShowMessage(res)
    })
}

// SubCategories Modules
const subCategoryFormData = ref({
    name: '',
    slug: '',
    category: '',
    services:[],
    page_title: '',
    page_content: '',
    status: 'Active'
})

const addSubCategory = async () => {
    useFetch("/api/save/subcategory", {
        method: 'post',
        body: subCategoryFormData
    }).then((res) => {
        callShowMessage(res)
    })
}

const editSubCategory = async () => {
    useFetch("/api/save/subcategory", {
        method: 'post',
        body: item
    }).then((res) => {
        callShowMessage(res)
    })
}

// Businesses Modules
const businessFormData = ref({
    business_name: '',
    business_slug: '',
    business_ownership: '',
    business_category: '',
    business_services: [],
    business_timing:
    {
        monday: {
            start: "09:00",
            end: "17:00"
        },

        tuesday: {
            start: "09:00",
            end: "17:00"
        },

        wednesday: {
            start: "09:00",
            end: "17:00"
        },

        thrusday: {
            start: "09:00",
            end: "17:00"
        },

        friday: {
            start: "09:00",
            end: "17:00"
        },

        saturday: {
            start: "",
            end: ""
        },

        sunday: {
            start: "",
            end: ""
        }
    },
    business_address: '',
    business_locality: '',
    business_city: '',
    business_state: '',
    business_pin: '',
    business_phone: '',
    business_email: '',
    business_website: '',
    business_social: {
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        youtube: 'https://youtube.com/'
    },
    business_latitude: '',
    business_longitude: '',
    business_description: '',
    business_faqs: [
        {
            q: "",
            a: ""
        },
        {
            q: "",
            a: ""
        },
        {
            q: "",
            a: ""
        }
    ],
    business_images: [],
    status: 'Pending',
    created_by: authDataStore.authData.value?.email,
    updated_by: authDataStore.authData.value?.email
})

const businessErrors = ref({
    business_name: false,
    business_slug: false,
    business_category: false,
    business_address: false,
    business_city: false,
    business_state: false
})

const addBusiness =  () => {
    businessErrors.value.business_name = !businessFormData.value.business_name ?  true : false
    businessErrors.value.business_slug = !businessFormData.value.business_slug ? true : false
    businessErrors.value.business_category = !businessFormData.value.business_category ? true : false
    businessErrors.value.business_address = !businessFormData.value.business_address ? true : false
    businessErrors.value.business_city = !businessFormData.value.business_city ? true : false
    businessErrors.value.business_state = !businessFormData.value.business_state ? true : false

    useFetch("/api/save/business", {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        body: businessFormData,
        watch:false
    }).then((res) => {
        callShowMessage(res)  
    })
    selectedFiles.value = []
}


// For Business Edit
const bErrors = ref({
    business_name: false,
    business_slug: false,
    business_category: false,
    business_address: false,
    business_city: false,
    business_state: false
})

const editBusiness =  () => {
    bErrors.value.business_name = !item.value.business_name ?  true : false
    bErrors.value.business_slug = !item.value.business_slug ? true : false
    bErrors.value.business_category = !item.value.business_category ? true : false
    bErrors.value.business_address = !item.value.business_address ? true : false
    bErrors.value.business_city = !item.value.business_city ? true : false
    bErrors.value.business_state = !item.value.business_state ? true : false

    useFetch("/api/save/business", {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        body: item.value,
        watch:false
    }).then((res) => {
        callShowMessage(res)  
    })
}


// Users Modules
const userFormData = ref({
    name: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pin: ''
})

const addUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        callShowMessage(res)
    })
}

const editUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: item.value
    }).then((res) => {
        callShowMessage(res)
    })
}

const syncEditorValue1 = (event) => {
    item.value.business_description = event.srcElement.innerText
}

const syncEditorValue2 = (event) => {
    item.value.page_content = event.srcElement.innerText
}


const editProfile = async () => {
    useFetch("/api/save/profile", {
        method: 'post',
        body: item.value
    }).then((res) => {
        // console.log(res)
        callShowMessage(res)
        authDataStore.setAuthData(item.value)

        // setAuth(item.value)
        // localStorage.auth = JSON.stringify(item.value) 
    })
}

// Leads Modules
// const leadFormData = ref({
//     name: '',
//     status: 'Active'
// })

// const addLead = async () => {
//     useFetch("/api/save/lead", {
//         method: 'post',
//         body: leadFormData
//     }).then((res) => {
//         callShowMessage(res)
//     })
// }

// const editLead = async () => {
//     useFetch("/api/save/lead", {
//         method: 'post',
//         body: item
//     }).then((res) => {
//         callShowMessage(res)
//     })
// }

// Contacts Modules
const contactFormData = ref({
    name: '',
    status: 'Active'
})

const addContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        callShowMessage(res)
    })
}

const editContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: item
    }).then((res) => {
        callShowMessage(res)
    })
}



// Scripts Modules
const scriptFormData = ref({
    name: '',
    status: 'Active'
})

const addScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        callShowMessage(res)
    })
}

const editScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: item
    }).then((res) => {
        callShowMessage(res)
    })
}

function makeSlugAdd() {
    businessFormData.value.business_slug = slug(businessFormData.value.business_name);
}

function makeSlugSave() {
    item.value.business_slug = slug(item.value.business_name);
}

const showFilesNo = ref('')

const returnVoid = () => {
    return;
}





// const downloadImage = async (url, path) => {
//   try {
//     const response = await fetch(url);
//     const buffer = await response.buffer();
//     await writeFile(path, buffer);  // Using async writeFile
//     console.log('Image downloaded successfully!');
//   } catch (error) {
//     console.error('Error downloading image:', error);
//   }
// };




const selectedFiles = ref([])

const onFileChangeAdd = (event) => {
    selectedFiles.value.business_images = Array.from(event.target.files)
    showFilesNo.value = selectedFiles.value.business_images.length + ' Files Selected'
    selectedFiles.value.business_images.forEach(file => {
        const imageUrl = URL.createObjectURL(file)

        // downloadImage(imageUrl, 'public/');

        //const downloadLink = document.createElement('a')
        // downloadLink.href = imageUrl
        // downloadLink.download = imageUrl.replace('blob:http://localhost:3000/', '')+'.png'
        // downloadLink.click()
        businessFormData.value.business_images.push(imageUrl.replace('blob:http://localhost:3000/', '')+'.png')
        URL.revokeObjectURL(imageUrl)         
    });
}

const onFileChangeSave = (event) => {
    selectedFiles.value.business_images = Array.from(event.target.files)
    showFilesNo.value = selectedFiles.value.business_images.length + ' Files Selected'
    selectedFiles.value.business_images.forEach(file => {
        const imageUrl = URL.createObjectURL(file)

        // downloadImage(imageUrl, 'public/');

        //const downloadLink = document.createElement('a')
        // downloadLink.href = imageUrl
        // downloadLink.download = imageUrl.replace('blob:http://localhost:3000/', '')+'.png'
        // downloadLink.click()
        item.value.business_images.push(imageUrl.replace('blob:http://localhost:3000/', '')+'.png')
        URL.revokeObjectURL(imageUrl)         
    });
}


</script>
 
<template>
  
    <!-- module == 'dashboard' -->
    <template v-if="module == 'dashboard'">
        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'Admin'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in adminModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>

        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'QC'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in qcModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>

        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'Staff'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in staffModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>
        <template v-if="module == 'dashboard' && authDataStore.authData.role === 'User'">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in userModules"
                    :key="module">
                    <a @click="" href="javascript:;" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ title(module) }}</b></p>
                        <p><b>300+ </b></p>
                    </a>
                </div>
            </div>
        </template>
    </template>

    <template v-else-if="module != 'dashboard' && edit == false">
        <div class="table-container">
            <!-- Admin Tables -->
            <TableForAdmin v-if="authDataStore.authData.role === 'Admin'" />

            <!-- Staff and QC Tables -->
            <TableForStaffAndQC v-if="authDataStore.authData.role === 'Staff' || authDataStore.authData.role === 'QC' || authDataStore.authData.role === 'User'" />
        </div>
    </template>

   <!-- For Add And Edit Modules -->
    <template v-else>
  
        <!-- States Module -->
        <template v-if="module == 'states'">

            <!-- Add State -->
            <section v-if="module == 'states' && !item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="addState">

                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="stateFormData.state"
                                        placeholder="Enter state">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Add</button>
                            
                        </form>
                    </div>
                </div>
            </section>

            <!-- Edit State -->
            <section v-if="module == 'states' && item">
                
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="editState()">

                            <div class="field">
                                <label class="label is-size-7">State Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" placeholder="Enter state">
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">Save</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>


        <!-- Subcategories Module -->
        <template v-if="module == 'subcategories'">

            <!-- Add Subcategory -->
            <section v-if="module == 'subcategories' && !item">
                    <div class="columns">
                        <div class="column is-half">
                            <form @submit.prevent="addSubCategory">

                            <div class="field">
                                <label class="label is-size-7">Category Name</label>
                                <div class="control">
                                    <select id="scat" v-model="subCategoryFormData.name" @change="changeServicesAdd">
                                        <option selected value="">Select a Category</option>
                                        <option v-for="scat in scats" :key="scat">{{ scat }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="field" v-if="services">
                                <label class="label is-size-7">Business Services</label>
                                <div class="block">
                                    <span class="tag is-secondary is-medium ml-1" v-for="service in services.services"
                                        :key="service" @click="addBusinessServices1(service)">
                                        {{ service }}
                                    </span>
                                </div>
                                <div class="block">
                                    <span class="tag is-primary is-medium ml-1"
                                        v-for="service in businessFormData.business_services">
                                        {{ service }}
                                        <button class="delete is-medium" @click="removeBusinessServices1(service)"></button>
                                    </span>
                                </div>
                            </div>


                                <div class="field">
                                    <label class="label is-size-7">Category Name</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="subCategoryFormData.category"
                                            placeholder="Enter category">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Sub Category Name</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="subCategoryFormData.name"
                                            placeholder="Enter Subcategory">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Slug</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="subCategoryFormData.slug" placeholder="Enter Slug">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Page Title</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="subCategoryFormData.page_title"
                                            placeholder="Enter Page Title">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Page Content</label>
                                    <div class="control">
                                    <client-only>
                                        <Editor  @input="syncEditorValue2" v-model="subCategoryFormData.page_content" :value="subCategoryFormData.page_content"  /> 
                                    </client-only>
                                    </div>
                                </div>
                                <button type="submit" class="button is-primary">Add</button>
                                {{ message }}
                            </form>
                        </div>
                    </div>
                </section>

                <!-- Edit Subcategories -->
                <section v-if="module == 'subcategories' && item">
                   
                    <div class="columns">
                        <div class="column is-half">
                            <form @submit.prevent="editSubCategory">

                                <div class="field">
                                    <label class="label is-size-7">Category Name</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="item.category" placeholder="Enter category">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Sub Category Name</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="item.name" placeholder="Enter Subcategory">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Slug</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="item.slug" placeholder="Enter Slug">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Page Title</label>
                                    <div class="control">
                                        <input class="input is-small" type="text" v-model="item.page_title" placeholder="Enter Page Title">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label is-size-7">Page Content</label>
                                    <div class="control">
                                    <client-only>
                                        <Editor  @input="syncEditorValue2" v-model="item.page_content" :value="item.page_content"  /> 
                                    </client-only>
                                    </div>
                                </div>
                                <button type="submit" class="button is-primary is-small">Save</button> 
                                <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                            </form>
                        </div>
                    </div>
                </section> 
            </template>

        <!-- Businesses Module -->
        <template v-if="module == 'businesses'">

            <!-- Add Business -->
            <section v-if="module == 'businesses' && !item">
                <form @submit.prevent="addBusiness">
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" 
                                    :class="{'dirty': businessErrors.business_name}" 
                                    v-model="businessFormData.business_name"  
                                    placeholder="Enter Business Name" 
                                    @input="makeSlugAdd">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" 
                                    :class="{'dirty': businessErrors.business_slug}" 
                                    v-model="businessFormData.business_slug"  
                                    placeholder="Enter Business Slug" 
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-one-fifth">
                            <div class="field">
                                <label class="label is-size-7">Business Category</label>
                                <div class="select is-small" :class="{'is-danger': businessErrors.business_category}">
                                    <select  id="scat" v-model="businessFormData.business_category" @change="changeServicesAdd">
                                        <option  selected="selected" >---Select a category---</option>
                                        <option v-for="scat in scats" :key="scat">{{ scat }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="column is-four-fifth">
                            <div class="field" v-if="services">
                                <div class="block">
                                    <label class="label is-size-7">Business Services</label>
                                    <span class="button is-seconday is-light is-small ml-1 mt-1" v-for="service in services?.services"
                                        :key="service" @click="addBusinessServices1(service)">
                                        {{ service }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="block">
                                    <span class="tag is-primary is-light is-small ml-1" v-for="service in businessFormData.business_services">
                                        {{ service }}
                                        <button class="delete is-primary" @click="removeBusinessServices1(service)"></button>
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business timing</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Monday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"  v-model="businessFormData.business_timing.monday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.monday.end"
                                                placeholder="Start time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Tuesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.tuesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.tuesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Wednesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.wednesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.wednesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Thrusday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.thrusday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.thrusday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Friday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.friday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.friday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Saturday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.saturday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.saturday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Sunday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.sunday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="businessFormData.business_timing.sunday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">

                            <div class="field">
                                <label class="label is-size-7">Business Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="11"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="businessFormData.business_phone"
                                        placeholder="Enter business_phone">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text"
                                        oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                        v-model="businessFormData.business_email" placeholder="Enter business_email">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Website</label>
                                <div class="control">
                                    <input class="input is-small" type="url" v-model="businessFormData.business_website"
                                        placeholder="Enter business_website">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Ownership</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" value="Verifiefd" v-bind="businessFormData.business_ownership == 'Verifiefd' ? checked : ''" v-model="businessFormData.business_ownership"
                                            @change="changeOwnershipAdd">
                                        <span class=" is-size-7 "> Verifiefd</span>
                                    </label>
                                    <label class="radio">
                                        <input type="radio" value="Unverifiefd"  v-bind="businessFormData.business_ownership == 'Unverifiefd' ? checked : ''"  v-model="businessFormData.business_ownership"
                                            @change="changeOwnershipAdd">
                                            <span class=" is-size-7"> Unverifiefd</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Address</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="field">
                                            <label class="label is-size-7">Business Address</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': businessErrors.business_address}" 
                                                v-model="businessFormData.business_address"  
                                                placeholder="Enter Business Address"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business Locality</label>
                                            <div class="control">
                                                <input class="input is-small" type="text" 
                                                v-model="businessFormData.business_locality"
                                                placeholder="Enter Business Locality"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business City</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': businessErrors.business_city}" 
                                                v-model="businessFormData.business_city"  
                                                placeholder="Enter Business City"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business State</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': businessErrors.business_state}" 
                                                v-model="businessFormData.business_state"  
                                                placeholder="Enter Business State"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business Pin</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': businessErrors.business_pin}" 
                                                v-model="businessFormData.business_pin"  
                                                placeholder="Enter Business Pin"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label is-size-7">Business Social</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Facebook</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="businessFormData.business_social.facebook"
                                                    placeholder="facebook link">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Instagram</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="businessFormData.business_social.instagram"
                                                    placeholder="instgram link">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Youtube</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="businessFormData.business_social.youtube"
                                                    placeholder="youtube link">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>

                            <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Latitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="businessFormData.business_latitude" placeholder="Enter business_latitude">
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Longitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="businessFormData.business_longitude"  placeholder="Enter business_longitude">
                                </div>
                            </div>
                        </div>
                            </div>

                            
                        <div class="columns">
                            <div class="column">
                                <Map :lat="businessFormData.business_latitude" :long="businessFormData.business_longitude"  
                                style="border:0; height:320px" allowfullscreen=false />
                            </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Description</label>
                                <div class="control">
                                    <client-only>
                                        <Editor  @input="syncEditorValue1" v-model="businessFormData.business_description" :value="businessFormData.business_description"  /> 
                                    </client-only>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">
                                    <div class="icon-text"> Business Faqs </div>
                                </label>
                                <div class="columns">
                                    <div class="column" v-for="faq in businessFormData.business_faqs">
                                        <div class="control mt-1">
                                            <input class="input is-small" type="text" placeholder="Question" v-model="faq.q">
                                            <textarea class="textarea mt-1 is-small" placeholder="Answer" v-model="faq.a"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="file is-small has-name is-fullwidth">
                                <label class="file-label">
                                    <input class="file-input is-small" type="file" multiple @change="onFileChangeAdd">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label is-small">
                                            Choose images...
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        {{ showFilesNo }}
                                    </span>
                                </label>
                            </div>
                            <div class="field">
                                <div class="control mt-6">
                                    <span class="tag  is-small" v-for="image in businessFormData.business_images">
                                        <img :src="`${image}`" width="100" height="50" />
                                        <button class="delete is-small"
                                            @click="removeImageFromBusinessAdd(image)"></button>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">Add</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </div>
                    </div>
                </form>
            </section>

            <!-- Edit Business -->
            <section v-if="module == 'businesses' && item">
            {{item}}
                <form @submit.prevent="editBusiness">
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Name</label>
                                <div class="control">
                                    <input type="text" class="input is-small" 
                                    :class="{'dirty': bErrors.business_name}" 
                                    v-model="item.business_name"  
                                    placeholder="Enter Business Name" 
                                    @input="makeSlugSave">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Slug</label>
                                <div class="control">
                                    <input type="text" class="input is-small" 
                                    :class="{'dirty': bErrors.business_slug}" 
                                    v-model="item.business_slug"  
                                    placeholder="Enter Business Slug" 
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-one-fifth">
                            <div class="field">
                                <label class="label is-size-7">Business Category</label>
                                <div class="select is-small" :class="{'is-danger': bErrors.business_category}">
                                    <select  id="scat" v-model="item.business_category" @change="changeServicesSave">
                                        <option  selected="selected" >---Select a category---</option>
                                        <option v-for="scat in scats" :key="scat">{{ scat }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="column is-four-fifth">
                            <div class="field" v-if="services">
                                <div class="block">
                                    <label class="label is-size-7">Business Services</label>
                                    <span class="button is-seconday is-light is-small ml-1 mt-1" v-for="service in services?.services"
                                        :key="service" @click="addBusinessServices2(service)">
                                        {{ service }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="block">
                                    <span class="tag is-primary is-light is-small ml-1" v-for="service in item.business_services">
                                        {{ service }}
                                        <button class="delete is-primary" @click="removeBusinessServices2(service)"></button>
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business timing</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Monday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time"  v-model="item.business_timing.monday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.monday.end"
                                                placeholder="Start time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7"> Tuesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.tuesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.tuesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Wednesday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.wednesday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.wednesday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Thrusday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.thrusday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.thrusday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Friday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.friday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.friday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Saturday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.saturday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.saturday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">

                                            <label class="label is-size-7"> Sunday</label>
                                            <span class="is-size-7">Start</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.sunday.start"
                                                placeholder="Start time">
                                            <br />
                                            <span class="is-size-7">End</span>
                                            <input class="input is-small" type="time" v-model="item.business_timing.sunday.end"
                                                placeholder="End time">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">

                            <div class="field">
                                <label class="label is-size-7">Business Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="11"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="item.business_phone"
                                        placeholder="Enter business_phone">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text"
                                        oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                        v-model="item.business_email" placeholder="Enter business_email">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Website</label>
                                <div class="control">
                                    <input class="input is-small" type="url" v-model="item.business_website"
                                        placeholder="Enter business_website">
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Ownership</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" value="Verifiefd" v-bind="item.business_ownership == 'Verifiefd' ? checked : ''" v-model="item.business_ownership"
                                            @change="changeOwnershipSave">
                                        <span class=" is-size-7 "> Verifiefd</span>
                                    </label>
                                    <label class="radio">
                                        <input type="radio" value="Unverifiefd"  v-bind="item.business_ownership == 'Unverifiefd' ? checked : ''"  v-model="item.business_ownership"
                                            @change="changeOwnershipSave">
                                            <span class=" is-size-7"> Unverifiefd</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Address</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="field">
                                            <label class="label is-size-7">Business Address</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': bErrors.business_address}" 
                                                v-model="item.business_address"  
                                                placeholder="Enter Business Address"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business Locality</label>
                                            <div class="control">
                                                <input class="input is-small" type="text" 
                                                v-model="item.business_locality"
                                                placeholder="Enter Business Locality"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business City</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': bErrors.business_city}" 
                                                v-model="item.business_city"  
                                                placeholder="Enter Business City"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business State</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': bErrors.business_state}" 
                                                v-model="item.business_state"  
                                                placeholder="Enter Business State"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Business Pin</label>
                                            <div class="control">
                                                <input class="input is-small" type="text"  
                                                :class="{'dirty': businessErrors.business_pin}" 
                                                v-model="item.business_pin"  
                                                placeholder="Enter Business Pin"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label is-size-7">Business Social</label>
                                <div class="columns">
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Facebook</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="item.business_social.facebook"
                                                    placeholder="facebook link">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Instagram</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="item.business_social.instagram"
                                                    placeholder="instgram link">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column ">
                                        <div class="control">
                                            <label class="label is-size-7">Youtube</label>
                                            <div class="control">
                                                <input class="input is-small" type="url" v-model="item.business_social.youtube"
                                                    placeholder="youtube link">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>

                            <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Latitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="item.business_latitude" placeholder="Enter business_latitude">
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Longitude</label>
                                <div class="control">
                                    <input class="input is-small" type="text" maxlength="10"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                        v-model="item.business_longitude"  placeholder="Enter business_longitude">
                                </div>
                            </div>
                        </div>
                            </div>

                            
                        <div class="columns">
                            <div class="column">
                                <Map :lat="item.business_latitude" :long="item.business_longitude"  
                                style="border:0; height:320px" allowfullscreen=false />
                            </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                            <div class="field">
                                <label class="label is-size-7">Business Description</label>
                                <div class="control">
                                    <client-only>
                                        <Editor  @input="syncEditorValue2" v-model="item.business_description" :value="item.business_description"  /> 
                                    </client-only>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">
                                    <div class="icon-text"> Business Faqs </div>
                                </label>
                                <div class="columns">
                                    <div class="column" v-for="faq in item.business_faqs">
                                        <div class="control mt-1">
                                            <input class="input is-small" type="text" placeholder="Question" v-model="faq.q">
                                            <textarea class="textarea mt-1 is-small" placeholder="Answer" v-model="faq.a"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="file is-small has-name is-fullwidth">
                                <label class="file-label">
                                    <input class="file-input is-small" type="file" multiple @change="onFileChangeSave">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label is-small">
                                            Choose images...
                                        </span>
                                    </span>
                                    <span class="file-name">
                                        {{ showFilesNo }}
                                    </span>
                                </label>
                            </div>
                            <div class="field">
                                <div class="control mt-6">
                                    <span class="tag  is-small" v-for="image in item.business_images">
                                        <img :src="`${image}`" width="100" height="50" />
                                        <button class="delete is-small"
                                            @click="removeImageFromBusinessSave(image)"></button>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="button is-primary is-small">Save</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </div>
                    </div>
                </form>
            </section>

        </template>


        <!-- Users Module -->
        <template v-if="module == 'users'">
            <section v-if="module == 'users'  && item ">
                <form class="box" @submit.prevent="editUser">
                    <div class="columns">
                        <div class=" column is-half">
                            <div class="field">
                                <label class="label is-small">Name</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Gender</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" v-model="item.gender"  @click="item.gender = 'Male'" value="Male">
                                        Male
                                    </label>
                                    <label class="radio">
                                        <input type="radio" v-model="item.gender"   @click="item.gender = 'Female'" value="Female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone" >
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">Address</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Address" v-model="item.address">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class=" column is-half">
                            <div class="field">
                                <label class="label is-small">Locality</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Locality" v-model="item.locality">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">City</label>
                                    <CitySelect  class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch"/>
                            </div>
                            <div class="field">
                                <label class="label is-small">State</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="State" v-model="item.state" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">PIN</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="State" v-model="item.pin">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label is-small">&nbsp;</label>
                                <button type="submit" class="button is-primary is-small">Save</button> 
                                <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </template>

        <!-- Leads Module -->
        <template v-if="module == 'leads'">

            <!-- Edit Lead -->
            <section v-if="module == 'leads' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="editLead">

                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" 
                                        placeholder="Enter Name" disabled>
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label is-size-7">Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.phone"
                                        placeholder="Enter Phone" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.email"
                                        placeholder="Enter email" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Subcategory</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.subcategory"
                                        placeholder="Enter Subcategory" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">City</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.city"
                                        placeholder="Enter City" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Query</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.query"
                                        placeholder="Enter Query" disabled>
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-small">Save</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Contacts Module -->
        <template v-if="module == 'contacts'">
        
      
            <!-- Edit Contact -->
            <section v-if="module == 'contacts' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form class="box" @submit.prevent="editContact">

                            <!-- <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" 
                                        placeholder="Enter Name" disabled>
                                </div>
                            </div> -->


                            <div class="field">
                                <label class="label is-small">Name</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- <div class="field">
                                <label class="label is-size-7">Phone</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.phone"
                                        placeholder="Enter Phone" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Email</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.email"
                                        placeholder="Enter email" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Subject</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.subject"
                                        placeholder="Enter Subject" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Subject</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Subject" v-model="item.subject" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label is-size-7">Message</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.message"
                                        placeholder="Enter Message" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Message</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- {{item}} -->
                            <div class="field">
                                <label class="label is-small">Status</label>
                                <!-- <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div> -->

                                <div class="select is-primary is-small">
                                
                                <select v-model="item.status">
                                    <option>Pending</option>
                                    <option>Read</option>
                                    <option>Junk</option>
                                    <option>Awaiting</option>
                                    <option>Replied</option>
                                </select>
                            </div>

                            </div>

                           
                            <br/>

                            <button type="submit" class="button is-primary is-small">Save</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'scripts'">

            <!-- Edit Script -->
            <section v-if="module == 'scripts' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form  @submit.prevent="editScript">

                            <div class="field">
                                <label class="label is-size-7">Name</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.name" 
                                        placeholder="Enter Name" >
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label is-size-7">Type</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.type"
                                        placeholder="Enter Type" >
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Positions</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.positions"
                                        placeholder="Enter Positions" >
                                </div>
                            </div>

                            <div class="field">
                                <label class="label is-size-7">Body</label>
                                <div class="control">
                                    <input class="input is-small" type="text" v-model="item.body"
                                        placeholder="Enter Subcategory" >
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-small">Save</button> 
                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'profile'">

                <!-- Edit Script -->
                <section v-if="module == 'profile'">
                    <!-- <div class="tabs">
                        <ul>
                            <li :class="profileTab == 'profile' ? 'is-active' : ''" @click="setProfileTab('profile')"><a>Profile</a></li>
                             <li :class="profileTab == 'billing' ? 'is-active' : ''" @click="setProfileTab('billing')"><a>Billing</a></li>
                             <li :class="profileTab == 'security' ? 'is-active' : ''" @click="setProfileTab('security')"><a>Security</a></li>
                             <li :class="profileTab == 'notifications' ? 'is-active' : ''" @click="setProfileTab('notifications')"><a>Notifications</a></li>
                        </ul>
                    </div>  -->
                    <!-- {{  item }} -->
                    <div class="columns mt-2" v-if="profileTab == 'profile'">
                        <div class="column is-one-fifth">
                            <figure class="image is-128x128">
                                <img class="is-rounded ml-6" :src="authDataStore.authData.avatar">
                            </figure>
                            <span class="button  is-light is-small mt-2 is-size-6" >{{ item.name }}</span> 
                            <span class="button is-primary is-light is-small mt-2 is-size-6" >{{ item.email }}</span> 
                            
                        </div>
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Account Details
                                <form class="box" @submit.prevent="editProfile">
                                    <div class="columns">
                                        <div class=" column is-half">
                                            <div class="field">
                                                <label class="label is-small">Name</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">Email</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email" disabled>
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-envelope"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">Gender</label>
                                                <div class="control">
                                                    <label class="radio">
                                                        <input type="radio" v-model="item.gender"  @click="item.gender = 'Male'" value="Male">
                                                        Male
                                                    </label>
                                                    <label class="radio">
                                                        <input type="radio" v-model="item.gender"   @click="item.gender = 'Female'" value="Female">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">Phone</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone" >
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">Address</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Address" v-model="item.address">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" column is-half">
                                            <div class="field">
                                                <label class="label is-small">Locality</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Locality" v-model="item.locality">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">City</label>
                                                    <CitySelect  class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch"/>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">State</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="State" v-model="item.state" disabled>
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label is-small">PIN</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="State" v-model="item.pin">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="field">
                                            <label class="label is-small">&nbsp;</label>
                                            <button type="submit" class="button is-primary is-small">Save</button> 
                                            <button type="link" class="button is-primary is-light is-small ml-2" v-show="showMessage"> {{ message }}</button>
                                        </div>
                                </div>
                            </div>

                                   
                                    </form>
                            </div>
                        </div>
                    </div>


                    <div class="columns mt-2" v-if="profileTab == 'billing'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Billing Details
                            </div>
                        </div>
                    </div>

                    <div class="columns mt-2" v-if="profileTab == 'security'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Security Details
                            </div>
                        </div>
                    </div>

                    <div class="columns mt-2" v-if="profileTab == 'notifications'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Notifications
                            </div>
                        </div>
                    </div>

                </section>

            </template>
        
    </template>
</template>

<style scoped>

.ql-container {
  height: 150px !important;
  /* Add other CSS styles as needed */
}

.dirty{
    border: 1px solid red;
}

.good{
    border: 1px solid #00b89c;
}

.icon-dirty{
    color: red;
}

.icon-good{
    color: #00b89c;
}

.text-dirty{
    color: red;
}

.text-good{
    color: #00b89c;
}




</style>
