from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
import cv2
import subprocess
import os
import spacy  

import sys
 

n = len(sys.argv)

data = sys.argv[1]
data = data.split(" ")
name1 = ""


for i in range(1, len(data)):
    name1+=data[i]


# import base64
# import io
# from PIL import Image


# def pillow_image_to_base64_string(img):
#     buffered = io.BytesIO()
#     img.save(buffered, format="PNG")
#     return base64.b64encode(buffered.getvalue()).decode("utf-8")


# def base64_string_to_pillow_image(base64_str):
#     return Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))


# # Example for Converting pillow image to base64 data URL to view in browser
# my_img = Image.open('certificate.png')
# data_url = 'data:image/jpeg;base64,' + pillow_image_to_base64_string(my_img)
# # You can put this data URL in the address bar of your browser to view the image


# import the necessary packages
import numpy as np
import sys

if sys.version_info[0] == 3:
    from urllib.request import urlopen
else:
    # Not Python 3 - today, it is most likely to be Python 2
    # But note that this might need an update when Python 4
    # might be around one day
    from urllib import urlopen

import cv2
# METHOD #1: OpenCV, NumPy, and urllib
def url_to_image(url):
    req = urlopen(url)
    arr = np.asarray(bytearray(req.read()),dtype = np.uint8)
    img = cv2.imdecode(arr, -1)
    return img

image = url_to_image(data[0])
original = image.copy()
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (9,9), 0)
thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Morph close
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

# Find contours and filter for QR code
cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
for c in cnts:
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.04 * peri, True)
    x,y,w,h = cv2.boundingRect(approx)
    area = cv2.contourArea(c)
    ar = w / float(h)
    if len(approx) == 4 and area > 1000 and (ar > .85 and ar < 1.3):
        cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
        ROI = original[y-5:y+h+5, x-5:x+w+5]
     


cv2.imshow('ROI', ROI)
cv2.imwrite('ROI.jpg',ROI)



# Create a VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
video = cv2.VideoWriter("QR.mp4", fourcc, 20.0, (ROI.shape[0],ROI.shape[1]))

# Iterate over the images and write them to the video
for _ in range(20):
    
    video.write(ROI)

# Release the VideoWriter object
video.release()



# Command to convert MP4 to Y4M using FFmpeg
command = 'ffmpeg -i QR.mp4 -pix_fmt yuv420p ROI.y4m'

# Execute the command
subprocess.run(command, shell=True)


 
options = webdriver.ChromeOptions()
options.add_argument("--use-fake-ui-for-media-stream")
options.add_argument("--use-fake-device-for-media-stream")
options.add_argument('--use-file-for-fake-video-capture='+os.getcwd()+'/ROI.y4m')
# your driver goes here
driver = webdriver.Chrome(options=options)

driver.get('https://verify.cowin.gov.in')


driver.find_element(By.CLASS_NAME, "green-btn").click()

sleep(5)

name = driver.find_element(By.CLASS_NAME, "value-col").text

if not name:
    print("reject",end="")
    exit(1)



name = name.split()
name1 = ""
for n1 in name:
    name1+=n1
name = name1



os.remove(os.getcwd()+"/QR.mp4")
os.remove(os.getcwd()+'/ROI.y4m')
os.remove(os.getcwd()+"/ROI.jpg")




  
nlp = spacy.load('en_core_web_sm') 
  


token1 = nlp(name)
token2 = nlp(name1)

val = token2.similarity(token1)
if val>0.5:
    print("accepted")
    exit(0)
else:
    print("rejected")
    exit(1)