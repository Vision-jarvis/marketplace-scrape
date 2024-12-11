from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd
import re

def nykaaman_scrape(url):
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get(url)
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html')

        oprice = soup.find_all('span', 'css-17x46n5')
        mrp_prices = [int(re.search(r'₹(\d+)', span.text).group(1)) if '₹' in span.text else 0 for span in oprice]
        
        revN = soup.find_all('span', 'css-1qbvrhp')
        revNu = [int(span.text.strip('()').replace('<!-- -->', '').strip()) for span in revN]
        
        dpri = soup.find_all("span", "css-111z9ua")
        dpri = [int(span.text.strip('₹')) for span in dpri]

        name = soup.find_all("div", "css-xrzmfa")
        name = [div.text for div in name if " " in div.text]

        df = pd.DataFrame({
            'Model Name': name,
            'Original Price': mrp_prices,
            'Discounted Price': dpri,
            'Number of Reviews': revNu
        })

        df.to_excel('nykaaman_products.xlsx', index=False)
        driver.quit()
        return True
    except Exception as e:
        return str(e)