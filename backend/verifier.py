# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from time import sleep
# import cv2
# import subprocess
# import os
# # import spacy  

# import sys
 

# n = len(sys.argv)

# name1 = ""

# # Load imgae, grayscale, Gaussian blur, Otsu's threshold
# image = cv2.imread(sys.argv[1])
# original = image.copy()
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# blur = cv2.GaussianBlur(gray, (9,9), 0)
# thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# # Morph close
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
# close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

# # Find contours and filter for QR code
# cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# cnts = cnts[0] if len(cnts) == 2 else cnts[1]
# for c in cnts:
#     peri = cv2.arcLength(c, True)
#     approx = cv2.approxPolyDP(c, 0.04 * peri, True)
#     x,y,w,h = cv2.boundingRect(approx)
#     area = cv2.contourArea(c)
#     ar = w / float(h)
#     if len(approx) == 4 and area > 1000 and (ar > .85 and ar < 1.3):
#         cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
#         ROI = original[y-5:y+h+5, x-5:x+w+5]
     


# cv2.imshow('ROI', ROI)
# cv2.imwrite('ROI.jpg',ROI)



# # Create a VideoWriter object
# fourcc = cv2.VideoWriter_fourcc(*"mp4v")
# video = cv2.VideoWriter("QR.mp4", fourcc, 20.0, (ROI.shape[0],ROI.shape[1]))

# # Iterate over the images and write them to the video
# for _ in range(20):
    
#     video.write(ROI)

# # Release the VideoWriter object
# video.release()



# # Command to convert MP4 to Y4M using FFmpeg
# command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'

# # Execute the command
# subprocess.run(command, shell=True)



# options = webdriver.ChromeOptions()
# options.add_argument("--use-fake-ui-for-media-stream")
# options.add_argument("--use-fake-device-for-media-stream")
# options.add_argument('--use-file-for-fake-video-capture=/home/vishwa/software/development/verification/ROI.y4m')
# # your driver goes here
# driver = webdriver.Chrome(options=options)

# driver.get('https://verify.cowin.gov.in')


# driver.find_element(By.CLASS_NAME, "green-btn").click()

# sleep(5)

# name = driver.find_element(By.CLASS_NAME, "value-col").text


# name = name.split()
# name1 = ""
# for n1 in name:
#     name1+=n1
# name = name1



# os.remove("QR.mp4")
# os.remove('ROI.y4m')
# os.remove("ROI.jpg")




  
# # nlp = spacy.load('en_core_web_sm') 
  


# # token1 = nlp(name)
# # token2 = nlp(name1)

# # val = token2.similarity(token1)
# # if val>0.5:
# #     print("1")
# # else:
# #     print("0")

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import cv2
import pyvirtualcam
import urllib.request
import numpy as np
import sys

# Get command line arguments
if len(sys.argv) != 2:
    print("Usage: python [script.py] [data string]")
    sys.exit(1)

# configuring image urls from input
req = sys.argv[1]
data = req.split(',')

# create options to bypass camera pop-up
options = webdriver.EdgeOptions()
options.add_argument("--use-fake-ui-for-media-stream")

# create a new Edge browser instance
driver = webdriver.Edge(options=options)

# navigate to the Cowin website
driver.get("https://verify.cowin.gov.in")

# wait for the scan QR code button to become clickable
scan_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[@class='custom-button green-btn']")))

# click the scan QR code button
scan_button.click()

options = webdriver.EdgeOptions()

output = 0

i=0

true = True

while i<len(data) and true:

    if i!=0:
        # wait for the scan QR code button to become clickable
        scan_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[@class='custom-button green-btn']")))

        # click the scan QR code button
        scan_button.click()

    [name_in, image] = data[i].split('-')

    req = urllib.request.urlopen(image)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img = cv2.imdecode(arr, -1)

    with pyvirtualcam.Camera(width=img.shape[1], height=img.shape[0], fps=30) as cam:
        
        # print("Entered ", i, " th Cam")
        # send the screen to the virtual camera
        cam.send(img)

        # print("Sent Image")


        # Wait for next frame
        # cam.sleep_until_next_frame()

        # try to get output data
        try:
            # wait for the output to appear
            status = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//div[@class='certificate-status-wrapper']/h3"))).text

            if status=="Certificate Successfully Verified":
                name = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//div[@class='certificate-status-wrapper']/table/tr/td[2]"))).text
                # print(status, name)

                if name_in!=name:
                    true = False
                    print("Name",i,end="")

                    # close the browser
                    # driver.quit()
                    # exit()
                else:
                    i+=1
                    button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[@class='custom-button blue-btn m-3']")))
                    button.click()

            elif status=="Certificate Invalid":
                # print(status)
                print("Fail",i,end="")
                true = False

                # close the browser
                # driver.quit()
                # exit()
            else:
                # print("Retrying")
                pass

        except:
            pass

if(true):
    print("Success",end="")
# close the browser
driver.quit()
sys.exit(0)