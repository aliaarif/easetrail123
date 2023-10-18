from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from time import sleep 


service = Service('C:\\laragon\\www\\easetrail\\chromedriver\\chromedriver.exe')
driver = webdriver.Chrome(service=service)


driver.get('https://www.google.co.in/maps/@22.9874362,79.2552477,5z')
sleep(2)
 
def searchPlaces():
    Place = driver.find_element_by_class_name('searchboxinput')
    Place.send_keys('Hotels In Gurugram')
    Submit =  driver.find_element_by_xpath('/html/body/div[3]/div[8]/div[3]/div[1]/div[1]/div/div[2]/div[1]/button')
    Submit.click()
searchPlaces()
    
    

def link():
    sleep(10) 
    Link = driver.find_element_by_xpath('/html/body/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[5]/div/a')
    Link.click()
    driver.execute_script("window.scrollBy(0, 100);")
link()
    
    
        