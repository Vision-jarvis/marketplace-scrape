from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd

def flipkart_scrape(url):
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get(url)
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html')

        rt = soup.find_all("div", "XQDdHH")
        ratings = [float(item.text) for item in rt]
        ratings = [r for r in ratings if r != 5]

        rev = soup.find_all("span", "Wphh3N")
        reviews = [int(span.text.strip('()').replace(',', '')) for span in rev]

        dsprice = soup.find_all("div", "Nx9bqj")[:40]
        costs = [item.text.replace('₹', '') for item in dsprice]

        oprice = soup.find_all("div", "yRaY8j")
        costs1 = [item.text.replace('₹', '') for item in oprice]

        name = soup.find_all("a", "wjcEIp")
        product_names = [item['title'] for item in name]

        df = pd.DataFrame({
            'Model Name': product_names[:40],
            'Original Price': costs1[:40],
            'Price After Discount': costs[:40],
            'Ratings': ratings[:40],
            'No of reviews': reviews[:40]
        })

        df.to_excel('flipkart_prod.xlsx', index=False)
        driver.quit()
        return True
    except Exception as e:
        return str(e)