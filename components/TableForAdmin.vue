<script setup>

const { searchTerms, title, module, dynamicTitle, setDynamicTitle,  edit, setModule, setAction, setEdit, td, rows, search, setItem, pageNo, setPageNo, setPageLimit, pageLimit, showDateTime } = useCommon()
// const filterSearch = () => {

//     $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}&searchTerms=${searchTerms.value}`, {
//         method: 'get'
//     }).then((res) => {
//         rows.value = res
//     })

// }

// const searchFunction = (item) => {
//     return item.category.startsWith(searchTerms.value);
// }

// onUnmounted(() => {
//       alert(1)
//     });

const changeStatus = (mod, col, val, update) => {
    const { data:res } = useFetch(`/api/save/status?mod=${mod}&col=${col}&val=${val}&update=${update}`, {
        method: 'post'
    })
}
const changeFormValues = (item) => {
    setItem(item)
    setAction('add-edit')
    setEdit(true)  
}


const loadCount = (mod, countTerm) => {
    const { data:res } =  useFetch(`/api/count?mod=${mod}&countTerm=${countTerm}`, {
        method: 'get'
    })
    return res.value
}


const loadCities = (item) => {
    setModule('cities')
    setItem(item)
    setAction('edit')
    setEdit(false) 
}

const pagePlus = () => {
    setPageNo(pageNo + 1)
}

const pageMinus = () => {
    setPageNo(pageNo - 1)
}

const changePageLimit = (event) => {
    setPageLimit(event.target.value)
    setModule(module.value)
}

</script>

<template>

    <section>
    
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                    <select @change="changePageLimit">
                        <option value="50">Show 50 </option>
                        <option value="200">Show 200 </option>
                        <option value="1000">Show 1000 </option>
                        <option value="5000">Show 5000 </option>
                    </select>
                </span>
            </p>
            <p class="control is-expanded">
                <input type="text" placeholder="Search" class="input" v-model="searchTerms" @input="filterSearch">
            </p>
        </div>
        <div class="table-container">
            <table class="table is-small is-bordered is-striped is-hoverable is-fullwidth">
                <thead>
                    <th v-for="(item,index) in td" :key="index">
                        {{ title(item) }}
                    </th>
                </thead>
                <tbody>
                    <tr v-for="(item1, index) in rows" :key="index">
                        <td v-for="item2 in td" :key="item2">

                            <div v-if="module == 'businesses'">
                                <span v-if="item2 == 'id'">{{ item1._id.substr(16) }}</span>
                                {{ item2 == 'Name' ? item1.business_name : '' }}
                                {{ item2 == 'Category' ? item1.business_category : '' }}
                                {{ item2 == 'City' ? item1.business_city : '' }}
                                {{ item2 == 'Content By' ? item1.updated_by : '' }}
                                {{ item2 == 'Approved By' ? item1.approved_by : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'users'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Role' ? item1.role : '' }}
                                {{ item2 == 'City' ? item1.city : '' }}
                            </div>

                            <div v-if="module == 'scripts'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Type' ? item1.type : '' }}
                                {{ item2 == 'Positions' ? item1.positions : '' }}
                                {{ item2 == 'Body' ? item1.body : '' }}
                            </div>

                            <div v-if="module == 'leads'">
                                {{ item2 == 'City' ? item1.city : '' }}
                                {{ item2 == 'Category' ? item1.subcategory : '' }}
                                {{ item2 == 'Query' ? item1.query : '' }}
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Phone' ? item1.phone : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'contacts'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Phone' ? item1.phone : '' }}
                                {{ item2 == 'Subject' ? item1.subject : '' }}
                                {{ item2 == 'Message' ? item1.message : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'subcategories'">
                                {{ item2 == 'Category' ? item1.category : '' }}
                                {{ item2 == 'Subcategory' ? item1.name : '' }}
                                {{ item2 == 'Businesses' ? loadCount('BusinessModel', item1.name) : '' }}
                            </div>

                            <div v-if="module == 'states'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                <a @click="loadCities(item1), setDynamicTitle(item1.name+' Cities')">{{ item2 == 'Cities' ? loadCount('CityModel', item1.name) : '' }} </a> 
                            </div>

                            <div v-if="module == 'cities'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                            </div>


                            <span v-if="item2 == 'Status' && module == 'leads'">
                              <div class="block">
                                  <span class="tag is-primary is-small ml-1">
                                      {{ item1.status }} 
                                  </span>
                              </div>
                            </span>

                            <span v-else-if="item2 == 'Status' && module == 'contacts'">
                              <div class="block">
                                  <span class="tag is-primary is-small ml-1">
                                      {{ item1.status }} 
                                  </span>
                              </div>
                            </span>
                            
                            <span class="switch is-small" v-else-if="item2 == 'Status'">
                               <input :id="`${item1._id}`" type="checkbox"  
                                @click="changeStatus(module, '_id', item1._id, item1.status == 'Active' ? 'Inactive' : 'Active')"  
                                :checked="item1.status == 'Active' ? true : false" v-if="module != 'cities' || module != 'businesses'">

                                <input :id="`${item1._id}`" type="checkbox"  
                                @click="changeStatus(module, 'name', item1.name, item1.status == 'Active' ? 'Inactive' : 'Active')"  
                                :checked="item1.status == 'Active' ? true : false" v-else-if="module == 'cities'">
                              
                                <input :id="`${item1._id}`" type="checkbox"  
                                @click="changeStatus(module, 'business_name', item1.business_name, item1.status == 'Active' ? 'Inactive' : 'Active')"  
                                :checked="item1.status == 'Active' ? true : false" v-else>
                                <label :for="`${item1._id}`" data-label=""></label>
                            </span>

                           
                           
                            <button class=" button is-small" v-if="item2 == 'Action'" @click="changeFormValues(item1), setDynamicTitle('Edit ' + title(module))">
                                <span class=" icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nav class="pagination is-small" role="navigation" aria-label="pagination" v-if="rows.length > 50">
            <a class="pagination-previous" @click="pagePlus">Previous</a>
            <a class="pagination-next" @click="pageMinus">Next page</a>

            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
        </nav>
    </section>
</template>
<style>
.switch {
  position: relative;
  margin-bottom: 1rem;
  outline: 0;
  user-select: none;
  font-size: 1rem;
  min-height: 2rem;
  height: 2rem;
}
.switch input {
  position: absolute;
  margin-bottom: 0;
  opacity: 0;
}
.switch input:checked ~ label {
  background: #00d1b2;
}
.switch input:checked ~ label::before {
  left: 2.25rem;
}
.switch label {
  position: relative;
  display: block;
  width: 4rem;
  height: 2rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 2rem;
  cursor: pointer;
}
input + .switch label {
  margin: 0;
}
.switch label::after {
  position: absolute;
  content: attr(data-label);
  left: 4.5rem;
  width: 100%;
}
.switch label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch input:checked ~ label::before {
  left: 2.25rem;
}
.switch.is-small {
  font-size: 0.75rem;
  min-height: 1.5rem;
  height: 1.5rem;
}
.switch.is-small input:checked ~ label {
  background: #00d1b2;
}
.switch.is-small input:checked ~ label::before {
  left: 1.75rem;
}
.switch.is-small label {
  position: relative;
  display: block;
  width: 3rem;
  height: 1.5rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 1.5rem;
  cursor: pointer;
}
input + .switch.is-small label {
  margin: 0;
}
.switch.is-small label::after {
  position: absolute;
  content: attr(data-label);
  left: 3.375rem;
  width: 100%;
}
.switch.is-small label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 1rem;
  height: 1rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-small input:checked ~ label::before {
  left: 1.75rem;
}
.switch.is-medium {
  font-size: 1.25rem;
  min-height: 2.5rem;
  height: 2.5rem;
}
.switch.is-medium input:checked ~ label {
  background: #00d1b2;
}
.switch.is-medium input:checked ~ label::before {
  left: 2.75rem;
}
.switch.is-medium label {
  position: relative;
  display: block;
  width: 5rem;
  height: 2.5rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 2.5rem;
  cursor: pointer;
}
input + .switch.is-medium label {
  margin: 0;
}
.switch.is-medium label::after {
  position: absolute;
  content: attr(data-label);
  left: 5.625rem;
  width: 100%;
}
.switch.is-medium label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 2rem;
  height: 2rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-medium input:checked ~ label::before {
  left: 2.75rem;
}
.switch.is-large {
  font-size: 1.5rem;
  min-height: 3rem;
  height: 3rem;
}
.switch.is-large input:checked ~ label {
  background: #00d1b2;
}
.switch.is-large input:checked ~ label::before {
  left: 3.25rem;
}
.switch.is-large label {
  position: relative;
  display: block;
  width: 6rem;
  height: 3rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 3rem;
  cursor: pointer;
}
input + .switch.is-large label {
  margin: 0;
}
.switch.is-large label::after {
  position: absolute;
  content: attr(data-label);
  left: 6.75rem;
  width: 100%;
}
.switch.is-large label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-large input:checked ~ label::before {
  left: 3.25rem;
}
</style>
