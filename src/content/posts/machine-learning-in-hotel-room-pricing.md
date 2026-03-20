---
title: Machine Learning in Hotel Room Pricing
published: 2026-02-15
description: ""
image: https://res.cloudinary.com/michaelpersonal/image/upload/v1771133110/Obsidian/ozk9qpjowddbsmbzkcad.png
tags:
  - applicaton/rapid-miner-ai
category: Project
draft: false
aliases:
---
Link to my PDF (IPFS from Pinata): https://indigo-historic-salmon-454.mypinata.cloud/ipfs/bafybeidz544kyrmux3xgwnp3kbdyrgstjzj6nudaxxrtd5cwee7f5aus7q

---
# 1 Machine Learning in Hotel Room Pricing
Data Mining Research - Michael Jacob M. Delos Santos
March 20, 2026



# 2 Problem
- With the Philippines still being a popular tourist destination for Westerners, venturing into hotels offers a promising business opportunity.
- **Goal**: What's the best price for room types in Urban, Suburban, and Rural Areas?

---
# 3 Dataset Description:
We have used various sources of data from data scrapers, google maps and via popular hotel booking sites like Agoda.com and Booking.com

| Data Types | List                                                                                                                                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Label      | price                                                                                                                                                                                                                                                                                          |
| REAL       | latitude, longtitude, price, TouristAttraction_latitude, TouristAttraction_longtitude, distance_from_nearest_TouristAttraction_in_meters, rating_10_star_system, rating                                                                                                                        |
| INTEGER    | area_type_sort, price_for_x_adults, num_of_reviews, length_of_stay_days, stars                                                                                                                                                                                                                 |
| DATE       | checkin_date, checkout_date                                                                                                                                                                                                                                                                    |
| NOMINAL    | room_type, name_of_hotel, booking_platform, latitude_and_longtitude, region, area_type, day_of_week, season, nearest_TouristAttraction_name, City, FirstLevelNationAdministrativeDivision SecondLevelNationAdministrativeDivision, Nation, description, checkin_time, checkout_time, amenities |
| BINOMIAL   | has_balcony, is_a_resort, is_there_nearby_TouristAttraction, is_near_an_airport, is_near_a_metro_station, is_near_a_University_Building, is_TouristAttraction_A_Mall<br><br>*(the rest are amenities I splitted with ", ", now they're on their own columns with true / false)*                |
# 4 Data Visualization
1. Prediction of the price of the hotel room based on numerical, text, and boolean attributes
2. Predicted Prices as a scatter / Bubble Chart


![](https://res.cloudinary.com/michaelpersonal/image/upload/v1774004716/Obsidian/cnte9algzidrywbbsrdp.png)

Predicts the price of the hotel room based on numerical, text, and boolean attributes


## 4.1 Predicted Price
![](https://res.cloudinary.com/michaelpersonal/image/upload/v1774005877/Obsidian/zoqigh3xgnbwbctsn2di.png)

The prediction(price) compared to distance_from_nearest_TouristAttraction_in_meters.


Also works with malls too:

![](https://res.cloudinary.com/michaelpersonal/image/upload/v1774011298/Obsidian/kkypvwuskf76kpzq0axq.png)

As you can see from the image, if you're closer to the mall, it will likely increase the base price of the hotel (around PHP 18,000). But if you live far away from malls or from any tourist attraction, the base price significantly decreases to the base price of PHP 5,000.


# 5 How Did I Prepared the Data?

## 5.1 Step 1: Plan on how to Web Scrape Data
**Problem:** When finding for info of hotels for Philippines, I searched first in Kaggle but most of the hotel data I found were from hotels located around Europe. When I searched on the internet, I couldn't find a decent dataset that I could use to get hotel data. That's when I decided to scrape data from Google Maps instead.  

## 5.2 Step 2: Get the Tools Required
### 5.2.1 Tools used:
Here are the tools that I have used to scrape real-time data of Hotel Prices in Google Maps:
1. **Instant Data Scraper** (FREE)
	1. An extension available in the google chrome extension store.
	2. This was used for the initial data gathering.
	3. I scraped the Google Maps with this chrome extension.  
2. **JuPyTer + Skyscraper API:** (SUBSCRIPTION)
	2. I desperately needed data, and their free tiers are very limited. So I subscribed to one of the API's found in Rapid API.  
		1. The API I used in RapidAPI is Air Scraper:
			1. https://rapidapi.com/apiheya/api/sky-scrapper
		2. It costs around $9. 
	3. Used JuPyTer notebooks to automatically scrape every hotel booking website related to the hotel name for their room-type and price.
3. **JuPyTer + Ollama:**
	1. Automating the area_type (Urban, Suburban, Rural) using AI because I don't know how to identify if a location is either Urban, Suburban, or Rural. I don't have a realtime database for population of every barangay in the Philippines. 
	2. To figure out if a location is either Urban, Suburban, or Rural.
		1. Reason: The factor that determines if a location is Urban, Suburban, or Rural are rapidly changing for me to take track on and I don't "think" that I have the hardware, money or time to track those, therefore I will use remaining knowledge from this LLM Model to figure out if the current location is either Urban, Suburban, or Rural. 
	3. Model used: llama3.1:latest
4. **Playwright:**
	1. I used this because I ran out of tokens using Air Scraper so I scraped Google Map's data instead, specifically for ratings and number of reviews.

## 5.3 Step 3: Scrape Google Map for 30 minutes
I just searched for nearby hotels in Google Map and it showed me a pagination of hotels that my Instant Data Scraper can scrape to.

I started web-scraping Google Maps on April 18, 2026 then stopped today at March 20, 2026. So my dataset is very recent, and updated. 

![*This is Google Maps with Instant Data Scraper Enabled.*](https://res.cloudinary.com/michaelpersonal/image/upload/v1774012441/Obsidian/wxacl7x6rse7wwef7ztl.png)
*This is Google Maps with Instant Data Scraper Enabled.*

## 5.4 Step 4: Make the JuPyTer project and then automate scraping of booking hotels
Using Air Scraper requires payment. 

So I paid around $9 for Air Scraper's Pro Plan

I started gathering data around April 18, 2026. I have achieved around 7,000 rows of data. But I reduced it to 5,000 because most of the rows contain empty attributes. 

After I gathered data from Air Scraper using JuPyTer, I noticed that some of the rows didn't contain ratings, num_of_reviews or prices, they're either zero or null. I tried to run the JuPyTer program multiple times hoping the Air Scraper doesn't give me a timeout. Most of the rows got their prices right but some didn't get ratings and num_of_reviews. I then heard that playwright can scrape data from the web and pretend it's like a user, and that's what I used. 

## 5.5 Step 5: Setup a worker function to make Playwright get Data
Some rows may contain missing reviews and ratings using the values from the rows you scraped from Google Docs. With Playwright, we will search in Google Maps, go directly to the hotels page in Google Maps and get the visible stars and number of reviews there.

The code here is used to get rating and number of reviews from a direct page of the google hotel place. 
Here's my code that I used for using playwright:
```python
import asyncio
from typing import Any
import urllib.parse
import sys
from playwright.async_api import async_playwright
import difflib
from typing_extensions import TypedDict
import os

def search_query(name_of_hotel: str):
    encoded_query = urllib.parse.quote(name_of_hotel)
    maps_url = f"https://www.google.com/maps/search/?api=1&query={encoded_query}"
    return maps_url

def get_similarity(search_term: str, actual_name: str) -> float:
    search_clean = search_term.lower().strip()
    actual_clean = actual_name.lower().strip()
    similarity = difflib.SequenceMatcher(None, search_clean, actual_clean).ratio()
    return round(similarity, 2)

async def Login_and_Save_Google_State(browser: Any) -> bool:
    context = await browser.new_context()
    page = await context.new_page()
    await page.goto("https://accounts.google.com/")
    
    print("Please log in to your Google account in the browser.", file=sys.stderr)
    print("Once you are fully logged in, come back here and press ENTER.", file=sys.stderr)
    
    await page.wait_for_timeout(1000 * 60)
    await context.storage_state(path="google_auth.json")
    print("Login state saved to google_auth.json!", file=sys.stderr)
    
    await page.close()
    await context.close()
    return True

# --- THE MAIN SCRAPING FUNCTION ---
async def search_maps_tab(context: Any, name_of_hotel: str) -> dict[str, float | int]:
    chosen_rating: float = 0.0  
    num_of_reviews: int = 0  
    
    # Open a new tab in the shared browser context
    page = await context.new_page()

    try: 
        print(f"Starting the Scraping Process for {name_of_hotel}", file=sys.stderr)
        maps_url: str = search_query(name_of_hotel)
        print(f"🏃 Navigating directly to: {maps_url}", file=sys.stderr)
        
        try:
            await page.goto(maps_url, wait_until="networkidle", timeout=1000)
        except Exception:
            pass # Network idle timeout reached
        
        isResultsPageVisible: bool = False
        try: 
            print("🔎 checking if Results Heading is Visible", file=sys.stderr)
            resultsHeading = page.get_by_role("heading", name="Results", exact=True)
            await resultsHeading.first.wait_for(state="visible", timeout=3000)
            isResultsPageVisible = await resultsHeading.is_visible()
        except Exception:
            try: 
                print("🔎 checking if You're at the end of the list", file=sys.stderr)
                endOfListSpan = page.get_by_text("You've reached the end of the list.", exact=True)
                await endOfListSpan.wait_for(state="visible", timeout=3000)
                isResultsPageVisible = await endOfListSpan.is_visible()
            except Exception:
                isResultsPageVisible = False

        # Nested direct scrape function
        async def direct_google_map_page_scrape(page: Any, chosen_rating: float = 0.0, num_of_reviews: int = 0) -> dict[str, float | int]:
            try:
                await page.locator('button[aria-label^="Photo of "]').first.wait_for(state="visible", timeout=10000)
            except Exception:
                await page.wait_for_timeout(1000)

            max_attempts = 5
            attempt = 0
            while chosen_rating == 0.0 and attempt < max_attempts:
                all_ratings = await page.locator('div[tabindex="-1"] div.fontBodyMedium span[aria-hidden="true"]').all_inner_texts()
                span_texts = [text.strip() for text in all_ratings if text.isascii() and text.strip()]
                
                for text in span_texts:
                    try:
                        chosen_rating = float(text)
                        break 
                    except ValueError:
                        pass
                
                attempt += 1
                await page.wait_for_timeout(100)
            
            await page.wait_for_timeout(1000)

            if chosen_rating != 0.0:
                print(f"✅ Ratings Found! {chosen_rating} Moving on to reviews...", file=sys.stderr)
                await page.wait_for_timeout(1000)
                reviews_locator = page.locator('div[tabindex="-1"] span[aria-label*="review"]').first
                
                try:
                    await reviews_locator.wait_for(state="attached", timeout=5000)
                    aria_label = await reviews_locator.get_attribute("aria-label")
                    if aria_label:
                        num_of_reviews_str = ''.join(filter(str.isdigit, aria_label))
                        if num_of_reviews_str:
                            num_of_reviews = int(num_of_reviews_str)
                            print(f"✅ Number of reviews found: {num_of_reviews}", file=sys.stderr)
                except Exception:
                    print("❌ No reviews element found (Timeout).", file=sys.stderr)
            
            await page.wait_for_timeout(1000)
            return {
                "rating": chosen_rating,
                "num_of_reviews": num_of_reviews,
            }

        if isResultsPageVisible:
            print("📍 You're in the results page", file=sys.stderr)
            links = page.locator("a[aria-label]")

            class HotelResult(TypedDict, closed=True):
                hotel_name: str
                similarity_score: float
                rating: float  
                href_link: str

            listThing: list[HotelResult] = []

            js_code = """
            elements => elements.map(e => {
                let rating = 0.0;
                const ratingSpan = e.querySelector('span[aria-label*="stars"], span[aria-label*="star"]');
                if (ratingSpan) {
                    const aria = ratingSpan.getAttribute('aria-label');
                    const match = aria.match(/[\\d\\.]+/);
                    if (match) {
                        rating = parseFloat(match[0]);
                    }
                }
                return {
                    name: e.getAttribute('aria-label'),
                    rating: rating,
                    href: e.getAttribute('href') || '' 
                };
            })
            """
            all_hotel_data = await links.evaluate_all(js_code)
            for data in all_hotel_data:
                hotel_name_res = data['name']
                href_link = data['href']
                extracted_rating = data['rating'] 
                similarity = get_similarity(name_of_hotel, hotel_name_res)
                
                listThing.append(HotelResult(
                    hotel_name=hotel_name_res, 
                    similarity_score=similarity, 
                    rating=extracted_rating,  
                    href_link=href_link
                ))
            
            listThing.sort(key=lambda x: (x['similarity_score'], x['rating']), reverse=True)
            
            if listThing:
                print(f"✅ Best Match: {listThing[0]['hotel_name']}", file=sys.stderr)
                await page.goto(f"{listThing[0]['href_link']}")
            await page.wait_for_timeout(3000)

            responseDirectGoogeleMapScrape = await direct_google_map_page_scrape(page)
            chosen_rating = responseDirectGoogeleMapScrape["rating"]
            num_of_reviews = int(responseDirectGoogeleMapScrape["num_of_reviews"])
        else:
            print("📍 You're in the direct Google Map Page", file=sys.stderr)
            responseDirectGoogeleMapScrape = await direct_google_map_page_scrape(page)
            chosen_rating = responseDirectGoogeleMapScrape["rating"]
            num_of_reviews = int(responseDirectGoogeleMapScrape["num_of_reviews"])
            
    except Exception as e:
        print(f"❌ Error during scraping {name_of_hotel}: {e}", file=sys.stderr)
    finally:
        # ALWAYS CLOSE THE TAB
        await page.close()
    
    return {
        "rating": chosen_rating,
        "num_of_reviews": num_of_reviews,
    }
```

This is the entire worker function and I used a concurrent.engine to run multiple threads that will gather data in one google browser instance, this makes it faster and reduces resource usage.

The concurrent engine:
```python
import threading
import random
from dotenv import load_dotenv
from typing import Any, cast

# Limit Playwright to 10 active tabs at a time
MAX_TABS = 20
semaphore = asyncio.Semaphore(MAX_TABS)

cached_list: list[dict[str, Any]] = []
total_hotels = len(filteredDF) # Assuming filtered_df is your loaded dataframe

async def process_hotel(context: Any, index: int, row_series: Any):
    async with semaphore:
        load_dotenv(override=True)
        stop_threads_flag = os.getenv("STOP_PROGRAM_THREADS_NUMBER_TWO", "false").lower() == "true"
        
        if stop_threads_flag:
            return
        name_of_hotel = str(row_series['name_of_hotel'])
        # Add a tiny async sleep to stagger the tabs opening
        await asyncio.sleep(random.uniform(0.1, 1.5))
        
        try:
            # Call the function we defined in Cell 1!
            # We use asyncio.wait_for as our new "Kill Switch" (45 seconds)
            result = await asyncio.wait_for(
                search_maps_tab(context, name_of_hotel),
                timeout=45.0
            )
            
            cached_list.append({
                "index": index,
                "rating": result.get('rating'),
                "num_of_reviews": result.get('num_of_reviews')
            })
            print(f"🎯 Saved [{len(cached_list)}/{total_hotels}]: {name_of_hotel} -> {result}")
            
        except asyncio.TimeoutError:
            print(f"💀 KILLED [{len(cached_list)}]: Tab hung for over 45 seconds --- {name_of_hotel}")
        except Exception as e:
            print(f"❌ Failed [{len(cached_list)}]: {e} --- {name_of_hotel}")

async def run_scraper():
    print("Launching single browser instance...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False, # Set to False if you want to watch the tabs!
            channel="chrome",
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        # Load the cookies ONCE for all tabs to share
        if os.path.exists("google_auth.json"):
            context = await browser.new_context(
                storage_state="google_auth.json",
                viewport={"width": 1920, "height": 1080},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )
        else:
            context = await browser.new_context()

        # Create a task for every row
        tasks: list[Any] = []
        for index, row in filteredDF.iterrows():
            tasks.append(process_hotel(context, cast(int, index), row))
            
        print(f"Firing {len(tasks)} concurrent tab tasks (Max {MAX_TABS} at a time)...")
        await asyncio.gather(*tasks)
        
        await context.close()
        await browser.close()

# --- THE JUPYTER THREADING WRAPPER ---
def start_scraping_in_background():
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    asyncio.run(run_scraper())

# Execute the thread
print("Spinning up Playwright...")
scraper_thread = threading.Thread(target=start_scraping_in_background)
scraper_thread.start()
scraper_thread.join()

print("All tabs finished. Merging data back into the DataFrame...")
for item in cached_list:
    row_idx: int  = cast(int, item["index"])
    inputDF.at[row_idx, 'rating'] = item["rating"]
    inputDF.at[row_idx, 'num_of_reviews'] = item["num_of_reviews"]

output_filename = "output-data/hotel_data_fully_scraped.xlsx"
os.makedirs("output-data", exist_ok=True)
inputDF.to_excel(output_filename, index=False) # type: ignore
print(f"🎉 Scraping complete! Data saved to {output_filename}")
```

## 5.6 Step 6: Start Automating and Collecting Data
After the functions above have been declared and set up. You can start collecting now.

## 5.7 Step 7: Double Check and Clean your Rows 
### 5.7.1 Step 7.1: Splitting the Data
There was just one problem, the amenities column is just one big strings of multiple amenities. If there was a way to split those values separated by commas, we can accurately determine if a hotel's room option contains a certain amenity via true / false on their own columns. That's what I did with JuPyTer.

```python
import pandas as pd

inputFolder = "input-data/for-splitting-data"
outputFolder = "output-data/for-splitting-data"
file_name = "Training_Data_Set.xlsx"
inputDFFour = pd.read_excel(f"{inputFolder}/{file_name}", sheet_name=0) # type: ignore

# 1. Get dummies
# 2. Add the prefix (e.g., 'amenity_')
# 3. Convert to bool
amenities_expanded = (
    inputDFFour["amenities"]
    .str.get_dummies(sep=", ")
    .add_prefix("amenity_")
    .astype(bool)
)

# Concatenate to the original dataframe
inputDFFour = pd.concat([inputDFFour, amenities_expanded], axis=1)

# Force memory defragmentation to avoid PerformanceWarnings
inputDFFour = inputDFFour.copy()

inputDFFour.to_excel(f"{outputFolder}/{file_name}", index=False) # type: ignore
```

This is the code I used to split the amenities into their own separate columns, now the data looks like this:

![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773991792/Obsidian/pay9g7nkip0pfceezqjr.png)


> [!NOTE] 
> If the automation wasn't able to fill the missing attributes in the rows, I have to manually search for it in Google or try to get information quickly via Gemini AI (Google's AI which also has access to Google's Hotel API). 

---
# 6 Model Selection
And now we can finally look into the JuPyTer Program.

I was deciding on what I should use, I tested with both Decision Tree and Random Forests. Random Forests provides a better answer.

![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773998030/Obsidian/fvzvfr4rovswbog75j3d.png)

During 2024, I used Decision Tree with Cross Validation. 

But now I'm using Random Trees because that works better. With Cross Validation.


There are four types of outputs here.
1. First is the performance of the cross validation, to make the model train to predict on unseen data.
2. After that we apply that model to a Random_Forest operator using 0.30% of the data (which wasn't trained on) to predict it's price.
3. After that I aggregate for the Average, Median, Mode, Minimum, Maximum, Value_For_Money, and Range of each price, grouped by area_type and then by room_type.
	1. The Value_For_Money here is the hedonic pricing, which means the lower the value it is, the better it is worth for, even if the initial price is higher. 
4. Lastly I outputted the correlation matrix for myself to see which columns are driving the prices up and which columns are driving the prices down. 


## 6.1 Cross Validation
- Here's to prove that Random Forest is better than Decision Tree

**Decision Tree**
![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773997602/Obsidian/dgz5ojju9cjxeikgi9pn.png)

**Random Forest**
![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773997612/Obsidian/tpn1a3yd14y1ugk6ankx.png)

- The Chosen Model will be the Random Forest due to it's higher percent score in prediction.

## 6.2 Applying both Models to test their Performance
- For this one, I wanted to see what's the performance score when I try to apply the data to the remaining 30% percent of the training data that wasn't part of the 70% training data.
- Here are my Percent scores when I applied the model to unseen data.

**Random Forest Cross Validation Model:**
![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773997724/Obsidian/d6krvjys80drqowrdrwo.png)
- 82% accurate at prediction

**Decision Tree Cross Validation Model:**
![](https://res.cloudinary.com/michaelpersonal/image/upload/v1773998190/Obsidian/ypytimnicvpckzfv5lax.png)
- 62% accurate at prediction.

Random Forest Wins!

# 7 Data Gathered

This aggregated table tells us that this is how hotels should be priced based on their area and their room type. Unfortunately not all premium type rooms are included in all three areas but the most commons ones are:
1. Room (which is standard Room)
2. Shared Room
3. Single Room
4. Triple Room
5. Suite

| room_type       | area_type | area_type_sort | average(price) | mode(price) | median(price) | minimum(price) | maximum(price) | average(value_for_money) | range |
| --------------- | --------- | -------------- | -------------- | ----------- | ------------- | -------------- | -------------- | ------------------------ | ----- |
| **Room**        | Rural     | 3              | 4596.020408    | 1413        | 2476          | 392            | 96922          | 1054.467454              | 96530 |
| **Shared room** | Rural     | 3              | 867.4705882    | 415         | 820           | 350            | 1977           | 196.7184565              | 1627  |
| **Single room** | Rural     | 3              | 3532.744681    | 502         | 1527          | 374            | 21044          | 850.8499671              | 20670 |
| **Suite**       | Rural     | 3              | 8354.864407    | 3255        | 4872          | 1434           | 25788          | 2012.140749              | 24354 |
| **Triple room** | Rural     | 3              | 2277.5         | 1260        | 1566          | 1080           | 4242           | 949.6994411              | 3162  |
| **Twin room**   | Rural     | 3              | 3689.702703    | 4095        | 2660          | 788            | 16164          | 857.1778926              | 15376 |
| **Deluxe Room** | Suburban  | 2              | 42650          | 42650       | 42650         | 42650          | 42650          | 10797.46835              | 0     |
| **Double room** | Suburban  | 2              | 2866.966403    | 4008        | 2127          | 380            | 37800          | 708.6419634              | 37420 |
| **Family Room** | Suburban  | 2              | 7235.714286    | 2396        | 4225          | 1873           | 57000          | 2178.776219              | 55127 |
| **Queen Room**  | Suburban  | 2              | 19000          | 19000       | 19000         | 19000          | 19000          | 4750                     | 0     |
| **Room**        | Suburban  | 2              | 3846.848883    | 3215        | 2441          | 353            | 48751          | 941.6135443              | 48398 |
| **Shared room** | Suburban  | 2              | 955.9090909    | 353         | 578.5         | 353            | 8482           | 233.7225406              | 8129  |
| **Single room** | Suburban  | 2              | 1831.709302    | 1803        | 1589          | 551            | 4164           | 477.7475015              | 3613  |
| **Suite**       | Suburban  | 2              | 8453.822581    | 2430        | 5123          | 1043           | 36607          | 1896.618407              | 35564 |
| **Triple room** | Suburban  | 2              | 4400.28        | 5250        | 2759          | 1164           | 22712          | 1005.167115              | 21548 |
| **Twin room**   | Suburban  | 2              | 5862.163842    | 11893       | 3446          | 440            | 48329          | 1333.617398              | 47889 |
| **Double Room** | Urban     | 1              | 5743.333333    | 2394        | 5836          | 2394           | 9000           | 1487.486325              | 6606  |
| **Double room** | Urban     | 1              | 3672.149184    | 687         | 2506          | 510            | 42605          | 855.2919723              | 42095 |
| **Family Room** | Urban     | 1              | 2380.5625      | 1071        | 1787          | 1071           | 13200          | 570.5645281              | 12129 |
| **King Room**   | Urban     | 1              | 29180          | 29180       | 29180         | 29180          | 29180          | 6343.478261              | 0     |
| **Queen Room**  | Urban     | 1              | 7595           | 4233        | 7392          | 4233           | 11160          | 1929.718876              | 6927  |
| **Room**        | Urban     | 1              | 4504.661451    | 6800        | 3312          | 385            | 40235          | 1045.433574              | 39850 |
| **Shared room** | Urban     | 1              | 654.9090909    | 357         | 562           | 357            | 1767           | 194.2465377              | 1410  |
| **Single room** | Urban     | 1              | 1690.441176    | 800         | 1366          | 468            | 6527           | 430.7194787              | 6059  |
| **Suite**       | Urban     | 1              | 5319.074074    | 1083        | 3060          | 1083           | 16500          | 1241.744932              | 15417 |
| **Triple room** | Urban     | 1              | 12094.83333    | 1730        | 14439.5       | 1730           | 19836          | 2664.758646              | 18106 |
- According to this table data, I conclude these are the recommended price limit for hotels:
	- The mode(price) becomes the minimum and the average(price) becomes the maximum.
	- If mode(price) is higher than average(price), then:
		- average(price) becomes the minimum and mode(price) becomes the maximum.
	1. *For Rural Areas:*
		1. Room (which is standard Room) = PHP 1413 - PHP 4596.02
		2. Shared Room = PHP 415 - PHP 867.470
		3. Single Room = PHP 502 - PHP 3532.7
		4. Triple Room = PHP 1260 - PHP 2277.5
		5. Suite = PHP 3255 - PHP 8354.86
	2. *For Suburban Areas:*
		1. Room (which is standard Room) = PHP 3215 - PHP 3846.85
		2. Shared Room = PHP 353 - PHP 955.91
		3. Single Room = PHP 1803 - PHP 1831.71
		4. Triple Room = PHP 4400.28 - PHP 5250
		5. Suite = PHP 2430 - PHP 8453.82
	3. *For Urban Areas:*
		1. Room (which is standard Room) = PHP 4504.66 - PHP 6800
		2. Shared Room = PHP 357 - PHP 654.91
		3. Single Room = PHP 800 - PHP 1690.44
		4. Triple Room = PHP 1730 - PHP 12094.83
		5. Suite = PHP 1083 - PHP 5319.07
- Summary:
	- For the summary I will be just summing up **using only the similar rooms**. 
		1. RURAL AVERAGE SUM: PHP 23,318.30279
		2. SUBURBAN AVERAGE SUM: PHP 25,350.7337
		3. URBAN AVERAGE SUM: PHP 24,263.91912

%% my sheet: https://docs.google.com/spreadsheets/d/1A4TdJQI-dHGTnPOWh0-cKxIXkXBp_ZR1WP7EJfcNUgA/edit?gid=0#gid=0 %%
 
## 7.1 Which attributes affect the price a lot?

### 7.1.1 Increases the price:
| amenity_fitness_center                    | price | 0.3954972263976445  |
| ----------------------------------------- | ----- | ------------------- |
| is_a_resort                               | price | 0.3839405545822225  |
| amenity_spa                               | price | 0.36997983662569445 |
| amenity_beach_umbrellas                   | price | 0.3678213414201146  |
| amenity_tanning_beds                      | price | 0.36652284421977144 |
| amenity_private_beach                     | price | 0.3445662898910885  |
| amenity_poolside_bar                      | price | 0.34224123123286265 |
| amenity_steam_room                        | price | 0.317359511801071   |
| amenity_wedding_facilities                | price | 0.31619981742977193 |
| amenity_baby-sitting                      | price | 0.31035344523307484 |
| amenity_children's_play_area              | price | 0.30735097964370345 |
| amenity_airport_shuttle                   | price | 0.2686881397044429  |
| amenity_diving                            | price | 0.2665853174978052  |
| amenity_shuttle_service                   | price | 0.2647189836800071  |
| amenity_tennis_court                      | price | 0.26420755364863424 |
| amenity_breakfast_included                | price | 0.2605974702209003  |
| amenity_laundry                           | price | 0.2525143430460432  |
| amenity_car_rental                        | price | 0.22706739603977677 |
| amenity_valet_parking                     | price | 0.2222274558349386  |
| amenity_garden                            | price | 0.21915065479528942 |
| amenity_atm                               | price | 0.2118972418416284  |
| amenity_nightclub                         | price | 0.20507619988472892 |
| amenity_table_tennis                      | price | 0.19950782313712515 |
| amenity_ticket_office                     | price | 0.19623791330641568 |
| amenity_wake-up_call                      | price | 0.19103087392689588 |
| amenity_tours                             | price | 0.1893518909956548  |
| amenity_coffee-maker                      | price | 0.1701530886379577  |
| amenity_bathrobe                          | price | 0.16959568004556638 |
| amenity_pants_press                       | price | 0.16471111954203052 |
| amenity_executive_floor                   | price | 0.16302298368815557 |
| amenity_hairdressers                      | price | 0.15675035340142823 |
| amenity_golf_course                       | price | 0.15348094989835107 |
| amenity_library                           | price | 0.1511156754416117  |
| amenity_entertainment_rooms               | price | 0.14634382583015476 |
| amenity_station_shuttle                   | price | 0.13303521344465918 |
| amenity_bathtub                           | price | 0.1300553457870314  |
| amenity_playground                        | price | 0.12208781374355587 |
| amenity_aromatherapy                      | price | 0.11965619864084852 |
| amenity_beach_bar                         | price | 0.11965619864084852 |
| amenity_beach_cabanas                     | price | 0.11965619864084852 |
| amenity_billiards                         | price | 0.11965619864084852 |
| amenity_body_wrap                         | price | 0.11965619864084852 |
| amenity_bowling                           | price | 0.11965619864084852 |
| amenity_canoeing                          | price | 0.11965619864084852 |
| amenity_chess                             | price | 0.11965619864084852 |
| amenity_express_check-in_and_check-out    | price | 0.11965619864084852 |
| amenity_free_parking                      | price | 0.11965619864084852 |
| amenity_grocery_and_convenience_store     | price | 0.11965619864084852 |
| amenity_ironing_service                   | price | 0.11965619864084852 |
| amenity_meeting_and_banqueting_facilities | price | 0.11965619864084852 |
| amenity_racquetball                       | price | 0.11965619864084852 |
| amenity_restaurant_and_bar                | price | 0.11965619864084852 |
| amenity_snorkeling                        | price | 0.11965619864084852 |
| amenity_water_sports_activities           | price | 0.11965619864084852 |
| amenity_outdoor_swimming_pool             | price | 0.11954804626387995 |
| amenity_bicycle_rental                    | price | 0.11252502675962407 |
| amenity_casino                            | price | 0.11166170871364041 |
| amenity_chapel                            | price | 0.11098483988631086 |
| amenity_hairdryer                         | price | 0.10216458402474596 |
| amenity_24-hour_front_desk                | price | 0.10216086013580386 |
📈 Attributes that **increase** price

The strongest positive drivers are luxury or exclusivity-related amenities. The **top 5** are:

1. **Fitness center** (+0.395) – Guests associate gyms with premium hotels.
2. **Resort classification** (+0.384) – Being labeled a resort signals higher-end services.
3. **Spa** (+0.370) – Wellness facilities strongly boost perceived value.
4. **Beach umbrellas** (+0.368) – Indicates beachfront property, which is highly desirable.
5. **Tanning beds** (+0.367) – Another leisure/luxury amenity tied to vacation settings.

Other notable price boosters include **private beach access**, **poolside bars**, **steam rooms**, and **wedding facilities**. These all suggest exclusivity, convenience, or luxury experiences, which justify higher pricing.

### 7.1.2 Decreases the price

| amenity_outdoor_pool          | price | -0.34823685416882183 |
|-------------------------------|-------|----------------------|
| amenity_pool                  | price | -0.33254620736012436 |
| amenity_bar                   | price | -0.3215620065206103  |
| amenity_concierge             | price | -0.30977521527037905 |
| amenity_currency_exchange     | price | -0.29642723184301606 |
| amenity_safe_deposit_box      | price | -0.29457219088648834 |
| amenity_massage               | price | -0.2918156359091895  |
| amenity_iron                  | price | -0.2906423108267366  |
| amenity_accessible            | price | -0.2868776723692815  |
| amenity_restaurant            | price | -0.26721910631170376 |
| amenity_sauna                 | price | -0.2652084802857098  |
| amenity_business_center       | price | -0.258683467223575   |
| amenity_banquet_service       | price | -0.2457752564331239  |
| amenity_shops                 | price | -0.2410757526615483  |
| amenity_meeting_facilities    | price | -0.23197752624286658 |
| amenity_luggage_storage       | price | -0.22415094482699047 |
| amenity_children's_pool       | price | -0.2237498850249475  |
| amenity_express_check-out     | price | -0.20335694659113474 |
| amenity_games_room            | price | -0.19713506817707016 |
| amenity_express_check-in      | price | -0.1969228308664086  |
| amenity_wheelchair_accessible | price | -0.19347911041259366 |
| amenity_fax                   | price | -0.19009540802600186 |
| amenity_cafÃ©                 | price | -0.18299451440694972 |
| amenity_elevator              | price | -0.1820671158246891  |
| longitude                     | price | -0.15572566834898344 |
| amenity_meals_not_included    | price | -0.14911200301295766 |
| amenity_pool_table            | price | -0.14533685023424428 |
| amenity_multilingual_staff    | price | -0.140664288863232   |
| amenity_room_service          | price | -0.1373974817379809  |
| amenity_photocopier           | price | -0.1306228100577222  |
| amenity_room_only             | price | -0.12834193655159085 |
| is_near_a_University_Building | price | -0.1063300171139152  |
📉 Attributes that **decrease** price

Interestingly, some common amenities are associated with **lower prices**, likely because they are standard or expected rather than premium. The **top 5 negative drivers** are:

1. **Outdoor pool** (−0.348) – Pools are common, so they don’t signal luxury.
2. **General pool** (−0.333) – Same reasoning; widespread availability reduces exclusivity.
3. **Bar** (−0.322) – Bars are typical in mid-range hotels, not necessarily luxury.
4. **Concierge** (−0.310) – Once a premium service, now fairly standard in many hotels.
5. **Currency exchange** (−0.296) – Practical but not a luxury feature, often found in budget-friendly hotels.

Other negative drivers include **safe deposit boxes**, **massage services**, **iron availability**, and **business centers**. These are functional or expected amenities, so they don’t justify higher pricing.


# 8 Conclusion

**To answer the core question:** _What is the optimal price for different room types across Urban, Suburban, and Rural areas?_ The predictive insights generated via Altair RapidMiner serve as a data-driven guide. Hotel owners and operators can use this framework to set competitive, marketable rates that reflect actual market behavior rather than relying on simple averages or guesswork.

**Recommended Prices based on Table Data:**
- For Rural Areas:
    - Room (which is standard Room) = PHP 1413 - PHP 4596.02
    - Shared Room = PHP 415 - PHP 867.470
    - Single Room = PHP 502 - PHP 3532.7
    - Triple Room = PHP 1260 - PHP 2277.5
    - Suite = PHP 3255 - PHP 8354.86
- For Suburban Areas:
    - Room (which is standard Room) = PHP 3215 - PHP 3846.85
    - Shared Room = PHP 353 - PHP 955.91
    - Single Room = PHP 1803 - PHP 1831.71
    - Triple Room = PHP 4400.28 - PHP 5250
    - Suite = PHP 2430 - PHP 8453.82
- For Urban Areas:
    - Room (which is standard Room) = PHP 4504.66 - PHP 6800
    - Shared Room = PHP 357 - PHP 654.91
    - Single Room = PHP 800 - PHP 1690.44
    - Triple Room = PHP 1730 - PHP 12094.83
    - Suite = PHP 1083 - PHP 5319.07

**Key Trends Show:**
1. **Exclusivity Drives Premium Pricing:** Amenities focused primarily on leisure drive prices upward, as the data demonstrates a market willingness to pay a premium for these experiences. Conversely, highly functional amenities correlate with lower prices, as consumers already expect them as standard features rather than luxury additions.
2. **The Baseline Expectation Penalty:** Features that might traditionally be considered "perks" (such as a standard pool, concierge, or a bar) actually show a strong negative correlation with price. In the current market, these are no longer luxury differentiators; they are baseline expectations for highly competitive, mid-tier, or budget properties.
3. **The "Rural Resort" Phenomenon:** While urban markets are highly standardized and competitive, rural areas contain extreme price outliers and command high rates for single rooms and suites. When paired with the high positive correlation of features like `is_a_resort`, `beach_umbrellas`, and `diving`, it is clear that the rural market in this dataset is heavily influenced by luxury vacation destinations rather than budget roadside accommodations.
4. **Suburban Markets Command a "Space Premium":** Even when comparing core room types, suburban areas maintain the highest average marketable price (PHP 25,350). This is largely driven by the high pricing of high-capacity rooms like Suites and Triple Rooms, suggesting suburban hotels successfully cater to families or groups willing to pay a premium for larger footprints.


![](https://res.cloudinary.com/michaelpersonal/image/upload/v1774009939/Obsidian/utg6smekg3cmspld3szs.png)

---
# 9 Thank You! For Listening!

checkout my PDF file related to this post: https://indigo-historic-salmon-454.mypinata.cloud/ipfs/bafybeidz544kyrmux3xgwnp3kbdyrgstjzj6nudaxxrtd5cwee7f5aus7q

