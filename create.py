from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
from parsel import Selector
from slugify import slugify
import csv 
import json 
import time 
import os
filename = r'C:\laragon\www\easetrail\places_data.json'


isExistDataFile = os.path.exists('data.csv')
if isExistDataFile:
    os.remove('data.csv') 

isExistOutputFile = os.path.exists('output.csv')
if isExistOutputFile:
    os.remove('output.csv') 

isExistDataFile = os.path.exists('result.csv')
if isExistDataFile:
    os.remove('result.csv')
    outFile =  open("result.csv","w",newline="")
    writer = csv.writer(outFile)

   
    
    writer.writerow(["business_name", "business_slug", "business_status", "business_ownership", "business_category",  "business_services", "business_timing", "business_address", "business_locality", "business_city", "business_state", "business_pin",  "business_phone", "business_email", "business_website", "business_social", "business_latitude", "business_longitude", "business_description", "business_faqs", "business_image", "business_images", "business_images", "business_title", "business_content"])    


def google_map_extractor(driver, uri):
    driver.get(uri)
    more_pages = True

    nameStr = uri.find('/search')
    bName = uri[34:nameStr].replace("+", " ")
    
    

    while more_pages:
        time.sleep(2)
        html = driver.page_source
        divs = WebDriverWait(driver,3).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a')))
        soup = BeautifulSoup(html, 'html.parser')
        response = Selector(html)
        time.sleep(1)
        result_list = response.xpath('//div[contains(@aria-label, "Results for '+bName+'")]/div/div[./a]')
        # result_scroll_panel = driver.find_element(By.XPATH, "//div[contains(@aria-label, 'Results for hotels in gurgaon')]")
        total_results = len(result_list)
        
        for result_val in result_list:
            #print(f"Number of results found in this page: {total_results} and iteration is {i}")    
            name = result_val.xpath('./a/@aria-label').extract_first()
            link = result_val.xpath('./a/@href').extract_first()
            # print('Fetching data for '+name) 
            i = 1
            with open('data.csv', 'a') as fd:

                

                # if more_pages == False:
                #     pass
                
                # fd.write(f'\n{link}')
                try:
                    this_result_div = driver.find_element(By.XPATH, '//div[@aria-label="'+name+'"]')
                    driver.execute_script("arguments[0].scrollIntoView();", this_result_div)
                    total_results = total_results + total_results
                     
                    
                    last_record_page = driver.find_element(By.XPATH, "//span[@class='HlvSq']")
                    if last_record_page:
                        fd.write(f'\n{link}')
                        print('Data Fetched for '+name) 
                        i = i + 1
                        more_pages = False
                        pass

                except NoSuchElementException:
                    # print('no data found for '+name)
                    pass
            
                
                with open('data.csv','r') as in_file, open('output.csv','w') as out_file:
                    j = 0
                    seen = set() #set for fast O(1) amortized lookup
                    for link in in_file:
                        if link in seen: 
                            continue # skip duplicate
                        seen.add(link)
                        if j != 0:
                            out_file.write(link)
                        j = j +1



s = Service("C:\\laragon\\www\\easetrail\\chromedriver\\chromedriver.exe")


chromeOptios = Options()

chromeOptios.add_argument('--headless')

driver = webdriver.Chrome(service=s, options=chromeOptios)
# driver = webdriver.Chrome("C:\laragon\www\pankaj-ws\chromedriver\chromedriver.exe")
time.sleep(1)


searchStrings = [
    "https://www.google.com/maps/search/photographer+in+gurgaon",
    "https://www.google.com/maps/search/schools+in+gurgaon",
    "https://www.google.com/maps/search/police+station+in+gurgaon",
    "https://www.google.com/maps/search/pg+in+gurgaon",
    "https://www.google.com/maps/search/salons+in+gurgaon",
    "https://www.google.com/maps/search/gynecologist+in+gurgaon",
    "https://www.google.com/maps/search/bike+repair+shop+in+gurgaon",
    "https://www.google.com/maps/search/gym+in+gurgaon",
    "https://www.google.com/maps/search/hotel+in+gurgaon",
    "https://www.google.com/maps/search/temple+in+sector+46+gurgaon"
    ]

searchStrings1 = ["https://www.google.com/maps/search/hotels+in+gurugram"]


searchStrings2 = []
with open('json/subcategories.json', 'r') as json_file:
    subcategories = json.load(json_file)

with open('json/cities.json', 'r') as json_file2:
    cities = json.load(json_file2)

for cat in subcategories:
    first_half = f"https://www.google.com/maps/search/{ cat['name'].replace(' ', '+').lower() }"+"/"
    for city in cities:
        second_half = f"{ city['name'].lower()}"
        link = first_half+second_half
        searchStrings2.append(link)
        



for map_query in searchStrings1:
    google_map_extractor(driver, map_query)

                
with open('output.csv','r') as out_file:
    for link in out_file:
            
            results = []
            driver.get(link)
            
            page_content = driver.page_source 
            response = Selector(page_content) 

            dataStr = link.find('/data')

            # name and slug
            name = link[34:dataStr].replace("+", " ")
            name = name.replace('%26', '&')
            if name:
                title = name.replace('~ ', '').strip()
            else:
                title = ''
            results.append(title)
            results.append(slugify(title))
    
            # phone and email
            phone = response.xpath('//button[@data-tooltip="Copy phone number"]/@aria-label').get()
            if phone:
                phone = phone[7:len(phone)].strip()
            else:
                phone = ''
            results.append(phone)

            # email
            results.append('')

            #address
            address = response.xpath('//button[@data-tooltip="Copy address"]/@aria-label').get()
            if address:
                address = address[9:len(address)].strip()
            else:
                address = ''
            results.append(address)

            # website
            website = response.xpath('//a[@data-tooltip="Open website"]/@href').get()
            if website:
                website = website.strip()
            else:
                website = ''
            results.append(website)

            # hours            
            # info = response.xpath("//div[contains(@aria-label, 'Information for "+title+"')]")
            # for i in info:
            #     ci = i.xpath('./div[8]/div/div[2]/div[2]/span/text()').get()
            #     co = i.xpath('./div[8]/div/div[2]/div[2]/span[2]/text()').get()
            #     if ci and co is not None:
            #         hours = f'{ci + " || " + co}'.strip()
            #     else:
            #         hours = ''


            hours = response.xpath('//div[@class="t39EBf GUrTXd"]/@aria-label').get()
            if hours:
                hours = hours.replace('\u202f', '').strip()
            else:
                hours = ''
            results.append(hours)


            # lat and long
            latLongUrl = link 
            latLongUrl = latLongUrl.replace("!16s%2Fg%", '|||')
            latLongUrl = latLongUrl.replace("!8m2!3d", '???')
            latLongUrl = latLongUrl.replace("!4d", ",,,")

            latStart = latLongUrl.find('???')
            latEnd = latLongUrl.find(",")
            
            llLat = latLongUrl[latStart+3:latEnd+1].replace(",", "")
            if llLat:
                latitude = str(llLat).strip()
            else:
                latitude = ''
            results.append(latitude)

            longStart = latLongUrl.find(",")
            longEnd = latLongUrl.find('|||')

            llLong = latLongUrl[longStart+3:longEnd]
            if llLong:
                longitude = str(llLong).strip()
            else:
                longitude = ''
            results.append(longitude)
            

            # search_location
            sl = response.xpath('//button[@data-tooltip="Copy plus code"]/@aria-label').get()
            if sl is not None:
                search_location = sl[11:len(sl)].strip()
                city = search_location[7:search_location.find(",")].strip()
                state = search_location[search_location.find(",")+2:len(search_location)].strip()
            else:
                search_location = ''   
                city = '' 
                state = ''
            results.append(city)
            results.append(state)

            #category


            try:
                if driver.find_element(By.CLASS_NAME, "DkEaL"):
                    cat = driver.find_element(By.CLASS_NAME, "DkEaL").text
                    cat = cat.strip()
                else:
                    cat = ''
                    results.append(cat)    
            except NoSuchElementException:
                pass
            
            
            # subcategory
            results.append('')
            
            driver.implicitly_wait(2)

            # verified
            
            if driver.find_element(By.CLASS_NAME, "rogA2c"):
                cl = driver.find_element(By.CLASS_NAME, "rogA2c").text 
                if cl.find('Claim'):
                    verified = False
                else:
                    verified = True    
            else:
                verified = True
            results.append(verified)
           
            # try:
            #     description = f"{title} is a {cat}, which is located on {address} in {city}. The {title} offers the listof services. If you need {cat} related services in {city} and nearby areas then you can use the below given {title} contact details or directly call on compnay helpline number {phone} for any question & quveries.\n"
            #     description =  title +'is a '+cat+', which is located on '+address+' in '+city+'. The '+title+' offers the listof services. If you need '+cat+' related services in '+city+' and nearby areas then you can use the below given '+title+' contact details or directly call on compnay helpline number '+phone+' for any question & quveries.\n'
            #     description += f"For more detail, users can visit the officail website {website} of {title} \n"
            #     results.append(description)

            #     faq = 'What are the services Offered by '+title+'\n'
            #     faq += 'subcategory''\n'
            #     faq += 'Which is the address of '+title+'\n'
            #     faq += address+'\n'
            #     faq += 'Which are service areas is covered by '+title+'\n'
            #     faq += city
            #     results.append(faq)    
            # except NoSuchElementException:
            #     pass
    
            

            # image = response.xpath('//img[@style="position: absolute; top: 50%; left: 50%; width: 408px; height: 544px; transform: translateY(-50%) translateX(-50%);"]/@src').get()
            # if image:
            #     image = image
            # else:
            #     image = ''

            # images            
            image = response.xpath("//button[contains(@aria-label, 'Photo of "+title+"')]/img").get()
            results.append(image)
            images = []
            results.append(images)


            results.append(link)

          
            writer.writerow(results)

            # driver.maximize_window() # For maximizing window
            driver.implicitly_wait(1) # gives an implicit wait for 20 seconds

            entry = {
                'business_name': title, 
                'business_slug': slugify(title),
                'business_status': "Active", 
                'business_ownership': "Unclaimed",
                'business_category': cat,
                'business_services': [],
                'business_timing': {
                    'monday': {
                        'start': "09:00 ",
                        'end': "17:00 "
                    },

                    'tuesday': {
                        'start': "09:00 ",
                        'end': "17:00 "
                    },

                    'wednesday': {
                        'start': "09:00 ",
                        'end': "17:00 "
                    },

                    'thrusday': {
                        'start': "09:00 ",
                        'end': "17:00 "
                    },

                    'friday': {
                        'start': "09:00 ",
                        'end': "17:00 "
                    },

                    'saturday': {
                        'start': "NA",
                        'end': "NA"
                    },

                    'sunday': {
                        'start': "NA",
                        'end': "NA"
                    }
                },
                'business_address': address,
                'business_locality': "''",
                'business_city': city,
                'business_state': state,
                'business_pin': "''",
                'business_phone': phone,
                'business_email': "''",
                'business_website': website,
                'business_social':{
                       'facebook': 'link',
                       'facebook': 'link',
                       'facebook': 'link'
                },
                'business_latitude': latitude,
                'business_longitude': longitude,
                'business_description': '',
                'business_faqs': [],
                'business_image': image,
                'business_images': images,
                'business_title': "''",
                'business_content': "''",
            }

            # 1. Read file contents
            with open(filename, "r") as file:
                data = json.load(file)

            # 2. Update json object
            data.append(entry)
            # 3. Write json file
            with open(filename, "w") as file:
                json.dump(data, file, indent = 4) 

print('All data successfully scrapped!!!')  


